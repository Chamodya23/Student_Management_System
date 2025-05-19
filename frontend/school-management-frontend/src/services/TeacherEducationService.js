
import axios from "axios";

const TEACHER_EDUCATION_API_BASE_URL = 'http://localhost:8080/api/teacher-education';


class TeacherEducationService {

    getAllTeacherEducation() {
        return axios.get(TEACHER_EDUCATION_API_BASE_URL);
    }


    getTeacherEducationById(id) {
        return axios.get(TEACHER_EDUCATION_API_BASE_URL + '/' + id);
    }


    createTeacherEducation(education) {
        return axios.post(TEACHER_EDUCATION_API_BASE_URL, education);
    }


    updateTeacherEducation(id, education) {
        return axios.put(TEACHER_EDUCATION_API_BASE_URL + '/' +id, education);
    }


    deleteTeacherEducation(id) {
        return axios.delete(TEACHER_EDUCATION_API_BASE_URL + '/' + id);
    }
}


export default new TeacherEducationService();