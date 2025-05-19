package com.rehan.sms.repositories;

import com.rehan.sms.entities.Attendance;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT a FROM Attendance a")
    List<Attendance> findAllWithRelationships();

    @EntityGraph(attributePaths = { "student", "course", "course.teacher" })
    @Query("SELECT a FROM Attendance a WHERE a.id = :id")
    Optional<Attendance> findByIdWithRelationships(Long id);

    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByCourseId(Long courseId);

    List<Attendance> findByStudentIdAndCourseId(Long studentId, Long courseId);

    List<Attendance> findByDate(LocalDate date);

    List<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);

    List<Attendance> findByCourseIdAndDate(Long courseId, LocalDate date);
}