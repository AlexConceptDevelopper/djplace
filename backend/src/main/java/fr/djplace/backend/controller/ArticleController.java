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

    // Récupérer uniquement les articles publiés (Public)
    @GetMapping
    public ResponseEntity<List<ArticleResponseDto>> getPublishedArticles() {
        return ResponseEntity.ok(articleService.getPublishedArticles());
    }

    // Récupérer tous les articles, brouillons compris (Admin)
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ArticleResponseDto>> getAllArticlesAdmin() {
        return ResponseEntity.ok(articleService.getAllArticlesForAdmin());
    }

    // Récupérer un article par son slug (Public)
    @GetMapping("/{slug}")
    public ResponseEntity<ArticleResponseDto> getArticleBySlug(@PathVariable String slug) {
        ArticleResponseDto article = articleService.getArticleBySlug(slug);
        return ResponseEntity.ok(article);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> createArticle(@Valid @RequestBody ArticleRequestDto dto) {
        ArticleResponseDto createdArticle = articleService.createArticle(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    // Mettre à jour un article (Admin) - ID en Integer
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponseDto> updateArticle(
            @PathVariable Integer id,
            @Valid @RequestBody ArticleRequestDto dto) {
        ArticleResponseDto updatedArticle = articleService.updateArticle(id, dto);
        return ResponseEntity.ok(updatedArticle);
    }

    // Supprimer un article (Admin) - ID en Integer
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteArticle(@PathVariable Integer id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}