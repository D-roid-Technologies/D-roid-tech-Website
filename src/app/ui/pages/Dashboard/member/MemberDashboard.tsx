"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState, store } from "../../../../redux/Store";

import {
  FaUser,
  FaCalendarAlt,
  FaBell,
  FaServicestack,
  FaBriefcase,
  FaToolbox,
  FaBullhorn,
  FaCommentDots,
} from "react-icons/fa";

import { StatCard } from "../micro-ui/stat-card";
import { FiActivity } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { Modal } from "../micro-ui/modal";
import { FaPenToSquare } from "react-icons/fa6";
import { eventsPosts } from "../../../../utils/blogpost";
import { updateStat } from "../../../../redux/slices/memberStatus";
import EventPosts from "../../../components/blogPosts/Events";
import { setNotifications } from "../../../../redux/slices/notificationSlice";
import { getRelativeTime } from "../../../../utils/timeUtils";

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  variant?: string;
};

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
}: QuickActionCardProps) => (
  <div className={`shp-quick-action ${variant}`} onClick={onClick}>
    <div className="shp-action-icon">
      <Icon size={20} />
    </div>
    <div className="shp-action-content">
      <h4 className="shp-action-title">{title}</h4>
      <p className="shp-action-description">{description}</p>
    </div>
  </div>
);

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

type RecentActivityItemProps = {
  action: string;
  details: string;
  time: string;
  icon: React.ComponentType<{ size?: number }>;
};

const RecentActivityItem = ({
  action,
  details,
  time,
  icon: Icon,
}: RecentActivityItemProps) => (
  <div className="shp-activity-item">
    <div className="shp-activity-icon">
      <Icon size={16} />
    </div>
    <div className="shp-activity-content">
      <p className="shp-activity-action">{action}</p>
      <p className="shp-activity-details">{details}</p>
      <span className="shp-activity-time">{time}</span>
    </div>
  </div>
);

type MemberDashboardProps = {
  setSelectedMenu: React.Dispatch<React.SetStateAction<string | null>>;
};

