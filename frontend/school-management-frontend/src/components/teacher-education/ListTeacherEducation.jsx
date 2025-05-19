import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherEducationService from '../../services/TeacherEducationService';
import TeacherService from '../../services/TeacherService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ListTeacherEducation = () => {
    const [educations, setEducations] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch both educations and teachers in parallel
            const [educationsResponse, teachersResponse] = await Promise.all([
                TeacherEducationService.getAllTeacherEducation(),
                TeacherService.getAllTeachers()
            ]);

            setEducations(educationsResponse.data);
            setTeachers(teachersResponse.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getTeacherName = (teacherId) => {
        if (!teacherId) return 'No Teacher Assigned';
        
        const teacher = teachers.find(t => t.id === teacherId);
        return teacher 
            ? `${teacher.firstName} ${teacher.lastName || ''}`.trim()
            : `Teacher ID: ${teacherId}`;
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this education record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        TeacherEducationService.deleteTeacherEducation(id)
                            .then(() => {
                                fetchData();
                            })
                            .catch(err => {
                                setError(`Delete failed: ${err.response?.data?.message || err.message}`);
                            });
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Teacher Education Management</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/add-teacher-education')}
                >
                    Add Education
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Qualification</th>
                            <th>Major Subject</th>
                            <th>Institute</th>
                            <th>Passing Year</th>
                            <th>Teacher</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educations.map(edu => (
                            <tr key={edu.id}>
                                <td>{edu.id}</td>
                                <td>{edu.qualification}</td>
                                <td>{edu.majorSubject}</td>
                                <td>{edu.instituteName}</td>
                                <td>{edu.passingYear}</td>
                                <td>{getTeacherName(edu.teacherId)}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-teacher-education/${edu.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(edu.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTeacherEducation;