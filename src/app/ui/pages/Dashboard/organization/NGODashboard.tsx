import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaDonate,
  FaCalendarAlt,
  FaTasks,
  FaBell,
  FaClock,
  FaBolt,
  FaClipboardList,
  FaClipboardCheck,
  FaHandHoldingUsd,
  FaHeart,
  FaGlobeAmericas,
} from "react-icons/fa";
import styles from "./NGODashboard.module.css";
// import { authService } from "../../../../redux/configuration/auth.service"; 


const NGODashboard: React.FC = () => {
  const [currentTime] = useState(new Date());
  const [stats, setStats] = useState({ totalVolunteers: 124, activeCampaigns: 5, totalDonations: 45000, beneficiaries: 1200 });

  useEffect(() => {
    // Fetch real stats on mount
    const fetchStats = async () => {
      // const data = await authService.getNGOStats();
      // setStats(data);
    };
    fetchStats();
  }, []);

  // --- Data Objects ---
  const statsData = [
    {
      label: "Total Volunteers",
      value: stats.totalVolunteers.toLocaleString(),
      change: "+12 this month", 
      icon: FaUsers,
      bgClass: styles.bgBlue,
      trend: "positive",
    },
    {
      label: "Total Donations ($)",
      value: `$${stats.totalDonations.toLocaleString()}`,
      change: "+$2,400 this week",
      icon: FaDonate,
      bgClass: styles.bgGreen,
      trend: "positive",
    },
    {
      label: "Active Campaigns",
      value: stats.activeCampaigns.toString(),
      change: "100% On Track",
      icon: FaGlobeAmericas,
      bgClass: styles.bgPurple,
      trend: "neutral",
    },
    {
      label: "Beneficiaries Reached",
      value: stats.beneficiaries.toLocaleString(),
      change: "+150 this month",
      icon: FaHeart,
      bgClass: styles.bgOrange,
      trend: "positive",
    },
  ];

  // Updated Quick Actions as requested
  const quickActions = [
    { title: "Attendance", icon: FaClipboardCheck, color: "#2563eb" },
    { title: "Compensations", icon: FaHandHoldingUsd, color: "#059669" },
    { title: "Manage Volunteers", icon: FaUsers, color: "#7c3aed" },
    { title: "Manage Donations", icon: FaDonate, color: "#ea580c" },
    { title: "Manage Rota", icon: FaCalendarAlt, color: "#db2777" },
    { title: "Tasks", icon: FaTasks, color: "#4b5563" },
  ];

  const activities = [
    {
      title: "New Donation Received",
      desc: "Anonymous donor contributed $500.",
      time: "10 mins ago",
      icon: FaDonate,
    },
    {
      title: "Rota Updated",
      desc: "Weekend outreach schedule finalized.",
      time: "1 hour ago",
      icon: FaCalendarAlt,
    },
    {
      title: "Volunteer Onboarded",
      desc: "Sarah Jenkins completed orientation.",
      time: "3 hours ago",
      icon: FaUsers,
    },
  ];

  const notifications = [
    {
      title: "Campaign Milestone",
      desc: "Clean Water Initiative reached 50% funding.",
      time: "Now",
      type: styles.notifSuccess,
    },
    {
      title: "Pending Compensations",
      desc: "3 volunteer travel stipends await approval.",
      time: "2 hours ago",
      type: styles.notifWarning,
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
          <h1 className={styles.welcomeTitle}>NGO Overview</h1>
          <p className={styles.subTitle}>Welcome back, Coordinator.</p>
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

export default NGODashboard;