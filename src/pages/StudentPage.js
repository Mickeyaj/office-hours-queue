import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AvailableOfficeHours from '../components/AvailableOfficeHours';
import MyQueueStatus from '../components/MyQueueStatus';

function StudentPage() {
    const [studentName, setStudentName] = useState('');
    const [isNameSet, setIsNameSet] = useState(false);

    const handleSetName = (e) => {
        e.preventDefault();
        if (studentName.trim()) {
            setIsNameSet(true);
        }
    }

    if (!isNameSet) {
        return (
            <div className="student-page">
                <h1>Student Dashboard</h1>
                <div className="name-entry">
                    <h3>Enter your name to continue:</h3>
                    <form onSubmit={handleSetName}>
                        <div className="form-group">
                            <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                        </div>
                        <button type="submit" className="submit-btn">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <div className="page-content">
                <h1>Welcome, {studentName}</h1>
                <MyQueueStatus studentName={studentName} />
                <AvailableOfficeHours studentName={studentName} />
            </div>
        </div>
    );
}

export default StudentPage;