package fr.djplace.backend.dto;

import fr.djplace.backend.enums.ArticleType;
import fr.djplace.backend.enums.DifficultyLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleRequestDto {

    @NotBlank(message = "Le titre est obligatoire")
    private String title;

    @NotBlank(message = "Le contenu est obligatoire")
    private String content;

    private String summary;
    private String mainImageUrl;

    @NotNull(message = "Le type d'article est obligatoire")
    private ArticleType type;

    @NotNull(message = "Le niveau de difficulté est obligatoire")
    private DifficultyLevel level;

    @NotNull(message = "L'ID de la catégorie est obligatoire")
    private Integer categoryId;
}