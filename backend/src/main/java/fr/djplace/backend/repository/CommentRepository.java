package fr.djplace.backend.repository;

import fr.djplace.backend.model.Comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByArticleIdOrderByCreatedAtAsc(Integer articleId);

    Integer countByArticleId(Integer articleId);

    void deleteByAuthorId(Integer authorId);

}