
package com.rehan.sms.mapper;

import com.rehan.sms.dto.AttendanceDto;
import com.rehan.sms.entities.Attendance;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Mapper class to convert between Attendance entity and AttendanceDto
 */
public class AttendanceMapper {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    private AttendanceMapper() {
        // Private constructor to prevent instantiation
    }

    /**
     * Converts an Attendance entity to an AttendanceDto
     */
    public static AttendanceDto attendanceDto(Attendance attendance) {
        if (attendance == null) {
            return null;
        }

        AttendanceDto dto = new AttendanceDto();
        dto.setId(attendance.getId());
        dto.setDate(attendance.getDate());
        dto.setStatus(attendance.getStatus());
        dto.setRemarks(attendance.getRemarks());

        if (attendance.getStudent() != null) {
            dto.setStudentId(attendance.getStudent().getId());
            // Set student name if available
            dto.setStudentName(attendance.getStudent().getFirstName() + " " + 
                             attendance.getStudent().getLastName());
        }

        if (attendance.getCourse() != null) {
            dto.setCourseId(attendance.getCourse().getId());
            // Set course name if available
            dto.setCourseName(attendance.getCourse().getCourseName());
        }

        return dto;
    }

    /**
     * Converts an AttendanceDto to an Attendance entity
     * Note: This does not set relationship objects like Student and Course
     */
    public static Attendance attendance(AttendanceDto dto) {
        if (dto == null) {
            return null;
        }

        Attendance attendance = new Attendance();
        attendance.setId(dto.getId());
        
        // Handle different date formats
        if (dto.getDate() instanceof LocalDate) {
            attendance.setDate((LocalDate) dto.getDate());
        } else if (dto.getDate() instanceof String) {
            try {
                attendance.setDate(LocalDate.parse((String) dto.getDate()));
            } catch (Exception e) {
                // Log the error and default to current date
                System.err.println("Error parsing date: " + dto.getDate() + ". Using current date instead.");
                attendance.setDate(LocalDate.now());
            }
        }
        
        attendance.setStatus(dto.getStatus());
        attendance.setRemarks(dto.getRemarks());

        return attendance;
    }
}

