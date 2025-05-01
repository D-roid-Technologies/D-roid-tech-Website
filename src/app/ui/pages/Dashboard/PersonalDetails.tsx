import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { UserType } from '../../../utils/Types';

const PersonalDetails: React.FunctionComponent = () => {
    const userDetails: UserType = useSelector((state: RootState) => state.user);
    const [selectedMenuItem, setSelectedMenuItem] = useState<null | { title: string; content: string; icon: JSX.Element }>(null);

    const rightMenuItems = [
        { title: "Documents", content: "Here are your documents.", icon: <i className="fas fa-file-alt"></i> },
        { title: "Security", content: "Manage your security settings.", icon: <i className="fas fa-shield-alt"></i> },
        { title: "Preferences", content: "Set your personal preferences.", icon: <i className="fas fa-cog"></i> },
    ];

    return (
        <div>
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
                        if (selectedTitle === "Edit Profile") {
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
                    <option value="Edit Profile">Edit Profile</option>
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
            }}>
                <div style={{
                    minHeight: '300px',
                    padding: '30px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    backgroundColor: '#fafafa',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    {selectedMenuItem === null && userDetails ? (
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {/* First Name */}
                            <input
                                type="text"
                                placeholder="First Name"
                                value={userDetails.firstName}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Last Name */}
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={userDetails.lastName}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Middle Name */}
                            <input
                                type="text"
                                placeholder="Middle Name"
                                value={userDetails.middleName}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* User Type (grayed out) */}
                            <input
                                type="text"
                                placeholder="User Type"
                                value={userDetails.userType}
                                disabled
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f0f0f0',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Unique ID (grayed out) */}
                            <input
                                type="text"
                                placeholder="Unique ID"
                                value={userDetails.uniqueId}
                                disabled
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f0f0f0',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Email (grayed out) */}
                            <input
                                type="email"
                                placeholder="Email"
                                value={userDetails.email}
                                disabled
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f0f0f0',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Phone */}
                            <input
                                type="text"
                                placeholder="Phone"
                                value={userDetails.phone}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Gender */}
                            <input
                                type="text"
                                placeholder="Gender"
                                value={userDetails.gender}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Date of Birth */}
                            <input
                                type="text"
                                placeholder="Date of Birth"
                                value={userDetails.dateOfBirth}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Disability */}
                            <input
                                type="text"
                                placeholder="Disability"
                                value={userDetails.disability ? "Yes" : "No"}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Agree to Policy */}
                            <input
                                type="text"
                                placeholder="Agree to Policy"
                                value={userDetails.agreeToPolicy ? "Yes" : "No"}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            <button
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
        </div>
    )
}

export default PersonalDetails;