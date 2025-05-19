import React, { useState } from 'react';
import GradeService from '../../services/GradeService';
import { useNavigate } from 'react-router-dom';
import '../forms/FormStyles.css';

const AddGrade = () => {
    const [gradeId, setGradeId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [score, setScore] = useState('');
    const [letterGrade, setLetterGrade] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const calculateGrade = (score) => {
        const numScore = parseFloat(score);
        if (isNaN(numScore)) return '';
        if (numScore >= 90) return 'A';
        if (numScore >= 80) return 'B';
        if (numScore >= 70) return 'C';
        if (numScore >= 60) return 'D';
        return 'F';
    };

    const handleScoreChange = (e) => {
        const newScore = e.target.value;
        setScore(newScore);
        setLetterGrade(calculateGrade(newScore));
    };

    const saveGrade = (e) => {
        e.preventDefault();
        setError('');

        if (!gradeId || !studentId || !courseId || !score) {
            setError('All fields are required');
            return;
        }

        const scoreValue = parseFloat(score);
        if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
            setError('Score must be a number between 0 and 100');
            return;
        }

        setIsSubmitting(true);
        const gradeData = {
            gradeId: gradeId,
            studentId: parseInt(studentId, 10),
            courseId: parseInt(courseId, 10),
            score: scoreValue,
            gradeValue: letterGrade
        };

        GradeService.createGrade(gradeData)
            .then(() => {
                navigate('/grades');
            })
            .catch((error) => {
                console.error('Error saving grade:', error);
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
                    <i className="fas fa-star me-2"></i>
                    Add Grade
                </h3>
            </div>
            <form onSubmit={saveGrade}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-id-card me-2"></i>
                        Grade ID
                    </label>
                    <input
                        type="text"
                        placeholder="Enter grade ID"
                        name="gradeId"
                        className="form-control"
                        value={gradeId}
                        onChange={(e) => setGradeId(e.target.value)}
                        required
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
                        <i className="fas fa-percentage me-2"></i>
                        Score
                    </label>
                    <input
                        type="number"
                        placeholder="Enter score (0-100)"
                        name="score"
                        className="form-control"
                        value={score}
                        onChange={handleScoreChange}
                        min="0"
                        max="100"
                        step="0.1"
                        required
                    />
                </div>
                {letterGrade && (
                    <div className="form-group">
                        <label className="form-label">
                            <i className="fas fa-graduation-cap me-2"></i>
                            Letter Grade
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={letterGrade}
                            readOnly
                            style={{
                                backgroundColor: '#f8f9fa',
                                fontWeight: 'bold',
                                color: letterGrade === 'A' ? '#28a745' :
                                    letterGrade === 'B' ? '#17a2b8' :
                                        letterGrade === 'C' ? '#ffc107' :
                                            letterGrade === 'D' ? '#fd7e14' :
                                                '#dc3545'
                            }}
                        />
                    </div>
                )}
                <div className="form-buttons">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/grades')}
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

export default AddGrade; 