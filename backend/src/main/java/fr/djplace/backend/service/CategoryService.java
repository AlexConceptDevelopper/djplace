package fr.djplace.backend.service;

import fr.djplace.backend.dto.CategoryRequestDto;
import fr.djplace.backend.dto.CategoryResponseDto;
import fr.djplace.backend.mapper.CategoryMapper;
import fr.djplace.backend.model.Category;
import fr.djplace.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    private String generateSlug(String input) {
        String nowhitespace = input.toLowerCase(Locale.FRENCH).trim().replaceAll("\\s+", "-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        return normalized.replaceAll("[^a-z0-9-]", "");
    }

    public List<CategoryResponseDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CategoryResponseDto createCategory(CategoryRequestDto dto) {
        String baseSlug = generateSlug(dto.getName());
        String slug = baseSlug;
        int counter = 1;
        while (categoryRepository.findBySlug(slug).isPresent()) {
            slug = baseSlug + "-" + counter++;
        }

        Category category = categoryMapper.toEntity(dto, slug);
        Category savedCategory = categoryRepository.save(category);

        return categoryMapper.toDto(savedCategory);
    }

    @Transactional
    public CategoryResponseDto updateCategory(Integer id, CategoryRequestDto dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable avec l'id : " + id));

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        String baseSlug = generateSlug(dto.getName());
        String slug = baseSlug;
        int counter = 1;
        
        while (categoryRepository.findBySlug(slug).isPresent() && !category.getSlug().equals(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        category.setSlug(slug);

        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(updatedCategory);
    }

    @Transactional
    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable avec l'id : " + id));
        
        categoryRepository.delete(category);
    }
}