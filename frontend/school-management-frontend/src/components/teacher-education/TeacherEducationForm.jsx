import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherEducationService from '../../services/TeacherEducationService';
import TeacherService from '../../services/TeacherService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherEducationForm = () => {
    const [formData, setFormData] = useState({
        qualification: '',
        majorSubject: '',
        instituteName: '',
        passingYear: '',
        teacherId: ''
    });
    const [teachers, setTeachers] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchTeachers();
        if (id) {
            TeacherEducationService.getTeacherEducationById(id)
                .then(response => {
                    const education = response.data;
                    setFormData({
                        qualification: education.qualification,
                        majorSubject: education.majorSubject,
                        instituteName: education.instituteName,
                        passingYear: education.passingYear,
                        teacherId: education.teacherId || ''
                    });
                })
                .catch(err => {
                    toast.error(`Failed to load education: ${err.message}`);
                    navigate('/teacher-education');
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
        if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
        if (!formData.majorSubject.trim()) newErrors.majorSubject = 'Major subject is required';
        if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
        if (!formData.passingYear) newErrors.passingYear = 'Passing year is required';
        if (!formData.teacherId) newErrors.teacherId = 'Teacher is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const educationData = {
            qualification: formData.qualification,
            majorSubject: formData.majorSubject,
            instituteName: formData.instituteName,
            passingYear: formData.passingYear,
            teacherId: formData.teacherId
        };

        const operation = id 
            ? TeacherEducationService.updateTeacherEducation(id, educationData)
            : TeacherEducationService.createTeacherEducation(educationData);

        operation.then(() => {
            toast.success(`Education ${id ? 'updated' : 'created'} successfully!`);
            navigate('/teacher-education');
        })
        .catch(err => {
            toast.error(`Operation failed: ${err.response?.data?.message || err.message}`);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">
                                {id ? 'Edit Teacher Education' : 'Add Teacher Education'}
                            </h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Qualification</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.qualification ? 'is-invalid' : ''}`}
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                    />
                                    {errors.qualification && (
                                        <div className="invalid-feedback">{errors.qualification}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Major Subject</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.majorSubject ? 'is-invalid' : ''}`}
                                        name="majorSubject"
                                        value={formData.majorSubject}
                                        onChange={handleChange}
                                    />
                                    {errors.majorSubject && (
                                        <div className="invalid-feedback">{errors.majorSubject}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Institute Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.instituteName ? 'is-invalid' : ''}`}
                                        name="instituteName"
                                        value={formData.instituteName}
                                        onChange={handleChange}
                                    />
                                    {errors.instituteName && (
                                        <div className="invalid-feedback">{errors.instituteName}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Passing Year</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.passingYear ? 'is-invalid' : ''}`}
                                        name="passingYear"
                                        value={formData.passingYear}
                                        onChange={handleChange}
                                        // min="1900"
                                        // max={new Date().getFullYear()}
                                    />
                                    {errors.passingYear && (
                                        <div className="invalid-feedback">{errors.passingYear}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Teacher</label>
                                    <select
                                        className={`form-select ${errors.teacherId ? 'is-invalid' : ''}`}
                                        name="teacherId"
                                        value={formData.teacherId}
                                        onChange={handleChange}
                                        disabled={loadingTeachers}
                                    >
                                        <option value="">Select Teacher</option>
                                        {teachers.map(teacher => (
                                            <option key={teacher.id} value={teacher.id}>
                                                {teacher.firstName} {teacher.lastName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.teacherId && (
                                        <div className="invalid-feedback">{errors.teacherId}</div>
                                    )}
                                    {loadingTeachers && (
                                        <div className="mt-2 text-muted">Loading teachers...</div>
                                    )}
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-md-2"
                                        onClick={() => navigate('/teacher-education')}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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

export default TeacherEducationForm;