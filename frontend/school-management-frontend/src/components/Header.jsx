import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand" >
                    <i className="fas fa-graduation-cap me-2"></i>
                    Admin Dashboard
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`}
                                to="/students"
                            >
                                <i className="fas fa-user-graduate me-1"></i>
                                Students
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}
                                to="/courses"
                            >
                                <i className="fas fa-book me-1"></i>
                                Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/enrollments' ? 'active' : ''}`}
                                to="/enrollments"
                            >
                                <i className="fas fa-user-plus me-1"></i>
                                Enrollments
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/attendance' ? 'active' : ''}`}
                                to="/attendance"
                            >
                                <i className="fas fa-calendar-check me-1"></i>
                                Attendance
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/grades' ? 'active' : ''}`}
                                to="/grades"
                            >
                                <i className="fas fa-chart-bar me-1"></i>
                                Grades
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;