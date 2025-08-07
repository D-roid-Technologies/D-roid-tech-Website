import React, { useState } from "react";
import {
  FaChalkboard,
  FaUsers,
  FaBookOpen,
  FaWallet,
  FaGraduationCap,
  FaCalendar,
  FaTasks,
  FaClipboardList,
  FaUserGraduate,
  FaCheckCircle,
  FaClock,
  FaBell,
  FaChevronRight,
  FaDownload,
  FaPlus,
  FaEye,
  FaChartLine,
  FaTrophy,
  FaSchool,
} from "react-icons/fa";
import "../staff/StaffUserHomePage.css";
import { StatCard } from "../micro-ui/stat-card";
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

const SchoolDashboard: React.FC = () => {
  const [currentTime] = useState(new Date());

  const schoolStats = [
    {
      title: "Total Students",
      value: "1,245",
      change: "45 new admissions",
      icon: FaUserGraduate,
      color: "blue",
    },
    {
      title: "Teaching Staff",
      value: "78",
      change: "5 new teachers",
      icon: FaUsers,
      color: "green",
    },
    {
      title: "Active Classes",
      value: "32",
      change: "All sessions running",
      icon: FaChalkboard,
      color: "purple",
    },
    {
      title: "Library Books",
      value: "8,450",
      change: "200 new additions",
      icon: FaBookOpen,
      color: "orange",
    },
  ];

  const schoolQuickActions = [
    {
      title: "Classroom Management",
      description: "Manage classes and schedules",
      icon: FaChalkboard,
      variant: "primary",
    },
    {
      title: "Staff Directory",
      description: "View and manage teaching staff",
      icon: FaUsers,
      variant: "secondary",
    },
    {
      title: "Library System",
      description: "Manage books and resources",
      icon: FaBookOpen,
      variant: "success",
    },
    {
      title: "Financial Management",
      description: "Track fees and expenses",
      icon: FaWallet,
      variant: "default",
    },
    {
      title: "Student Records",
      description: "Manage student information",
      icon: FaUserGraduate,
      variant: "primary",
    },
    {
      title: "Academic Reports",
      description: "Generate performance reports",
      icon: FaChartLine,
      variant: "secondary",
    },
  ];

  const schoolNotifications = [
    {
      title: "Parent-Teacher Meeting",
      message: "Scheduled for Grade 10 students this Friday",
      time: "1 hour ago",
      type: "info",
      isRead: false,
    },
    {
      title: "New Student Admission",
      message: "5 new students enrolled in Grade 8",
      time: "3 hours ago",
      type: "success",
      isRead: false,
    },
    {
      title: "Library Book Return",
      message: "15 books overdue, reminders sent to students",
      time: "1 day ago",
      type: "warning",
      isRead: true,
    },
    {
      title: "Fee Collection Update",
      message: "Monthly fee collection completed for 95% students",
      time: "2 days ago",
      type: "success",
      isRead: true,
    },
  ];

  const schoolActivities = [
    {
      action: "Class Scheduled",
      details: "Mathematics exam scheduled for Grade 12 next week",
      time: "2 hours ago",
      icon: FaCalendar,
    },
    {
      action: "New Teacher Joined",
      details: "Ms. Sarah Wilson joined as English Literature teacher",
      time: "1 day ago",
      icon: FaUsers,
    },
    {
      action: "Library Updated",
      details: "Added 50 new science textbooks to the collection",
      time: "3 days ago",
      icon: FaBookOpen,
    },
    {
      action: "Student Achievement",
      details: "Grade 11 students won inter-school science competition",
      time: "1 week ago",
      icon: FaTrophy,
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
              School Management System
            </h1>
            
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* School Quick Actions */}
      <div className="shp-section">
        <h2 className="shp-section-title">Quick Actions
</h2>
        <div className="shp-quick-actions-grid">
          {schoolQuickActions.map((action, index) => (
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

      {/* School Stats */}
      <div className="shp-section">
        <h2 className="shp-section-title">School Overview</h2>
        <div className="shp-stats-grid">
          {schoolStats.map((stat, index) => (
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
              <h3 className="shp-card-title">Recent School Activity</h3>
              <button className="shp-view-all-btn">View All</button>
            </div>
            <div className="shp-activity-list">
              {schoolActivities.map((activity, index) => (
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
                School Notifications
              </h3>
              <span className="shp-notification-count">{schoolNotifications.filter(n => !n.isRead).length}</span>
            </div>
            <div className="shp-notifications-list">
              {schoolNotifications.map((notification, index) => (
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
    </div>
  );
};

export default SchoolDashboard;
