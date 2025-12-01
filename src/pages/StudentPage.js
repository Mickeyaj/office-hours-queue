import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AvailableOfficeHours from '../components/AvailableOfficeHours';
import MyQueueStatus from '../components/MyQueueStatus';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function StudentPage() {
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchUserData() {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        setStudentName(userDoc.data().name);
                    }
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
                setLoading(false);
            }
        }
        fetchUserData();
    }, [currentUser]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="page-content">
                    <p>Loading</p>
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