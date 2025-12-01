import React from 'react';
import Navbar from '../components/Navbar';
import CreateOfficeHours from '../components/CreateOfficeHours';
import OfficeHoursList from '../components/OfficeHoursList';

function ProfessorPage() {
    return (
        <div>
            <Navbar />
            <div className="page-content">
                <h1>Professor Dashboard</h1>
                <CreateOfficeHours />
                <hr />
                <OfficeHoursList />
            </div>
        </div>
    );
}

export default ProfessorPage;