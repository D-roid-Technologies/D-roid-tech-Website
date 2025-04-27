// @ts-nocheck

import React from 'react';
import { FaUsers, FaCheckCircle, FaExclamationCircle, FaFileAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store'; // adjust this import based on where your store is configured
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../routes/Index';
import { FaUser, FaTasks, FaBullhorn, FaCalendarAlt, FaFileInvoiceDollar, FaUserPlus, FaCommentDots, FaChalkboardTeacher, FaChartLine, FaBookOpen } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';

const Dashboard: React.FunctionComponent = () => {

    const menuItems = [
        { label: 'Personal Details', icon: FaUser, onClick: () => console.log('Personal Details') },
        { label: 'Tasks', icon: FaTasks, onClick: () => console.log('Tasks') },
        { label: 'Announcements', icon: FaBullhorn, onClick: () => console.log('Announcements') },
        { label: 'Schedules', icon: FaCalendarAlt, onClick: () => console.log('Schedules') },
        { label: 'Payslips', icon: FaFileInvoiceDollar, onClick: () => console.log('Payslips') },
        { label: 'Onboarding', icon: FaUserPlus, onClick: () => console.log('Onboarding') },
        { label: 'Say It', icon: FaCommentDots, onClick: () => console.log('Say It') },
        { label: 'Training', icon: FaChalkboardTeacher, onClick: () => console.log('Training') },
        { label: 'Progressions', icon: FaChartLine, onClick: () => console.log('Progressions') },
        { label: 'Resource', icon: FaBookOpen, onClick: () => console.log('Resource') },
    ];

    const navigate = useNavigate();

    // Fetch user data from Redux store
    const staffDetails = useSelector((state: RootState) => state.user);

    // Static data for now (tasks, announcements, schedule)
    const tasks = [
        { id: 1, name: 'Task 1', status: 'Completed' },
        { id: 2, name: 'Task 2', status: 'Ongoing' },
        { id: 3, name: 'Task 3', status: 'Not Started' },
    ];

    const announcements = [
        { id: 1, title: 'New Staff Training', message: 'Mandatory training next week' },
        { id: 2, title: 'Office Closed', message: 'Office will be closed on Friday for a holiday' },
    ];

    const schedule = {
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        leave: {
            approved: ['Monday', 'Wednesday'],
            awaiting: ['Friday'],
        },
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate(RoutePaths.JoinOurCommunity);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9F9F9' }}>
            {/* Header */}
            <div
                style={{
                    backgroundColor: '#071D6A',
                    color: '#FFFFFF',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h2 style={{ fontWeight: '800' }}>D'roid Dashboard</h2>
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        color: '#071D6A',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '800',
                        fontSize: '18px',
                        cursor: 'pointer',
                    }}
                >
                    {`${staffDetails.firstName[0]}${staffDetails.lastName[0]}`}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', gap: '20px' }}>
                {/* Left Section: Staff Information */}

                <div
                    style={{
                        width: '30%',
                        backgroundColor: '#FFFFFF',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 style={{ color: '#071D6A', fontWeight: "900", fontSize: "30px" }}>
                        Welcome, {staffDetails.firstName} {staffDetails.lastName}
                    </h3>
                    <p>{staffDetails.email}</p>
                    <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p>{staffDetails.userType} Account</p>
                        <p><strong>ID:</strong> {staffDetails.staffId}</p>
                    </div>

                    {/* Button List */}
                    <div
                        style={{
                            marginTop: "40px",
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            paddingRight: '8px',
                        }}
                    >
                        {menuItems.map((item) => (
                            <div
                                key={item.label}
                                onClick={item.onClick}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
                            >
                                <item.icon style={{ marginRight: '10px', color: '#071D6A' }} />
                                <span style={{ fontWeight: 600, color: '#333' }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                    {/* Sign Out Button */}
                    <button
                        onClick={
                            handleSignOut
                        }
                        style={{
                            marginTop: '20px',
                            padding: '12px 16px',
                            backgroundColor: '#DC3545',
                            color: '#FFFFFF',
                            fontWeight: '700',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            width: "100%"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#DC3545')}
                    >
                        Sign Out
                    </button>

                </div>


                {/* Right Section: Tasks, Announcements, Schedule */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Staff Tasks */}
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h3 style={{ color: '#071D6A' }}>Staff Tasks</h3>
                        {tasks.map((task) => (
                            <div key={task.id} style={{ marginBottom: '10px' }}>
                                <p style={{ fontWeight: '600' }}>{task.name}</p>
                                <p style={{ color: getTaskColor(task.status) }}>{task.status}</p>
                            </div>
                        ))}
                    </div>

                    {/* Announcements */}
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h3 style={{ color: '#071D6A' }}>Announcements</h3>
                        {announcements.map((announcement) => (
                            <div key={announcement.id} style={{ marginBottom: '15px' }}>
                                <h4 style={{ color: '#071D6A' }}>{announcement.title}</h4>
                                <p>{announcement.message}</p>
                            </div>
                        ))}
                    </div>

                    {/* Staff Schedule */}
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h3 style={{ color: '#071D6A' }}>Staff Schedule</h3>
                        <div>
                            <h4>Working Days:</h4>
                            <p>{schedule.workingDays.join(', ')}</p>
                        </div>

                        <div>
                            <h4>Leave:</h4>
                            <div>
                                <strong>Approved:</strong> {schedule.leave.approved.join(', ')}
                            </div>
                            <div>
                                <strong>Awaiting:</strong> {schedule.leave.awaiting.join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function
const getTaskColor = (status: string) => {
    switch (status) {
        case 'Completed':
            return '#28A745';
        case 'Ongoing':
            return '#FFC107';
        case 'Not Started':
            return '#DC3545';
        default:
            return '#6C757D';
    }
};

export default Dashboard;