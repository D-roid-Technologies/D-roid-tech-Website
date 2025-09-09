"use client"

import type React from "react"
import { useState } from "react"
import {
  FaUser,
  FaIdCard,
  FaCreditCard,
  FaCalendarAlt,
  FaUsers,
  FaGift,
  FaBell,
  FaCheckCircle,
  FaUserFriends,
  FaAward,
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

const MemberDashboard: React.FC = () => {
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
      title: "Update Profile",
      description: "Edit personal information and preferences",
      icon: FaUser,
      variant: "primary",
    },
    {
      title: "Membership Card",
      description: "View digital membership card",
      icon: FaIdCard,
      variant: "secondary",
    },
    {
      title: "Payment History",
      description: "View dues and payment records",
      icon: FaCreditCard,
      variant: "success",
    },
    {
      title: "Event Calendar",
      description: "Browse upcoming member events",
      icon: FaCalendarAlt,
      variant: "default",
    },
    {
      title: "Member Directory",
      description: "Connect with other members",
      icon: FaUsers,
      variant: "primary",
    },
    {
      title: "Rewards Program",
      description: "Redeem points and view benefits",
      icon: FaGift,
      variant: "secondary",
    },
  ]

  const memberNotifications = [
    {
      title: "Membership Renewal",
      message: "Your annual membership expires in 30 days",
      time: "2 hours ago",
      type: "warning",
      isRead: false,
    },
    {
      title: "Event Invitation",
      message: "You're invited to the Annual Gala on September 15th",
      time: "1 day ago",
      type: "info",
      isRead: false,
    },
    {
      title: "Points Earned",
      message: "You earned 50 points for attending the workshop",
      time: "3 days ago",
      type: "success",
      isRead: true,
    },
    {
      title: "New Member Benefit",
      message: "Exclusive discount available at partner restaurants",
      time: "1 week ago",
      type: "info",
      isRead: true,
    },
  ]

  const memberActivities = [
    {
      action: "Event Attended",
      details: "Professional Development Workshop on Leadership",
      time: "2 days ago",
      icon: FaCheckCircle,
    },
    {
      action: "Payment Processed",
      details: "Annual membership dues payment successful",
      time: "1 week ago",
      icon: FaCreditCard,
    },
    {
      action: "Profile Updated",
      details: "Added new professional certifications",
      time: "2 weeks ago",
      icon: FaUser,
    },
    {
      action: "Referral Bonus",
      details: "Earned 100 points for referring new member",
      time: "3 weeks ago",
      icon: FaUserFriends,
    },
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">Member Portal</h1>
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
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
              onClick={() => console.log(`Clicked: ${action.title}`)}
            />
          ))}
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

      {/* Two Column Layout */}
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
              <span className="shp-notification-count">{memberNotifications.filter((n) => !n.isRead).length}</span>
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
