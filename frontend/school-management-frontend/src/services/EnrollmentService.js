import axios from "axios";

const ENROLLMENT_API_BASE_URL = 'http://localhost:8080/api/enrollments';

class EnrollmentService {
    getAllEnrollments() {
        return axios.get(ENROLLMENT_API_BASE_URL);
    }

    getEnrollmentById(id) {
        return axios.get(ENROLLMENT_API_BASE_URL + '/' + id);
    }

    createEnrollment(enrollment) {
        return axios.post(ENROLLMENT_API_BASE_URL, enrollment);
    }

    updateEnrollment(id, enrollment) {
        return axios.put(ENROLLMENT_API_BASE_URL + '/' + id, enrollment);
    }

    deleteEnrollment(id) {
        return axios.delete(ENROLLMENT_API_BASE_URL + '/' + id);
    }

    getEnrollmentsByStudentId(studentId) {
        return axios.get(ENROLLMENT_API_BASE_URL + '/student/' + studentId);
    }

    getEnrollmentsByCourseId(courseId) {
        return axios.get(ENROLLMENT_API_BASE_URL + '/course/' + courseId);
    }
}

export default new EnrollmentService(); 