import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    }

    if (!currentUser) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h2>Office Hours Queue</h2>
                <div className="navbar-right">
                    <span className="user-email">{currentUser.email}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;