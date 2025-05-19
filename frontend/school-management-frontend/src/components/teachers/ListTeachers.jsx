import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherService from "../../services/TeacherService";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export const ListTeachers = () => {
    const [teachers, setTeachers] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await TeacherService.getAllTeachers();
            // Ensure response.data is an array
            setTeachers(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch teachers');
            setTeachers([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this teacher?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await TeacherService.deleteTeacher(id);
                            fetchTeachers();
                        } catch (err) {
                            setError(`Delete failed: ${err.response?.data?.message || err.message}`);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Teacher Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/teachers/add")}
                >
                    Add Teacher
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers?.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.id}</td>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-teacher/${teacher.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(teacher.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {teachers?.length === 0 && (
                    <div className="alert alert-info mt-3">No teachers found</div>
                )}
            </div>
        </div>
    );
};

export default ListTeachers;