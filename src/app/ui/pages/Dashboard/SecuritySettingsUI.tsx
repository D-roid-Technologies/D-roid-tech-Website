import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { UserType } from "../../../utils/Types";
import { Shield, Check, Mail, Smartphone } from "lucide-react";
import "./SecuritySettingsUI.css";
import { authService } from "../../../redux/configuration/auth.service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

interface SecuritySettingsUIProps {
  user: UserType | null;
  onChange: Dispatch<SetStateAction<UserType | null>>;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
}

const SecuritySettingsUI: React.FC<SecuritySettingsUIProps> = ({
  user,
  onChange,
}) => {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginAlerts: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load security settings from backend on component mount
  useEffect(() => {
    loadSecuritySettings();
  }, []);

  const loadSecuritySettings = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getCurrentUser();
      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        const currentSecurity = data?.user?.security || {};

        setSecuritySettings({
          twoFactorEnabled: currentSecurity.twoFactorEnabled || false,
          loginAlerts: currentSecurity.loginAlerts || false,
        });
      }
    } catch (error) {
      console.error("Error loading security settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";
    const updatedValue = isCheckbox
      ? (target as HTMLInputElement).checked
      : value;

    const updatedSettings = {
      ...securitySettings,
      [name]: updatedValue,
    };

    setSecuritySettings(updatedSettings);

    // Update backend immediately on toggle (real-time)
    updateSecuritySettingsInBackend(updatedSettings);
  };

  const updateSecuritySettingsInBackend = async (
    settings: SecuritySettings
  ) => {
    try {
      await authService.updateSecuritySettings(settings);
      console.log("✅ Security settings updated in real-time:", settings);
    } catch (error) {
      console.error("❌ Failed to update security settings:", error);
      // Revert local state if backend update fails
      await loadSecuritySettings();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Final confirmation update
      await authService.updateSecuritySettings(securitySettings);
      console.log("✅ Final security settings saved:", securitySettings);

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Failed to save security settings:", error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="ssu-container">
        <div className="ssu-loading">
          <p>Loading security settings...</p>
        </div>
      </div>
    );
  }

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
          Improve your account's security using the settings below. Changes are
          saved automatically.
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

        {/* <div className="ssu-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="ssu-submit-btn"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Saving Settings..." : "Confirm Security Settings"}
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default SecuritySettingsUI;
