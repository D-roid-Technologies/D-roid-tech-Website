import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaClipboardCheck,
  FaWallet,
  FaUsers,
  FaProjectDiagram,
  FaBoxes,
  FaBell,
  FaBolt,
  FaClipboardList,
} from "react-icons/fa";
import styles from "./BusinessDashboard.module.css";
import { StatCard } from "../micro-ui/stat-card";

const BusinessDashboard: React.FC = () => {
  const [currentTime] = useState(new Date());
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalRevenue: 0,
    teamSize: 0,
    inventoryLevel: 0,
  });

  useEffect(() => {
    const fetchBusinessData = async () => {
      // Backend fetch logic goes here
      // For now, it stays at 0
      setStats({
        activeProjects: 0,
        totalRevenue: 0,
        teamSize: 0,
        inventoryLevel: 0,
      });
    };
    fetchBusinessData();
  }, []);

  const statsData = [
    {
      label: "Active Projects",
      value: stats.activeProjects.toString(),
      change: "0 this week",
      icon: FaProjectDiagram,
    },
    {
      label: "Total Revenue",
      value: `₦${stats.totalRevenue.toLocaleString()}`,
      change: "0% increase",
      icon: FaWallet,
    },
    {
      label: "Team Size",
      value: stats.teamSize.toString(),
      change: "0 pending invites",
      icon: FaUsers,
    },
    {
      label: "Inventory Level",
      value: `${stats.inventoryLevel}%`,
      change: "Checking...",
      icon: FaBoxes,
    },
  ];

  // Limited to 4 Quick Actions
  const quickActions = [
    { title: "Timer & Clocking", icon: FaClock, color: "#2563eb" },
    { title: "Attendance", icon: FaClipboardCheck, color: "#059669" },
    { title: "Payroll", icon: FaWallet, color: "#7c3aed" },
    { title: "Staff", icon: FaUsers, color: "#ea580c" },
  ];

  const activities: any[] = [];
  const notifications: any[] = [];

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
          <h1 className={styles.welcomeTitle}>Business Management</h1>
          <p className={styles.subTitle}>Corporate Operations Overview</p>
        </div>
        <div className={styles.dateBadge}>
          <FaClock /> {formattedDate}
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statsData.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <h3 className={styles.sectionTitle}>
        <FaBolt color="#f59e0b" /> Operations & Quick Actions
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
              <FaClipboardList color="#4b5563" /> Recent Activity{" "}
              {/* Color for icon */}
            </h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.listContainer}>
            {activities.length > 0 ? (
              activities.map((item, idx) => (
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
              ))
            ) : (
              <p
                style={{
                  padding: "20px",
                  color: "#6b7280",
                  textAlign: "center",
                }}
              >
                No recent activity.
              </p>
            )}
          </div>
        </div>

        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <h3>
              <FaBell color="#4b5563" /> Notifications {/* Color for icon */}
            </h3>
            <button className={styles.viewAllBtn}>Clear</button>
          </div>
          <div className={styles.listContainer}>
            {notifications.length > 0 ? (
              notifications.map((notif, idx) => (
                <div key={idx} className={styles.listItem}>
                  <div className={`${styles.notifIndicator} ${notif.type}`} />
                  <div className={styles.listContent}>
                    <p className={styles.listTitle}>{notif.title}</p>
                    <p className={styles.listDesc}>{notif.desc}</p>
                    <span className={styles.listTime}>{notif.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  padding: "20px",
                  color: "#6b7280",
                  textAlign: "center",
                }}
              >
                No new notifications.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
