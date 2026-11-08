package fr.djplace.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponseDto {
    private Integer id;
    private String name;
    private String slug;
    private String description;
}