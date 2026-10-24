package com.apoud.finanzas.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;


@Service 
public class JwtService {
    private static final String SECRET_KEY = "FirmaSecretaSuperSeguraParaFinanzasAppSpringSecurity";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generarToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // El token dura 24 horas
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}