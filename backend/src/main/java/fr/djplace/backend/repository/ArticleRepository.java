package fr.djplace.backend.repository;

import fr.djplace.backend.model.Article;
import fr.djplace.backend.enums.ArticleType;
import fr.djplace.backend.enums.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    Optional<Article> findBySlug(String slug);
    List<Article> findByPublishedTrue();
    List<Article> findByLevelAndPublishedTrue(DifficultyLevel level);
    List<Article> findByTypeAndPublishedTrue(ArticleType type);
}