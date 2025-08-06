import React, { useState } from "react";
import {
  FaBriefcase,
  FaFolderOpen,
  FaUsers,
  FaFileInvoiceDollar,
  FaChartLine,
  FaCalendar,
  FaTasks,
  FaCog,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaBell,
  FaChevronRight,
  FaDownload,
  FaPlus,
  FaEye,
  FaDollarSign,
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

const BusinessDashboard: React.FC = () => {
  const [currentTime] = useState(new Date());

  const businessStats = [
    {
      title: "Active Projects",
      value: "24",
      change: "5 new this month",
      icon: FaFolderOpen,
      color: "blue",
    },
    {
      title: "Total Revenue",
      value: "$125,430",
      change: "22% increase",
      icon: FaDollarSign,
      color: "green",
    },
    {
      title: "Team Members",
      value: "87",
      change: "8 new hires",
      icon: FaUsers,
      color: "purple",
    },
    {
      title: "Client Satisfaction",
      value: "94%",
      change: "Above target",
      icon: FaDollarSign,
      color: "orange",
    },
  ];

  const businessQuickActions = [
    {
      title: "Manage Departments",
      description: "Organize teams and departments",
      icon: FaBriefcase,
      variant: "primary",
    },
    {
      title: "Project Overview",
      description: "Track project progress and deadlines",
      icon: FaFolderOpen,
      variant: "secondary",
    },
    {
      title: "Client Management",
      description: "Manage client relationships",
      icon: FaUsers,
      variant: "success",
    },
    {
      title: "Financial Reports",
      description: "View revenue and expense reports",
      icon: FaFileInvoiceDollar,
      variant: "default",
    },
    {
      title: "Analytics Dashboard",
      description: "Business performance metrics",
      icon: FaChartLine,
      variant: "primary",
    },
    {
      title: "Resource Planning",
      description: "Allocate resources efficiently",
      icon: FaCog,
      variant: "secondary",
    },
  ];

  const businessNotifications = [
    {
      title: "Project Deadline",
      message: "Mobile app development project due in 3 days",
      time: "30 minutes ago",
      type: "warning",
      isRead: false,
    },
    {
      title: "New Client Onboarded",
      message: "TechCorp signed annual contract worth $50,000",
      time: "2 hours ago",
      type: "success",
      isRead: false,
    },
    {
      title: "Team Meeting",
      message: "Weekly standup scheduled for tomorrow 10 AM",
      time: "4 hours ago",
      type: "info",
      isRead: true,
    },
    {
      title: "Invoice Approved",
      message: "Client payment of $15,000 has been processed",
      time: "1 day ago",
      type: "success",
      isRead: true,
    },
  ];

  const businessActivities = [
    {
      action: "Project Completed",
      details: "E-commerce website delivered to RetailPlus",
      time: "1 hour ago",
      icon: FaCheckCircle,
    },
    {
      action: "New Contract Signed",
      details: "Annual maintenance contract with StartupXYZ",
      time: "4 hours ago",
      icon: FaFileInvoiceDollar,
    },
    {
      action: "Team Expansion",
      details: "Hired 3 new developers for the mobile team",
      time: "2 days ago",
      icon: FaUsers,
    },
    {
      action: "Quarterly Review",
      details: "Completed Q4 performance analysis and planning",
      time: "1 week ago",
      icon: FaChartLine,
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
      <div className="shp-welcome-header" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" }}>
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">
              Business Operations Hub
            </h1>
            <p className="shp-welcome-subtitle">
              Driving growth and innovation • Enterprise Solutions
            </p>
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Business Quick Actions */}
      <div className="shp-section">
        <h2 className="shp-section-title">Business Management Modules</h2>
        <div className="shp-quick-actions-grid">
          {businessQuickActions.map((action, index) => (
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

      {/* Business Stats */}
      <div className="shp-section">
        <h2 className="shp-section-title">Business Performance</h2>
        <div className="shp-stats-grid">
          {businessStats.map((stat, index) => (
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
              <h3 className="shp-card-title">Recent Business Activity</h3>
              <button className="shp-view-all-btn">View All</button>
            </div>
            <div className="shp-activity-list">
              {businessActivities.map((activity, index) => (
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
                Business Notifications
              </h3>
              <span className="shp-notification-count">{businessNotifications.filter(n => !n.isRead).length}</span>
            </div>
            <div className="shp-notifications-list">
              {businessNotifications.map((notification, index) => (
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

export default BusinessDashboard;
