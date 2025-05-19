import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/CourseService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await CourseService.getAllCourses();
            setCourses(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this course?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await CourseService.deleteCourse(id);
                            fetchCourses();
                        } catch (err) {
                            setError(`Delete failed: ${err.response?.data?.message || err.message}`);
                        }
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-4">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Course Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/add-course')}
                >
                    <i className="fas fa-plus me-2"></i>
                    Add Course
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Credits</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.credits}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-course/${course.id}`)}
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(course.id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {courses.length === 0 && (
                    <div className="alert alert-info mt-3">No courses found</div>
                )}
            </div>
        </div>
    );
};

export default CourseList; 