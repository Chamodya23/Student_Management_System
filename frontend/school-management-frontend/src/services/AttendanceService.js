import axios from "axios";

const ATTENDANCE_API_BASE_URL = 'http://localhost:8080/api/attendance';

class AttendanceService {
    getAllAttendance() {
        return axios.get(ATTENDANCE_API_BASE_URL);
    }

    getAttendanceById(id) {
        return axios.get(ATTENDANCE_API_BASE_URL + '/' + id);
    }

    createAttendance(attendance) {
        return axios.post(ATTENDANCE_API_BASE_URL, attendance);
    }

    updateAttendance(id, attendance) {
        return axios.put(ATTENDANCE_API_BASE_URL + '/' + id, attendance);
    }

    deleteAttendance(id) {
        return axios.delete(ATTENDANCE_API_BASE_URL + '/' + id);
    }

    getAttendanceByStudentId(studentId) {
        return axios.get(ATTENDANCE_API_BASE_URL + '/student/' + studentId);
    }

    getAttendanceByCourseId(courseId) {
        return axios.get(ATTENDANCE_API_BASE_URL + '/course/' + courseId);
    }

    getAttendanceByDate(date) {
        return axios.get(ATTENDANCE_API_BASE_URL + '/date/' + date);
    }
}

export default new AttendanceService(); 