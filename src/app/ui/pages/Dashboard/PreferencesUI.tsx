import React, { Dispatch, SetStateAction, useState } from 'react'
import { UserType } from '../../../utils/Types'

interface PreferencesUIProps {
    user: UserType | null,
    onChange: Dispatch<SetStateAction<UserType | null>>
}

const PreferencesUI: React.FC<PreferencesUIProps> = ({ user, onChange }) => {
    const [preferences, setPreferences] = useState({
        language: "English",
        theme: "light",
        notificationPreference: "email",
        timeZone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPreferences(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Updated preferences:", preferences);
        alert("Preferences updated successfully.");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ color: "#000000" }}>Account Preferences</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>
                Customize your account to suit your needs.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                {/* Language */}
                <label
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#ffffff"
                    }}>
                    <p>Preferred Language:</p>
                    <select name="language" value={preferences.language} onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                        }}>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </label>

                {/* Theme */}
                <label
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#ffffff"
                    }}>
                    <p>Theme Mode:</p>
                    <select name="theme" value={preferences.theme} onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                        }}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                    </select>
                </label>

                {/* Notification Preference */}
                <label
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#ffffff"
                    }}>
                    <p>Notification Preference:</p>
                    <select
                        name="notificationPreference"
                        value={preferences.notificationPreference}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                        }}
                    >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="push">Push Notification</option>
                    </select>
                </label>

                {/* Time Zone */}
                <label
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#ffffff"
                    }}>
                    <p>Time Zone:</p>
                    <input
                        type="text"
                        name="timeZone"
                        placeholder="e.g. GMT+1, PST, IST"
                        value={preferences.timeZone}
                        onChange={handleChange}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                        }}
                    />
                </label>

                <button
                    onClick={handleSubmit}
                    style={{
                        marginTop: "20px",
                        padding: "12px",
                        backgroundColor: "#071D6A",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default PreferencesUI;