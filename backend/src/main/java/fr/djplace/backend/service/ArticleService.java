package fr.djplace.backend.service;

import fr.djplace.backend.dto.ArticleRequestDto;
import fr.djplace.backend.dto.ArticleResponseDto;
import fr.djplace.backend.mapper.ArticleMapper;
import fr.djplace.backend.model.Article;
import fr.djplace.backend.model.Category;
import fr.djplace.backend.repository.ArticleRepository;
import fr.djplace.backend.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final ArticleMapper articleMapper;

    public ArticleService(ArticleRepository articleRepository, CategoryRepository categoryRepository,
            ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.articleMapper = articleMapper;
    }

    // Générateur de slug propre (ex: "Mon Super Article : Guide !" ->
    // "mon-super-article-guide")
    private String generateSlug(String input) {
        String nowhitespace = input.toLowerCase(Locale.FRENCH).trim().replaceAll("\\s+", "-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        return normalized
                .replaceAll("[^a-z0-9-]", "")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    // Pour le site public (accueil, listes) : uniquement les publiés
    public List<ArticleResponseDto> getPublishedArticles() {
        return articleRepository.findByPublishedTrueOrderByCreatedAtDesc().stream()
                .map(articleMapper::toDto)
                .toList();
    }

    // Pour l'admin : tous les articles (brouillons inclus)
    public List<ArticleResponseDto> getAllArticlesForAdmin() {
        return articleRepository.findAll().stream()
                .map(articleMapper::toDto)
                .toList();
    }

    @Transactional
    public ArticleResponseDto createArticle(ArticleRequestDto dto) {
        // 1. Récupérer la catégorie
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Catégorie introuvable avec l'ID : " + dto.getCategoryId()));

        // 2. Générer et sécuriser l'unicité du slug
        String baseSlug = generateSlug(dto.getTitle());
        String slug = baseSlug;
        int counter = 1;
        while (articleRepository.findBySlug(slug).isPresent()) {
            slug = baseSlug + "-" + counter++;
        }

        // 3. Convertir via le Mapper et sauvegarder
        Article article = articleMapper.toEntity(dto, category, slug);
        Article savedArticle = articleRepository.save(article);

        return articleMapper.toDto(savedArticle);
    }

    public List<ArticleResponseDto> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(articleMapper::toDto)
                .toList();
    }

    public ArticleResponseDto getArticleBySlug(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(
                        "Article introuvable avec le slug : " + slug));
        return articleMapper.toDto(article);
    }

    @Transactional
    public ArticleResponseDto updateArticle(Integer id, ArticleRequestDto dto) {
        // 1. Récupérer l'article existant
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article introuvable avec l'ID : " + id));

        // 2. Récupérer la nouvelle catégorie
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Catégorie introuvable avec l'ID : " + dto.getCategoryId()));

        // 3. Mettre à jour les champs de base
        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setSummary(dto.getSummary());
        article.setType(dto.getType());
        article.setLevel(dto.getLevel());
        article.setPublished(dto.getPublished());
        article.setCategory(category);

        if (dto.getMainImageUrl() != null) {
            article.setMainImageUrl(dto.getMainImageUrl());
        }

        // 4. Régénérer le slug si le titre a changé
        String baseSlug = generateSlug(dto.getTitle());
        String slug = baseSlug;
        int counter = 1;
        while (articleRepository.findBySlug(slug).isPresent() && !article.getSlug().equals(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        article.setSlug(slug);

        // 5. Sauvegarde
        Article updatedArticle = articleRepository.save(article);
        return articleMapper.toDto(updatedArticle);
    }

    @Transactional
    public void deleteArticle(Integer id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article introuvable avec l'ID : " + id));
        articleRepository.delete(article);
    }
}