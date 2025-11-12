import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import { LocationState, UserType } from "../../../utils/Types";
import { IoMdMenu } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { Modal } from "./micro-ui/modal";
import { setNotifications } from "../../../redux/slices/notificationSlice";
import { getRelativeTime } from "../../../utils/timeUtils";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string | null>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  isRead: boolean;
  date: string;
};

type NotificationItemProps = {
  title: string;
  message: string;
  time: string;
  type: string;
  isRead: boolean;
  onClick?: () => void;
};

const NotificationItem = ({
  title,
  message,
  time,
  type,
  isRead,
  onClick,
}: NotificationItemProps) => (
  <div
    className={`shp-notification-item ${isRead ? "read" : "unread"}`}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <div className={`shp-notification-indicator ${type}`}></div>
    <div className="shp-notification-content">
      <h5 className="shp-notification-title">{title}</h5>
      <p className="shp-notification-message">{message}</p>
      <span className="shp-notification-time">{time}</span>
    </div>
  </div>
);

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  toggleSidebar,
  setSelectedMenu,
  setIsSidebarOpen,
}) => {
  const location: LocationState = useSelector(
    (state: RootState) => state.location
  );
  const userDetails: UserType = useSelector((state: RootState) => state.user);

  // Notifications
  const notifications = useSelector(
    (state: RootState) => state.notifications as Notification[]
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // --- Notification Handlers ---
  const handleNotificationClick = (notificationTitle: string) => {
    if (notificationTitle === "Complete Your Profile") {
      setSelectedMenu("Personal Details");
    } else {
      setSelectedMenu("Notifications");
    }
    setNotificationModalOpen(false);
    setIsSidebarOpen(true); // ✅ Open sidebar when notification is clicked
  };

  const handleViewAllNotification = () => {
    setSelectedMenu("Notifications");
    setNotificationModalOpen(false);
    setIsSidebarOpen(true); // ✅ Open sidebar to show notifications
  };

  // --- Add auto-profile reminder notification ---
  useEffect(() => {
    const profileUpdated = localStorage.getItem("profileUpdated");
    const now = new Date();

    if (!profileUpdated) {
      const profileNotificationExists = notifications.some(
        (n) => n.title === "Complete Your Profile"
      );

      if (!profileNotificationExists) {
        const newNotification = {
          id: Date.now(),
          title: "Complete Your Profile",
          message:
            "Please update your profile information to get the most out of your membership.",
          date: new Date().toISOString().split("T")[0],
          time: getRelativeTime(now),
          type: "warning",
          isRead: false,
        };

        store.dispatch(setNotifications([newNotification, ...notifications]));
      }
    } else {
      const filtered = notifications.filter(
        (n) => n.title !== "Complete Your Profile"
      );
      if (filtered.length !== notifications.length) {
        store.dispatch(setNotifications(filtered));
      }
    }
  }, [notifications]);

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <button className="mobile-menu-button" onClick={toggleSidebar}>
          <IoMdMenu size={24} />
        </button>

        <h2 className="header-title">D'roid One</h2>

        <div className="header-user-info">
          <span className="location-info">{location.principalSubdivision}</span>

          {/* 🔔 Notifications Section */}
          <div
            className="shp-head-icons"
            onClick={() => setNotificationModalOpen(true)}
            style={{ position: "relative", marginRight: "10px" }}
          >
            <IoIosNotifications
              size={20}
              style={{ color: "white", fontWeight: "bold" }}
            />
            {unreadNotificationsCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  fontWeight: "bold",
                  minWidth: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid white",
                }}
              >
                {unreadNotificationsCount}
              </span>
            )}

            {/* Notification Modal */}
            <Modal
              isOpen={notificationModalOpen}
              onClose={() => setNotificationModalOpen(false)}
              title=""
              description=""
            >
              <div className="shp-card-header">
                <h3 className="shp-card-title">
                  <FaBell size={18} />
                  Member Notifications
                </h3>
                <span className="shp-notification-count">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              </div>

              <div className="shp-notifications-list">
                {[...notifications].reverse().map((notification, index) => {
                  // Convert ISO string time to relative time for display, or use existing relative time
                  let notificationTime = notification.time || "Just now";
                  if (notification.time) {
                    try {
                      // Try to parse as ISO string date
                      const timeDate = new Date(notification.time);
                      if (!isNaN(timeDate.getTime())) {
                        // Valid ISO date, convert to relative time
                        notificationTime = getRelativeTime(timeDate);
                      } else {
                        // Already a relative time string, use as is
                        notificationTime = notification.time;
                      }
                    } catch (e) {
                      // If parsing fails, assume it's already a relative time string
                      notificationTime = notification.time;
                    }
                  }
                  
                  return (
                    <NotificationItem
                      key={index}
                      title={notification.title}
                      message={notification.message}
                      time={notificationTime}
                      type={notification.type}
                      isRead={notification.isRead}
                      onClick={() =>
                        handleNotificationClick(notification.title)
                      }
                    />
                  );
                })}
              </div>

              <button
                className="shp-view-all-notifications"
                onClick={handleViewAllNotification}
              >
                View All Notifications
              </button>
            </Modal>
          </div>

          {/* 👤 User Avatar */}
          <div className="user-avatar">{userDetails.initials}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
