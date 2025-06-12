import React from "react";
import Navbar from "../../components/navbar/NavBar";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { RoutePaths } from "../../../routes/Index";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const SchedulePage: React.FunctionComponent = () => {
  const schedules = [
    {
      title: "Events",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis maxime ab nesciunt, ea minima deleniti! lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis maxime ab nesciunt, ea minima deleniti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis",
      icon: MdOutlineEmojiEvents({ size: 24 }),
      link: "/under-development",
    },
    {
      title: "Tasks Scheduler",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis maxime ab nesciunt, ea minima deleniti!",
      icon: FaTasks({ size: 24 }),
      link: "/schedules/task-scheduler",
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
            <CoreValueCardTwo
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              link={tech.link}
              className="process-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
