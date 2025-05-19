import axios from "axios";

const GRADE_API_BASE_URL = 'http://localhost:8080/api/grades';

class GradeService {
    getAllGrades() {
        return axios.get(GRADE_API_BASE_URL);
    }

    getGradeById(id) {
        return axios.get(GRADE_API_BASE_URL + '/' + id);
    }

    createGrade(grade) {
        return axios.post(GRADE_API_BASE_URL, grade);
    }

    updateGrade(id, grade) {
        return axios.put(GRADE_API_BASE_URL + '/' + id, grade);
    }

    deleteGrade(id) {
        return axios.delete(GRADE_API_BASE_URL + '/' + id);
    }

    getGradesByStudentId(studentId) {
        return axios.get(GRADE_API_BASE_URL + '/student/' + studentId);
    }

    getGradesByCourseId(courseId) {
        return axios.get(GRADE_API_BASE_URL + '/course/' + courseId);
    }

    getStudentGPA(studentId) {
        return axios.get(GRADE_API_BASE_URL + '/gpa/' + studentId);
    }
}

export default new GradeService(); 