package com.rehan.sms.mapper;

import com.rehan.sms.dto.GradeDto;
import com.rehan.sms.entities.Grade;

public class GradeMapper {

    public static GradeDto gradeDto(Grade grade) {
        GradeDto dto = new GradeDto();
        dto.setId(grade.getId());
        dto.setGradeValue(grade.getGradeValue());
        dto.setComments(grade.getComments());

        if (grade.getStudent() != null) {
            dto.setStudentId(grade.getStudent().getId());
            dto.setStudent(StudentMapper.studentDto(grade.getStudent()));
        }

        if (grade.getCourse() != null) {
            dto.setCourseId(grade.getCourse().getId());
            dto.setCourse(CourseMapper.courseDto(grade.getCourse()));
        }

        return dto;
    }

    public static Grade grade(GradeDto dto) {
        Grade grade = new Grade();
        grade.setId(dto.getId());
        grade.setGradeValue(dto.getGradeValue());
        grade.setComments(dto.getComments());
        return grade;
    }
}