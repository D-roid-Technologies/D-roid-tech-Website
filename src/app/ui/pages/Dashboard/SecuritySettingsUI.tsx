import React, { Dispatch, SetStateAction, useState } from 'react'
import { UserType } from '../../../utils/Types'


interface SecuritySettingsUIProps {
    user: UserType | null,
    onChange: Dispatch<SetStateAction<UserType | null>>
}


const SecuritySettingsUI: React.FC<SecuritySettingsUIProps> = ({ user, onChange }) => {
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorEnabled: false,
        securityQuestion: "",
        securityAnswer: "",
        loginAlerts: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value } = target;
        const isChechbox = target instanceof HTMLInputElement && target.type === "checkbox";
        const updatedValue = isChechbox ? target.checked : value
        setSecuritySettings(prev => ({
            ...prev,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async () => {
        // Simulate sending settings to backend
        console.log("Updated security settings:", securitySettings);
        alert("Security settings updated successfully.");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Account Security</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>
                Improve your account's security using the settings below.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                {/* Two-Factor Authentication */}
                <label style={{ display: "flex", justifyContent: "flex-start", gap: 10, alignItems: "center" }}>
                    <input
                        type="checkbox"
                        name="twoFactorEnabled"
                        checked={securitySettings.twoFactorEnabled}
                        onChange={handleChange}
                    />
                    <p style={{ color: "#000000" }}>Enable Two-Factor Authentication (2FA)</p>
                </label>
                <small style={{ color: "#666", alignSelf: "flex-start" }}>
                    Enchance your D'roid One Account with better security.
                </small>

                {/* Login Alerts */}

                <label style={{ display: "flex", justifyContent: "flex-start", gap: 10, alignItems: "center" }}>

                    <input
                        type="checkbox"
                        name="loginAlerts"
                        checked={securitySettings.loginAlerts}
                        onChange={handleChange}
                    />
                    <p style={{ color: "#000000" }}>Enable Login Alerts</p>
                </label>
                <small style={{ color: "#666", alignSelf: "flex-start" }}>
                    Receive email notifications when your account is accessed from a new device.
                </small>


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
                    Save Security Settings
                </button>
            </div>
        </div>
    );
};

export default SecuritySettingsUI;