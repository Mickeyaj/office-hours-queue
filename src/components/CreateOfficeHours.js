import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function CreateOfficeHours() {
    const [professorName, setProfessorName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('Monday');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'officeHours'), {
                professorName,
                courseName,
                dayOfWeek,
                startTime,
                endTime,
                status: 'active',
                createdAt: new Date()
            });

            console.log('Office hours created with ID:', docRef.id);
            alert('Office hours created successfully');

            setProfessorName('');
            setCourseName('');
            setDayOfWeek('Monday');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error creating office hours:', error);
            alert('Error creating office hours. Check console');
        }
    };

    return (
        <div className="create-office-hours">
            <h2>Create Office Hours</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Professor Name:</label>
                    <input type="text" value={professorName} onChange={(e) => setProfessorName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Course Name:</label>
                    <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g., CS 121" required />
                </div>
                <div className="form-group">
                    <label>Day of Week:</label>
                    <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>

                <button type="submit" className="submit-btn">Create Office Hours</button>
            </form>
        </div>
    );
}

export default CreateOfficeHours;
