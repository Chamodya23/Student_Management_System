import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ListTeachers from './components/teachers/ListTeachers';
import ListStudents from './components/students/ListStudents';
import StudentForm from './components/students/StudentForm';
import CourseList from './components/courses/CourseList';
import AddCourse from './components/courses/AddCourse';
import EnrollmentList from './components/enrollments/EnrollmentList';
import AddEnrollment from './components/enrollments/AddEnrollment';
import AttendanceList from './components/attendance/AttendanceList';
import AddAttendance from './components/attendance/AddAttendance';
import GradeList from './components/grades/GradeList';
import AddGrade from './components/grades/AddGrade';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Dashboard Route */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Student Routes */}
                    <Route path="/students" element={<ListStudents />} />
                    <Route path="/add-student" element={<StudentForm />} />
                    <Route path="/edit-student/:id" element={<StudentForm />} />

                    {/* Course Routes */}
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/add-course" element={<AddCourse />} />
                    <Route path="/edit-course/:id" element={<AddCourse />} />

                    {/* Enrollment Routes */}
                    <Route path="/enrollments" element={<EnrollmentList />} />
                    <Route path="/add-enrollment" element={<AddEnrollment />} />
                    <Route path="/edit-enrollment/:id" element={<AddEnrollment />} />

                    {/* Attendance Routes */}
                    <Route path="/attendance" element={<AttendanceList />} />
                    <Route path="/add-attendance" element={<AddAttendance />} />
                    <Route path="/edit-attendance/:id" element={<AddAttendance />} />

                    {/* Grade Routes */}
                    <Route path="/grades" element={<GradeList />} />
                    <Route path="/add-grade" element={<AddGrade />} />
                    <Route path="/edit-grade/:id" element={<AddGrade />} />

                    {/* Teacher Routes */}
                    <Route path="/teachers" element={<ListTeachers />} />

                    {/* Default Route - Redirect to Dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
            <ToastContainer position="bottom-right" />
        </BrowserRouter>
    );
}

export default App;