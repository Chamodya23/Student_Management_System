package com.rehan.sms.services.impl;

import com.rehan.sms.dto.CourseDto;
import com.rehan.sms.entities.Course;
import com.rehan.sms.exception.ResourceNotFoundException;
import com.rehan.sms.mapper.CourseMapper;
import com.rehan.sms.repositories.CourseRepository;
import com.rehan.sms.services.CourseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseMapper::courseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return CourseMapper.courseDto(course);
    }

    @Override
    public CourseDto createCourse(CourseDto courseDto) {
        Course course = CourseMapper.course(courseDto);
        Course savedCourse = courseRepository.save(course);
        return CourseMapper.courseDto(savedCourse);
    }

    @Override
    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        Course course = CourseMapper.course(courseDto);
        course.setId(id);
        Course updatedCourse = courseRepository.save(course);
        return CourseMapper.courseDto(updatedCourse);
    }

    @Override
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}