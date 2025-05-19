import React, { useState } from 'react';
import CourseService from '../../services/CourseService';
import { useNavigate } from 'react-router-dom';
import '../forms/FormStyles.css';

const AddCourse = () => {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [credits, setCredits] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const saveCourse = (e) => {
        e.preventDefault();
        setError('');

        if (!courseId || !courseName || !credits) {
            setError('All fields are required');
            return;
        }

        setIsSubmitting(true);
        const course = {
            courseId: parseInt(courseId, 10),
            courseName: courseName,
            credits: parseInt(credits, 10)
        };

        CourseService.createCourse(course)
            .then(() => {
                navigate('/courses');
            })
            .catch((error) => {
                console.error('Error saving course:', error);
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
                    <i className="fas fa-book me-2"></i>
                    Add Course
                </h3>
            </div>
            <form onSubmit={saveCourse}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-hashtag me-2"></i>
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
                        <i className="fas fa-book-open me-2"></i>
                        Course Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter course name"
                        name="courseName"
                        className="form-control"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-star me-2"></i>
                        Credits
                    </label>
                    <input
                        type="number"
                        placeholder="Enter number of credits"
                        name="credits"
                        className="form-control"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/courses')}
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

export default AddCourse;
