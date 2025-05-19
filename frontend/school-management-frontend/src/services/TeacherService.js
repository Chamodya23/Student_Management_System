
import axios from 'axios';

const TEACHER_API_BASE_URL = 'http://localhost:8080/api/teachers';

class TeacherService {
    getAllTeachers() {
        return axios.get(TEACHER_API_BASE_URL);
    }

    getTeacherById(id) {
        return axios.get(TEACHER_API_BASE_URL + '/' + id)
    }

    createTeacher(teacher) {
        return axios.post(TEACHER_API_BASE_URL, teacher);
    }


    updateTeacher(id, teacher) {
        return axios.put(TEACHER_API_BASE_URL + '/' + id, teacher);
    }


    deleteTeacher(id) {
        return axios.delete(TEACHER_API_BASE_URL + '/'  + id)
    }
}


export default new TeacherService();