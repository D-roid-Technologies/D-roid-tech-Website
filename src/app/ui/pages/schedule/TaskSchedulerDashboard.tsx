import React, { useState } from "react";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import {
  BriefcaseIcon,
  ClockIcon,
  GraduationCapIcon,
  PaletteIcon,
  UsersIcon,
} from "../../components/dashboard-card/Icons";
import CreateTasks from "./CreateTasks";

const TaskSchedulerDashboard: React.FC = () => {
  const [itemsOne, setItemsOne] = useState<boolean>(true);
  const [itemsTwo, setItemsTwo] = useState<boolean>(false);

  const [itemsTitle, setItemsTitle] = useState<string>("");

  const renderSecondContent = () => {
    switch (itemsTitle) {
      case "Create Tasks":
        return (
          <CreateTasks
            onBack={() => setItemsTitle("default")} 
            onSubmit={(taskData) => console.log("Submitted Task:", taskData)}
          />
        );
      case "View All Tasks":
        return "This is View All Tasks";
      case "Reminders":
        return "This is Edit Task";
      case "Complete Goals":
        return "This is Archive";
      case "Track Progress":
        return "This is Archive";
      default:
        return null;
    }
  };

  const itemOne = [
    {
      icon: <GraduationCapIcon />,
      title: "View All Tasks",
      description:
        "Courses, schedules, progress tracking, and K-Coin rewards via KnowledgeCity.",
    },
    {
      icon: <ClockIcon />,
      title: "Create Tasks",
      description:
        "Time tracking, payslips, onboarding, and staff logs in one place.",
    },
    {
      icon: <UsersIcon />,
      title: "Reminders",
      description:
        "Join discussions, events, diaries, and announcements to stay connected.",
    },
    {
      icon: <PaletteIcon />,
      title: "Complete Goals",
      description:
        "Explore music, tools, resources, and calculators to boost your creativity.",
    },
    {
      icon: <BriefcaseIcon />,
      title: "Track Progress",
      description:
        "Find job listings, events, and challenges through LunchBox.",
    },
  ];

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      {itemsOne && (
        <section className="welcome-section">
          <h2 className="welcome-section-heading">Your Task Scheduler</h2>
          <div
            className="cards-grid cards-grid-3"
            style={{ cursor: "pointer" }}
          >
            {itemOne.map((item, index) => (
              <div
                onClick={() => {
                  setItemsOne(false);
                  setItemsTwo(true);
                  setItemsTitle(`${item.title}`);
                }}
              >
                <DashboardCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      {itemsTwo && (
        <>
          <button
            onClick={() => {
              setItemsOne(true);
              setItemsTwo(false);
            }}
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
            ←
          </button>
          <h3
            style={{
              color: "#000000",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {itemsTitle}
          </h3>
          {renderSecondContent()}
        </>
      )}
    </div>
  );
};

export default TaskSchedulerDashboard;
