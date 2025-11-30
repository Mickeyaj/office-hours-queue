import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Office Hours Queue System</h1>
            <p>Select your role to continue</p>

            <div className="role-selection">
                <button className="role-btn professor-btn" onClick={() => navigate('/professor/login')}>
                    <h2>Professor</h2>
                    <p>Create and manage office hours</p>
                </button>

                <button className="role-btn student-btn" onClick={() => navigate('/student/login')}>
                    <h2>Student</h2>
                    <p>Join office hours queue</p>
                </button>
            </div>
        </div>
    );
}

export default Home;