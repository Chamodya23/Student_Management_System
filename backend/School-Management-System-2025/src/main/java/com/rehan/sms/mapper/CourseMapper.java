package com.rehan.sms.mapper;

import com.rehan.sms.dto.CourseDto;
import com.rehan.sms.entities.Course;

public class CourseMapper {

    public static CourseDto courseDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setCourseName(course.getCourseName());
        dto.setCourseCode(course.getCourseCode());
        dto.setDescription(course.getDescription());
        dto.setCredits(course.getCredits());
        return dto;
    }

    public static Course course(CourseDto courseDto) {
        Course course = new Course();
        course.setId(courseDto.getId());
        course.setCourseName(courseDto.getCourseName());
        course.setCourseCode(courseDto.getCourseCode());
        course.setDescription(courseDto.getDescription());
        course.setCredits(courseDto.getCredits());
        return course;
    }
}