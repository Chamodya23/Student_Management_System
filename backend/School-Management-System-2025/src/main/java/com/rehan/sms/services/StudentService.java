package com.rehan.sms.services;

import com.rehan.sms.dto.StudentDto;
import com.rehan.sms.exception.ResourceNotFoundException;

import java.util.List;

public interface StudentService {
    List<StudentDto> getAllStudents();

    StudentDto getStudentById(Long id) throws ResourceNotFoundException;

    StudentDto createStudent(StudentDto studentDto);

    StudentDto updateStudent(Long id, StudentDto studentDto) throws ResourceNotFoundException;

    void deleteStudent(Long id) throws ResourceNotFoundException;
}