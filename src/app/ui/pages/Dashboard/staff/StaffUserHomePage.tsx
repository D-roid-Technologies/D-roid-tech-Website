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
import { IoIosNotifications } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import "./StaffUserHomePage.css";
import { StatCard } from "../micro-ui/stat-card";
import { Modal } from "../micro-ui/modal";
import { useSelector, useDispatch } from "react-redux";
import { UserType } from "../../../../utils/Types";
import { RootState } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../../../../redux/slices/tasksSlice";
import {
  setStaffMetrics,
  fetchStaffMetrics,
} from "../../../../redux/slices/staffSlice";
import EventPosts from "../../../components/blogPosts/Events";
import { eventsPosts } from "../../../../utils/blogpost";

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

type StaffUserHomePageProps = {
  setSelectedMenu: (menu: string) => void;
};

const StaffUserHomePage: React.FC<StaffUserHomePageProps> = ({
  setSelectedMenu,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails: UserType = useSelector((state: RootState) => state.user);

  // Get notifications from Redux slice
  type Notification = {
    title: string;
    message: string;
    time: string;
    type: string;
    isRead: boolean;
    id: number;
    date: string;
  };
  const notifications = useSelector(
    (state: RootState) => state.notifications as Notification[]
  );

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Get staff metrics from Redux state
  const { activeTasks, completedTasks, performanceScore, attendanceRate } =
    useSelector((state: RootState) => state.staff);

  const [currentTime] = useState(new Date());
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  // Calculate task statistics from tasks slice
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing").length;
  const notStartedTasks = tasks.filter(
    (task) => task.status === "not_started"
  ).length;
  const totalTasks = tasks.length;

  // Calculate unread notifications count
  const unreadNotificationsCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  // Update Redux state when tasks change
  useEffect(() => {
    dispatch(
      setStaffMetrics({
        activeTasks: ongoingTasks,
        completedTasks: completedTasksCount,
      })
    );
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
      change: `${
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      }% completion rate`,
      icon: FaCheckCircle,
      color: "green",
    },
    {
      title: "Performance Score",
      value: performanceScore > 0 ? `${performanceScore}/5` : "0",
      change:
        performanceScore >= 4
          ? "Above average"
          : performanceScore >= 3
          ? "Average"
          : "Below average",
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

  const handleViewAllActivities = () => {
    setSelectedMenu("Tasks");
    setNotesModalOpen(false);
  };

  const activityToMenu: Record<string, string> = {
    "Started Training": "Training",
    "Updated Profile": "Personal Details",
    "Completed Task": "Tasks",
    "Clocked In": "Attendance",
    "Downloaded Payslip": "Payslips",
  };

  const handleActivityClick = (action: string) => {
    const menu = activityToMenu[action];
    if (menu) {
      setSelectedMenu(menu);
      setNotesModalOpen(false);
    }
  };

  const recentActivitiesCount =
    recentTaskActivities.length + otherActivities.length;

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting">
            <h1 className="shp-welcome-title">
              {/* Your Dashboard, {userDetails.firstName}! */}
              Staff Portal

            </h1>
            <p className="shp-welcome-subtitle">
              {userDetails.position} {userDetails.department}
            </p>

            {/* Notification and Activity Icons */}
            <div className="shp-head-icons-container">
              {/* Notifications */}
              <div
                className="shp-head-icons"
                onClick={() => setNotificationModalOpen(true)}
                style={{ position: "relative", cursor: "pointer" }}
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
              </div>

              {/* Activities */}
              {/* <div
                className="shp-head-icons"
                onClick={() => setNotesModalOpen(true)}
                style={{ position: "relative", cursor: "pointer" }}
              >
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
              </div> */}
            </div>
          </div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

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
            Staff Notifications
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
              onClick={() => handleNotificationClick(notification.title)}
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

      {/* Activities Modal */}
      <Modal
        isOpen={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
        title="Activities"
        description=""
      >
        <div className="shp-card-header">
          <h3 className="shp-card-title">Recent Staff Activity</h3>
          <button
            className="shp-view-all-btn"
            onClick={handleViewAllActivities}
          >
            View All
          </button>
        </div>
        <div className="shp-activity-list">
          {recentTaskActivities.slice(0, 4).map((activity, index) => (
            <div
              key={`task-${activity.task.id}`}
              onClick={() => handleActivityClick("Completed Task")}
              style={{ cursor: "pointer" }}
            >
              <TaskActivityItem
                task={activity.task}
                action={activity.action}
                time={activity.time}
              />
            </div>
          ))}
          {otherActivities.map((activity, index) => (
            <div
              key={index}
              onClick={() => handleActivityClick(activity.action)}
              style={{ cursor: "pointer" }}
            >
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
    
      <div>
        <h2 className="shp-section-title">Our Events</h2>
        <div className="shp-two-column">
          <EventPosts posts={eventsPosts} />
        </div>
      </div>
    </div>
  );
};

export default StaffUserHomePage;
