package fr.djplace.backend.controller;

import fr.djplace.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @DeleteMapping("/me")
    public ResponseEntity<String> deleteMyAccount(Authentication authentication) {
        // authentication.getName() récupère le 'sub' (email) du JWT validé
        String email = authentication.getName();
        
        userService.deleteUserAccount(email);

        return ResponseEntity.ok("Compte supprimé avec succès.");
    }
}