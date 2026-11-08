package fr.djplace.backend.dto;

import fr.djplace.backend.enums.ArticleType;
import fr.djplace.backend.enums.DifficultyLevel;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class ArticleResponseDto {
    private Integer id;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String mainImageUrl;
    private ArticleType type;
    private DifficultyLevel level;
    private Boolean published;
    private LocalDateTime createdAt;
    private String categoryName;
}