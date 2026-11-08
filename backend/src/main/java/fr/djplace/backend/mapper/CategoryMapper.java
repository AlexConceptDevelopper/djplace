package fr.djplace.backend.mapper;

import fr.djplace.backend.dto.CategoryRequestDto;
import fr.djplace.backend.dto.CategoryResponseDto;
import fr.djplace.backend.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponseDto toDto(Category category) {
        if (category == null) {
            return null;
        }

        CategoryResponseDto dto = new CategoryResponseDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setSlug(category.getSlug());
        dto.setDescription(category.getDescription());

        return dto;
    }

    public Category toEntity(CategoryRequestDto dto, String generatedSlug) {
        if (dto == null) {
            return null;
        }

        Category category = new Category();
        category.setName(dto.getName());
        category.setSlug(generatedSlug);
        category.setDescription(dto.getDescription());

        return category;
    }
}