// @ts-nocheck

import React, { useState } from 'react';
import { FaUsers, FaCheckCircle, FaExclamationCircle, FaFileAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../routes/Index';
import { FaUser, FaTasks, FaBullhorn, FaCalendarAlt, FaFileInvoiceDollar, FaUserPlus, FaCommentDots, FaChalkboardTeacher, FaChartLine, FaBookOpen, FaToolbox, FaCalculator } from 'react-icons/fa'; // Added toolbox, calculator
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { IoMdArrowRoundBack } from "react-icons/io";
import { LocationState, UserType } from '../../../utils/Types';

const Dashboard: React.FunctionComponent = () => {

    const navigate = useNavigate();
    const staffDetails: UserType = useSelector((state: RootState) => state.user);
    const location: LocationState = useSelector((state: RootState) => state.location);
    // State to track which menu item is clicked

    const [input, setInput] = useState('');

    const calculateItems = [
        { title: 'OhmsLawCalculator', content: 'Calculate voltage, current, and resistance using Ohm\'s Law.' },
        { title: 'BMICalculator', content: 'Calculate your Body Mass Index (BMI).' },
    ];

    const handleButtonClick = (value: string) => {
        if (value === '=') {
            try {
                setInput(eval(input).toString());
            } catch {
                setInput('Error');
            }
        } else {
            setInput((prev) => prev + value);
        }
    };

    const handleClear = () => {
        setInput('');
    };

    const [selectedMenuItem, setSelectedMenuItem] = useState<null | { title: string; content: string; icon: JSX.Element }>(null);

    const [selectedMenu, setSelectedMenu] = useState<string | null>(null); // <-- track the selected menu

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate(RoutePaths.JoinOurCommunity);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const rightMenuItems = [
        { title: "Documents", content: "Here are your documents.", icon: <i className="fas fa-file-alt"></i> },
        { title: "Security", content: "Manage your security settings.", icon: <i className="fas fa-shield-alt"></i> },
        { title: "Notifications", content: "View all your notifications.", icon: <i className="fas fa-bell"></i> },
        { title: "Preferences", content: "Set your personal preferences.", icon: <i className="fas fa-cog"></i> },
    ];


    const handleMenuClick = (label: string) => {
        setSelectedMenu(label);
    };

    const isStaffUser = staffDetails.userType === 'staff';



    // Filtered menuItems based on userType
    const menuItems = [
        { label: 'Personal Details', icon: FaUser },
        { label: 'Schedules', icon: FaCalendarAlt },
        { label: 'Tool Box', icon: FaToolbox },
        { label: 'Calculate', icon: FaCalculator },
        { label: 'Announcements', icon: FaBullhorn },
        { label: 'Say It', icon: FaCommentDots },
        ...(isStaffUser ? [  // Only if userType === 'staff'
            { label: 'Tasks', icon: FaTasks },
            { label: 'Payslips', icon: FaFileInvoiceDollar },
            { label: 'Onboarding', icon: FaUserPlus },
            { label: 'Training', icon: FaChalkboardTeacher },
            { label: 'Progressions', icon: FaChartLine },
            { label: 'Resource', icon: FaBookOpen },
        ] : [])
    ];

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

    const renderContent = () => {
        if (!selectedMenu) {
            return (
                <>
                    {/* Staff Tasks */}
                    <Section title="Staff Tasks">
                        {tasks.map((task) => (
                            <div key={task.id} style={{ marginBottom: '10px' }}>
                                <p style={{ fontWeight: '600' }}>{task.name}</p>
                                <p style={{ color: getTaskColor(task.status) }}>{task.status}</p>
                            </div>
                        ))}
                    </Section>

                    {/* Announcements */}
                    <Section title="Announcements">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} style={{ marginBottom: '15px' }}>
                                <h4 style={{ color: '#071D6A' }}>{announcement.title}</h4>
                                <p>{announcement.message}</p>
                            </div>
                        ))}
                    </Section>

                    {/* Staff Schedule */}
                    <Section title="Staff Schedule">
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
                    </Section>
                </>
            );
        }


        switch (selectedMenu) {
            case 'Personal Details':
                return (
                    <Section title="Personal Details">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "10px"
                        }}>
                            <p style={{ fontSize: '16px', fontWeight: '500' }}>
                                Here you can view and update your personal information.
                            </p>
                            <select
                                onChange={(e) => {
                                    const selectedTitle = e.target.value;
                                    if (selectedTitle === "Main Content") {
                                        setSelectedMenuItem(null);
                                    } else {
                                        const foundItem = rightMenuItems.find((item) => item.title === selectedTitle);
                                        setSelectedMenuItem(foundItem || null);
                                    }
                                }}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    backgroundColor: '#fff',
                                    minWidth: '180px',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="Main Content">Main Content</option>
                                {rightMenuItems.map((item) => (
                                    <option key={item.title} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Main content area */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '20px',
                            maxWidth: '600px'
                        }}>
                            <div style={{
                                minHeight: '300px',
                                padding: '30px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '12px',
                                backgroundColor: '#fafafa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                            }}>
                                {selectedMenuItem === null && staffDetails ? (
                                    <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={staffDetails.firstName}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                                fontSize: '14px'
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={staffDetails.lastName}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                                fontSize: '14px'
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Phone"
                                            value={staffDetails.staffId}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                                fontSize: '14px'
                                            }}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={staffDetails.email}
                                            disabled
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                                backgroundColor: '#f0f0f0',
                                                fontSize: '14px'
                                            }}
                                        />

                                        <button
                                            type="submit"
                                            style={{
                                                marginTop: '20px',
                                                padding: '12px',
                                                backgroundColor: '#071D6A',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#05205C'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#071D6A'}
                                        >
                                            Update Information
                                        </button>
                                    </form>
                                ) : (
                                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                        <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>{selectedMenuItem?.title}</h3>
                                        <p style={{ fontSize: '16px', color: '#666' }}>{selectedMenuItem?.content}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Section>

                );
            case 'Schedules':
                return (
                    <Section title="Schedules">
                        <p>Manage and view your working schedules.</p>
                    </Section>
                );
            case 'Tool Box':
                return (
                    <Section title="Tool Box">
                        <p>Access various tools for your tasks.</p>
                    </Section>
                );
            case 'Calculate':
                return (
                    <Section title="Calculate">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "10px"
                        }}>
                            <p style={{ fontSize: '16px', fontWeight: '500' }}>
                                Perform calculations using our tools.
                            </p>
                            <select
                                onChange={(e) => {
                                    const selectedTitle = e.target.value;
                                    if (selectedTitle === "Scientific Calculator") {
                                        setSelectedMenuItem(null);
                                    } else {
                                        const foundItem = rightMenuItems.find((item) => item.title === selectedTitle);
                                        setSelectedMenuItem(foundItem || null);
                                    }
                                }}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    backgroundColor: '#fff',
                                    minWidth: '200px',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="Scientific Calculator">Scientific Calculator</option>
                                {calculateItems.map((item) => (
                                    <option key={item.title} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Main content area */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '20px',
                            maxWidth: '400px'
                        }}>
                            <div style={{
                                minHeight: '400px',
                                padding: '30px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '12px',
                                backgroundColor: '#fafafa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                            }}>
                                {selectedMenuItem === null ? (
                                    // Scientific Calculator Component
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                                        <input
                                            type="text"
                                            value={input}
                                            readOnly
                                            style={{
                                                width: '100%',
                                                padding: '15px',
                                                fontSize: '20px',
                                                textAlign: 'right',
                                                border: '1px solid #ccc',
                                                borderRadius: '8px',
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(4, 1fr)',
                                            gap: '10px',
                                            width: '100%'
                                        }}>
                                            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((item) => (
                                                <button
                                                    key={item}
                                                    onClick={() => handleButtonClick(item)}
                                                    style={{
                                                        padding: '15px',
                                                        fontSize: '18px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ccc',
                                                        backgroundColor: '#ffffff',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.3s'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                            <button
                                                onClick={handleClear}
                                                style={{
                                                    gridColumn: 'span 4',
                                                    padding: '15px',
                                                    fontSize: '18px',
                                                    backgroundColor: '#e74c3c',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                        <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>{selectedMenuItem?.title}</h3>
                                        <p style={{ fontSize: '16px', color: '#666' }}>{selectedMenuItem?.content}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Section>

                );
            case 'Announcements':
                return (
                    <Section title="Announcements">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} style={{ marginBottom: '15px' }}>
                                <h4 style={{ color: '#071D6A' }}>{announcement.title}</h4>
                                <p>{announcement.message}</p>
                            </div>
                        ))}
                    </Section>
                );
            case 'Say It':
                return (
                    <Section title="Say It">
                        <p>Share your thoughts and feedback here.</p>
                    </Section>
                );
            case 'Tasks':
                return (
                    <Section title="Tasks">
                        {tasks.map((task) => (
                            <div key={task.id} style={{ marginBottom: '10px' }}>
                                <p style={{ fontWeight: '600' }}>{task.name}</p>
                                <p style={{ color: getTaskColor(task.status) }}>{task.status}</p>
                            </div>
                        ))}
                    </Section>
                );
            case 'Payslips':
                return (
                    <Section title="Payslips">
                        <p>View your salary payslips here.</p>
                    </Section>
                );
            case 'Onboarding':
                return (
                    <Section title="Onboarding">
                        <p>Complete your onboarding tasks.</p>
                    </Section>
                );
            case 'Training':
                return (
                    <Section title="Training">
                        <p>Access your training materials here.</p>
                    </Section>
                );
            case 'Progressions':
                return (
                    <Section title="Progressions">
                        <p>Track your professional progress here.</p>
                    </Section>
                );
            case 'Resource':
                return (
                    <Section title="Resource">
                        <p>Browse useful resources and documents.</p>
                    </Section>
                );
            default:
                return (
                    <Section title="Dashboard">
                        <p>Welcome to your dashboard.</p>
                    </Section>
                );
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
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: "20px"
                }}>

                    <span>
                        {location.principalSubdivision}
                    </span>
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
                        }}
                    >

                        {`${staffDetails.firstName[0]}${staffDetails.lastName[0]}`}
                    </div>
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
                                onClick={() => handleMenuClick(item.label)}
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
                        onClick={handleSignOut}
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

                {/* Right Section */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Back Button */}
                    {selectedMenu && (
                        <button
                            onClick={() => setSelectedMenu(null)}
                            style={{
                                backgroundColor: '#071D6A',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                width: 'fit-content',
                                cursor: 'pointer'
                            }}
                        >
                            <IoMdArrowRoundBack style={{ marginRight: '8px' }} />
                            Back
                        </button>
                    )}

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// Helper small components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div
        style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        <h3 style={{ color: '#071D6A' }}>{title}</h3>
        {children}
    </div>
);

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
