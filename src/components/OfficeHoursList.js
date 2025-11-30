import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Queue from './Queue';

function OfficeHoursList () {
    const [officeHours, setOfficeHours] = useState([]);
    const [selectedOfficeHour, setSelectedOfficeHour] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'officeHours'), (snapshot) => {
            const hoursData = [];
            snapshot.forEach((doc) => {
                hoursData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setOfficeHours(hoursData);
            console.log('Fetched office hours:', hoursData);
        });

        return () => unsubscribe();
    }, []);

    const handleViewQueue = (officeHourId) => {
        if (selectedOfficeHour === officeHourId) {
            setSelectedOfficeHour(null);
        } else {
            setSelectedOfficeHour(officeHourId);
        }
    };

    return (
        <div className="office-hours-list">
            <h2>My Office Hours</h2>
            {officeHours.length === 0 ? (
                <p className="no-hours">No office hours created yet</p>
            ) : (
                <div>
                    {officeHours.map((hour) => (
                        <div key={hour.id} className="office-hour-card">
                            <h3>{hour.courseName}</h3>
                            <p><strong>Professor: </strong> {hour.professorName}</p>
                            <p><strong>Day:</strong> {hour.dayOfWeek}</p>
                            <p><strong>Time:</strong> {hour.startTime} - {hour.endTime}</p>
                            <p><strong>Status:</strong> <span className={`status-${hour.status}`}>{hour.status}</span></p>

                            <button onClick={() => handleViewQueue(hour.id)} className="view-queue-btn">
                                {selectedOfficeHour === hour.id ? 'Hide Queue' : 'View Queue'}
                            </button>

                            {selectedOfficeHour === hour.id && (
                                <Queue officeHourId={hour.id} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OfficeHoursList;