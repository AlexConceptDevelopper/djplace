package fr.djplace.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // Clé secrète (idéalement à mettre dans application.properties, gardée simple ici pour l'exemple)
    // TODO: Changer la clé secrète pour une valeur plus sécurisée et la stocker dans un fichier de configuration sécurisé
    private final String jwtSecret = "djplaceSuperSecretKeyForJwtAuthenticationSpringSecurity2026";
    private final int jwtExpirationMs = 86400000; // 24 heures

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException e) {
            System.err.println("Token JWT invalide : " + e.getMessage());
        }
        return false;
    }
}