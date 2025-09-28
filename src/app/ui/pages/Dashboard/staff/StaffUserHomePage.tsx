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
  FaBullhorn,
  FaSpinner,
} from "react-icons/fa";
import "./StaffUserHomePage.css";
import { StatCard } from "../micro-ui/stat-card";
import { Modal } from "../micro-ui/modal";
import { useSelector } from "react-redux";
import { UserType } from "../../../../utils/Types";
import { RootState } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "../../../../redux/slices/tasksSlice";

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

const StaffUserHomePage: React.FC = () => {
  const navigate = useNavigate();
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  const announcements = useSelector((state: RootState) => state.announcements);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [currentTime] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    data: any;
    type?: string;
  } | null>(null);

  //  Calculate task statistics
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing").length;
  const notStartedTasks = tasks.filter(
    (task) => task.status === "not_started"
  ).length;
  const totalTasks = tasks.length;

  const dashboardStats = [
    {
      title: "Active Tasks",
      value: ongoingTasks.toString(),
      change: `${notStartedTasks} pending`,
      icon: FaTasks,
      color: "blue",
    },
    {
      title: "Completed Tasks",
      value: completedTasks.toString(),
      change: `${Math.round(
        (completedTasks / totalTasks) * 100
      )}% completion rate`,
      icon: FaCheckCircle,
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

  // Handle quick action clicks
  const handleQuickAction = (actionTitle: string) => {
    let modalData = null;
    let modalType = "";

    switch (actionTitle) {
      case "Clock In/Out":
        modalType = "clockin";
        modalData = {
          title: "Clock In/Out Details",
          description: "Your work hours and attendance information",
          data: {
            currentStatus: "Clocked Out",
            lastClockIn: "08:30 AM",
            lastClockOut: "17:15 PM",
            todayHours: "8h 45m",
            weeklyHours: "42h 15m",
            monthlyHours: "168h 30m",
            attendanceRate: "96%",
            lateArrivals: 2,
            earlyDepartures: 1,
            ...userDetails,
          },
        };
        break;

      case "View Payslip":
        modalType = "payslip";
        modalData = {
          title: "Payslip Information",
          description: "Your salary and payment details",
          data: {
            currentMonth: "August 2025",
            basicSalary: "₦150,000",
            allowances: "₦25,000",
            deductions: "₦15,000",
            netPay: "₦160,000",
            paymentStatus: "Paid",
            paymentDate: "30th Aug 2025",
            taxDeducted: "₦12,000",
            pensionContribution: "₦3,000",
            ...userDetails,
          },
        };
        break;

      case "Submit Timesheet":
        modalType = "timesheet";
        modalData = {
          title: "Timesheet Submission",
          description: "Your weekly work hour logs",
          data: {
            weekEnding: "August 16, 2025",
            totalHours: "40h",
            regularHours: "40h",
            overtimeHours: "0h",
            status: "Pending Approval",
            submittedDate: "August 13, 2025",
            approver: "John Manager",
            projects: [
              { name: "Project Alpha", hours: "20h" },
              { name: "Project Beta", hours: "15h" },
              { name: "Administrative", hours: "5h" },
            ],
            ...userDetails,
          },
        };
        break;

      case "Start Training":
        modalType = "training";
        modalData = {
          title: "Training Progress",
          description: "Your learning and development status",
          data: {
            currentCourse: "Advanced React Development",
            progress: "75%",
            completedModules: 6,
            totalModules: 8,
            certificatesEarned: 3,
            skillsBadges: 5,
            nextDeadline: "August 30, 2025",
            estimatedCompletion: "2 weeks",
            courses: [
              { name: "React Fundamentals", status: "Completed", score: "95%" },
              {
                name: "Advanced JavaScript",
                status: "Completed",
                score: "88%",
              },
              { name: "Node.js Backend", status: "In Progress", score: "75%" },
            ],
            ...userDetails,
          },
        };
        break;

      default:
        console.log(`Clicked: ${actionTitle}`);
        return;
    }

    setModalContent(modalData);
    setModalOpen(true);
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

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // Render modal content based on type
  const renderModalContent = () => {
    if (!modalContent) return null;

    const { data, type } = modalContent;

    return (
      <div className="shp-user-detail">
        <div className="shp-detail-section">
          <h4 className="shp-section-title">Personal Information</h4>
          <div className="shp-detail-grid">
            <div className="shp-detail-item">
              <label>Full Name:</label>
              <span>
                {data.firstName} {data.middleName} {data.lastName}
              </span>
            </div>
            <div className="shp-detail-item">
              <label>Employee ID:</label>
              <span>{data.uniqueId}</span>
            </div>
            <div className="shp-detail-item">
              <label>Email:</label>
              <span>{data.email}</span>
            </div>
            <div className="shp-detail-item">
              <label>Phone:</label>
              <span>{data.phone}</span>
            </div>
            <div className="shp-detail-item">
              <label>Department:</label>
              <span>{data.userType}</span>
            </div>
            <div className="shp-detail-item">
              <label>Location:</label>
              <span>
                {data.city}, {data.state}
              </span>
            </div>
          </div>
        </div>

        {type === "clockin" && (
          <div className="shp-detail-section">
            <h4 className="shp-section-title">Attendance Details</h4>
            <div className="shp-detail-grid">
              <div className="shp-detail-item">
                <label>Current Status:</label>
                <span className="shp-status-badge clocked-out">
                  {data.currentStatus}
                </span>
              </div>
              <div className="shp-detail-item">
                <label>Last Clock In:</label>
                <span>{data.lastClockIn}</span>
              </div>
              <div className="shp-detail-item">
                <label>Last Clock Out:</label>
                <span>{data.lastClockOut}</span>
              </div>
              <div className="shp-detail-item">
                <label>Today's Hours:</label>
                <span>{data.todayHours}</span>
              </div>
              <div className="shp-detail-item">
                <label>This Week:</label>
                <span>{data.weeklyHours}</span>
              </div>
              <div className="shp-detail-item">
                <label>This Month:</label>
                <span>{data.monthlyHours}</span>
              </div>
            </div>
          </div>
        )}

        {type === "payslip" && (
          <div className="shp-detail-section">
            <h4 className="shp-section-title">Salary Breakdown</h4>
            <div className="shp-detail-grid">
              <div className="shp-detail-item">
                <label>Pay Period:</label>
                <span>{data.currentMonth}</span>
              </div>
              <div className="shp-detail-item">
                <label>Basic Salary:</label>
                <span>{data.basicSalary}</span>
              </div>
              <div className="shp-detail-item">
                <label>Allowances:</label>
                <span>{data.allowances}</span>
              </div>
              <div className="shp-detail-item">
                <label>Deductions:</label>
                <span>{data.deductions}</span>
              </div>
              <div className="shp-detail-item">
                <label>Net Pay:</label>
                <span className="shp-net-pay">{data.netPay}</span>
              </div>
              <div className="shp-detail-item">
                <label>Payment Status:</label>
                <span className="shp-status-badge paid">
                  {data.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        )}

        {type === "timesheet" && (
          <div className="shp-detail-section">
            <h4 className="shp-section-title">Timesheet Summary</h4>
            <div className="shp-detail-grid">
              <div className="shp-detail-item">
                <label>Week Ending:</label>
                <span>{data.weekEnding}</span>
              </div>
              <div className="shp-detail-item">
                <label>Total Hours:</label>
                <span>{data.totalHours}</span>
              </div>
              <div className="shp-detail-item">
                <label>Regular Hours:</label>
                <span>{data.regularHours}</span>
              </div>
              <div className="shp-detail-item">
                <label>Overtime:</label>
                <span>{data.overtimeHours}</span>
              </div>
              <div className="shp-detail-item">
                <label>Status:</label>
                <span className="shp-status-badge pending">{data.status}</span>
              </div>
              <div className="shp-detail-item">
                <label>Approver:</label>
                <span>{data.approver}</span>
              </div>
            </div>
          </div>
        )}

        {type === "training" && (
          <div className="shp-detail-section">
            <h4 className="shp-section-title">Training Progress</h4>
            <div className="shp-detail-grid">
              <div className="shp-detail-item">
                <label>Current Course:</label>
                <span>{data.currentCourse}</span>
              </div>
              <div className="shp-detail-item">
                <label>Progress:</label>
                <span className="shp-progress">{data.progress}</span>
              </div>
              <div className="shp-detail-item">
                <label>Completed Modules:</label>
                <span>
                  {data.completedModules}/{data.totalModules}
                </span>
              </div>
              <div className="shp-detail-item">
                <label>Certificates Earned:</label>
                <span>{data.certificatesEarned}</span>
              </div>
              <div className="shp-detail-item">
                <label>Next Deadline:</label>
                <span>{data.nextDeadline}</span>
              </div>
              <div className="shp-detail-item">
                <label>Est. Completion:</label>
                <span>{data.estimatedCompletion}</span>
              </div>
            </div>
          </div>
        )}

        <div className="shp-detail-actions">
          <button
            className="shp-button shp-button-secondary"
            onClick={closeModal}
          >
            Close
          </button>
          <button className="shp-button shp-button-primary">
            {type === "clockin"
              ? "Clock In Now"
              : type === "payslip"
                ? "Download Payslip"
                : type === "timesheet"
                  ? "Submit Timesheet"
                  : "Continue Training"}
          </button>
        </div>
      </div>
    );
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
                  <p>No recent activities</p>
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

      {/* User Info Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={modalContent?.title || ""}
        description={modalContent?.description || ""}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default StaffUserHomePage;
