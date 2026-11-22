package fr.djplace.backend.service;

import fr.djplace.backend.model.User;
import fr.djplace.backend.repository.CommentRepository;
import fr.djplace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void deleteUserAccount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email introuvable"));

        // Supprime d'abord les commentaires rattachés à cet utilisateur
        commentRepository.deleteByAuthorId(user.getId());

        // Double sécurité : on s'assure que l'utilisateur existe et correspond bien
        userRepository.delete(user);
    }
}