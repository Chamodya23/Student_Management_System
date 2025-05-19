import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ListStudents = () => {

    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);


    const fetchStudents = () => {
        setLoading(true);
        StudentService.getAllStudents()
            .then((response) => {
                setStudent(response.data);
                setLoading(false);
            }).catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };


    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this student?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        StudentService.deleteStudent(id)
                            .then(() => {
                                fetchStudents();
                            }).catch((err) => {
                                setError(`Delete failed ${err.response?.data?.message || err.message}`);
                            });
                    }
                },

                {
                    label: 'No'
                }
            ]
        });
    };


    if (loading) {
        return <div className='text-center mt-4'>Loading...</div>
    }

    if (error) {
        return <div className='alert alert-danger mt-4'>Error: {error}</div>
    }

    //....................... Main componenet start .................

    return (
        <div className='container mt-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2>Student Management</h2>
                <button
                    className='btn btn-primary'
                    onClick={() => navigate('/add-student')}
                >
                    <i className="fas fa-plus me-2"></i>
                    Add Student
                </button>
            </div>

            <div className='table-responsive'>
                <table className='table table-striped table-bordered table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            {/* <th>Contact Number</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {student.map((std) => (
                            <tr key={std.id}>
                                <td>{std.id}</td>
                                <td>{std.firstName}</td>
                                <td>{std.lastName}</td>
                                <td>{std.email}</td>
                                {/* <td>{std.contactNumber}</td> */}
                                <td>
                                    <button
                                        className="btn btn-sm btn-info me-2"
                                        onClick={() => navigate(`/edit-student/${std.id}`)}
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(std.id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
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

export default ListStudents