import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnrollmentService from '../../services/EnrollmentService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EnrollmentList = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await EnrollmentService.getAllEnrollments();
            setEnrollments(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch enrollments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this enrollment?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await EnrollmentService.deleteEnrollment(id);
                            fetchEnrollments();
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
                <h2>Enrollment Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/add-enrollment')}
                >
                    <i className="fas fa-plus me-2"></i>
                    Add Enrollment
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Course ID</th>
                            <th>Enrollment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment) => (
                            <tr key={enrollment.id}>
                                <td>{enrollment.id}</td>
                                <td>{enrollment.studentId}</td>
                                <td>{enrollment.courseId}</td>
                                <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-enrollment/${enrollment.id}`)}
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(enrollment.id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {enrollments.length === 0 && (
                    <div className="alert alert-info mt-3">No enrollments found</div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentList; 