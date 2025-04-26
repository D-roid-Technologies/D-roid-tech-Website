// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { FaUsers, FaCheckCircle, FaExclamationCircle, FaFileAlt } from 'react-icons/fa';
import { RoutePaths } from '../../../routes/Index';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FunctionComponent = () => {
    // Sample data for dashboard
    const [staffDetails, setStaffDetails] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        staffId: 'S12345',
    });

    const [tasks, setTasks] = useState([
        { id: 1, name: 'Task 1', status: 'Completed' },
        { id: 2, name: 'Task 2', status: 'Ongoing' },
        { id: 3, name: 'Task 3', status: 'Not Started' },
    ]);

    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'New Staff Training', message: 'Mandatory training next week' },
        { id: 2, title: 'Office Closed', message: 'Office will be closed on Friday for a holiday' },
    ]);

    const [schedule, setSchedule] = useState({
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        leave: {
            approved: ['Monday', 'Wednesday'],
            awaiting: ['Friday'],
        },
    });

    const navigate = useNavigate();

    // Fetch data (This can be replaced with an API call)
    useEffect(() => {
        // Replace with actual data fetching logic if needed
        // Example:
        // fetchStaffData();
        // fetchTasks();
        // fetchSchedule();
        // fetchAnnouncements();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9F9F9' }}>
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
                <a
                    href="/"
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* <FaArrowLeft style={{ marginRight: '8px' }} /> */}
                    Back to Home
                </a>
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
                    <h3 style={{ color: '#071D6A' }}>User Information</h3>
                    <p><strong>First Name:</strong> {staffDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {staffDetails.lastName}</p>
                    <p><strong>Email:</strong> {staffDetails.email}</p>
                    <p><strong>Staff ID:</strong> {staffDetails.staffId}</p>
                </div>

                {/* Right Section: Staff Tasks, Announcements, Schedule */}
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

// Helper function to determine task status color
const getTaskColor = (status: string) => {
    switch (status) {
        case 'Completed':
            return '#28A745'; // Green
        case 'Ongoing':
            return '#FFC107'; // Yellow
        case 'Not Started':
            return '#DC3545'; // Red
        default:
            return '#6C757D'; // Grey
    }
};

export default Dashboard;
