package fr.djplace.backend.service;

import fr.djplace.backend.model.User;
import fr.djplace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void deleteUserAccount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email introuvable"));

        // Double sécurité : on s'assure que l'utilisateur existe et correspond bien
        userRepository.delete(user);
    }
}