package com.rehan.sms.mapper;

import com.rehan.sms.dto.EnrollmentDto;
import com.rehan.sms.entities.Enrollment;

public class EnrollmentMapper {

    public static EnrollmentDto enrollmentDto(Enrollment enrollment) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(enrollment.getId());
        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
        dto.setStatus(enrollment.getStatus());
        dto.setSemester(enrollment.getSemester());
        dto.setAcademicYear(enrollment.getAcademicYear());

        if (enrollment.getStudent() != null) {
            dto.setStudentId(enrollment.getStudent().getId());
            dto.setStudent(StudentMapper.studentDto(enrollment.getStudent()));
        }

        if (enrollment.getCourse() != null) {
            dto.setCourseId(enrollment.getCourse().getId());
            dto.setCourse(CourseMapper.courseDto(enrollment.getCourse()));
        }

        return dto;
    }

    public static Enrollment enrollment(EnrollmentDto dto) {
        Enrollment enrollment = new Enrollment();
        enrollment.setId(dto.getId());
        enrollment.setEnrollmentDate(dto.getEnrollmentDate());
        enrollment.setStatus(dto.getStatus());
        enrollment.setSemester(dto.getSemester());
        enrollment.setAcademicYear(dto.getAcademicYear());
        return enrollment;
    }
} 