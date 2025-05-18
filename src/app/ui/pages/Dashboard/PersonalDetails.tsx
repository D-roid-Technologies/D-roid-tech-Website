import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authService } from '../../../redux/configuration/auth.service';
import { RootState } from '../../../redux/Store';
import { UserType } from '../../../utils/Types';
import DocumentUploadUI from './DocumentUploadUI';
import PreferencesUI from './PreferencesUI';
import SecuritySettingsUI from './SecuritySettingsUI';

const PersonalDetails: React.FunctionComponent = () => {
    const userDetails: UserType = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<UserType | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<null | { title: string; content: string; icon: JSX.Element }>(null);

    useEffect(() => {
        setFormData({ ...userDetails, referralName: generateReferralName(userDetails) });
        setPhotoPreview(userDetails.photoUrl || null);
    }, [userDetails]);

    const generateReferralName = (user: UserType) => {
        return `${user.firstName}_${user.lastName}_${user.uniqueId}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!formData) return;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
                setFormData(prev => prev ? { ...prev, photoUrl: reader.result as string } : null);
            };
            reader.readAsDataURL(file);
        }
    };

    const rightMenuItems = [
        { title: "Documents", content: "Here are your documents.", icon: <i className="fas fa-file-alt"></i> },
        { title: "Security", content: "Manage your security settings.", icon: <i className="fas fa-shield-alt"></i> },
        { title: "Preferences", content: "Set your personal preferences.", icon: <i className="fas fa-cog"></i> },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        await authService.updatePrimaryInformation(formData);
    };

    const renderSelectedComponent = () => {
        switch (selectedMenuItem?.title) {
            case 'Documents':
                return <DocumentUploadUI />;
            case 'Security':
                return <SecuritySettingsUI user={formData} onChange={setFormData} />;
            case 'Preferences':
                return <PreferencesUI user={formData} onChange={setFormData} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px"
            }}>
                <p style={{ fontSize: '16px', fontWeight: '500', color: "#000000" }}>
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

            <p style={{ fontSize: "14px", color: "#555" }}>
                Kindly fill the form below, to update your information.
            </p>˝
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                <div style={{
                    minHeight: '300px',
                    padding: '30px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    backgroundColor: '#fafafa',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    {selectedMenuItem === null && formData ? (
                        // <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        //     {/* Photo Upload */}
                        //     {photoPreview ? (
                        //         <img
                        //             src={photoPreview}
                        //             alt="Preview"
                        //             style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                        //         />
                        //     ) : (<>
                        //         <p style={{ color: "#000000" }}>Select Profile Photo</p>
                        //     </>)}
                        //     <input
                        //         type="file"
                        //         accept="image/*"
                        //         onChange={handlePhotoChange}
                        //         style={{ fontSize: '14px' }}
                        //     />

                        //     {/* Editable fields */}
                        //     {[
                        //         { label: 'First Name', name: 'firstName' },
                        //         { label: 'Last Name', name: 'lastName' },
                        //         { label: 'Middle Name', name: 'middleName' },
                        //         { label: 'Phone', name: 'phone' },
                        //         { label: 'Gender', name: 'gender' },
                        //         { label: 'Date of Birth', name: 'dateOfBirth' },
                        //     ].map(field => (
                        //         <input
                        //             key={field.name}
                        //             name={field.name}
                        //             type="text"
                        //             placeholder={field.label}
                        //             value={(formData as any)[field.name]}
                        //             onChange={handleInputChange}
                        //             style={{
                        //                 padding: '12px',
                        //                 borderRadius: '8px',
                        //                 border: '1px solid #ccc',
                        //                 fontSize: '14px'
                        //             }}
                        //         />
                        //     ))}

                        //     {/* Disability Type */}
                        //     <select
                        //         name="disabilityType"
                        //         value={(formData as any).disabilityType || ''}
                        //         onChange={handleInputChange}
                        //         style={{
                        //             padding: '12px',
                        //             borderRadius: '8px',
                        //             border: '1px solid #ccc',
                        //             fontSize: '14px'
                        //         }}
                        //     >
                        //         <option value="">Select Disability Type</option>
                        //         <option value="None">None</option>
                        //         <option value="Visual">Visual</option>
                        //         <option value="Hearing">Hearing</option>
                        //         <option value="Motor">Motor</option>
                        //         <option value="Cognitive">Cognitive</option>
                        //     </select>

                        //     {/* Educational Level */}
                        //     <select
                        //         name="educationalLevel"
                        //         value={(formData as any).educationalLevel || ''}
                        //         onChange={handleInputChange}
                        //         style={{
                        //             padding: '12px',
                        //             borderRadius: '8px',
                        //             border: '1px solid #ccc',
                        //             fontSize: '14px'
                        //         }}
                        //     >
                        //         <option value="">Select Educational Level</option>
                        //         <option value="High School">High School</option>
                        //         <option value="Undergraduate">Undergraduate</option>
                        //         <option value="Graduate">Graduate</option>
                        //         <option value="Postgraduate">Postgraduate</option>
                        //     </select>

                        //     {/* Security Question */}
                        //     <select
                        //         name="securityQuestion"
                        //         value={(formData as any).securityQuestion || ''}
                        //         onChange={handleInputChange}
                        //         style={{
                        //             padding: '12px',
                        //             borderRadius: '8px',
                        //             border: '1px solid #ccc',
                        //             fontSize: '14px'
                        //         }}
                        //     >
                        //         <option value="">Select Security Question</option>
                        //         <option value="mother_maiden">What is your mother's maiden name?</option>
                        //         <option value="first_pet">What was your first pet’s name?</option>
                        //         <option value="birth_city">What city were you born in?</option>
                        //     </select>

                        //     {/* Security Answer */}
                        //     <input
                        //         type="text"
                        //         name="securityAnswer"
                        //         placeholder="Security Answer"
                        //         value={(formData as any).securityAnswer || ''}
                        //         onChange={handleInputChange}
                        //         style={{
                        //             padding: '12px',
                        //             borderRadius: '8px',
                        //             border: '1px solid #ccc',
                        //             fontSize: '14px'
                        //         }}
                        //     />

                        //     {/* Referral Name (auto-generated) */}
                        //     <input
                        //         type="text"
                        //         value={formData.referralName}
                        //         disabled
                        //         placeholder="Referral Name"
                        //         style={{
                        //             padding: '12px',
                        //             borderRadius: '8px',
                        //             border: '1px solid #ccc',
                        //             backgroundColor: '#f0f0f0',
                        //             fontSize: '14px'
                        //         }}
                        //     />

                        //     {/* Disabled fields */}
                        //     {[
                        //         { label: 'User Type', name: 'userType' },
                        //         { label: 'Unique ID', name: 'uniqueId' },
                        //         { label: 'Email', name: 'email' },
                        //         { label: 'Disability', name: 'disability', format: (val: boolean) => val ? "Yes" : "No" },
                        //         { label: 'Agree to Policy', name: 'agreeToPolicy', format: (val: boolean) => val ? "Yes" : "No" },
                        //     ].map(field => (
                        //         <input
                        //             key={field.name}
                        //             type="text"
                        //             placeholder={field.label}
                        //             value={field.format ? field.format((formData as any)[field.name]) : (formData as any)[field.name]}
                        //             disabled
                        //             style={{
                        //                 padding: '12px',
                        //                 borderRadius: '8px',
                        //                 border: '1px solid #ccc',
                        //                 backgroundColor: '#f0f0f0',
                        //                 fontSize: '14px'
                        //             }}
                        //         />
                        //     ))}

                        //     <button
                        //         type="submit"
                        //         style={{
                        //             marginTop: '20px',
                        //             padding: '12px',
                        //             backgroundColor: '#071D6A',
                        //             color: 'white',
                        //             border: 'none',
                        //             borderRadius: '8px',
                        //             fontSize: '16px',
                        //             fontWeight: 'bold',
                        //             cursor: 'pointer',
                        //         }}
                        //         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#05205C'}
                        //         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#071D6A'}
                        //     >
                        //         Update Information
                        //     </button>
                        // </form>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {/* Photo Upload */}
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            ) : (<>
                                <p style={{ color: "#000000" }}>Select Profile Photo</p>
                            </>)}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                style={{ fontSize: '14px' }}
                            />

                            {/* Editable fields */}
                            {[
                                { label: 'First Name', name: 'firstName' },
                                { label: 'Last Name', name: 'lastName' },
                                { label: 'Middle Name', name: 'middleName' },
                                { label: 'Phone', name: 'phone' },
                                { label: 'Gender', name: 'gender' },
                                { label: 'Date of Birth', name: 'dateOfBirth' },
                                { label: 'Street Number', name: 'streetNumber' },
                                { label: 'Street Name', name: 'streetName' },
                                { label: 'City', name: 'city' },
                                { label: 'State', name: 'state' },
                                { label: 'Country', name: 'country' },
                            ].map(field => (
                                <input
                                    key={field.name}
                                    name={field.name}
                                    type="text"
                                    placeholder={field.label}
                                    value={(formData as any)[field.name]}
                                    onChange={handleInputChange}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        fontSize: '14px'
                                    }}
                                />
                            ))}

                            {/* Disability Type */}
                            <select
                                name="disabilityType"
                                value={(formData as any).disabilityType || ''}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="">Select Disability Type</option>
                                <option value="None">None</option>
                                <option value="Visual">Visual</option>
                                <option value="Hearing">Hearing</option>
                                <option value="Motor">Motor</option>
                                <option value="Cognitive">Cognitive</option>
                            </select>

                            {/* Educational Level */}
                            <select
                                name="educationalLevel"
                                value={(formData as any).educationalLevel || ''}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="">Select Educational Level</option>
                                <option value="High School">High School</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                            </select>

                            {/* Security Question */}
                            <select
                                name="securityQuestion"
                                value={(formData as any).securityQuestion || ''}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="">Select Security Question</option>
                                <option value="mother_maiden">What is your mother's maiden name?</option>
                                <option value="first_pet">What was your first pet’s name?</option>
                                <option value="birth_city">What city were you born in?</option>
                            </select>

                            {/* Security Answer */}
                            <input
                                type="text"
                                name="securityAnswer"
                                placeholder="Security Answer"
                                value={(formData as any).securityAnswer || ''}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Referral Name (auto-generated) */}
                            <input
                                type="text"
                                value={formData.referralName}
                                disabled
                                placeholder="Referral Name"
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f0f0f0',
                                    fontSize: '14px'
                                }}
                            />

                            {/* Disabled fields */}
                            {[
                                { label: 'User Type', name: 'userType' },
                                { label: 'Unique ID', name: 'uniqueId' },
                                { label: 'Email', name: 'email' },
                                { label: 'Disability', name: 'disability', format: (val: boolean) => val ? "Yes" : "No" },
                                { label: 'Agree to Policy', name: 'agreeToPolicy', format: (val: boolean) => val ? "Yes" : "No" },
                            ].map(field => (
                                <input
                                    key={field.name}
                                    type="text"
                                    placeholder={field.label}
                                    value={field.format ? field.format((formData as any)[field.name]) : (formData as any)[field.name]}
                                    disabled
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        backgroundColor: '#f0f0f0',
                                        fontSize: '14px'
                                    }}
                                />
                            ))}

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
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#05205C'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#071D6A'}
                            >
                                Update Information
                            </button>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            {renderSelectedComponent()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
