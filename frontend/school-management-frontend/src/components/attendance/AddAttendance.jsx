import React, { useState, useEffect } from 'react';
import AttendanceService from '../../services/AttendanceService';
import { useNavigate } from 'react-router-dom';
import '../forms/FormStyles.css';

const AddAttendance = () => {
    const [attendanceId, setAttendanceId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('PRESENT');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Set default date to today when component mounts
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    const saveAttendance = (e) => {
        e.preventDefault();
        setError('');

        if (!attendanceId || !studentId || !courseId || !date) {
            setError('All fields are required');
            return;
        }

        setIsSubmitting(true);
        const attendance = {
            studentId: parseInt(studentId, 10),
            courseId: parseInt(courseId, 10),
            date: date,
            status: status
        };

        AttendanceService.createAttendance(attendance)
            .then(() => {
                navigate('/attendance');
            })
            .catch((error) => {
                console.error('Error saving attendance:', error);
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
                    <i className="fas fa-calendar-plus me-2"></i>
                    Add Attendance
                </h3>
            </div>
            <form onSubmit={saveAttendance}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-id-card me-2"></i>
                        Attendance ID
                    </label>
                    <input
                        type="text"
                        placeholder="Enter attendance ID"
                        name="attendanceId"
                        className="form-control"
                        value={attendanceId}
                        onChange={(e) => setAttendanceId(e.target.value)}
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
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <i className="fas fa-check-circle me-2"></i>
                        Status
                    </label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="PRESENT">Present</option>
                        <option value="ABSENT">Absent</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/attendance')}
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

export default AddAttendance;