package fr.djplace.backend.model;

import fr.djplace.backend.enums.ArticleType;
import fr.djplace.backend.enums.DifficultyLevel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "articles", indexes = {
    @Index(name = "idx_article_slug", columnList = "slug")
})
@Getter
@Setter
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String mainImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArticleType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel level;

    @Column(nullable = false)
    private Boolean published = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}