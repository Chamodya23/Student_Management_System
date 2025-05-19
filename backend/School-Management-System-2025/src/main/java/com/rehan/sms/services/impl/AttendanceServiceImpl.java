package com.rehan.sms.services.impl;

import com.rehan.sms.dto.AttendanceDto;
import com.rehan.sms.entities.Attendance;
import com.rehan.sms.entities.Course;
import com.rehan.sms.entities.Student;
import com.rehan.sms.exception.ResourceNotFoundException;
import com.rehan.sms.mapper.AttendanceMapper;
import com.rehan.sms.repositories.AttendanceRepository;
import com.rehan.sms.repositories.CourseRepository;
import com.rehan.sms.repositories.StudentRepository;
import com.rehan.sms.services.AttendanceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceServiceImpl.class);

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceDto> getAllAttendanceRecords() {
        return attendanceRepository.findAllWithRelationships().stream()
                .map(AttendanceMapper::attendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AttendanceDto getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findByIdWithRelationships(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        return AttendanceMapper.attendanceDto(attendance);
    }

    @Override
    @Transactional
    public AttendanceDto createAttendance(AttendanceDto attendanceDto) {
        try {
            logger.info("Creating attendance with data: {}", attendanceDto);

            // Validate the attendance data
            if (attendanceDto.getStudentId() == null) {
                throw new IllegalArgumentException("Student ID cannot be null");
            }

            if (attendanceDto.getCourseId() == null) {
                throw new IllegalArgumentException("Course ID cannot be null");
            }

            // Convert string date to LocalDate if needed
            if (attendanceDto.getDate() == null) {
                throw new IllegalArgumentException("Date cannot be null");
            }

            // Create attendance entity
            Attendance attendance = new Attendance();

            // Set the date from the DTO
            if (attendanceDto.getDate() instanceof String) {
                try {
                    attendance.setDate(LocalDate.parse((String) attendanceDto.getDate()));
                } catch (DateTimeParseException e) {
                    logger.error("Error parsing date: {}", attendanceDto.getDate());
                    throw new IllegalArgumentException("Invalid date format");
                }
            } else if (attendanceDto.getDate() instanceof LocalDate) {
                attendance.setDate((LocalDate) attendanceDto.getDate());
            }

            // Set status
            attendance.setStatus(attendanceDto.getStatus());

            // Set remarks if available
            attendance.setRemarks(attendanceDto.getRemarks());

            // Find and set student
            Student student = studentRepository.findById(attendanceDto.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Student not found with id: " + attendanceDto.getStudentId()));
            attendance.setStudent(student);

            // Find and set course
            Course course = courseRepository.findById(attendanceDto.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Course not found with id: " + attendanceDto.getCourseId()));
            attendance.setCourse(course);

            // Save the attendance record
            Attendance savedAttendance = attendanceRepository.save(attendance);
            logger.info("Successfully saved attendance with ID: {}", savedAttendance.getId());

            return AttendanceMapper.attendanceDto(savedAttendance);
        } catch (Exception e) {
            logger.error("Error creating attendance", e);
            throw e;
        }
    }

    @Override
    @Transactional
    public AttendanceDto updateAttendanceById(Long id, AttendanceDto attendanceDto) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));

        // Handle date conversion if needed
        if (attendanceDto.getDate() != null) {
            if (attendanceDto.getDate() instanceof String) {
                try {
                    attendance.setDate(LocalDate.parse((String) attendanceDto.getDate()));
                } catch (DateTimeParseException e) {
                    throw new IllegalArgumentException("Invalid date format");
                }
            } else if (attendanceDto.getDate() instanceof LocalDate) {
                attendance.setDate((LocalDate) attendanceDto.getDate());
            }
        }

        // Update status if provided
        if (attendanceDto.getStatus() != null) {
            attendance.setStatus(attendanceDto.getStatus());
        }

        // Update remarks if provided
        attendance.setRemarks(attendanceDto.getRemarks());

        // Update student if provided
        if (attendanceDto.getStudentId() != null) {
            Student student = studentRepository.findById(attendanceDto.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Student not found with id: " + attendanceDto.getStudentId()));
            attendance.setStudent(student);
        }

        // Update course if provided
        if (attendanceDto.getCourseId() != null) {
            Course course = courseRepository.findById(attendanceDto.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Course not found with id: " + attendanceDto.getCourseId()));
            attendance.setCourse(course);
        }

        return AttendanceMapper.attendanceDto(attendanceRepository.save(attendance));
    }

    @Override
    @Transactional
    public void deleteAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        attendanceRepository.delete(attendance);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceDto> getAttendanceByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId).stream()
                .map(AttendanceMapper::attendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceDto> getAttendanceByCourseId(Long courseId) {
        return attendanceRepository.findByCourseId(courseId).stream()
                .map(AttendanceMapper::attendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceDto> getAttendanceByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        return attendanceRepository.findByDate(localDate).stream()
                .map(AttendanceMapper::attendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceDto> getAttendanceByStudentIdAndDate(Long studentId, LocalDate date) {
        return attendanceRepository.findByStudentIdAndDate(studentId, date).stream()
                .map(AttendanceMapper::attendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceDto> getAttendanceByCourseIdAndDate(Long courseId, LocalDate date) {
        return attendanceRepository.findByCourseIdAndDate(courseId, date).stream()
                .map(AttendanceMapper::attendanceDto)
                .collect(Collectors.toList());
    }
}