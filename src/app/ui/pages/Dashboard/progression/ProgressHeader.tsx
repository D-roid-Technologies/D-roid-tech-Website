"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TrendingUp, Clock, Zap } from "lucide-react";
import {

  selectCurrentPosition,
  selectProgressPercentage,

  selectTotalHours,
  selectWeeklyProgressHours,
  startSession,
  endSession,
  type Milestone,
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
    { color: { from: string; to: string }; bgLight: string; icon: string }
  > = {
    Silver: {
      color: { from: "#475569", to: "#94a3b8" },
      bgLight: "#f8fafc",
      icon: "🥈",
    },
    Gold: {
      color: { from: "#d97706", to: "#fbbf24" },
      bgLight: "#fffbeb",
      icon: "🥇",
    },
    Platinum: {
      color: { from: "#2563eb", to: "#60a5fa" },
      bgLight: "#eff6ff",
      icon: "💎",
    },
  };

  const config = tierConfig[currentPosition] || tierConfig.Silver;

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
          <p className={styles.statValue}>{currentPosition as string}</p>
          <p className={styles.statFooter}>Membership tier</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressionHeader;
