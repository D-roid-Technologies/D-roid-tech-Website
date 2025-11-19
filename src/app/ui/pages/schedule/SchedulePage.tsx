import React from "react";
import Navbar from "../../components/navbar/NavBar";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AllToolsCard } from "../../components/CoreValueCard/AllToolsCard";

const SchedulePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const schedules = [
    {
      title: "Calendar",
      description:
        "Stay organized and ahead with our smart, intuitive calendar. From upcoming events and project deadlines to team meetings and personal reminders, our calendar keeps everything in one place—clear, connected, and customizable.",
      icon: MdOutlineEmojiEvents({ size: 24 }),
      link: "/schedules/calender",
      isPremium: false,
    },
    {
      title: "Tasks Scheduler",
      description:
        "Stay organized and boost productivity with our intuitive Task Scheduler. Effortlessly plan, prioritize, and manage your daily activities to ensure nothing slips through the cracks.",
      icon: FaTasks({ size: 24 }),
      link: "/schedules/task-scheduler",
      isPremium: true,
    },
  ];
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <h1 className="software-header">D'roid Schedules</h1>
            <p>
              D'roid Schedules is a smart scheduling tool that helps users
              organize, manage, and keep track of tasks, events, and activities
              with ease and efficiency.
            </p>
          </div>
        </div>
      </div>
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          D'roid Schedules
        </span>
        <div className="soft-dev-content">
          {schedules.map((tech, index) => (
            <AllToolsCard
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              isPremium={tech.isPremium}
              className="process-card"
              url={tech.link}
              onClick={tech.link ? () => navigate(tech.link) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
