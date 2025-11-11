import React, { Dispatch, SetStateAction, useState } from "react";
import { UserType } from "../../../utils/Types";
import { Shield, Check, Mail, Smartphone } from "lucide-react";
import "./SecuritySettingsUI.css";

interface SecuritySettingsUIProps {
  user: UserType | null;
  onChange: Dispatch<SetStateAction<UserType | null>>;
}

const SecuritySettingsUI: React.FC<SecuritySettingsUIProps> = ({
  user,
  onChange,
}) => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    // securityQuestion: "",
    // securityAnswer: "",
    loginAlerts: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";
    const updatedValue = isCheckbox ? target.checked : value;
    setSecuritySettings((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Updated security settings:", securitySettings);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="ssu-success-container">
        <div className="ssu-success-icon">
          <Shield className="ssu-shield-icon" />
        </div>
        <h2 className="ssu-success-title">Security Settings Updated!</h2>
        <p className="ssu-success-message">
          Your account security preferences have been saved successfully.
        </p>
        <div className="ssu-reference-box">
          <strong>Current Security Status:</strong>
          <div className="ssu-settings-list">
            <div className="ssu-setting-status">
              <div className="ssu-setting-info">
                <Smartphone className="ssu-setting-icon" />
                <span>Two-Factor Authentication</span>
              </div>
              <span
                className={
                  securitySettings.twoFactorEnabled
                    ? "ssu-status-active"
                    : "ssu-status-inactive"
                }
              >
                {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="ssu-setting-status">
              <div className="ssu-setting-info">
                <Mail className="ssu-setting-icon" />
                <span>Login Alerts</span>
              </div>
              <span
                className={
                  securitySettings.loginAlerts
                    ? "ssu-status-active"
                    : "ssu-status-inactive"
                }
              >
                {securitySettings.loginAlerts ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => setSubmitted(false)} className="ssu-back-btn">
          Modify Settings
        </button>
      </div>
    );
  }

  return (
    <div className="ssu-container">
      <div className="ssu-header">
        <p className="ssu-title">Account Security</p>
        <p className="ssu-subtitle">
          Improve your account's security using the settings below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="ssu-form">
        <div className="ssu-section ssu-section-security">
          <h3 className="ssu-section-title">Security Features</h3>

          <div className="ssu-settings-grid">
            {/* Two-Factor Authentication */}
            <div
              className={`ssu-setting-card ${
                securitySettings.twoFactorEnabled
                  ? "ssu-setting-card-active"
                  : ""
              }`}
            >
              <div className="ssu-setting-header">
                <div className="ssu-setting-icon-wrapper">
                  <Smartphone className="ssu-feature-icon" />
                </div>
                <div className="ssu-setting-content">
                  <h4 className="ssu-setting-name">
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="ssu-setting-description">
                    Enhance your D'roid One Account with better security by
                    requiring a second verification step.
                  </p>
                </div>
                <div className="ssu-toggle-wrapper">
                  <label className="ssu-toggle-label">
                    <input
                      type="checkbox"
                      name="twoFactorEnabled"
                      checked={securitySettings.twoFactorEnabled}
                      onChange={handleChange}
                      className="ssu-toggle-input"
                    />
                    <span className="ssu-toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="ssu-setting-status-badge">
                {securitySettings.twoFactorEnabled ? (
                  <span className="ssu-badge-enabled">
                    <Check className="ssu-badge-icon" />
                    Enabled
                  </span>
                ) : (
                  <span className="ssu-badge-disabled">Disabled</span>
                )}
              </div>
            </div>

            {/* Login Alerts */}
            <div
              className={`ssu-setting-card ${
                securitySettings.loginAlerts ? "ssu-setting-card-active" : ""
              }`}
            >
              <div className="ssu-setting-header">
                <div className="ssu-setting-icon-wrapper">
                  <Mail className="ssu-feature-icon" />
                </div>
                <div className="ssu-setting-content">
                  <h4 className="ssu-setting-name">Login Alerts</h4>
                  <p className="ssu-setting-description">
                    Receive email notifications when your account is accessed
                    from a new device or location.
                  </p>
                </div>
                <div className="ssu-toggle-wrapper">
                  <label className="ssu-toggle-label">
                    <input
                      type="checkbox"
                      name="loginAlerts"
                      checked={securitySettings.loginAlerts}
                      onChange={handleChange}
                      className="ssu-toggle-input"
                    />
                    <span className="ssu-toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="ssu-setting-status-badge">
                {securitySettings.loginAlerts ? (
                  <span className="ssu-badge-enabled">
                    <Check className="ssu-badge-icon" />
                    Enabled
                  </span>
                ) : (
                  <span className="ssu-badge-disabled">Disabled</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ssu-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="ssu-submit-btn"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Saving Settings..." : "Save Security Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettingsUI;

// import React, { Dispatch, SetStateAction, useState } from 'react'
// import { UserType } from '../../../utils/Types'

// interface SecuritySettingsUIProps {
//     user: UserType | null,
//     onChange: Dispatch<SetStateAction<UserType | null>>
// }

// const SecuritySettingsUI: React.FC<SecuritySettingsUIProps> = ({ user, onChange }) => {
//     const [securitySettings, setSecuritySettings] = useState({
//         twoFactorEnabled: false,
//         securityQuestion: "",
//         securityAnswer: "",
//         loginAlerts: false,
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const target = e.target;
//         const { name, value } = target;
//         const isChechbox = target instanceof HTMLInputElement && target.type === "checkbox";
//         const updatedValue = isChechbox ? target.checked : value
//         setSecuritySettings(prev => ({
//             ...prev,
//             [name]: updatedValue
//         }));
//     };

//     const handleSubmit = async () => {
//         // Simulate sending settings to backend
//         console.log("Updated security settings:", securitySettings);
//         alert("Security settings updated successfully.");
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//             <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Account Security</h2>
//             <p style={{ fontSize: "14px", color: "#555" }}>
//                 Improve your account's security using the settings below.
//             </p>

//             <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
//                 {/* Two-Factor Authentication */}
//                 <label style={{ display: "flex", justifyContent: "flex-start", gap: 10, alignItems: "center" }}>
//                     <input
//                         type="checkbox"
//                         name="twoFactorEnabled"
//                         checked={securitySettings.twoFactorEnabled}
//                         onChange={handleChange}
//                     />
//                     <p style={{ color: "#000000" }}>Enable Two-Factor Authentication (2FA)</p>
//                 </label>
//                 <small style={{ color: "#666", alignSelf: "flex-start" }}>
//                     Enchance your D'roid One Account with better security.
//                 </small>

//                 {/* Login Alerts */}

//                 <label style={{ display: "flex", justifyContent: "flex-start", gap: 10, alignItems: "center" }}>

//                     <input
//                         type="checkbox"
//                         name="loginAlerts"
//                         checked={securitySettings.loginAlerts}
//                         onChange={handleChange}
//                     />
//                     <p style={{ color: "#000000" }}>Enable Login Alerts</p>
//                 </label>
//                 <small style={{ color: "#666", alignSelf: "flex-start" }}>
//                     Receive email notifications when your account is accessed from a new device.
//                 </small>

//                 <button
//                     onClick={handleSubmit}
//                     style={{
//                         marginTop: "20px",
//                         padding: "12px",
//                         backgroundColor: "#071D6A",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "8px",
//                         fontWeight: "bold",
//                         cursor: "pointer"
//                     }}
//                 >
//                     Save Security Settings
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SecuritySettingsUI;
