package com.rehan.sms.controllers;

import com.rehan.sms.dto.GradeDto;
import com.rehan.sms.exception.ResourceNotFoundException;
import com.rehan.sms.services.GradeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/grades")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping
    public ResponseEntity<List<GradeDto>> getAllGrades() {
        return ResponseEntity.ok(gradeService.getAllGrades());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GradeDto> getGradeById(@PathVariable Long id) {
        return ResponseEntity.ok(gradeService.getGradeById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<GradeDto>> getGradesByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(gradeService.getGradesByStudentId(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<GradeDto>> getGradesByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(gradeService.getGradesByCourseId(courseId));
    }

    @GetMapping("/student/{studentId}/course/{courseId}")
    public ResponseEntity<List<GradeDto>> getGradesByStudentIdAndCourseId(
            @PathVariable Long studentId,
            @PathVariable Long courseId) {
        return ResponseEntity.ok(gradeService.getGradesByStudentIdAndCourseId(studentId, courseId));
    }

    @PostMapping
    public ResponseEntity<?> createGrade(@RequestBody GradeDto gradeDto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(gradeService.createGrade(gradeDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGradeById(@PathVariable Long id,
            @RequestBody GradeDto gradeDto) {
        try {
            return ResponseEntity.ok(gradeService.updateGradeById(id, gradeDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGradeById(@PathVariable Long id) {
        try {
            gradeService.deleteGradeById(id);
            return ResponseEntity.ok(Map.of(
                    "message", "Grade deleted successfully",
                    "id", id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}