import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/Store";
import { UserType } from "../../../utils/Types";
import {
  FaUser,
  FaTasks,
  FaBullhorn,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaCommentDots,
  FaChalkboardTeacher,
  FaChartLine,
  FaBookOpen,
  FaToolbox,
  FaCalculator,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import PersonalDetails from "./PersonalDetails";
import AllUsers from "./users/AllUsers";
import { authService } from "../../../redux/configuration/auth.service";
import SignInOut from "./SignInOut";
import StaffPay from "./StaffPay";
import WelcomePage from "./WelcomePage";
import Onboarding from "./Onboarding";
import Tasks from "./Tasks";
import Announcements from "./Announcements";
import SayIt from "./SayIt";
import Trainings from "./Trainings";
import Progression from "./Progressions";
import styles from "./DashboardContent.module.css";
import Section from "./Section";
import TaskScheduler from "../schedule/TaskScheduler";

interface DashboardContentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  const staffDetails = useSelector(
    (state: RootState) => state.SignInO.staffDetails
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<null | {
    title: string;
    content: string;
    icon: JSX.Element;
  }>(null);
  const [input, setInput] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const grossPay = parseFloat(staffDetails?.staffGrossPay ?? "0");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  const isUserStaff = userDetails.userType === "Staff";
  const isUserRole = userDetails.role === "Superadmin";

  const menuItems = [
    ...(isUserRole ? [{ label: "Users", icon: FaUser }] : []),
    { label: "Personal Details", icon: FaUser },
    { label: "Schedules", icon: FaCalendarAlt },
    { label: "Tool Box", icon: FaToolbox },
    { label: "Calculate", icon: FaCalculator },
    { label: "Announcements", icon: FaBullhorn },
    { label: "Say It", icon: FaCommentDots },
    ...(isUserStaff
      ? [
          { label: "Tasks", icon: FaTasks },
          { label: "Payslips", icon: FaFileInvoiceDollar },
          { label: "Onboarding", icon: FaUserPlus },
          { label: "Training", icon: FaChalkboardTeacher },
          { label: "Progressions", icon: FaChartLine },
          { label: "Resource", icon: FaBookOpen },
        ]
      : []),
  ];

  const handleMenuClick = (label: string) => {
    setSelectedMenu(label);
    if (windowWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSignOut = async () => {
    await authService
      .handleUserSignout()
      .then(() => navigate("/auth/join-our-community"))
      .catch((err) => console.error(err));
  };

  const rightMenuItems = [
    {
      title: "Documents",
      content: "Here are your documents.",
      icon: <i className="fas fa-file-alt"></i>,
    },
    {
      title: "Security",
      content: "Manage your security settings.",
      icon: <i className="fas fa-shield-alt"></i>,
    },
    {
      title: "Notifications",
      content: "View all your notifications.",
      icon: <i className="fas fa-bell"></i>,
    },
    {
      title: "Preferences",
      content: "Set your personal preferences.",
      icon: <i className="fas fa-cog"></i>,
    },
  ];

  const tasks = [
    { id: 1, name: "Task 1", status: "Completed" },
    { id: 2, name: "Task 2", status: "Ongoing" },
    { id: 3, name: "Task 3", status: "Not Started" },
  ];

  const announcements = [
    {
      id: 1,
      title: "New Staff Training",
      message: "Mandatory training next week",
    },
    {
      id: 2,
      title: "Office Closed",
      message: "Office will be closed on Friday for a holiday",
    },
  ];

  const schedule = {
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    leave: {
      approved: ["Monday", "Wednesday"],
      awaiting: ["Friday"],
    },
  };

  const calculateItems = [
    {
      title: "OhmsLawCalculator",
      content: "Calculate voltage, current, and resistance using Ohm's Law.",
    },
    {
      title: "BMICalculator",
      content: "Calculate your Body Mass Index (BMI).",
    },
  ];

  const handleClear = () => {
    setInput("");
  };

  const handleShowPayslip = () => {};

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const renderContent = () => {
    if (!selectedMenu) {
      return (
        <>
          <Section title="Welcome to your D'roid One Account">
            <WelcomePage />
          </Section>
        </>
      );
    }

    switch (selectedMenu) {
      case "Users":
        return (
          <Section title="Users">
            <AllUsers />
          </Section>
        );
      case "Personal Details":
        return (
          <Section title="Personal Details">
            <PersonalDetails />
          </Section>
        );
      case "Schedules":
        return (
          <Section title="Schedules">
            <p style={{ color: "#000000" }}>
              Manage and view your working schedules.
            </p>
            <div style={{ marginTop: "20px" }}>
              <TaskScheduler />
            </div>
          </Section>
        );
      case "Tool Box":
        return (
          <Section title="Tool Box">
            <p style={{ color: "#000000" }}>
              Access various tools for your tasks.
            </p>
          </Section>
        );
      case "Calculate":
        return (
          <Section title="Calculate">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                Perform calculations using our tools.
              </p>
              <select
                onChange={(e) => {
                  const selectedTitle = e.target.value;
                  if (selectedTitle === "Scientific Calculator") {
                    setSelectedMenuItem(null);
                  } else {
                    const foundItem = rightMenuItems.find(
                      (item) => item.title === selectedTitle
                    );
                    setSelectedMenuItem(foundItem || null);
                  }
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  minWidth: "200px",
                  cursor: "pointer",
                }}
              >
                <option value="Scientific Calculator">
                  Scientific Calculator
                </option>
                {calculateItems.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "20px",
                maxWidth: "400px",
              }}
            >
              <div
                style={{
                  minHeight: "400px",
                  padding: "30px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  backgroundColor: "#fafafa",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                {selectedMenuItem === null ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <input
                      type="text"
                      value={input}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "15px",
                        fontSize: "20px",
                        textAlign: "right",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      }}
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      {[
                        "7",
                        "8",
                        "9",
                        "/",
                        "4",
                        "5",
                        "6",
                        "*",
                        "1",
                        "2",
                        "3",
                        "-",
                        "0",
                        ".",
                        "=",
                        "+",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleButtonClick(item)}
                          style={{
                            padding: "15px",
                            fontSize: "18px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#ffffff")
                          }
                        >
                          {item}
                        </button>
                      ))}
                      <button
                        onClick={handleClear}
                        style={{
                          gridColumn: "span 4",
                          padding: "15px",
                          fontSize: "18px",
                          backgroundColor: "#e74c3c",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
                      {selectedMenuItem?.title}
                    </h3>
                    <p style={{ fontSize: "16px", color: "#666" }}>
                      {selectedMenuItem?.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        );
      case "Announcements":
        return (
          <Section title="Announcements">
            <Announcements />
          </Section>
        );
      case "Say It":
        return (
          <Section title="Contact us">
            <p style={{ color: "#000000" }}>
              Share your thoughts and feedback here.
            </p>
            <SayIt />
          </Section>
        );
      case "Tasks":
        return (
          <Section title="Tasks">
            <p style={{ color: "#000000" }}>See all list of all tasks here.</p>
            <Tasks />
          </Section>
        );
      case "Payslips":
        return (
          <Section title="Payslips">
            {grossPay > 0 ? (
              <>
                <p style={{ color: "#000000" }}>
                  View your salary payslips here.
                </p>
                <StaffPay />
              </>
            ) : (
              <p style={{ color: "#ff4d4f" }}>
                Gross pay data is missing or zero — please complete onboarding
                first.
              </p>
            )}
          </Section>
        );
      case "Onboarding":
        return (
          <Section title="Onboarding">
            <Onboarding />
          </Section>
        );
      case "Training":
        return (
          <Section title="Training">
            <p style={{ color: "#000000" }}>
              Access your training materials here.
            </p>
            <Trainings />
          </Section>
        );
      case "Progressions":
        return (
          <Section title="Progressions">
            <p style={{ color: "#000000" }}>
              Track your professional progress here.
            </p>
            <Progression />
          </Section>
        );
      case "Resource":
        return (
          <Section title="Resource">
            <p style={{ color: "#000000" }}>
              Browse useful resources and documents.
            </p>
            <SignInOut />
          </Section>
        );
      default:
        return (
          <Section title="Dashboard">
            <p style={{ color: "#000000" }}>Welcome to your dashboard.</p>
          </Section>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.userInfo}>
          <h3>
            Welcome, {userDetails.firstName} {userDetails.lastName}
          </h3>
          <p>{userDetails.email}</p>
          <div className={styles.userMeta}>
            <span>{userDetails.userType} Account</span>
            <span>
              <span style={{ fontWeight: "700" }}>ID: </span>
              {userDetails.uniqueId}
            </span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`${styles.navItem} ${
                selectedMenu === item.label ? styles.navItemActive : ""
              }`}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon className={styles.navIcon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <br />
        <br />

        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      </aside>

      <main className={styles.mainContent}>
        {selectedMenu && (
          <button
            className={styles.backButton}
            onClick={() => setSelectedMenu(null)}
          >
            <IoMdArrowRoundBack />
            Back
          </button>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardContent;
