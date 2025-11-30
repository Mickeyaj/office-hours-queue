import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

function AvailableOfficeHours() {
    const [officeHours, setOfficeHours] = useState([]);

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
                            <button className="join-queue-btn">
                                Join Queue
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AvailableOfficeHours;