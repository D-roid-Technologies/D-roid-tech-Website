import React, { useState } from "react";
import {
  FaHandsHelping,
  FaDonate,
  FaBullhorn,
  FaHeart,
  FaUsers,
  FaChartLine,
  FaCalendar,
  FaFileAlt,
  FaGlobe,
  FaCheckCircle,
  FaClock,
  FaBell,
  FaChevronRight,
  FaDownload,
  FaPlus,
  FaEye,
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

const NGODashboard: React.FC = () => {
  const [currentTime] = useState(new Date());

  const ngoStats = [
    {
      title: "Active Volunteers",
      value: "156",
      change: "12 new this month",
      icon: FaHandsHelping,
      color: "green",
    },
    {
      title: "Total Donations",
      value: "$45,230",
      change: "15% increase",
      icon: FaDonate,
      color: "blue",
    },
    {
      title: "Ongoing Projects",
      value: "8",
      change: "3 launching soon",
      icon: FaHeart,
      color: "red",
    },
    {
      title: "People Helped",
      value: "2,340",
      change: "This quarter",
      icon: FaUsers,
      color: "purple",
    },
  ];

  const ngoQuickActions = [
    {
      title: "Manage Volunteers",
      description: "View and organize volunteer activities",
      icon: FaHandsHelping,
      variant: "primary",
    },
    {
      title: "Track Donations",
      description: "Monitor incoming donations",
      icon: FaDonate,
      variant: "success",
    },
    {
      title: "Create Campaign",
      description: "Launch new outreach campaign",
      icon: FaBullhorn,
      variant: "secondary",
    },
    {
      title: "Impact Report",
      description: "Generate impact assessment",
      icon: FaChartLine,
      variant: "default",
    },
    {
      title: "Partner Network",
      description: "Manage partner organizations",
      icon: FaUsers,
      variant: "primary",
    },
    {
      title: "Community Groups",
      description: "Organize community groups",
      icon: FaGlobe,
      variant: "success",
    },
  ];

  const ngoNotifications = [
    {
      title: "New Volunteer Application",
      message: "Sarah Johnson applied for the education program",
      time: "1 hour ago",
      type: "info",
      isRead: false,
    },
    {
      title: "Donation Received",
      message: "Anonymous donor contributed $500 to clean water project",
      time: "3 hours ago",
      type: "success",
      isRead: false,
    },
    {
      title: "Campaign Milestone",
      message: "Food drive campaign reached 75% of target",
      time: "1 day ago",
      type: "warning",
      isRead: true,
    },
    {
      title: "Partner Meeting",
      message: "Quarterly meeting with local partners scheduled",
      time: "2 days ago",
      type: "info",
      isRead: true,
    },
  ];

  const ngoActivities = [
    {
      action: "Volunteer Registered",
      details: "New volunteer joined the environmental cleanup team",
      time: "2 hours ago",
      icon: FaHandsHelping,
    },
    {
      action: "Campaign Launched",
      details: "Started 'Books for All' literacy campaign",
      time: "1 day ago",
      icon: FaBullhorn,
    },
    {
      action: "Impact Assessment",
      details: "Completed quarterly impact report for education program",
      time: "3 days ago",
      icon: FaChartLine,
    },
    {
      action: "Partnership Formed",
      details: "New collaboration with Local Community Center",
      time: "1 week ago",
      icon: FaUsers,
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
              NGO Management Dashboard
            </h1>
            
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* NGO Quick Actions */}
      <div className="shp-section">
        <h2 className="shp-section-title">Quick Actions</h2>
        <div className="shp-quick-actions-grid">
          {ngoQuickActions.map((action, index) => (
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

      {/* NGO Stats */}
      <div className="shp-section">
        <h2 className="shp-section-title">Impact Overview</h2>
        <div className="shp-stats-grid">
          {ngoStats.map((stat, index) => (
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
              <h3 className="shp-card-title">Recent NGO Activity</h3>
              <button className="shp-view-all-btn">View All</button>
            </div>
            <div className="shp-activity-list">
              {ngoActivities.map((activity, index) => (
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
                NGO Notifications
              </h3>
              <span className="shp-notification-count">{ngoNotifications.filter(n => !n.isRead).length}</span>
            </div>
            <div className="shp-notifications-list">
              {ngoNotifications.map((notification, index) => (
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

export default NGODashboard;
