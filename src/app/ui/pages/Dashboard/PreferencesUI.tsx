import React, { Dispatch, SetStateAction, useState } from "react";
import { UserType } from "../../../utils/Types";
import { Globe, Palette, Bell, Clock, Check } from "lucide-react";
import "./PreferencesUI.css";

interface PreferencesUIProps {
  user: UserType | null;
  onChange: Dispatch<SetStateAction<UserType | null>>;
}

const PreferencesUI: React.FC<PreferencesUIProps> = ({ user, onChange }) => {
  const [preferences, setPreferences] = useState({
    language: "English",
    theme: "light",
    notificationPreference: "email",
    timeZone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Updated preferences:", preferences);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="pru-success-container">
        <div className="pru-success-icon">✓</div>
        <h2 className="pru-success-title">Preferences Updated!</h2>
        <p className="pru-success-message">
          Your account preferences have been saved successfully.
        </p>
        <div className="pru-reference-box">
          <strong>Current Preferences:</strong>
          <div className="pru-preferences-list">
            <div className="pru-preference-status">
              <div className="pru-preference-info">
                <Globe className="pru-preference-icon" />
                <span>Language</span>
              </div>
              <span className="pru-preference-value">
                {preferences.language}
              </span>
            </div>
            <div className="pru-preference-status">
              <div className="pru-preference-info">
                <Palette className="pru-preference-icon" />
                <span>Theme</span>
              </div>
              <span className="pru-preference-value">
                {preferences.theme === "light"
                  ? "Light Mode"
                  : preferences.theme === "dark"
                  ? "Dark Mode"
                  : "System Default"}
              </span>
            </div>
            <div className="pru-preference-status">
              <div className="pru-preference-info">
                <Bell className="pru-preference-icon" />
                <span>Notifications</span>
              </div>
              <span className="pru-preference-value">
                {preferences.notificationPreference === "email"
                  ? "Email"
                  : preferences.notificationPreference === "sms"
                  ? "SMS"
                  : "Push Notification"}
              </span>
            </div>
            <div className="pru-preference-status">
              <div className="pru-preference-info">
                <Clock className="pru-preference-icon" />
                <span>Time Zone</span>
              </div>
              <span className="pru-preference-value">
                {preferences.timeZone || "Not set"}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => setSubmitted(false)} className="pru-back-btn">
          Modify Preferences
        </button>
      </div>
    );
  }

  return (
    <div className="pru-container">
      <div className="pru-header">
        <p className="pru-title">Account Preferences</p>
        <p className="pru-subtitle">
          Customize your account to suit your needs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="pru-form">
        <div className="pru-section pru-section-preferences">
          <h3 className="pru-section-title">Customize Your Experience</h3>

          <div className="pru-preferences-grid">
            {/* Language */}
            <div className="pru-preference-card">
              <div className="pru-preference-header">
                <div className="pru-preference-icon-wrapper">
                  <Globe className="pru-feature-icon" />
                </div>
                <div className="pru-preference-content">
                  <h4 className="pru-preference-name">Preferred Language</h4>
                  <p className="pru-preference-description">
                    Choose the language for your account interface
                  </p>
                </div>
              </div>
              <select
                name="language"
                value={preferences.language}
                onChange={handleChange}
                className="pru-select"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            {/* Theme */}
            <div className="pru-preference-card">
              <div className="pru-preference-header">
                <div className="pru-preference-icon-wrapper">
                  <Palette className="pru-feature-icon" />
                </div>
                <div className="pru-preference-content">
                  <h4 className="pru-preference-name">Theme Mode</h4>
                  <p className="pru-preference-description">
                    Select your preferred visual theme
                  </p>
                </div>
              </div>
              <select
                name="theme"
                value={preferences.theme}
                onChange={handleChange}
                className="pru-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            {/* Notification Preference */}
            <div className="pru-preference-card">
              <div className="pru-preference-header">
                <div className="pru-preference-icon-wrapper">
                  <Bell className="pru-feature-icon" />
                </div>
                <div className="pru-preference-content">
                  <h4 className="pru-preference-name">
                    Notification Preference
                  </h4>
                  <p className="pru-preference-description">
                    How would you like to receive notifications?
                  </p>
                </div>
              </div>
              <select
                name="notificationPreference"
                value={preferences.notificationPreference}
                onChange={handleChange}
                className="pru-select"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
              </select>
            </div>

            {/* Time Zone */}
            <div className="pru-preference-card">
              <div className="pru-preference-header">
                <div className="pru-preference-icon-wrapper">
                  <Clock className="pru-feature-icon" />
                </div>
                <div className="pru-preference-content">
                  <h4 className="pru-preference-name">Time Zone</h4>
                  <p className="pru-preference-description">
                    Set your local time zone for accurate scheduling
                  </p>
                </div>
              </div>
              <input
                type="text"
                name="timeZone"
                placeholder="e.g. GMT+1, PST, IST"
                value={preferences.timeZone}
                onChange={handleChange}
                className="pru-input"
              />
            </div>
          </div>
        </div>

        <div className="pru-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="pru-submit-btn"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Saving Preferences..." : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesUI;

// import React, { Dispatch, SetStateAction, useState } from 'react'
// import { UserType } from '../../../utils/Types'

// interface PreferencesUIProps {
//     user: UserType | null,
//     onChange: Dispatch<SetStateAction<UserType | null>>
// }

// const PreferencesUI: React.FC<PreferencesUIProps> = ({ user, onChange }) => {
//     const [preferences, setPreferences] = useState({
//         language: "English",
//         theme: "light",
//         notificationPreference: "email",
//         timeZone: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setPreferences(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = () => {
//         console.log("Updated preferences:", preferences);
//         alert("Preferences updated successfully.");
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//             <h2 style={{ color: "#000000" }}>Account Preferences</h2>
//             <p style={{ fontSize: "14px", color: "#555" }}>
//                 Customize your account to suit your needs.
//             </p>

//             <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
//                 {/* Language */}
//                 <label
//                     style={{
//                         padding: '12px',
//                         borderRadius: '8px',
//                         border: '1px solid #ccc',
//                         fontSize: '14px',
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         color: "#000000",
//                         backgroundColor: "#ffffff"
//                     }}>
//                     <p>Preferred Language:</p>
//                     <select name="language" value={preferences.language} onChange={handleChange}
//                         style={{
//                             padding: '12px',
//                             borderRadius: '8px',
//                             border: '1px solid #ccc',
//                             fontSize: '14px',
//                         }}>
//                         <option value="English">English</option>
//                         <option value="French">French</option>
//                         <option value="Spanish">Spanish</option>
//                     </select>
//                 </label>

//                 {/* Theme */}
//                 <label
//                     style={{
//                         padding: '12px',
//                         borderRadius: '8px',
//                         border: '1px solid #ccc',
//                         fontSize: '14px',
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         color: "#000000",
//                         backgroundColor: "#ffffff"
//                     }}>
//                     <p>Theme Mode:</p>
//                     <select name="theme" value={preferences.theme} onChange={handleChange}
//                         style={{
//                             padding: '12px',
//                             borderRadius: '8px',
//                             border: '1px solid #ccc',
//                             fontSize: '14px',
//                         }}>
//                         <option value="light">Light</option>
//                         <option value="dark">Dark</option>
//                         <option value="system">System Default</option>
//                     </select>
//                 </label>

//                 {/* Notification Preference */}
//                 <label
//                     style={{
//                         padding: '12px',
//                         borderRadius: '8px',
//                         border: '1px solid #ccc',
//                         fontSize: '14px',
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         color: "#000000",
//                         backgroundColor: "#ffffff"
//                     }}>
//                     <p>Notification Preference:</p>
//                     <select
//                         name="notificationPreference"
//                         value={preferences.notificationPreference}
//                         onChange={handleChange}
//                         style={{
//                             padding: '12px',
//                             borderRadius: '8px',
//                             border: '1px solid #ccc',
//                             fontSize: '14px',
//                         }}
//                     >
//                         <option value="email">Email</option>
//                         <option value="sms">SMS</option>
//                         <option value="push">Push Notification</option>
//                     </select>
//                 </label>

//                 {/* Time Zone */}
//                 <label
//                     style={{
//                         padding: '12px',
//                         borderRadius: '8px',
//                         border: '1px solid #ccc',
//                         fontSize: '14px',
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         color: "#000000",
//                         backgroundColor: "#ffffff"
//                     }}>
//                     <p>Time Zone:</p>
//                     <input
//                         type="text"
//                         name="timeZone"
//                         placeholder="e.g. GMT+1, PST, IST"
//                         value={preferences.timeZone}
//                         onChange={handleChange}
//                         style={{
//                             padding: '12px',
//                             borderRadius: '8px',
//                             border: '1px solid #ccc',
//                             fontSize: '14px',
//                         }}
//                     />
//                 </label>

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
//                     Save Preferences
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PreferencesUI;
