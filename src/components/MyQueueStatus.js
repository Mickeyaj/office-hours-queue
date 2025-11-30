import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

function MyQueueStatus({ studentName }) {
    const [myQueue, setMyQueue] = useState(null);
    const [position, setPosition] = useState(0);
    const [officeHourInfo, setOfficeHourInfo] = useState(null);

    useEffect(() => {
        if (!studentName) return;

        const q = query(
            collection(db, 'queues'),
            where('studentName', '==', studentName),
            where('status', '==', 'waiting')
        );

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                setMyQueue(null);
                setPosition(0);
                setOfficeHourInfo(null);
                return;
            }
            const queueData = {
                id: snapshot.docs[0].id,
                ...snapshot.docs[0].data()
            };
            setMyQueue(queueData);

            const officeHourDoc = await import('firebase/firestore').then(module =>
                module.getDoc(module.doc(db, 'officeHours', queueData.officeHourId))
            );

            if (officeHourDoc.exists()) {
                setOfficeHourInfo(officeHourDoc.data());
            }

            const allInQueue = query(
                collection(db, 'queues'),
                where('officeHourId', '==', queueData.officeHourId),
                where('status', '==', 'waiting')
            );

            onSnapshot(allInQueue, (queueSnapshot) => {
                const students = [];
                queueSnapshot.forEach((doc) => {
                    students.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                students.sort((a, b) => a.joinedAt.toDate() - b.joinedAt.toDate());
                const myPosition = students.findIndex(s => s.id === queueData.id) + 1;
                setPosition(myPosition);
            });
        });

        return () => unsubscribe();
    }, [studentName]);

    const handleLeaveQueue = async () => {
        if (!myQueue) return;

        const confirmLeave = window.confirm('Are you sure you want to leave the queue?');
        if (!confirmLeave) return;

        try {
            await deleteDoc(doc(db, 'queues', myQueue.id));
            alert('You have left the queue');
        } catch (error) {
            console.error('Error leaving the queue', error);
            alert('Error in leaving the queue. Please try again');
        }
    };

    if (!myQueue) {
        return null;
    }

    return (
        <div className="my-queue-status">
            <h3>Your Queue Status</h3>
            <div className="queue-status-card">
                <div className="status-info">
                    <p className="position-display">PositionL <strong>#{position}</strong></p>
                    {officeHourInfo && (
                        <>
                            <p><strong>Course:</strong> {officeHourInfo.courseName}</p>
                            <p><strong>Professor:</strong> {officeHourInfo.professorName}</p>
                            <p><strong>Time:</strong> {officeHourInfo.startTime} - {officeHourInfo.endTime}</p>
                        </>
                    )}
                    {myQueue.reason && (
                        <p><strong>Your reason:</strong> {myQueue.reason}</p>
                    )}
                </div>
                <button className="leave-queue-btn" onClick={handleLeaveQueue}>
                    Leave Queue
                </button>
            </div>
        </div>
    );
}

export default MyQueueStatus;