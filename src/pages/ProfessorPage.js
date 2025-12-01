import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CreateOfficeHours from '../components/CreateOfficeHours';
import OfficeHoursList from '../components/OfficeHoursList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProfessorPage() {
    const [professorName, setProfessorName] = useState('');
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchUserData() {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        setProfessorName(userDoc.data().name);
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
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="page-content">
                <h1>Professor Dashboard</h1>
                <CreateOfficeHours professorName={professorName} />
                <hr />
                <OfficeHoursList />
            </div>
        </div>
    );
}

export default ProfessorPage;