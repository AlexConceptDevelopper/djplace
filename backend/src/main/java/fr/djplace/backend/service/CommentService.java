package fr.djplace.backend.service;

import fr.djplace.backend.dto.CommentRequestDto;
import fr.djplace.backend.dto.CommentResponseDto;
import fr.djplace.backend.enums.Role;
import fr.djplace.backend.mapper.CommentMapper;
import fr.djplace.backend.model.Article;
import fr.djplace.backend.model.Comment;
import fr.djplace.backend.model.User;
import fr.djplace.backend.repository.ArticleRepository;
import fr.djplace.backend.repository.CommentRepository;
import fr.djplace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByArticleId(Integer articleId) {
        if (!articleRepository.existsById(articleId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article introuvable");
        }

        return commentRepository.findByArticleIdOrderByCreatedAtAsc(articleId)
                .stream()
                .map(commentMapper::toDto)
                .toList();
    }

    @Transactional
    public CommentResponseDto createComment(Integer articleId, CommentRequestDto requestDto, String currentUserEmail) {
        User author = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur introuvable"));

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article introuvable"));

        Comment comment = commentMapper.toEntity(requestDto, article, author);
        Comment saved = commentRepository.save(comment);

        return commentMapper.toDto(saved);
    }

    @Transactional
    public void deleteComment(Integer commentId, String currentUserEmail) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur introuvable"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Commentaire introuvable"));

        boolean isAuthor = comment.getAuthor() != null
                && comment.getAuthor().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        if (!isAuthor && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Vous n'êtes pas autorisé à supprimer ce commentaire");
        }

        commentRepository.delete(comment);
    }

    @Transactional
    public void deleteCommentsByAuthorId(Integer authorId) {
        commentRepository.deleteByAuthorId(authorId);
    }
}