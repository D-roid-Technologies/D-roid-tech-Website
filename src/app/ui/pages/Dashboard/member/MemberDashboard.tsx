"use client"

import type React from "react"
import { useState } from "react"
import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaGift,
  FaBell,
  FaAward,
  FaServicestack,
  FaBriefcase,
  FaToolbox,
  FaBullhorn,
  FaCommentDots,
} from "react-icons/fa"
import "../staff/StaffUserHomePage.css"
import { StatCard } from "../micro-ui/stat-card"

type QuickActionCardProps = {
  title: string
  description: string
  icon: React.ComponentType<{ size?: number }>
  onClick?: () => void
  variant?: string
}

const QuickActionCard = ({ title, description, icon: Icon, onClick, variant = "default" }: QuickActionCardProps) => (
  <div className={`shp-quick-action ${variant}`} onClick={onClick}>
    <div className="shp-action-icon">
      <Icon size={20} />
    </div>
    <div className="shp-action-content">
      <h4 className="shp-action-title">{title}</h4>
      <p className="shp-action-description">{description}</p>
    </div>
  </div>
)

type NotificationItemProps = {
  title: string
  message: string
  time: string
  type: string
  isRead: boolean
}

const NotificationItem = ({ title, message, time, type, isRead }: NotificationItemProps) => (
  <div className={`shp-notification-item ${isRead ? "read" : "unread"}`}>
    <div className={`shp-notification-indicator ${type}`}></div>
    <div className="shp-notification-content">
      <h5 className="shp-notification-title">{title}</h5>
      <p className="shp-notification-message">{message}</p>
      <span className="shp-notification-time">{time}</span>
    </div>
  </div>
)

type RecentActivityItemProps = {
  action: string
  details: string
  time: string
  icon: React.ComponentType<{ size?: number }>
}

const RecentActivityItem = ({ action, details, time, icon: Icon }: RecentActivityItemProps) => (
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
)

type MemberDashboardProps = {
  setSelectedMenu: React.Dispatch<React.SetStateAction<string | null>>;
};

const MemberDashboard: React.FC<MemberDashboardProps> = ({ setSelectedMenu }) => {
  const [currentTime] = useState(new Date())

  const memberStats = [
    {
      title: "Membership Status",
      value: "Active",
      change: "Premium member since 2023",
      icon: FaIdCard,
      color: "green",
    },
    {
      title: "Points Balance",
      value: "2,450",
      change: "150 points earned this month",
      icon: FaGift,
      color: "blue",
    },
    {
      title: "Events Attended",
      value: "18",
      change: "5 events this quarter",
      icon: FaCalendarAlt,
      color: "purple",
    },
    {
      title: "Member Level",
      value: "Gold",
      change: "Next level: Platinum",
      icon: FaAward,
      color: "orange",
    },
  ]

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
    {
      title: "Announcements",
      description: "Stay updated with the latest news",
      icon: FaBullhorn,
      variant: "secondary",
    },
    {
      title: "Say It",
      description: "Share feedback, suggestions, or reports",
      icon: FaCommentDots,
      variant: "success",
    },
  ]

  const memberNotifications = [
    {
      title: "New Announcement",
      message: "Quarterly meeting scheduled for September 20th",
      time: "3 hours ago",
      type: "info",
      isRead: false,
    },
    {
      title: "Career Update",
      message: "5 new job opportunities posted in Careers",
      time: "1 day ago",
      type: "success",
      isRead: false,
    },
    {
      title: "Service Request",
      message: "Your service request has been approved",
      time: "2 days ago",
      type: "success",
      isRead: true,
    },
    {
      title: "Schedule Reminder",
      message: "You have an event scheduled this Friday",
      time: "1 week ago",
      type: "warning",
      isRead: true,
    },
  ]

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
  ]

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">Member Portal</h1>
            {/* Add Recent Member Activity and Member Notifications side by side here as icons here */}
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Member Stats */}
      <div className="shp-section">
        <h2 className="shp-section-title">Membership Overview</h2>
        <div className="shp-stats-grid">
          {memberStats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} />
          ))}
        </div>
      </div>

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
              onClick={() => setSelectedMenu(action.title)} // 🔑 send string to parent
            />
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      {/* after taking out these two colums and moving them above add add a slide able banner showing all events */}
      <div className="shp-two-column">
        {/* Recent Activity */}
        <div className="shp-activity-section">
          <div className="shp-card">
            <div className="shp-card-header">
              <h3 className="shp-card-title">Recent Member Activity</h3>
              <button className="shp-view-all-btn">View All</button>
            </div>
            <div className="shp-activity-list">
              {memberActivities.map((activity, index) => (
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
                Member Notifications
              </h3>
              <span className="shp-notification-count">
                {memberNotifications.filter((n) => !n.isRead).length}
              </span>
            </div>
            <div className="shp-notifications-list">
              {memberNotifications.map((notification, index) => (
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
            <button className="shp-view-all-notifications">View All Notifications</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDashboard
