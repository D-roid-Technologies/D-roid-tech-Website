import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/Store';
import { LocationState, UserType } from '../../../utils/Types';
import { FaUser, FaTasks, FaBullhorn, FaCalendarAlt, FaFileInvoiceDollar, FaUserPlus, FaCommentDots, FaChalkboardTeacher, FaChartLine, FaBookOpen, FaToolbox, FaCalculator } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { RoutePaths } from '../../../routes/Index';
import Section from './Section';
import { IoMdArrowRoundBack } from 'react-icons/io';
import PersonalDetails from './PersonalDetails';
import AllUsers from './users/AllUsers';
import { authService } from '../../../redux/configuration/auth.service';
import SignInOut from './SignInOut';
import StaffPay from './StaffPay';

const DashboardContent: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  // const location: LocationState = useSelector((state: RootState) => state.location);
  const isUserStaff = userDetails.userType === 'Staff';
  const isUserRole = userDetails.role === 'Superadmin';
  const [input, setInput] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState<null | { title: string; content: string; icon: JSX.Element }>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  // console.log(isUserRole)

  const menuItems = [
    ...(isUserRole ? [
      { label: 'Users', icon: FaUser },
    ] : []),
    { label: 'Personal Details', icon: FaUser },
    { label: 'Schedules', icon: FaCalendarAlt },
    { label: 'Tool Box', icon: FaToolbox },
    { label: 'Calculate', icon: FaCalculator },
    { label: 'Announcements', icon: FaBullhorn },
    { label: 'Say It', icon: FaCommentDots },
    ...(isUserStaff ? [  // Only if userType === 'staff'
      { label: 'Tasks', icon: FaTasks },
      { label: 'Payslips', icon: FaFileInvoiceDollar },
      { label: 'Onboarding', icon: FaUserPlus },
      { label: 'Training', icon: FaChalkboardTeacher },
      { label: 'Progressions', icon: FaChartLine },
      { label: 'Resource', icon: FaBookOpen },
    ] : [])
  ];

  const handleMenuClick = (label: string) => {
    setSelectedMenu(label);
  };

  const handleSignOut = async () => {
    await authService.handleUserSignout().then(() => {
      navigate(RoutePaths.JoinOurCommunity);
    }).catch((err) => {

    })
  };

  const rightMenuItems = [
    { title: "Documents", content: "Here are your documents.", icon: <i className="fas fa-file-alt"></i> },
    { title: "Security", content: "Manage your security settings.", icon: <i className="fas fa-shield-alt"></i> },
    { title: "Notifications", content: "View all your notifications.", icon: <i className="fas fa-bell"></i> },
    { title: "Preferences", content: "Set your personal preferences.", icon: <i className="fas fa-cog"></i> },
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

  const calculateItems = [
    { title: 'OhmsLawCalculator', content: 'Calculate voltage, current, and resistance using Ohm\'s Law.' },
    { title: 'BMICalculator', content: 'Calculate your Body Mass Index (BMI).' },
  ];


  const handleClear = () => {
    setInput('');
  }

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

  const renderContent = () => {
    if (!selectedMenu) {
      return (
        <>
          {/* Staff Tasks */}
          <Section title="Tasks">
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
          <Section title="Schedules">
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
      case 'Users':
        return (
          <Section title="Users">
            <AllUsers />
          </Section>

        );
      case 'Personal Details':
        return (
          <Section title="Personal Details">
            <PersonalDetails />
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
            <p style={{ color: "#000000" }}>View your salary payslips here.</p>
            <StaffPay />
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
            <p style={{ color: "#000000" }}>Browse useful resources and documents.</p>
            <SignInOut />
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
    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', gap: '20px' }}>
      {/* Left Section */}
      <div
        style={{
          width: '30%',
          height: '80vh', // 🔥 Full height of the screen
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Keeps sign out button at the bottom
        }}
      >
        <div>
          <h3 style={{ color: '#071D6A', fontWeight: "900", fontSize: "30px" }}>
            Welcome, {userDetails.firstName} {userDetails.lastName}
          </h3>
          <p style={{ color: "#000000" }}>{userDetails.email}</p>

          <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "#000000" }}>{userDetails.userType} Account</p>
            <p style={{ color: "#000000" }}><strong>ID:</strong> {userDetails.uniqueId}</p>
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
                {/* @ts-ignore */}
                <item.icon style={{ marginRight: '10px', color: '#071D6A' }} />
                <span style={{ fontWeight: 600, color: '#333' }}>{item.label}</span>
              </div>
            ))}
          </div>
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
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px', height: '80vh' }}>
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
            {/* @ts-ignore */}
            <IoMdArrowRoundBack style={{ marginRight: '8px' }} />
            Back
          </button>
        )}

        {renderContent()}
      </div>
    </div>
  )
};

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
export default DashboardContent