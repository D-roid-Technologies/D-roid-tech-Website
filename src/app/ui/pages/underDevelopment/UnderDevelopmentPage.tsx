"use client";

import { useState, useEffect } from "react";
import styles from "./under-development.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/NavBar";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function UnderDevelopmentPage() {
  const [dots, setDots] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);
  const navigate = useNavigate();

  const messages = [
    "Calibrating neural networks",
    "Optimizing quantum processors",
    "Synchronizing droid protocols",
    "Compiling advanced algorithms",
    "Initializing feature modules",
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
            <h1 className={styles.title}>🔧 FEATURE UNDER CONSTRUCTION 🔧</h1>

            <div className={styles.statusDisplay}>
              <div className={styles.statusLine}>
                <span className={styles.label}>STATUS:</span>
                <span className={styles.status}>DEVELOPMENT IN PROGRESS</span>
              </div>
              <div className={styles.statusLine}>
                <span className={styles.label}>PROGRESS:</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
                <span className={styles.percentage}>73%</span>
              </div>
            </div>

            <div className={styles.description}>
              <p>
                Our engineers are working around the clock to bring you this
                amazing feature! While they're busy buildling UIs and debugging
                algorithms, why not explore the other incredible capabilities?
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  if (window.history.length > 2) {
                    navigate(-1);
                  } else {
                    navigate("/");
                  }
                }}
                title="Go Back"
              >
                <FaLongArrowAltLeft size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
