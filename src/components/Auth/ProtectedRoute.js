import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRoute({ children, role }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to={`/${role}/login`} />
    }

    return children
}

export default ProtectedRoute;