import React, { useState, useEffect } from "react";
import styles from "./LiftOff.module.css";
import NavBar from "../../components/navbar/NavBar";
import { Calendar, MapPin, Ticket, Code } from "lucide-react";

// Placeholder images for the slideshow - Replace these with your actual event photos
const backgroundImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", // Conference Crowd
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", // Meeting/Collaboration
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop", // Handshake/Business
];

const LiftOff: React.FC = () => {
  // --- COUNTDOWN LOGIC ---
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-06-27") - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // --- SLIDESHOW LOGIC ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Timer for Countdown
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Timer for Slideshow (Change image every 5 seconds)
    const slideTimer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length,
      );
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  });

  const formatTime = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className={styles.container}>
      <NavBar />

      {/* --- HERO SECTION --- */}
      <section className={styles.hero}>
        {/* Background Slideshow */}
        <div className={styles.slideshowContainer}>
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`${styles.slideImage} ${index === currentImageIndex ? styles.activeSlide : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          {/* Dark Blue Overlay */}
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgeContainer}>
            <span className={styles.badge}>EASTERN TECH FEST</span>
          </div>

          <h1 className={styles.heroTitle}>LIFT-OFF CONFERENCE</h1>

          <h2 className={styles.heroSubtitle}>
            The Tech Trade Treasury:
            <br />
            <span className={styles.highlight}>
              Integrating Tech and Commercial Prowess for Economic Growth
            </span>
          </h2>

          <div className={styles.eventMeta}>
            <div className={styles.metaItem}>
              <Calendar size={20} className={styles.metaIcon} />
              <span>27th June, 2026</span>
            </div>
            <div className={styles.divider}>|</div>
            <div className={styles.metaItem}>
              <MapPin size={20} className={styles.metaIcon} />
              <span>Virtual & Physical (Hybrid)</span>
            </div>
          </div>

          {/* --- COUNTDOWN TIMER --- */}
          <div className={styles.countdownContainer}>
            <div className={styles.timeBox}>
              <span className={styles.timeValue}>
                {formatTime(timeLeft.days)}
              </span>
              <span className={styles.timeLabel}>DAYS</span>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeBox}>
              <span className={styles.timeValue}>
                {formatTime(timeLeft.hours)}
              </span>
              <span className={styles.timeLabel}>HOURS</span>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeBox}>
              <span className={styles.timeValue}>
                {formatTime(timeLeft.minutes)}
              </span>
              <span className={styles.timeLabel}>MINUTES</span>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeBox}>
              <span className={styles.timeValue}>
                {formatTime(timeLeft.seconds)}
              </span>
              <span className={styles.timeLabel}>SECONDS</span>
            </div>
          </div>

          {/* --- CALL TO ACTION --- */}
          <div className={styles.ctaGroup}>
            <button className={styles.primaryBtn}>
              <Ticket size={18} /> Register Now
            </button>
            <button className={styles.secondaryBtn}>
              <Code size={18} /> Join Hackathon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiftOff;
