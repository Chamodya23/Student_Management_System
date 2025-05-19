import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceService from '../../services/AttendanceService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const response = await AttendanceService.getAllAttendance();
            setAttendance(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch attendance records');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this attendance record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await AttendanceService.deleteAttendance(id);
                            fetchAttendance();
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

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Present': 'bg-success',
            'Absent': 'bg-danger',
            'Late': 'bg-warning',
            'Excused': 'bg-info'
        };

        return (
            <span className={`badge ${statusClasses[status] || 'bg-secondary'} text-white`}>
                {status}
            </span>
        );
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
                <h2>Attendance Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/add-attendance')}
                >
                    <i className="fas fa-plus me-2"></i>
                    Add Attendance
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Course ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.studentId}</td>
                                <td>{record.courseId}</td>
                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                <td>{getStatusBadge(record.status)}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-attendance/${record.id}`)}
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(record.id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {attendance.length === 0 && (
                    <div className="alert alert-info mt-3">No attendance records found</div>
                )}
            </div>
        </div>
    );
};

export default AttendanceList; 