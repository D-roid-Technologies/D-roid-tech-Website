import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';

const Dashboard: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBeforeUnload = (e: PopStateEvent) => {
            // If the user tries to go back from /dashboard, prevent it
            if (location.pathname === '/auth/dashboard') {
                navigate('/auth/dashboard', { replace: true });
            }
        };

        window.addEventListener('popstate', handleBeforeUnload);
        return () => window.removeEventListener('popstate', handleBeforeUnload);
    }, [location.pathname, navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9F9F9' }}>
            <DashboardHeader />
            <DashboardContent />
        </div>
    );
};

export default Dashboard;
