import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherService from '../../services/TeacherService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            TeacherService.getTeacherById(id)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((err) => {
                    toast.error(`Failed to load teacher: ${err.message}`);
                    navigate('/teachers');
                });
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const operation = id
            ? TeacherService.updateTeacher(id, formData)
            : TeacherService.createTeacher(formData);

        operation
            .then(() => {
                toast.success(`Teacher ${id ? 'updated' : 'created'} successfully`);
                navigate('/teachers');
            })
            .catch((err) => {
                toast.error(`Operation failed: ${err.response?.data?.message || err.message}`);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card shadow'>
                        <div className='card-header bg-primary text-white'>
                            <h3 className='mb-0'>
                                {id ? 'Edit Teacher' : 'Add New Teacher'}
                            </h3>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>First Name</label>
                                    <input
                                        type='text'
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder='Enter first name'
                                    />
                                    {errors.firstName && (
                                        <div className='invalid-feedback'>
                                            {errors.firstName}
                                        </div>
                                    )}
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>Last Name</label>
                                    <input
                                        type='text'
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder='Enter last name'
                                    />
                                    {errors.lastName && (
                                        <div className='invalid-feedback'>
                                            {errors.lastName}
                                        </div>
                                    )}
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Enter email address'
                                    />
                                    {errors.email && (
                                        <div className='invalid-feedback'>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                    <button
                                        type='button'
                                        className='btn btn-secondary me-md-2'
                                        onClick={() => navigate('/teachers')}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
                                        ) : (
                                            id ? 'Update' : 'Save'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherForm;