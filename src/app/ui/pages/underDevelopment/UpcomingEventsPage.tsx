"use client";

import { useState, useEffect } from "react";
import styles from "./under-development.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/NavBar";

export default function UpcomingEventsPage() {
  const [dots, setDots] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);
  const router = useNavigate();

  const messages = [
    "Preparing event infrastructure",
    "Synchronizing event schedules",
    "Loading event details",
    "Updating event calendar",
    "Finalizing event logistics",
  ];

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Cycling messages effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.grid}></div>
          <div className={styles.scanLine}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainMessage}>
            <h1 className={styles.title}>🎉 UPCOMING EVENTS 🎉</h1>

            <div className={styles.statusDisplay}>
              <div className={styles.statusLine}>
                <span className={styles.label}>STATUS:</span>
                <span className={styles.status}>EVENTS COMING SOON</span>
              </div>
              <div className={styles.statusLine}>
                <span className={styles.label}>LAUNCH:</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
                <span className={styles.percentage}>Coming Soon</span>
              </div>
            </div>

            <div className={styles.description}>
              <p>
                We're excited to announce that our events platform is under
                development! Soon you'll be able to discover and register for
                our upcoming tech workshops, hackathons, and networking events.
                Stay tuned for more updates!
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                onClick={() => router(-1)}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
