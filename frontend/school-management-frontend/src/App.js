import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ListStudents from './components/students/ListStudents';
import StudentForm from './components/students/StudentForm';
import CourseList from './components/courses/CourseList';
import EnrollmentList from './components/enrollments/EnrollmentList';
import AttendanceList from './components/attendance/AttendanceList';
import GradeList from './components/grades/GradeList';
import ListTeachers from './components/teachers/ListTeachers';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<ListStudents />} />
                    <Route path="/add-student" element={<StudentForm />} />
                    <Route path="/edit-student/:id" element={<StudentForm />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/enrollments" element={<EnrollmentList />} />
                    <Route path="/attendance" element={<AttendanceList />} />
                    <Route path="/grades" element={<GradeList />} />
                    <Route path="/teachers" element={<ListTeachers />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App; 