import React, { useState } from "react";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Calendar from "./Calender";
import TaskSchedulerDashboard from "./TaskSchedulerDashboard";
import { AllToolsCard } from "../../components/CoreValueCard/AllToolsCard";
import { NewwebsiteCard } from "../../components/CoreValueCard/NewwebsiteCard";

const AdminScheduleTool: React.FunctionComponent = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const schedules = [
    {
      title: "Calendar",
      description:
        "Stay organized and ahead with our smart, intuitive calendar. From upcoming events and project deadlines to team meetings and personal reminders, our calendar keeps everything in one place—clear, connected, and customizable.",
      icon: <MdOutlineEmojiEvents size={24} />,
      id: "calendar",
    },
    {
      title: "Tasks Scheduler",
      description:
        "Stay organized and boost productivity with our intuitive Task Scheduler. Effortlessly plan, prioritize, and manage your daily activities to ensure nothing slips through the cracks.",
      icon: <FaTasks size={24} />,
      id: "tasks",
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
      <div className="wrapper soft-wrapper">
        {/* Show tool cards first */}
        {!selectedTool && (
          <div style={{ marginTop: "-47px" }}>
            <div className="soft-dev-content">
              {schedules.map((tool, index) => (
                <NewwebsiteCard
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  className="process-card"
                  onClick={() => setSelectedTool(tool.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Render Selected Tool */}
        {selectedTool && (
          <>
            <button
              onClick={() => setSelectedTool(null)}
              style={{
                margin: "2px",
                padding: "8px 16px",
                backgroundColor: "#071d69",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              Back to Schedule
            </button>
            {renderSelectedTool()}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminScheduleTool;
