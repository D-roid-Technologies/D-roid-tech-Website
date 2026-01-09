import React, { useState, useEffect } from "react";
import {
  FaChalkboard,
  FaUsers,
  FaBookOpen,
  FaWallet,
  FaCalendarAlt,
  FaUserGraduate,
  FaBell,
  FaClock,
  FaBolt,
  FaClipboardList,
} from "react-icons/fa";
import styles from "./SchoolDashboard.module.css";
import { authService } from "../../../../redux/configuration/auth.service";

const SchoolDashboard: React.FC = () => {
  const [currentTime] = useState(new Date());
  const [stats, setStats] = useState({ totalStudents: 0, activeClasses: 0 });

  useEffect(() => {
    // Fetch real stats on mount
    const fetchStats = async () => {
      const data = await authService.getSchoolStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  // --- Data Objects ---
  const statsData = [
    {
      label: "Total Students",
      value: stats.totalStudents.toLocaleString(), // Real Data
      change: "+0 this month", 
      icon: FaUserGraduate,
      bgClass: styles.bgBlue,
      trend: "positive",
    },
    {
      label: "Teaching Staff",
      value: "0", // Could fetch employee count if needed
      change: "0 new hires",
      icon: FaUsers,
      bgClass: styles.bgGreen,
      trend: "positive",
    },
    {
      label: "Active Classes",
      value: stats.activeClasses.toString(), // Real Data
      change: "100% Operational",
      icon: FaChalkboard,
      bgClass: styles.bgPurple,
      trend: "neutral",
    },
    {
      label: "Library Assets",
      value: "0",
      change: "+0 new books",
      icon: FaBookOpen,
      bgClass: styles.bgOrange,
      trend: "positive",
    },
  ];

  const quickActions = [
    { title: "Manage Classes", icon: FaChalkboard, color: "#2563eb" },
    { title: "Admit Student", icon: FaUserGraduate, color: "#059669" },
    { title: "Staff Payroll", icon: FaWallet, color: "#7c3aed" },
    { title: "Timetable", icon: FaCalendarAlt, color: "#ea580c" },
    { title: "Library", icon: FaBookOpen, color: "#db2777" },
  ];

  const activities = [
    // Placeholder activities
    {
      title: "System Ready",
      desc: "Dashboard initialized successfully.",
      time: "Just now",
      icon: FaBolt,
    },
  ];

  const notifications = [
    {
      title: "Welcome",
      desc: "Welcome to your new School Dashboard.",
      time: "Now",
      type: styles.notifInfo,
    },
  ];

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.welcomeTitle}>School Overview</h1>
          <p className={styles.subTitle}>Welcome back, Administrator.</p>
        </div>
        <div className={styles.dateBadge}>
          <FaClock /> {formattedDate}
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statsData.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statInfo}>
              <h4>{stat.label}</h4>
              <p className={styles.statValue}>{stat.value}</p>
              <span className={`${styles.statChange} ${styles[stat.trend]}`}>
                {stat.change}
              </span>
            </div>
            <div className={`${styles.iconBox} ${stat.bgClass}`}>
              <stat.icon />
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>
        <FaBolt color="#f59e0b" /> Quick Actions
      </h3>
      <div className={styles.actionsGrid}>
        {quickActions.map((action, idx) => (
          <div key={idx} className={styles.actionCard}>
            <div
              className={styles.actionIcon}
              style={{ backgroundColor: action.color }}
            >
              <action.icon />
            </div>
            <p className={styles.actionTitle}>{action.title}</p>
          </div>
        ))}
      </div>

      <div className={styles.contentSplit}>
        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <h3>
              <FaClipboardList color="#4b5563" /> Recent Activity
            </h3>
            <button className={styles.viewAllBtn}>View Log</button>
          </div>
          <div className={styles.listContainer}>
            {activities.map((item, idx) => (
              <div key={idx} className={styles.listItem}>
                <div className={styles.listIcon}>
                  <item.icon />
                </div>
                <div className={styles.listContent}>
                  <p className={styles.listTitle}>{item.title}</p>
                  <p className={styles.listDesc}>{item.desc}</p>
                  <span className={styles.listTime}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <h3>
              <FaBell color="#4b5563" /> Notifications
            </h3>
            <button className={styles.viewAllBtn}>Clear</button>
          </div>
          <div className={styles.listContainer}>
            {notifications.map((notif, idx) => (
              <div key={idx} className={styles.listItem}>
                <div className={`${styles.notifIndicator} ${notif.type}`} />
                <div className={styles.listContent}>
                  <p className={styles.listTitle}>{notif.title}</p>
                  <p className={styles.listDesc}>{notif.desc}</p>
                  <span className={styles.listTime}>{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
