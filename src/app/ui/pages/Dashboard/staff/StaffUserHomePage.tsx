import React, { useState, useEffect } from "react";
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
  FaBullhorn,
  FaSpinner,
} from "react-icons/fa";
import "./StaffUserHomePage.css";
import { StatCard } from "../micro-ui/stat-card";
import { useSelector, useDispatch } from "react-redux";
import { UserType } from "../../../../utils/Types";
import { RootState } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../../../../redux/slices/tasksSlice";
import { setStaffMetrics, fetchStaffMetrics } from "../../../../redux/slices/staffSlice";

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

type TaskActivityItemProps = {
  task: Task;
  action: string;
  time: string;
};

const TaskActivityItem = ({ task, action, time }: TaskActivityItemProps) => {
  const getTaskIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return FaCheckCircle;
      case "ongoing":
        return FaSpinner;
      case "not_started":
        return FaClock;
      default:
        return FaTasks;
    }
  };

  const Icon = getTaskIcon(task.status);

  return (
    <div className="shp-activity-item">
      <div className="shp-activity-icon">
        {/* @ts-ignore */}
        <Icon size={16} />
      </div>
      <div className="shp-activity-content">
        <p className="shp-activity-action">{action}</p>
        <p className="shp-activity-details">{task.title}</p>
        <span className="shp-activity-time">{time}</span>
      </div>
    </div>
  );
};

type AnnouncementItemProps = {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: string;
  isRead: boolean;
};

const AnnouncementItem = ({
  id,
  title,
  message,
  date,
  time,
  type,
  onClick,
}: AnnouncementItemProps & { onClick: () => void }) => {
  // Calculate time difference for display
  const getTimeAgo = (dateString: string) => {
    const announcementDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - announcementDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return announcementDate.toLocaleDateString();
    }
  };

  return (
    <div className="shp-notification-item unread" onClick={onClick}>
      <div className="shp-notification-indicator info"></div>
      <div className="shp-notification-content">
        <h5 className="shp-notification-title">{title}</h5>
        <p className="shp-notification-message">{message}</p>
        <span className="shp-notification-time">{getTimeAgo(date)}</span>
      </div>
    </div>
  );
};

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

type StaffUserHomePageProps = {
  setSelectedMenu: (menu: string) => void;
};

