package com.rehan.sms.services;

import com.rehan.sms.dto.AttendanceDto;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    List<AttendanceDto> getAllAttendanceRecords();

    AttendanceDto getAttendanceById(Long id);

    List<AttendanceDto> getAttendanceByStudentId(Long studentId);

    List<AttendanceDto> getAttendanceByCourseId(Long courseId);

    List<AttendanceDto> getAttendanceByDate(String date);

    List<AttendanceDto> getAttendanceByStudentIdAndDate(Long studentId, LocalDate date);

    List<AttendanceDto> getAttendanceByCourseIdAndDate(Long courseId, LocalDate date);

    AttendanceDto createAttendance(AttendanceDto attendanceDto);

    AttendanceDto updateAttendanceById(Long id, AttendanceDto attendanceDto);

    void deleteAttendanceById(Long id);
}