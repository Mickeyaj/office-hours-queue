import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';

function Queue({ officeHourId }) {
    const [queuedStudents, setQueuedStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [note, setNote] = useState('');

    useEffect(() => {
        console.log('Fetching queue for office hour ID:', officeHourId);
        const q = query(
            collection(db, 'queues'),
            where('officeHourId', '==', officeHourId.trim()),
            orderBy('joinedAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const students = [];
            snapshot.forEach((doc) => {
                students.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setQueuedStudents(students);
            console.log('Queue for office hour:', officeHourId, 'students:', students);
        });
        return () => unsubscribe();
    }, [officeHourId]);

    const handleCallNext = async (studentId) => {
        try {
            const { doc, deleteDoc } = await import('firebase/firestore');
            await deleteDoc(doc(db, 'queues', studentId));
            console.log('Called next student, removed from queue');
            setSelectedStudent(null);
            setNote('');
        } catch (error) {
            console.error('Failed to call next student:', error);
            alert('Error removing student from queue');
        }
    };

    const handleAddNote = async (studentId) => {
        if(!note.trim()) {
            alert('Please enter a note');
            return;
        }
        try {
            await updateDoc(doc(db, 'queues', studentId), {
                professorNote: note,
                noteAddedAt: new Date()
            });

            alert('Note added successfullY!');
            setNote('');
            setSelectedStudent(null);
        } catch (error) {
            console.error('Error in adding note', error);
            alert('Failed to add note. Please try again');
        }
    };

    return (
        <div className="queue-section">
            <h4>Queue</h4>
            {queuedStudents.length === 0 ? (
                <p>No students in queue yet.</p>
            ) : (
                <div className="queue-list">
                    {queuedStudents.map((student, index) => (
                        <div key={student.id} className="queue-item">
                            <div className="student-info">
                                <span className="position">#{index + 1}</span>
                                <div>
                                    <p className="student-name">{student.studentName}</p>
                                    {student.reason && <p className="student-reason">Reason: {student.reason}</p>}
                                    {student.professorNote && (
                                        <p className="profesor-note">
                                            <strong>Note:</strong> {student.professorNote}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="queue-actions">
                                {index === 0 && (
                                    <>
                                        <button className="add-note-btn" onClick={() => setSelectedStudent(student.id)}>Add Note</button>
                                        <button className="next-btn" onClick={() => handleCallNext(student.id)}>Call Next</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedStudent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add Note for Student</h3>
                        <div className="form-group">
                            <label>Professor Note:</label>
                            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="4" />
                        </div>
                        <div className="modal-actions">
                            <button className="submit-btn" onClick={() => handleAddNote(selectedStudent)}>
                                Save Note
                            </button>
                            <button className="cancel-btn" onClick={() => {
                                setSelectedStudent(null);
                                setNote('');
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Queue;