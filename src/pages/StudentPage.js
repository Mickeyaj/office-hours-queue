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
            console.log('Fetching user data, currentUser:', currentUser);
            if (currentUser) {
                console.log('YOUR USER ID:', currentUser.uid);
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    console.log('User doc exists?', userDoc.exists());
                    if (userDoc.exists()) {
                        console.log('User data', userDoc.data());
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

    console.log('StudentPage - studentName', studentName, 'loading:', loading);

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