package com.rehan.sms.repositories;

import com.rehan.sms.entities.Grade;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT g FROM Grade g")
    List<Grade> findAllWithRelationships();

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT g FROM Grade g WHERE g.id = :id")
    Optional<Grade> findByIdWithRelationships(Long id);

    List<Grade> findByStudentId(Long studentId);

    List<Grade> findByCourseId(Long courseId);

    List<Grade> findByStudentIdAndCourseId(Long studentId, Long courseId);
}