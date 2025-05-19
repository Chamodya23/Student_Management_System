import React, { useState, useEffect } from 'react';
import EnrollmentService from '../../services/EnrollmentService';
import { useNavigate } from 'react-router-dom';
import '../forms/FormStyles.css';

const AddEnrollment = () => {
    const [enrollmentId, setEnrollmentId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [enrollmentDate, setEnrollmentDate] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Set default date to today when component mounts
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setEnrollmentDate(today);
    }, []);

    const saveEnrollment = (e) => {
        e.preventDefault();
        setError('');

        if (!enrollmentId || !studentId || !courseId || !enrollmentDate) {
            setError('All fields are required');
            return;
        }

        setIsSubmitting(true);
        const enrollment = {
            studentId: parseInt(studentId, 10),
            courseId: parseInt(courseId, 10),
            enrollmentDate: enrollmentDate
        };

        EnrollmentService.createEnrollment(enrollment)
            .then(() => {
                navigate('/enrollments');
            })
            .catch((error) => {
                console.error('Error saving enrollment:', error);
                if (error.response) {
                    setError(`Server error: ${error.response.data?.message || error.response.status}`);
                } else if (error.request) {
                    setError('No response from server. Please check your network connection.');
                } else {
                    setError(`Error: ${error.message}`);
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h3>
                    <i className="fas fa-user-plus me-2"></i>
                    Add Enrollment
                </h3>
            </div>
            <form onSubmit={saveEnrollment}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-id-card me-2"></i>
                        Enrollment ID
                    </label>
                    <input
                        type="text"
                        placeholder="Enter enrollment ID"
                        name="enrollmentId"
                        className="form-control"
                        value={enrollmentId}
                        onChange={(e) => setEnrollmentId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-user-graduate me-2"></i>
                        Student ID
                    </label>
                    <input
                        type="number"
                        placeholder="Enter student ID"
                        name="studentId"
                        className="form-control"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-book me-2"></i>
                        Course ID
                    </label>
                    <input
                        type="number"
                        placeholder="Enter course ID"
                        name="courseId"
                        className="form-control"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-calendar me-2"></i>
                        Enrollment Date
                    </label>
                    <input
                        type="date"
                        name="enrollmentDate"
                        className="form-control"
                        value={enrollmentDate}
                        onChange={(e) => setEnrollmentDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/enrollments')}
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
                                Saving...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save me-2"></i>
                                Save
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEnrollment; 