package com.apoud.finanzas.controller;

import com.apoud.finanzas.dto.AuthResponse;
import com.apoud.finanzas.dto.GoogleLoginRequest;
import com.apoud.finanzas.dto.LoginRequest;
import com.apoud.finanzas.dto.RegisterRequest;
import com.apoud.finanzas.model.Usuario;
import com.apoud.finanzas.repository.UsuarioRepository;
import com.apoud.finanzas.security.JwtService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${GOOGLE_CLIENT_ID}")
    private String googleClientId;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, 
                          JwtService jwtService, AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registrar(@RequestBody RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build(); // El correo ya existe
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword())); // Encriptamos la clave
        
        usuarioRepository.save(usuario);
        String token = jwtService.generateToken(usuario);
        
        return ResponseEntity.ok(new AuthResponse(token, usuario.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(usuario);
        
        return ResponseEntity.ok(new AuthResponse(token, usuario.getEmail()));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String googleId = payload.getSubject();

                Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
                Usuario usuario;

                if (usuarioOpt.isPresent()) {
                    usuario = usuarioOpt.get();
                    // Si el usuario ya existía pero no tenía Google ID, se lo asociamos
                    if (usuario.getGoogleId() == null) {
                        usuario.setGoogleId(googleId);
                        usuarioRepository.save(usuario);
                    }
                } else {
                    // Es un usuario nuevo, lo creamos sin contraseña
                    usuario = new Usuario();
                    usuario.setEmail(email);
                    usuario.setNombre(name);
                    usuario.setGoogleId(googleId);
                    usuario = usuarioRepository.save(usuario);
                }

                String token = jwtService.generateToken(usuario);
                return ResponseEntity.ok(new AuthResponse(token, usuario.getEmail()));
            } else {
                return ResponseEntity.status(401).build(); // Token de Google inválido
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}