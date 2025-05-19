package com.rehan.sms.repositories;

import com.rehan.sms.entities.Enrollment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT e FROM Enrollment e")
    List<Enrollment> findAllWithRelationships();

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT e FROM Enrollment e WHERE e.id = :id")
    Optional<Enrollment> findByIdWithRelationships(Long id);

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT e FROM Enrollment e WHERE e.student.id = :studentId")
    List<Enrollment> findByStudentId(Long studentId);

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT e FROM Enrollment e WHERE e.course.id = :courseId")
    List<Enrollment> findByCourseId(Long courseId);

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT e FROM Enrollment e WHERE e.student.id = :studentId AND e.course.id = :courseId")
    List<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
}