import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setConnectedApps,
  toggleApp,
} from "../../../redux/slices/affiliatedAppsSlice";
import { AppDispatch, store } from "../../../redux/Store";
import { Check } from "lucide-react";
import "./AffiliatedApps.css";
import { authService } from "../../../redux/configuration/auth.service";

interface ConnectedAppsState {
  knowledgeCity: boolean;
  nerves: boolean;
  muzik: boolean;
}

const AffiliatedApps: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [connectedApps, setConnectedAppsState] = useState<ConnectedAppsState>({
    knowledgeCity: false,
    nerves: false,
    muzik: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (app: keyof ConnectedAppsState) => {
    setConnectedAppsState((prev) => ({
      ...prev,
      [app]: !prev[app],
    }));
    store.dispatch(toggleApp(app));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(async () => {
      dispatch(setConnectedApps(connectedApps));
      await authService.updateAffiliatesData(connectedApps)
      console.log(connectedApps);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="afa-success-container">
        <div className="afa-success-icon">✓</div>
        <h2 className="afa-success-title">Settings Updated Successfully!</h2>
        <p className="afa-success-message">
          Your connected applications preferences have been saved.
        </p>
        <div className="afa-reference-box">
          <strong>Connected Apps Status:</strong>
          <div className="afa-apps-list">
            <div className="afa-app-status">
              <span>Knowledge City:</span>
              <span
                className={
                  connectedApps.knowledgeCity
                    ? "afa-status-active"
                    : "afa-status-inactive"
                }
              >
                {connectedApps.knowledgeCity ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="afa-app-status">
              <span>Nerves:</span>
              <span
                className={
                  connectedApps.nerves
                    ? "afa-status-active"
                    : "afa-status-inactive"
                }
              >
                {connectedApps.nerves ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="afa-app-status">
              <span>Muzik:</span>
              <span
                className={
                  connectedApps.muzik
                    ? "afa-status-active"
                    : "afa-status-inactive"
                }
              >
                {connectedApps.muzik ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => setSubmitted(false)} className="afa-back-btn">
          Modify Settings
        </button>
      </div>
    );
  }

  return (
    <div className="afa-container">
      <div className="afa-header">
        <p className="afa-title">Connected Applications</p>
        <p className="afa-subtitle">
          Toggle access to applications connected to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="afa-form">
        <div className="afa-section afa-section-apps">
          <h3 className="afa-section-title">Manage Your Apps</h3>

          <div className="afa-apps-grid">
            {[
              {
                name: "Knowledge City",
                key: "knowledgeCity",
                description: "Access to learning and educational resources",
              },
              {
                name: "Nerves",
                key: "nerves",
                description:
                  "Professional networking and collaboration platform",
              },
              {
                name: "Muzik",
                key: "muzik",
                description: "Music streaming and entertainment services",
              },
            ].map(({ name, key, description }) => (
              <div
                key={key}
                className={`afa-app-card ${connectedApps[key as keyof ConnectedAppsState]
                  ? "afa-app-card-active"
                  : ""
                  }`}
              >
                <div className="afa-app-header">
                  <div className="afa-app-info">
                    <h4 className="afa-app-name">{name}</h4>
                    <p className="afa-app-description">{description}</p>
                  </div>
                  <div className="afa-toggle-wrapper">
                    <label className="afa-toggle-label">
                      <input
                        type="checkbox"
                        checked={connectedApps[key as keyof ConnectedAppsState]}
                        onChange={() =>
                          handleToggle(key as keyof ConnectedAppsState)
                        }
                        className="afa-toggle-input"
                      />
                      <span className="afa-toggle-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="afa-app-status-badge">
                  {connectedApps[key as keyof ConnectedAppsState] ? (
                    <span className="afa-badge-connected">
                      <Check className="afa-badge-icon" />
                      Connected
                    </span>
                  ) : (
                    <span className="afa-badge-disconnected">Disconnected</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="afa-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="afa-submit-btn"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Saving Changes..." : "Save Connected Apps"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AffiliatedApps;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setConnectedApps, toggleApp } from '../../../redux/slices/affiliatedAppsSlice';
// import { AppDispatch, store } from '../../../redux/Store';

// interface ConnectedAppsState {
//     knowledgeCity: boolean;
//     nerves: boolean;
//     muzik: boolean;
// }

// const AffiliatedApps: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [connectedApps, setConnectedAppsState] = useState({
//         knowledgeCity: false,
//         nerves: false,
//         muzik: false,
//     });

//     // const handleToggle = (app: keyof typeof connectedApps) => {

//     // };

//     const handleToggle = (app: keyof ConnectedAppsState) => {
//         setConnectedAppsState(prev => ({
//             ...prev,
//             [app]: !prev[app],
//         }));
//         store.dispatch(toggleApp(app));
//     };

//     const handleSubmit = () => {
//         dispatch(setConnectedApps(connectedApps))
//         console.log(connectedApps)
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//             <h2 style={{ color: "#000000" }}>Connected Applications</h2>
//             <p style={{ fontSize: "14px", color: "#555" }}>
//                 Toggle access to applications connected to your account.
//             </p>

//             <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
//                 {[
//                     { name: 'Knowledge City', key: 'knowledgeCity' },
//                     { name: 'Nerves', key: 'nerves' },
//                     { name: 'Muzik', key: 'muzik' },
//                 ].map(({ name, key }) => (
//                     <label
//                         key={key}
//                         style={{
//                             padding: '12px',
//                             borderRadius: '8px',
//                             border: '1px solid #ccc',
//                             fontSize: '14px',
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             color: "#000000",
//                             backgroundColor: "#ffffff"
//                         }}>
//                         <span>{name}</span>
//                         <input
//                             type="checkbox"
//                             checked={connectedApps[key as keyof typeof connectedApps]}
//                             onChange={() => handleToggle(key as keyof typeof connectedApps)}
//                             style={{ transform: 'scale(1.2)' }}
//                         />
//                     </label>
//                 ))}

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
//                     Save Connected Apps
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AffiliatedApps;
