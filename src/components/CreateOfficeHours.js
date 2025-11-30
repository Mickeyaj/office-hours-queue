import React, { useState } from 'react';

function CreateOfficeHours() {
    const [professorName, setProfessorName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('Monday');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            professorName,
            courseName,
            dayOfWeek,
            startTime,
            endTime
        });

        setProfessorName('');
        setCourseName('');
        setDayOfWeek('Monday');
        setStartTime('');
        setEndTime('');
    };

    return (
        <div>
            <h2>Create Office Hours</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Professor Name:</label>
                    <input type="text" value={professorName} onChange={(e) => setProfessorName(e.target.value)} required />
                </div>
                <div>
                    <label>Course Name:</label>
                    <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g., CS 121" required />
                </div>
                <div>
                    <label>Day of Week:</label>
                    <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                </div>
                <div>
                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>

                <button type="submit">Create Office Hours</button>
            </form>
        </div>
    );
}

export default CreateOfficeHours;
