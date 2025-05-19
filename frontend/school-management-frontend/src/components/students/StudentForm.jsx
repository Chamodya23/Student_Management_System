import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import TeacherService from '../../services/TeacherService';
import TeacherEducationService from '../../services/TeacherEducationService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../forms/FormStyles.css';

const StudentForm = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        teacherId: '',
        teacherEducationId: ''
    });


    const [teachers, setTeachers] = useState([]);
    const [educations, setEducations] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [loadingEducations, setLoadingEducations] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchTeachers();
        if (id) {
            StudentService.getStudenById(id)
                .then(response => {
                    const student = response.data;
                    setFormData({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        email: student.email,
                        teacherId: student.teacher?.id || '',
                        teacherEducationId: student.teacherEducation?.id || ''
                    });
                    if (student.teacher?.id) {
                        fetchEducations(student.teacher.id);
                    }
                })
                .catch(err => {
                    toast.error(`Failed to load student: ${err.message}`);
                    navigate('/students');
                });
        }
    }, [id, navigate]);

    const fetchTeachers = () => {
        setLoadingTeachers(true);
        TeacherService.getAllTeachers()
            .then(response => {
                setTeachers(response.data);
                setLoadingTeachers(false);
            })
            .catch(err => {
                toast.error(`Failed to load teachers: ${err.message}`);
                setLoadingTeachers(false);
            });
    };

    const fetchEducations = (teacherId) => {
        if (!teacherId) {
            setEducations([]);
            return;
        }
        setLoadingEducations(true);
        TeacherEducationService.getTeacherEducationsByTeacher(teacherId)
            .then(response => {
                setEducations(response.data);
                setLoadingEducations(false);
            })
            .catch(err => {
                toast.error(`Failed to load educations: ${err.message}`);
                setLoadingEducations(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'teacherId') {
            fetchEducations(value);
            setFormData(prev => ({
                ...prev,
                teacherEducationId: ''
            }));
        }

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
        const studentData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            teacherId: formData.teacherId || null,
            teacherEducationId: formData.teacherEducationId || null
        };

        const operation = id
            ? StudentService.updateStudent(id, studentData)
            : StudentService.createStudent(studentData);

        operation.then(() => {
            toast.success(`Student ${id ? 'updated' : 'created'} successfully!`);
            navigate('/students');
        })
            .catch(err => {
                toast.error(`Operation failed: ${err.response?.data?.message || err.message}`);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h3>
                    <i className={`fas ${id ? 'fa-edit' : 'fa-user-plus'} me-2`}></i>
                    {id ? 'Edit Student' : 'Add New Student'}
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-user me-2"></i>
                        First Name
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                    />
                    {errors.firstName && (
                        <div className="invalid-feedback">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.firstName}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-user me-2"></i>
                        Last Name
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                    />
                    {errors.lastName && (
                        <div className="invalid-feedback">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.lastName}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-envelope me-2"></i>
                        Email
                    </label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-phone me-2"></i>
                        Contact Number
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.contactnumber ? 'is-invalid' : ''}`}
                        name="contactnumber"
                        value={formData.contactnumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                    />
                    {errors.contactnumber && (
                        <div className="invalid-feedback">
                            <i className="fas fa-exclamation-circle me-1"></i>
                            {errors.contactnumber}
                        </div>
                    )}
                </div> */}

                <div className="form-buttons">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/students')}
                        disabled={isSubmitting}
                    >
                        <i className="fas fa-times me-2"></i>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-spinner fa-spin me-2"></i>
                                {id ? 'Updating...' : 'Saving...'}
                            </>
                        ) : (
                            <>
                                <i className={`fas ${id ? 'fa-save' : 'fa-plus'} me-2`}></i>
                                {id ? 'Update' : 'Save'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
