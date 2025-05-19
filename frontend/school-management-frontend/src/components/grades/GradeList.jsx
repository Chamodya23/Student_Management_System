import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GradeService from '../../services/GradeService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const grade = [
        { id: 1, studentId: 1, courseId: 1, score: 90, grade: "A" },
        { id: 2, studentId: 2, courseId: 2, score: 50, grade: "F" },
    ];

const GradeList = () => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            setLoading(true);
            const response = await GradeService.getAllGrades();
            setGrades(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch grades');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this grade?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await GradeService.deleteGrade(id);
                            fetchGrades();
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

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A':
                return 'text-success';
            case 'B':
                return 'text-primary';
            case 'C':
                return 'text-warning';
            case 'D':
            case 'F':
                return 'text-danger';
            default:
                return '';
        }
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
                <h2>Grade Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/add-grade')}
                >
                    <i className="fas fa-plus me-2"></i>
                    Add Grade
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Course ID</th>
                            <th>Score</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade) => (
                            <tr key={grade.id}>
                                <td>{grade.id}</td>
                                <td>{grade.studentId}</td>
                                <td>{grade.courseId}</td>
                                <td>{grade.score}</td>
                                <td className={getGradeColor(grade.grade)}>
                                    <strong>{grade.grade}</strong>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-grade/${grade.id}`)}
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(grade.id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {grades.length === 0 && (
                    <div className="alert alert-info mt-3">No grades found</div>
                )}
            </div>
        </div>
    );
};

export default GradeList; 