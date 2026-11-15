package fr.djplace.backend.controller;

import fr.djplace.backend.dto.ArticleRequestDto;
import fr.djplace.backend.dto.ArticleResponseDto;
import fr.djplace.backend.service.ArticleService;
import jakarta.validation.Valid;

import java.util.List;

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

    // Récupérer tous les articles (Public)
    @GetMapping
    public ResponseEntity<List<ArticleResponseDto>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    // Récupérer un article par son slug (Public)
    @GetMapping("/{slug}")
    public ResponseEntity<ArticleResponseDto> getArticleBySlug(@PathVariable String slug) {
        ArticleResponseDto article = articleService.getArticleBySlug(slug);
        return ResponseEntity.ok(article);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> createPatient(@Valid @RequestBody ArticleRequestDto dto) {
        ArticleResponseDto createdArticle = articleService.createArticle(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }
}