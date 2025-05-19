
import axios from "axios";

const STUDENT_API_BASE_URL = 'http://localhost:8080/api/students';


class StudentService {
    getAllStudents() {
        return axios.get(STUDENT_API_BASE_URL);
    }


    getStudenById(id) {
        return axios.get(STUDENT_API_BASE_URL + '/' + id);
    }


    createStudent(student) {
        return axios.post(STUDENT_API_BASE_URL, student);
    }


    updateStudent(id, student) {
        return axios.put(STUDENT_API_BASE_URL + '/' + id, student);
    }


    deleteStudent(id) {
        return axios.delete(STUDENT_API_BASE_URL + '/' + id);
    }
}


export default new StudentService();