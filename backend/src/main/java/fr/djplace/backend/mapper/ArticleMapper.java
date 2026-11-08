package fr.djplace.backend.mapper;

import fr.djplace.backend.dto.ArticleRequestDto;
import fr.djplace.backend.dto.ArticleResponseDto;
import fr.djplace.backend.model.Article;
import fr.djplace.backend.model.Category;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    public ArticleResponseDto toDto(Article article) {
        if (article == null) {
            return null;
        }

        ArticleResponseDto dto = new ArticleResponseDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setSlug(article.getSlug());
        dto.setContent(article.getContent());
        dto.setSummary(article.getSummary());
        dto.setMainImageUrl(article.getMainImageUrl());
        dto.setType(article.getType());
        dto.setLevel(article.getLevel());
        dto.setPublished(article.getPublished());
        dto.setCreatedAt(article.getCreatedAt());

        if (article.getCategory() != null) {
            dto.setCategoryName(article.getCategory().getName());
        }

        return dto;
    }

    public Article toEntity(ArticleRequestDto dto, Category category, String generatedSlug) {
        if (dto == null) {
            return null;
        }

        Article article = new Article();
        article.setTitle(dto.getTitle());
        article.setSlug(generatedSlug);
        article.setContent(dto.getContent());
        article.setSummary(dto.getSummary());
        article.setMainImageUrl(dto.getMainImageUrl());
        article.setType(dto.getType());
        article.setLevel(dto.getLevel());
        article.setPublished(false); // Sécurité : non publié par défaut
        article.setCategory(category);

        return article;
    }
}