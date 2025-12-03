import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AvailableOfficeHours from '../components/AvailableOfficeHours';
import MyQueueStatus from '../components/MyQueueStatus';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { requestNotificationPermission } from '../utils/notifications';

function StudentPage() {
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
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

        if (Notification.permission === 'granted') {
            setNotificationsEnabled(true);
        }
    }, [currentUser]);

    const handleEnableNotifications = async () => {
        const granted = await requestNotificationPermission();
        setNotificationsEnabled(granted);
        if (granted) {
            alert('Notifications enabled! You\'ll be notified when you\'re next in line.');
        } else {
            alert('Notifications were denied. Please enable them in your browser settings');
        }
    }

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
                {!notificationsEnabled && (
                    <button classname="enable-notifications-btn" onClick={handleEnableNotifications}>
                        Enable Notifications
                    </button>
                )}
                {notificationsEnabled && (
                    <span className="notification-status">Notification enabled</span>
                )}
                <MyQueueStatus studentName={studentName} />
                <AvailableOfficeHours studentName={studentName} />
            </div>
        </div>
    );
}

export default StudentPage;