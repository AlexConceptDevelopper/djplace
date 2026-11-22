package fr.djplace.backend.controller;

import fr.djplace.backend.dto.CommentRequestDto;
import fr.djplace.backend.dto.CommentResponseDto;
import fr.djplace.backend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/articles/{articleId}/comments")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByArticle(@PathVariable Integer articleId) {
        return ResponseEntity.ok(commentService.getCommentsByArticleId(articleId));
    }

    @PostMapping("/articles/{articleId}/comments")
    public ResponseEntity<CommentResponseDto> createComment(
            @PathVariable Integer articleId,
            @Valid @RequestBody CommentRequestDto requestDto,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();
        CommentResponseDto created = commentService.createComment(articleId, requestDto, currentUserEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Integer commentId,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();
        commentService.deleteComment(commentId, currentUserEmail);
        return ResponseEntity.noContent().build();
    }
}