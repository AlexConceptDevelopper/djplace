package fr.djplace.backend.mapper;

import fr.djplace.backend.dto.CommentRequestDto;
import fr.djplace.backend.dto.CommentResponseDto;
import fr.djplace.backend.model.Article;
import fr.djplace.backend.model.Comment;
import fr.djplace.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentResponseDto toDto(Comment comment) {
        if (comment == null) {
            return null;
        }

        CommentResponseDto dto = new CommentResponseDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());

        if (comment.getArticle() != null) {
            dto.setArticleId(comment.getArticle().getId());
        }

        if (comment.getAuthor() != null) {
            dto.setAuthorId(comment.getAuthor().getId());
            dto.setAuthorUsername(comment.getAuthor().getUsername());
        }

        return dto;
    }

    public Comment toEntity(CommentRequestDto dto, Article article, User author) {
        if (dto == null) {
            return null;
        }

        Comment comment = new Comment();
        comment.setContent(dto.getContent().trim());
        comment.setArticle(article);
        comment.setAuthor(author);

        return comment;
    }
}