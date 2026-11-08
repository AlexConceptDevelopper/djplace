package fr.djplace.backend.repository;

import fr.djplace.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findBySlug(String slug);
}