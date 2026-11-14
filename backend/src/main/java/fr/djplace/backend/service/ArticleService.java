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

    // Générateur de slug propre (ex: "Mon Super Article !" -> "mon-super-article")
    private String generateSlug(String input) {
        String nowhitespace = input.toLowerCase(Locale.FRENCH).trim().replaceAll("\\s+", "-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        return normalized.replaceAll("[^a-z0-9-]", "");
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
}