package fr.djplace.backend.controller;

import fr.djplace.backend.dto.ArticleRequestDto;
import fr.djplace.backend.dto.ArticleResponseDto;
import fr.djplace.backend.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> createPatient(@Valid @RequestBody ArticleRequestDto dto) {
        ArticleResponseDto createdArticle = articleService.createArticle(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }
}