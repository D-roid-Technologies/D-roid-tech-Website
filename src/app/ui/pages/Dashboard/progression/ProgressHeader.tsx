"use client";

import type React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TrendingUp, Clock, Zap } from "lucide-react";
import {
  selectCurrentPosition,
  selectProgressPercentage,
  selectTotalHours,
  selectWeeklyProgressHours,
  startSession,
  endSession,
} from "../../../../redux/slices/ProgressionSlice";
import styles from "./progression-header.module.css";

const ProgressionHeader: React.FC = () => {
  const dispatch = useDispatch();
  const currentPosition = useSelector(selectCurrentPosition);
  const progressPercentage = useSelector(selectProgressPercentage);
  const totalHours = useSelector(selectTotalHours);
  const weeklyHours = useSelector(selectWeeklyProgressHours);

  useEffect(() => {
    dispatch(startSession());
    const handleUnload = () => dispatch(endSession());
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      dispatch(endSession());
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dispatch]);

  const tierConfig: Record<
    string,
    { color: { from: string; to: string }; bgLight: string; icon: string; price: string }
  > = {
    Free: {
      color: { from: "#6b7280", to: "#9ca3af" },
      bgLight: "#f3f4f6",
      icon: "🎯",
      price: "Free Tier",
    },
    Silver: {
      color: { from: "#475569", to: "#94a3b8" },
      bgLight: "#f8fafc",
      icon: "🥈",
      price: " ₦0/mo",
    },
    Gold: {
      color: { from: "#d97706", to: "#fbbf24" },
      bgLight: "#fffbeb",
      icon: "🥇",
      price: " ₦5,000/mo",
    },
    Platinum: {
      color: { from: "#2563eb", to: "#60a5fa" },
      bgLight: "#eff6ff",
      icon: "💎",
      price: " ₦15,000/mo",
    },
  };

  const config = tierConfig[currentPosition] || tierConfig.Free;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div
        className={styles.heroSection}
        style={{
          background: `linear-gradient(to right, ${config.color.from}, ${config.color.to})`,
        }}
      >
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.headerContainer}>
              <span className={styles.icon}>{config.icon}</span>
              <h1 className={styles.title}>{currentPosition} Member</h1>
            </div>
            <p className={styles.subtitle}>
              You're making great progress on your membership journey
            </p>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressLabel}>
                <span>Level Progress</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Price Label */}
            <p className={styles.priceTag}>{config.price}</p>
          </div>

          {/* Stats Summary */}
          <div className={styles.statsContainer}>
            <div className={styles.miniStatCard}>
              <p className={styles.miniStatLabel}>Total Time</p>
              <p className={styles.miniStatValue}>{totalHours.toFixed(1)}h</p>
            </div>
            <div className={styles.miniStatCard}>
              <p className={styles.miniStatLabel}>This Week</p>
              <p className={styles.miniStatValue}>{weeklyHours.toFixed(1)}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.grid}>
        {/* Card 1 */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <p className={styles.statLabel}>Total Time Invested</p>
            <Clock className={styles.statIcon} size={20} />
          </div>
          <p className={styles.statValue}>
            {totalHours.toFixed(1)}
            <span className={styles.statUnit}>hours</span>
          </p>
          <p className={styles.statFooter}>Lifetime commitment</p>
        </div>

        {/* Card 2 */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <p className={styles.statLabel}>Weekly Progress</p>
            <TrendingUp className={styles.statIcon} size={20} />
          </div>
          <p className={styles.statValue}>
            {weeklyHours.toFixed(1)}
            <span className={styles.statUnit}>hours</span>
          </p>
          <p className={styles.statFooter}>This week's effort</p>
        </div>

        {/* Card 3 */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <p className={styles.statLabel}>Current Status</p>
            <Zap className={styles.statIcon} size={20} />
          </div>
          <p className={styles.statValue}>{currentPosition}</p>
          <p className={styles.statFooter}>Membership tier</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressionHeader;
