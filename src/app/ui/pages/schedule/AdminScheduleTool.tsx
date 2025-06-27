import React, { useState } from "react";
import "../../components/liteGrid@v1.0/lite-grid.css";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Calendar from "./Calender";

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
    },
    {
      title: "Tasks Scheduler",
      description:
        "Stay organized and boost productivity with our intuitive Task Scheduler. Effortlessly plan, prioritize, and manage your daily activities to ensure nothing slips through the cracks.",
      icon: FaTasks({ size: 24 }),
      id: "tasks",
    },
  ];

  const renderSelectedTool = () => {
    switch (selectedTool) {
      case "calendar":
        return <Calendar/>
      case "tasks":
        return 'Coming soon'
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
          <div className="soft-dev-content">
            {schedules.map((tool, index) => (
              <CoreValueCardTwo
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                onClick={() => setSelectedTool(tool.id)} // Instead of using a link
                className="process-card"
              />
            ))}
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
