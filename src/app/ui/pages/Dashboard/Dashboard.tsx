import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Trap the user on this page
    const trapHistory = () => {
      window.history.pushState(null, "", window.location.href);
    };

    trapHistory(); // Initial push

    const handlePopState = (e: PopStateEvent) => {
      // If user presses back, re-trap
      trapHistory();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#F9F9F9",
      }}
    >
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardContent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
};

export default Dashboard;
