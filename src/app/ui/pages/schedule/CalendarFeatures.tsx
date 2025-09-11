// CalendarFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../pages/toolboxpage/FeaturesTemplate";
import {
  FaCalendarAlt,
  FaBell,
  FaUsers,
  FaSync,
  FaMobileAlt,
  FaLock,
  FaEye,
} from "react-icons/fa";

const CalendarFeatures: React.FC = () => {
  const features = [
    {
      title: "Event Scheduling",
      description: "Easily add, edit, and remove events with a user-friendly interface.",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Reminders & Alerts",
      description: "Set reminders to never miss an important task or meeting.",
      icon: <FaBell />,
    },
    {
      title: "Team Collaboration",
      description: "Share calendars and keep your team in sync with shared schedules.",
      icon: <FaUsers />,
    },
    {
      title: "Cross-Device Sync",
      description: "Access your calendar on desktop, tablet, and mobile seamlessly.",
      icon: <FaSync />,
    },
    {
      title: "Month & Day Views",
      description: "Toggle between daily and monthly views for better visualization.",
      icon: <FaEye />,
    },
    {
      title: "Mobile Friendly",
      description: "Optimized for mobile devices with responsive layout.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Private & Secure",
      description: "Your events are stored locally or securely—no unwanted data sharing.",
      icon: <FaLock />,
    },
  ];

  const technicalSpecs = [
    "Event Management: Add, update, delete events",
    "Views: Monthly and daily calendar views",
    "Reminders: Customizable notifications for events",
    "Collaboration: Team sharing support",
    "Cross-Platform: Works across browsers and devices",
    "Performance: Lightweight and responsive UI",
    "Privacy: Local data handling, no external uploads",
  ];

  return (
    <FeaturesTemplate
      title="Calendar Features"
      subtitle="Plan, organize, and stay on top of your schedule with a simple yet powerful calendar tool"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default CalendarFeatures;
