import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { title: 'Total Students', value: '10', icon: 'fas fa-user-graduate', color: '#3498db' },
        { title: 'Total Courses', value: '5', icon: 'fas fa-book', color: '#2ecc71' },
    ];

    return (
        <div className="dashboard">
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
                        <div className="stat-icon" style={{ color: stat.color }}>
                            <i className={stat.icon}></i>
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h4>Recent Activities</h4>
                    <div className="activity-list">
                        <div className="activity-item">
                            <i className="fas fa-user-plus text-success"></i>
                            <div className="activity-info">
                                <p>New student enrolled</p>
                                <small>2 minutes ago</small>
                            </div>
                        </div>
                        <div className="activity-item">
                            <i className="fas fa-book text-primary"></i>
                            <div className="activity-info">
                                <p>New course added</p>
                                <small>1 hour ago</small>
                            </div>
                        </div>
                        <div className="activity-item">
                            <i className="fas fa-graduation-cap text-warning"></i>
                            <div className="activity-info">
                                <p>Grades updated</p>
                                <small>3 hours ago</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h4>Quick Actions</h4>
                    <div className="quick-actions">
                        <button
                            className="action-btn"
                            onClick={() => navigate('/add-student')}
                        >
                            <i className="fas fa-user-plus"></i>
                            Add Student
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => navigate('/add-course')}
                        >
                            <i className="fas fa-book"></i>
                            Add Course
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => navigate('/add-attendance')}
                        >
                            <i className="fas fa-calendar-check"></i>
                            Mark Attendance
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => navigate('/grades')}
                        >
                            <i className="fas fa-chart-bar"></i>
                            View Grades
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 