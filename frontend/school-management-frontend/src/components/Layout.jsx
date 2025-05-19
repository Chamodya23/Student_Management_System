import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
        { path: '/students', icon: 'fas fa-user-graduate', label: 'Students' },
        { path: '/courses', icon: 'fas fa-book', label: 'Courses' },
        { path: '/enrollments', icon: 'fas fa-user-plus', label: 'Enrollments' },
        { path: '/attendance', icon: 'fas fa-calendar-check', label: 'Attendance' },
        { path: '/grades', icon: 'fas fa-chart-bar', label: 'Grades' },
       
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <i className="fas fa-graduation-cap"></i>
                    <h3>Admin Dashboard</h3>
                </div>
                <div className="sidebar-search">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout; 