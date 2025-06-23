import React from "react";
import Navbar from "../../components/navbar/NavBar";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { RoutePaths } from "../../../routes/Index";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const ScheduleTool: React.FunctionComponent = () => {
  const schedules = [
    {
      title: "Calendar",
      description:
        "Stay organized and ahead with our smart, intuitive calendar. From upcoming events and project deadlines to team meetings and personal reminders, our calendar keeps everything in one place—clear, connected, and customizable. Whether you're planning your week or coordinating with your team, it's your go-to tool for staying on track and in sync. Plan with purpose. Stay in control. Make every day count.",
      icon: MdOutlineEmojiEvents({ size: 24 }),
      link: "/schedules/calender",
    },
    {
      title: "Tasks Scheduler",
      description:
        "Stay organized and boost productivity with our intuitive Task Scheduler. Effortlessly plan, prioritize, and manage your daily activities to ensure nothing slips through the cracks. Whether you're tracking deadlines, setting reminders, or coordinating team tasks, our scheduler helps you stay focused and in control.",
      icon: FaTasks({ size: 24 }),
      link: "/schedules/task-scheduler",
    },
  ];
  return (
    <div>
   
      {/* Hero */}
     
      <div className="wrapper soft-wrapper">
        
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

export default ScheduleTool;
