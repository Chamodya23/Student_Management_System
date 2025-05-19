package com.rehan.sms.controllers;

import com.rehan.sms.dto.AttendanceDto;
import com.rehan.sms.exception.ResourceNotFoundException;
import com.rehan.sms.services.AttendanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public ResponseEntity<List<AttendanceDto>> getAllAttendanceRecords() {
        return ResponseEntity.ok(attendanceService.getAllAttendanceRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDto> getAttendanceById(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByStudentId(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByCourseId(courseId));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByDate(@PathVariable String date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }

    @PostMapping
    public ResponseEntity<?> createAttendance(@RequestBody AttendanceDto attendanceDto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(attendanceService.createAttendance(attendanceDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAttendanceById(@PathVariable Long id,
            @RequestBody AttendanceDto attendanceDto) {
        try {
            return ResponseEntity.ok(attendanceService.updateAttendanceById(id, attendanceDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAttendanceById(@PathVariable Long id) {
        try {
            attendanceService.deleteAttendanceById(id);
            return ResponseEntity.ok(Map.of(
                    "message", "Attendance record deleted successfully",
                    "id", id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}