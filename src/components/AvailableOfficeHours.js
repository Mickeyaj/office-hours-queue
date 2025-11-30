import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where, addDoc } from 'firebase/firestore';

function AvailableOfficeHours() {
    const [officeHours, setOfficeHours] = useState([]);
    const [selectedOfficeHour, setSelectedOfficeHour] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        const q = query(
            collection(db, 'officeHours'),
            where('status', '==', 'active')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const hours = [];
            snapshot.forEach((doc) => {
                hours.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setOfficeHours(hours);
        });

        return () => unsubscribe();
    }, []);

    const handleJoinQueue = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'queues'), {
                officeHourId: selectedOfficeHour.id,
                studentName: studentName,
                reason: reason,
                joinedAt: new Date(),
                status: 'waiting'
            });
            alert('Successfully joined the queue!');

            setStudentName('');
            setReason('');
            setSelectedOfficeHour(null);
        } catch (error) {
            console.error('Error joining queue', error);
            alert('Error joining queue. Please try again');
        }
    };

    const handleCancelJoin = () => {
        setStudentName('');
        setReason('');
        setSelectedOfficeHour(null);
    };

    return (
        <div className="available-office-hours">
            <h2>Available Office Hours</h2>
            {officeHours.length === 0 ? (
                <p className="no-hours">No office hours available right now</p>
            ) : (
                <div className="office-hours-grid">
                    {officeHours.map((hour) => (
                        <div key={hour.id} className="office-hour-card-student">
                            <h3>{hour.courseName}</h3>
                            <p><strong>Professor:</strong> {hour.professorName}</p>
                            <p><strong>Day:</strong> {hour.dayOfWeek}</p>
                            <p><strong>Time: </strong>{hour.startTime} - {hour.endTime}</p>
                            <button className="join-queue-btn" onClick={() => setSelectedOfficeHour(hour)}>
                                Join Queue
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedOfficeHour && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Join queue for {selectedOfficeHour.professorName}</h3>
                        <form onSubmit={handleJoinQueue}>
                            <div className="form-group">
                                <label>Your Name:</label>
                                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Reason for visit (optional):</label>
                                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="3" />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="submit-btn">
                                    Join Queue
                                </button>
                                <button type="button" className="cancel-btn" onClick={handleCancelJoin}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AvailableOfficeHours;