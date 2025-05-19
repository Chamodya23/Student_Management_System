import axios from "axios";

const COURSE_API_BASE_URL = 'http://localhost:8080/api/courses';

class CourseService {
    getAllCourses() {
        return axios.get(COURSE_API_BASE_URL);
    }

    getCourseById(id) {
        return axios.get(COURSE_API_BASE_URL + '/' + id);
    }

    createCourse(course) {
        return axios.post(COURSE_API_BASE_URL, course);
    }

    updateCourse(id, course) {
        return axios.put(COURSE_API_BASE_URL + '/' + id, course);
    }

    deleteCourse(id) {
        return axios.delete(COURSE_API_BASE_URL + '/' + id);
    }
}

export default new CourseService(); 