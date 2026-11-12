package fr.djplace.backend.controller;

import fr.djplace.backend.model.Article;
import fr.djplace.backend.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ArticleController {

    private final ArticleRepository articleRepository;

    // 1. PUBLIC : Récupérer uniquement les articles publiés (pour le site public)
    @GetMapping
    public List<Article> getPublishedArticles() {
        return articleRepository.findByPublishedTrue();
    }

    // 2. ADMIN : Récupérer TOUS les articles (publiés et brouillons) pour le dashboard
    @GetMapping("/admin/all")
    public List<Article> getAllArticlesForAdmin() {
        return articleRepository.findAll();
    }

    // 3. PUBLIC : Récupérer un article par son slug
    @GetMapping("/{slug}")
    public ResponseEntity<Article> getArticleBySlug(@PathVariable String slug) {
        return articleRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. ADMIN : Créer un nouvel article
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article savedArticle = articleRepository.save(article);
        return ResponseEntity.ok(savedArticle);
    }

    // 5. ADMIN : Mettre à jour un article
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Integer id, @RequestBody Article articleDetails) {
        return articleRepository.findById(id)
                .map(article -> {
                    article.setTitle(articleDetails.getTitle());
                    article.setSlug(articleDetails.getSlug());
                    article.setContent(articleDetails.getContent());
                    article.setSummary(articleDetails.getSummary());
                    article.setMainImageUrl(articleDetails.getMainImageUrl());
                    article.setType(articleDetails.getType());
                    article.setLevel(articleDetails.getLevel());
                    article.setPublished(articleDetails.getPublished());
                    article.setCategory(articleDetails.getCategory());
                    
                    Article updated = articleRepository.save(article);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 6. ADMIN : Supprimer un article
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Integer id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}