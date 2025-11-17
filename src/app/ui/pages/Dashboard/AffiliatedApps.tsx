import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setConnectedApps,
  toggleApp,
} from "../../../redux/slices/affiliatedAppsSlice";
import { AppDispatch, store } from "../../../redux/Store";
import { Check } from "lucide-react";
import "./AffiliatedApps.css";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { authService } from "../../../redux/configuration/auth.service";
import { db } from "../../../../firebase";

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
  const [initialLoad, setInitialLoad] = useState(true);

  // Load initial state from backend
  useEffect(() => {
    const loadAffiliatesData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) return;

        const userId = currentUser.uid;
        const userDocRef = doc(db, "droidaccount", userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const affiliates = userData?.user?.affiliates || {};

          setConnectedAppsState({
            knowledgeCity: affiliates.knowledgeCity?.user || false,
            nerves: affiliates.nerves?.user || false,
            muzik: affiliates.muzik?.user || false,
          });
        }
      } catch (error) {
        console.error("Failed to load affiliates data:", error);
      } finally {
        setInitialLoad(false);
      }
    };

    loadAffiliatesData();
  }, []);

  const handleToggle = async (app: keyof ConnectedAppsState) => {
    const newValue = !connectedApps[app];
    const newState = {
      ...connectedApps,
      [app]: newValue,
    };

    setConnectedAppsState(newState);
    store.dispatch(toggleApp(app));

    // Update immediately in Firestore when toggled
    try {
      const updateData: any = {};
      updateData[app] = { user: newValue };

      // Add app-specific data structure when connecting
      if (newValue) {
        if (app === "knowledgeCity") {
          updateData.knowledgeCity = {
            user: true,
            kCoin: {
              amount: 0,
              storeCardDetails: false,
              mineCoins: {
                numberOfReferals: 0,
                numberOfAdsWatched: 0,
              },
            },
            courses: [],
            notifications: [],
            schedules: [],
            diaries: [
              {
                diaryTitle: "The Diary Platform",
                description: "Tell us your thoughts",
                startDate: new Date().toISOString(),
                endDate: new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
              },
            ],
            lunchBox: {
              events: [
                {
                  eventTitle: "D'roid Technologies - Chess Marathon",
                  description: "The Chess Marathon of the year",
                  imageLink: "",
                  attendees: 0,
                  createdTime: new Date().toLocaleTimeString(),
                  createdDate: new Date().toLocaleDateString(),
                },
              ],
              jobs: [
                {
                  jobTitle: "Front-End Developer - React Js",
                  description:
                    "We are looking for a front end developer in React Js",
                  imageLink: "",
                  peopleApplied: 0,
                  createdTime: new Date().toLocaleTimeString(),
                  createdDate: new Date().toLocaleDateString(),
                },
              ],
            },
          };
        } else if (app === "nerves") {
          updateData.nerves = {
            user: true,
            connections: [],
            posts: [],
            preferences: {
              notifications: true,
              emailUpdates: false,
            },
          };
        } else if (app === "muzik") {
          updateData.muzik = {
            user: true,
            playlists: [],
            favorites: [],
            preferences: {
              autoPlay: true,
              quality: "high",
            },
          };
        }
      }

      await authService.updateAffiliatesData(updateData);

      // toast.success(
      //   `${app} ${newValue ? "connected" : "disconnected"} successfully`,
      //   {
      //     style: { background: "#4BB543", color: "#fff" },
      //   }
      // );
    } catch (error) {
      console.error("Failed to update app connection:", error);
      // Revert state if update fails
      setConnectedAppsState((prev) => ({
        ...prev,
        [app]: !prev[app],
      }));

      toast.error(`Failed to update ${app} connection`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update all apps at once to ensure consistency
      const affiliatesData = {
        knowledgeCity: {
          user: connectedApps.knowledgeCity,
          ...(connectedApps.knowledgeCity && {
            kCoin: {
              amount: 0,
              storeCardDetails: false,
              mineCoins: {
                numberOfReferals: 0,
                numberOfAdsWatched: 0,
              },
            },
            courses: [],
            notifications: [],
            schedules: [],
            diaries: [
              {
                diaryTitle: "The Diary Platform",
                description: "Tell us your thoughts",
                startDate: new Date().toISOString(),
                endDate: new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
              },
            ],
            lunchBox: {
              events: [
                {
                  eventTitle: "D'roid Technologies - Chess Marathon",
                  description: "The Chess Marathon of the year",
                  imageLink: "",
                  attendees: 0,
                  createdTime: new Date().toLocaleTimeString(),
                  createdDate: new Date().toLocaleDateString(),
                },
              ],
              jobs: [
                {
                  jobTitle: "Front-End Developer - React Js",
                  description:
                    "We are looking for a front end developer in React Js",
                  imageLink: "",
                  peopleApplied: 0,
                  createdTime: new Date().toLocaleTimeString(),
                  createdDate: new Date().toLocaleDateString(),
                },
              ],
            },
          }),
        },
        nerves: {
          user: connectedApps.nerves,
          ...(connectedApps.nerves && {
            connections: [],
            posts: [],
            preferences: {
              notifications: true,
              emailUpdates: false,
            },
          }),
        },
        muzik: {
          user: connectedApps.muzik,
          ...(connectedApps.muzik && {
            playlists: [],
            favorites: [],
            preferences: {
              autoPlay: true,
              quality: "high",
            },
          }),
        },
      };

      await authService.updateAffiliatesData(affiliatesData);
      dispatch(setConnectedApps(connectedApps));

      console.log("Connected apps updated:", connectedApps);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save connected apps settings", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="afa-container">
        <div className="afa-loading">
          <p>Loading your connected apps...</p>
        </div>
      </div>
    );
  }

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
                className={`afa-app-card ${
                  connectedApps[key as keyof ConnectedAppsState]
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