const StaffUserHomePage: React.FC<StaffUserHomePageProps> = ({ setSelectedMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  const announcements = useSelector((state: RootState) => state.notifications);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  // Get staff metrics from Redux state
  const { activeTasks, completedTasks, performanceScore, attendanceRate } = useSelector(
    (state: RootState) => state.staff
  );
  
  const [currentTime] = useState(new Date());

  // Calculate task statistics from tasks slice
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing").length;
  const notStartedTasks = tasks.filter(
    (task) => task.status === "not_started"
  ).length;
  const totalTasks = tasks.length;

  // Update Redux state when tasks change
  useEffect(() => {
    dispatch(setStaffMetrics({
      activeTasks: ongoingTasks,
      completedTasks: completedTasksCount,
    }));
  }, [dispatch, ongoingTasks, completedTasksCount]);

  // Optional: Fetch staff metrics from API on component mount
  useEffect(() => {
    // Uncomment to fetch from API
    // dispatch(fetchStaffMetrics(userDetails.uniqueId));
  }, []);

  // Dashboard stats using Redux state
  const dashboardStats = [
    {
      title: "Active Tasks",
      value: activeTasks.toString(),
      change: `${notStartedTasks} pending`,
      icon: FaTasks,
      color: "blue",
    },
    {
      title: "Completed Tasks",
      value: completedTasks.toString(),
      change: `${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% completion rate`,
      icon: FaCheckCircle,
      color: "green",
    },
    {
      title: "Performance Score",
      value: performanceScore > 0 ? `${performanceScore}/5` : "0",
      change: performanceScore >= 4 ? "Above average" : performanceScore >= 3 ? "Average" : "Below average",
      icon: FaTrophy,
      color: "gold",
    },
    {
      title: "Attendance Rate",
      value: attendanceRate > 0 ? `${attendanceRate}%` : "0",
      change: "This month",
      icon: FaUserCheck,
      color: "purple",
    },
  ];

  // Handle quick action clicks - navigate to sidebar menu items
  const handleQuickAction = (actionTitle: string) => {
    switch (actionTitle) {
      case "Clock In/Out":
        setSelectedMenu("Attendance");
        break;
      case "View Payslip":
        setSelectedMenu("Payslips");
        break;
      case "Submit Timesheet":
        setSelectedMenu("Tasks");
        break;
      case "Start Training":
        setSelectedMenu("Training");
        break;
      default:
        console.log(`Clicked: ${actionTitle}`);
        break;
    }
  };

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

  // Generate mock recent activities from tasks
  const generateMockTime = (index: number) => {
    const hours = [1, 3, 6, 12, 24, 48, 72];
    const randomHours = hours[index % hours.length];

    if (randomHours < 24) {
      return `${randomHours} hour${randomHours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(randomHours / 24);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  // Create recent activities from tasks (showing most recent 6 tasks)
  const recentTaskActivities = tasks.slice(0, 6).map((task, index) => ({
    task,
    action: task.status,
    time: generateMockTime(index),
  }));

  // Additional non-task activities
  const otherActivities = [
    {
      action: "Started Training",
      details: "Advanced React Development Course",
      time: "1 day ago",
      icon: FaGraduationCap,
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

  // Sort announcements by date (newest first) and limit to recent ones
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleViewAllAnnouncements = () => {
    navigate("/announcements");
  };
  const handleAnnouncementClick = (announcementId: number) => {
    navigate(`/announcements/${announcementId}`);
  };

  const handleViewAllActivities = () => {
    navigate("/tasks");
  };

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">
              Your Dashboard, {userDetails.firstName}!
            </h1>
            <p className="shp-welcome-subtitle">
              {userDetails.position} {userDetails.department}
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
            // @ts-ignore
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              variant={action.variant}
              onClick={() => handleQuickAction(action.title)}
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
              <button
                className="shp-view-all-btn"
                onClick={handleViewAllActivities}
              >
                View All
              </button>
            </div>
            <div className="shp-activity-list">
              {/* Show recent task activities */}
              {recentTaskActivities.slice(0, 4).map((activity, index) => (
                <TaskActivityItem
                  key={`task-${activity.task.id}`}
                  task={activity.task}
                  action={activity.action}
                  time={activity.time}
                />
              ))}

              {/* Show other activities if there's space */}
              {otherActivities
                .slice(0, Math.max(0, 4 - recentTaskActivities.length))
                .map((activity, index) => (
                  <RecentActivityItem
                    key={`other-${index}`}
                    action={activity.action}
                    details={activity.details}
                    time={activity.time}
                    icon={activity.icon}
                  />
                ))}

              {/* Show message if no activities */}
              {recentTaskActivities.length === 0 && (
                <div className="shp-no-activities">
                  <p style={{padding: "1rem" ,color: "black"}}>No recent activities</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="shp-notifications-section">
          <div className="shp-card">
            <div className="shp-card-header">
              <h3 className="shp-card-title">
                <FaBullhorn size={18} />
                Announcements
              </h3>
              <span className="shp-notification-count">
                {announcements.length}
              </span>
            </div>
            <div className="shp-notifications-list">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((announcement) => (
                  <AnnouncementItem
                    key={announcement.id}
                    id={announcement.id}
                    title={announcement.title}
                    message={announcement.message}
                    date={announcement.date}
                    time={announcement.date}
                    type={announcement.type}
                    isRead={announcement.isRead}
                    onClick={() => handleAnnouncementClick(announcement.id)}
                  />
                ))
              ) : (
                <div className="shp-no-announcements">
                  <p>No recent announcements</p>
                </div>
              )}
            </div>
            <button
              className="shp-view-all-notifications"
              onClick={handleViewAllAnnouncements}
            >
              View All Announcements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffUserHomePage;
