import React, { useState } from "react";
import {
  FaTasks,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaChalkboardTeacher,
  FaChartLine,
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaDollarSign,
  FaCalendar,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaBell,
  FaClipboardList,
  FaAward,
  FaUserCheck,
  FaChevronRight,
  FaDownload,
  FaPlay,
} from "react-icons/fa";
import "./StaffUserHomePage.css";
import { StatCard } from "../micro-ui/stat-card";
import { useSelector } from "react-redux";
import { UserType } from "../../../../utils/Types";
import { RootState } from "../../../../redux/Store";

// Mock StatCard component since it already exists in the project
// const StatCard = ({ title, value, change, icon: Icon, onClick }) => (
//   <div className="shp-stat-card" onClick={onClick}>
//     <div className="shp-stat-icon">
//       <Icon size={24} />
//     </div>
//     <div className="shp-stat-content">
//       <h3 className="shp-stat-title">{title}</h3>
//       <p className="shp-stat-value">{value}</p>
//       <span className="shp-stat-change">{change}</span>
//     </div>
//     <div className="shp-stat-arrow">
//       <FaChevronRight size={16} />
//     </div>
//   </div>
// );

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
};

const NotificationItem = ({
  title,
  message,
  time,
  type,
  isRead,
}: NotificationItemProps) => (
  <div className={`shp-notification-item ${isRead ? "read" : "unread"}`}>
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

const StaffUserHomePage: React.FC = () => {
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  const [currentTime] = useState(new Date());

  const dashboardStats = [
    {
      title: "Active Tasks",
      value: "8",
      change: "2 due today",
      icon: FaTasks,
      color: "blue",
    },
    {
      title: "Training Progress",
      value: "75%",
      change: "3 courses remaining",
      icon: FaGraduationCap,
      color: "green",
    },
    {
      title: "Performance Score",
      value: "4.2/5",
      change: "Above average",
      icon: FaTrophy,
      color: "gold",
    },
    {
      title: "Attendance Rate",
      value: "96%",
      change: "This month",
      icon: FaUserCheck,
      color: "purple",
    },
  ];

  const quickActions = [
    {
      title: "Clock In/Out",
      description: "Track your work hours",
      icon: FaClock,
      variant: "primary",
    },
    {
      title: "View Payslip",
      description: "Download latest payslip",
      icon: FaDownload,
      variant: "secondary",
    },
    {
      title: "Submit Timesheet",
      description: "Log your weekly hours",
      icon: FaClipboardList,
      variant: "default",
    },
    {
      title: "Start Training",
      description: "Continue learning modules",
      icon: FaPlay,
      variant: "success",
    },
  ];

  const notifications = [
    {
      title: "New Task Assigned",
      message: "Review API documentation for mobile app",
      time: "2 hours ago",
      type: "info",
      isRead: false,
    },
    {
      title: "Training Reminder",
      message: "Complete 'Workplace Safety' module by Friday",
      time: "1 day ago",
      type: "warning",
      isRead: false,
    },
    {
      title: "Payslip Available",
      message: "Your December payslip is ready for download",
      time: "3 days ago",
      type: "success",
      isRead: true,
    },
  ];

  const recentActivities = [
    {
      action: "Completed Task",
      details: "Database optimization for user module",
      time: "3 hours ago",
      icon: FaCheckCircle,
    },
    {
      action: "Started Training",
      details: "Advanced React Development Course",
      time: "1 day ago",
      icon: FaGraduationCap,
    },
    {
      action: "Submitted Report",
      details: "Weekly progress report for Project Alpha",
      time: "2 days ago",
      icon: FaFileInvoiceDollar,
    },
    {
      action: "Updated Profile",
      details: "Added new skills and certifications",
      time: "1 week ago",
      icon: FaUserPlus,
    },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">
              Your Dashboard
              {/* {currentTime.getHours() < 12
                ? "Morning"
                : currentTime.getHours() < 18
                ? "Afternoon"
                : "Evening"} */}
              {/* , {staffData.name}! */}, {userDetails.firstName}!
            </h1>
            <p className="shp-welcome-subtitle">
              {userDetails.position} • {userDetails.department}
            </p>
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="shp-section">
        <h2 className="shp-section-title">Quick Links</h2>
        <div className="shp-quick-actions-grid">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              variant={action.variant}
              onClick={() => console.log(`Clicked: ${action.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="shp-section">
        <h2 className="shp-section-title">Quick Views</h2>
        <div className="shp-stats-grid">
          {dashboardStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="shp-two-column">
        {/* Recent Activity */}
        <div className="shp-activity-section">
          <div className="shp-card">
            <div className="shp-card-header">
              <h3 className="shp-card-title">Recent Activity</h3>
              <button className="shp-view-all-btn">View All</button>
            </div>
            <div className="shp-activity-list">
              {recentActivities.map((activity, index) => (
                <RecentActivityItem
                  key={index}
                  action={activity.action}
                  details={activity.details}
                  time={activity.time}
                  icon={activity.icon}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="shp-notifications-section">
          <div className="shp-card">
            <div className="shp-card-header">
              <h3 className="shp-card-title">
                <FaBell size={18} />
                Notifications
              </h3>
              <span className="shp-notification-count">3</span>
            </div>
            <div className="shp-notifications-list">
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  title={notification.title}
                  message={notification.message}
                  time={notification.time}
                  type={notification.type}
                  isRead={notification.isRead}
                />
              ))}
            </div>
            <button className="shp-view-all-notifications">
              View All Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Staff Info Summary */}
      {/* <div className="shp-section">
        <div className="shp-staff-info-card">
          <h3 className="shp-info-title">Staff Information</h3>
          <div className="shp-info-grid">
            <div className="shp-info-item">
              <span className="shp-info-label">Employee ID:</span>
              <span className="shp-info-value">{userDetails.employeeId}</span>
            </div>
            <div className="shp-info-item">
              <span className="shp-info-label">Department:</span>
              <span className="shp-info-value">{userDetails.department}</span>
            </div>
            <div className="shp-info-item">
              <span className="shp-info-label">Position:</span>
              <span className="shp-info-value">{userDetails.position}</span>
            </div>
            <div className="shp-info-item">
              <span className="shp-info-label">Join Date:</span>
              <span className="shp-info-value">{userDetails.joinDate}</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default StaffUserHomePage;
