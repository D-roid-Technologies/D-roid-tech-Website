// TaskSchedulerFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../pages/toolboxpage/FeaturesTemplate";
import {
  FaTasks,
  FaBell,
  FaCalendarCheck,
  FaUsers,
  FaSync,
  FaMobileAlt,
  FaLock,
} from "react-icons/fa";

const TaskSchedulerFeatures: React.FC = () => {
  const features = [
    {
      title: "Smart Task Management",
      description: "Easily create, edit, and organize tasks with deadlines and priorities.",
      icon: <FaTasks />,
    },
    {
      title: "Reminders & Notifications",
      description: "Get timely alerts so you never miss a deadline or important task.",
      icon: <FaBell />,
    },
    {
      title: "Calendar Integration",
      description: "Sync tasks with your calendar for a unified scheduling experience.",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Collaboration Ready",
      description: "Assign tasks and share schedules with teammates or family members.",
      icon: <FaUsers />,
    },
    {
      title: "Cross-Device Sync",
      description: "Access your tasks seamlessly on desktop, tablet, and mobile devices.",
      icon: <FaSync />,
    },
    {
      title: "Mobile Friendly",
      description: "Stay productive on the go with a clean, responsive interface.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Privacy & Security",
      description: "Your tasks remain safe with secure handling and no unwanted sharing.",
      icon: <FaLock />,
    },
  ];

  const technicalSpecs = [
    "Task Creation: Add, edit, and delete tasks",
    "Prioritization: Set deadlines and task importance levels",
    "Reminders: Configurable notifications and alerts",
    "Integration: Calendar and schedule synchronization",
    "Collaboration: Share tasks with team or personal groups",
    "Cross-Platform: Works seamlessly across all devices",
    "Security: Private and secure task management",
  ];

  return (
    <FeaturesTemplate
      title="Task Scheduler Features"
      subtitle="Organize, prioritize, and complete your tasks efficiently with an intuitive scheduling system"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default TaskSchedulerFeatures;
