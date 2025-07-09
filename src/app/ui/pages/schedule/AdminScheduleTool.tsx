import React, { useState } from "react";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Calendar from "./Calender";

import TaskSchedulerDashboard from "./TaskSchedulerDashboard";
import AdminSchudleeCardTwo from "../../components/CoreValueCard/AdminSchudleeCardTwo";
import CoreValueCardThree from "../../components/CoreValueCard/CoreValueCardThree";

// Import the components directly

const AdminScheduleTool: React.FunctionComponent = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const schedules = [
    {
      title: "Calendar",
      description:
        "Stay organized and ahead with our smart, intuitive calendar. From upcoming events and project deadlines to team meetings and personal reminders, our calendar keeps everything in one place—clear, connected, and customizable.",
      icon: MdOutlineEmojiEvents({ size: 24 }),
      id: "calendar",
      component: "ImageResizing",
    },
    {
      title: "Tasks Scheduler",
      description:
        "Stay organized and boost productivity with our intuitive Task Scheduler. Effortlessly plan, prioritize, and manage your daily activities to ensure nothing slips through the cracks.",
      icon: FaTasks({ size: 24 }),
      id: "tasks",
      component: "ImageResizing",
    },
  ];

  const renderSelectedTool = () => {
    switch (selectedTool) {
      case "calendar":
        return <Calendar />;
      case "tasks":
        return <TaskSchedulerDashboard />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="wrapper soft-wrapper">
        {/* Grid of Tools */}
        {!selectedTool && (
          <div style={{marginTop: "-47px"}}>
          <div className="soft-dev-content">
            {schedules.map((tool, index) => (
              // <AdminSchudleeCardTwo
              //   key={index}
              //   title={tool.title}
              //   description={tool.description}
              //   icon={tool.icon}
              //   onClick={() => setSelectedTool(tool.id)} // Instead of using a link
              //   className="process-card"
              // />
              <CoreValueCardThree
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                className="process-card"
                onLaunch={() => setSelectedTool(tool.id)}
              />
            ))}
          </div>
          </div>
        )}

        {/* Render Selected Tool Inline */}
        {selectedTool && (
          <>
            <button
              onClick={() => setSelectedTool(null)} //
              style={{
                margin: "2px",
                padding: "8px 16px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                color: "#333",
              }}
            >
              ← Back to Tools
            </button>

            {renderSelectedTool()}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminScheduleTool;
