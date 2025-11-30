import React from 'react';
import CreateOfficeHours from '../components/CreateOfficeHours';
import OfficeHoursList from '../components/OfficeHoursList';

function ProfessorPage() {
    return (
        <div>
            <h1>Professor Dashboard</h1>
            <CreateOfficeHours />
            <hr />
            <OfficeHoursList />
        </div>
    );
}

export default ProfessorPage;