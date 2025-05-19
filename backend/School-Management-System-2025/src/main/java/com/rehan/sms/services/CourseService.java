package com.rehan.sms.services;

import com.rehan.sms.dto.CourseDto;
import com.rehan.sms.exception.ResourceNotFoundException;
import java.util.List;

public interface CourseService {
    List<CourseDto> getAllCourses();

    CourseDto getCourseById(Long id) throws ResourceNotFoundException;

    CourseDto createCourse(CourseDto courseDto);

    CourseDto updateCourse(Long id, CourseDto courseDto) throws ResourceNotFoundException;

    void deleteCourse(Long id) throws ResourceNotFoundException;
}