const MemberDashboard: React.FC<MemberDashboardProps> = ({
  setSelectedMenu,
}) => {
  const [currentTime] = useState(new Date());
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  const [statModalOpen, setStatModalOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<{
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType;
  } | null>(null);

  const memberStats = useSelector((state: RootState) => state.memberStatus);

  type Notification = {
    title: string;
    message: string;
    time: string;
    type: string;
    isRead: boolean;
    id: number
    date: string
  };
  const notifications = useSelector(
    (state: RootState) => state.notifications as Notification[]
  );
  const user = useSelector((state: RootState) => state.user);
  const trainings = useSelector((state: RootState) => state.trainings as any[]);
  const progression = useSelector(
    (state: RootState) =>
      (state as any).progression as { currentPosition?: string }
  );
  const membershipTier = useSelector(
    (state: RootState) =>
      (state as any).membershipTier as { tier?: string; nextTier?: string }
  );

  const memberQuickActions = [
    {
      title: "Personal Details",
      description: "View and update your profile information",
      icon: FaUser,
      variant: "primary",
      
    },
    {
      title: "Services",
      description: "Explore available member services",
      icon: FaServicestack,
      variant: "secondary",
    },
    {
      title: "Careers",
      description: "Access job opportunities and career resources",
      icon: FaBriefcase,
      variant: "success",
    },
    {
      title: "Schedules",
      description: "Check and manage your upcoming schedules",
      icon: FaCalendarAlt,
      variant: "default",
    },
    {
      title: "Tool Box",
      description: "Access calculators and useful member tools",
      icon: FaToolbox,
      variant: "primary",
    },
    // {
    //   title: "Announcements",
    //   description: "Stay updated with the latest news",
    //   icon: FaBullhorn,
    //   variant: "secondary",
    // },
    {
      title: "Say It",
      description: "Share feedback, suggestions, or reports",
      icon: FaCommentDots,
      variant: "success",
    },
    {
      title: "Take Test",
      description: "Find out if you're ready for your next interview. ",
      icon: FaPenToSquare,
      variant: "secondary",
    },
  ];

  const memberActivities = [
    {
      action: "Profile Updated",
      details: "Changed contact information",
      time: "2 days ago",
      icon: FaUser,
    },
    {
      action: "Service Accessed",
      details: "Requested training support service",
      time: "5 days ago",
      icon: FaServicestack,
    },
    {
      action: "Career Application",
      details: "Applied for Software Developer role",
      time: "1 week ago",
      icon: FaBriefcase,
    },
    {
      action: "Schedule Added",
      details: "Booked mentoring session with advisor",
      time: "2 weeks ago",
      icon: FaCalendarAlt,
    },
    {
      action: "Announcement Read",
      details: "Checked notice on policy updates",
      time: "3 weeks ago",
      icon: FaBullhorn,
    },
    {
      action: "Feedback Submitted",
      details: "Shared feedback on member portal",
      time: "1 month ago",
      icon: FaCommentDots,
    },
  ];

  const unreadNotificationsCount = notifications.filter(
    (n) => !n.isRead
  ).length;
  const recentActivitiesCount = memberActivities.length;

  const activityToMenu: Record<string, string> = {
    "Profile Updated": "Personal Details",
    "Service Accessed": "Services",
    "Career Application": "Careers",
    "Schedule Added": "Schedules",
    "Notifications Read": "Notifications",
    "Feedback Submitted": "Say It",
  };

  const handleActivityClick = (action: string) => {
    const menu = activityToMenu[action];
    if (menu) {
      setSelectedMenu(menu);
      setNotesModalOpen(false);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notificationTitle: string) => {
    if (notificationTitle === "Complete Your Profile") {
      setSelectedMenu("Personal Details");
      setNotificationModalOpen(false);
    } else {
      // For all other notifications (including task notifications), navigate to Notifications page
      setSelectedMenu("Notifications");
      setNotificationModalOpen(false);
    }
  };
  const handleViewAllNotification = () => {
    setSelectedMenu("Notifications");
    setNotificationModalOpen(false);
  };

  // 🔥 NEW: Handle stat card click
  const handleStatClick = (stat: (typeof memberStats)[0]) => {
    setSelectedStat(stat);
    setStatModalOpen(true);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    const profileUpdated = localStorage.getItem("profileUpdated");
const now = new Date();
    if (!profileUpdated) {
      // Check if the notification already exists to avoid duplicates
      const profileUpdateNotificationExists = notifications.some(
        (n) => n.title === "Complete Your Profile"
      );

      if (!profileUpdateNotificationExists) {
        const newNotification = {
          id: Date.now(), // Generate unique ID using timestamp
          title: "Complete Your Profile",
          message:
            "Please update your profile information to get the most out of your membership.",
          date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
          time: getRelativeTime(now),
          type: "warning",
          isRead: false,
        };

        // Add the notification to the existing notifications
        store.dispatch(setNotifications([newNotification, ...notifications]));
      }
    } else {
      // Profile is updated, remove the notification if it exists
      const filteredNotifications = notifications.filter(
        (n) => n.title !== "Complete Your Profile"
      );

      // Only update if the notification was actually removed
      if (filteredNotifications.length !== notifications.length) {
        store.dispatch(setNotifications(filteredNotifications));
      }
    }
  }, [notifications]); // Re-run when notifications change to detect profile updates

  useEffect(() => {
    // Membership Status
    const membershipStatus = user?.isLoggedIn ? "Active" : "Inactive";

    const getYear = (d?: string) => {
      if (!d) return undefined;
      const dt = new Date(d);
      if (!isNaN(dt.getTime())) return String(dt.getFullYear());
      const m = d.match(/\d{4}/);
      return m ? m[0] : undefined;
    };
    const joinYear =
      getYear(user?.joinDate) ||
      getYear((user as any)?.dateOfRegistration) ||
      String(new Date().getFullYear());
    const statusChange = `Member since ${joinYear}`;
    store.dispatch(
      updateStat({ index: 0, value: membershipStatus, change: statusChange })
    );

    // Points Balance (from performanceScore)
    const points =
      typeof user?.performanceScore === "number" ? user.performanceScore : 0;
    store.dispatch(
      updateStat({
        index: 1,
        value: String(points),
        change: `${points || 0} points earned this week`,
      })
    );

    // Events Attended (completed trainings)
    const eventsAttended = Array.isArray(trainings)
      ? trainings.filter((t: any) => t?.completed).length
      : 0;
    store.dispatch(
      updateStat({
        index: 2,
        value: String(eventsAttended),
        change: `${eventsAttended || 0} events this quarter`,
      })
    );

    // Member Level (from membershipTier slice)
    const tier = membershipTier?.tier || "Gold";
    const nextTier = membershipTier?.nextTier;
    store.dispatch(
      updateStat({
        index: 3,
        value: tier,
        change: nextTier ? `Next level: ${nextTier}` : "",
      })
    );
  }, [user, trainings, membershipTier]);

  const getStatDetails = (title: string) => {
    switch (title) {
      case "Membership Status":
        return {
          description:
            "Your current membership status and standing with the organization.",
          // history: [
          //   { date: "Jan 2023", event: "Membership Activated" },
          //   { date: "Jun 2023", event: "Upgraded to Silver" },
          //   { date: "Dec 2023", event: "Status: Active" },
          // ],
        };
      case "Points Balance":
        return {
          description:
            "Accumulated points from events, activities, and contributions.",
          history: [
            {
              date: "This Week",
              event: `Earned ${user?.performanceScore || 0} points`,
            },
            { date: "Last Month", event: "Redeemed 500 points" },
            { date: "3 Months Ago", event: "Bonus: 200 points" },
          ],
        };
      case "Events Attended":
        return {
          description:
            "Total events and training sessions you've participated in.",
          history: trainings
            .filter((t: any) => t?.completed)
            .slice(0, 5)
            .map((t: any) => ({
              date: t.date || "Recent",
              event: t.name || "Training Session",
            })),
        };
      case "Member Level":
        return {
          description:
            "Your membership tier and progress toward the next level.",
          history: [
            {
              date: "Current",
              event: `${membershipTier?.tier || "Gold"} Member`,
            },
            {
              date: "Next Goal",
              event: membershipTier?.nextTier || "Platinum",
            },
            { date: "Requirements", event: "Complete 5 more events" },
          ],
        };
      default:
        return { description: "", history: [] };
    }
  };

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">Member Portal</h1>
            <div className="shp-head-icons-container">
              {/* Notifications */}
              <div
                className="shp-head-icons"
                onClick={() => setNotificationModalOpen(true)}
                style={{ position: "relative" }}
              >
                <p>Notifications</p>
                <IoIosNotifications
                  style={{ color: "red", fontWeight: "bold" }}
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
                    {[...notifications].reverse().map((notification, index) => (
                      <NotificationItem
                        key={index}
                        title={notification.title}
                        message={notification.message}
                        time={notification.time}
                        type={notification.type}
                        isRead={notification.isRead}
                        onClick={() =>
                          handleNotificationClick(notification.title)
                        }
                      />
                    ))}
                  </div>
                  <button
                    className="shp-view-all-notifications"
                    onClick={() => handleViewAllNotification()}
                  >
                    View All Notifications
                  </button>
                </Modal>
              </div>
              {/* <div className="shp-head-icons" onClick={() => setNotesModalOpen(true)} style={{ position: "relative" }}>
                <p>Activities</p>
                <FiActivity style={{ color: "green", fontWeight: "bold" }} />
                {recentActivitiesCount > 0 && (
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
                    {recentActivitiesCount}
                  </span>
                )}
                <Modal
                  isOpen={notesModalOpen}
                  onClose={() => setNotesModalOpen(false)}
                  title="Activities"
                  description=""
                >
                  <div className="shp-card-header">
                    <h3 className="shp-card-title">Recent Member Activity</h3>
                    <button className="shp-view-all-btn">View All</button>
                  </div>
                  <div className="shp-activity-list">
                    {memberActivities.map((activity, index) => (
                      <div key={index} onClick={() => handleActivityClick(activity.action)} style={{ cursor: "pointer" }}>
                        <RecentActivityItem
                          action={activity.action}
                          details={activity.details}
                          time={activity.time}
                          icon={activity.icon}
                        />
                      </div>
                    ))}
                  </div>
                </Modal>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* Member Stats */}
      <div className="shp-section">
        <h2 className="shp-section-title">Membership Overview</h2>
        <div className="shp-stats-grid">
          {memberStats
            .filter(
              (s) =>
                s.title !== "Points Balance" && s.title !== "Events Attended"
            )
            .map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                onClick={() => handleStatClick(stat)} // 🔥 IMPROVED: Opens modal with stat details
              />
            ))}
        </div>
      </div>
      <Modal
        isOpen={statModalOpen}
        onClose={() => setStatModalOpen(false)}
        description=""
        title=""
      >
        {selectedStat && (
          <div style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {selectedStat.icon && <selectedStat.icon />}
              <div>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
                  {selectedStat.title}
                </h2>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#2563eb",
                  }}
                >
                  {selectedStat.value}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {selectedStat.change}
              </p>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Details
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                {getStatDetails(selectedStat.title).description}
              </p>

              {/* <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>Recent History</h4> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {getStatDetails?.(selectedStat?.title).history?.map(
                  (item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "6px",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        {item.event}
                      </span>
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        {item.date}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Member Quick Actions */}
      <div className="shp-section">
        <h2 className="shp-section-title">Quick Actions</h2>
        <div className="shp-quick-actions-grid">
          {memberQuickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              variant={action.variant}
              onClick={() => setSelectedMenu(action.title)}
            />
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <h2 className="shp-section-title">Our Events</h2>
        <div className="shp-two-column">
          <EventPosts posts={eventsPosts} />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
