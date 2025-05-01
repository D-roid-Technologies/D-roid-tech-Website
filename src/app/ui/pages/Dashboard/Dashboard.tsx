import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';

const Dashboard: React.FunctionComponent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9F9F9' }}>
            {/* Header */}
            <DashboardHeader />

            {/* Dashboard Content */}
            <DashboardContent />
        </div>
    );
};

export default Dashboard;