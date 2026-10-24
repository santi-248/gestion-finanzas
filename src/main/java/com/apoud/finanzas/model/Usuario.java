package com.apoud.finanzas.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Entity 
@Table (name = "usuarios")
public class Usuario implements UserDetails {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    private Long id;
    private String nombre;

    @Column (unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;

    public Usuario() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // Por ahora no usaremos roles (Admin/User), todos son usuarios normales.
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // Usamos el email como identificador principal para el login
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}