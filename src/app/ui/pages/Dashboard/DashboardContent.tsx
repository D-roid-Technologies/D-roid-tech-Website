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
  FaCodeBranch,
  FaStamp,
  FaUserTie,
  FaFilePdf,
  FaMagic,
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
import CurrencyConverter from "../toolboxpage/currencyconverter/CurrencyConverter";
import { BsCurrencyExchange } from "react-icons/bs";
import CoreValueCardThree from "../../components/CoreValueCard/CoreValueCardThree";
import { GiCalculator } from "react-icons/gi";
import { SlCalculator } from "react-icons/sl";
import { TbCalculator, TbMicroscope } from "react-icons/tb";
import Calculate from "../calculator/Calculate";
import ScientificCalculator from "../../components/scientificcalculator/ScientificCalculator";
import Bmi from "../calculator/Bmi";
import { LuCalculator } from "react-icons/lu";
import BackgroundRemover from "../backgroundremover/BackgroundRemover";
import ToolsCard from "../../components/CoreValueCard/ToolsCard";
// import CurrencyConvert from "../toolboxpage/premiumtoolbox/CurrencyConvert";
import ResumeAnalyzing from "../toolboxpage/premiumtoolbox/ResumeAnalyzing";
import BackgroundRemove from "../toolboxpage/premiumtoolbox/BackgroundRemove";
import PdfEdit from "../toolboxpage/premiumtoolbox/PdfEdit";
import CurrencyConvert from "../toolboxpage/premiumtoolbox/CurrencyConvert";

// const tools = [
//   {
//     title: "Currency Converter",
//     description:
//       "Get real-time conversion rates for global currencies with historical data and live exchange rate updates for accuracy.",
//     icon: BsCurrencyExchange({ size: 24 }),
//     category: "Calculation Tools",
//     link: "/toolbox/currency-converter",
//   },
//   {
//     title: "AI Background Remover",
//     description:
//       "Automatically remove backgrounds from images using AI with high precision and speed for professional photo editing results.",
//     icon: FaMagic({ size: 24 }),
//     category: "Image Tools",
//     link: "/toolbox/ai-background-remover",
//     isPremium: true,
//   },
//   {
//     title: "Advanced PDF Editor",
//     description:
//       "Merge, split, sign, and annotate PDFs with advanced editing options including forms, passwords, and digital signatures.",
//     icon: FaFilePdf({ size: 24 }),
//     category: "Document Tools",
//     link: "/toolbox/advanced-pdf-editor",
//     isPremium: true,
//   },
//   {
//     title: "Resume & CV Analyzer",
//     description:
//       "Analyze and score your resume against industry standards and job descriptions with detailed feedback and improvement tips.",
//     icon: FaUserTie({ size: 24 }),
//     category: "Career Tools",
//     link: "",
//     isPremium: true,
//   },
//   {
//     title: "Code Complexity Analyzer",
//     description:
//       "Detect and measure code complexity, maintainability, and hotspots in your codebase with detailed metrics and recommendations.",
//     icon: FaCodeBranch({ size: 24 }),
//     category: "Developer Tools",
//     link: "",
//     isPremium: true,
//   },
//   {
//     title: "Bulk Image Watermarker",
//     description:
//       "Apply watermarks to multiple images at once for branding and copyright protection with customizable positioning and opacity.",
//     icon: FaStamp({ size: 24 }),
//     category: "Image Tools",
//     link: "",
//     isPremium: true,
//   },
// ];
const tools = [
  {
    title: "Currency Converter",
    description:
      "Get real-time conversion rates for global currencies with historical data and live exchange rate updates for accuracy.",
    icon: BsCurrencyExchange({ size: 24 }),
    category: "Calculation Tools",
    component: "CurrencyConverter", // Add component identifier
    link: "/toolbox/currency-converter",
  },
  {
    title: "AI Background Remover",
    description:
      "Automatically remove backgrounds from images using AI with high precision and speed for professional photo editing results.",
    icon: FaMagic({ size: 24 }),
    category: "Image Tools",
    component: "BackgroundRemover", // Add component identifier
    link: "/toolbox/ai-background-remover",
    isPremium: true,
  },
  {
    title: "Advanced PDF Editor",
    description:
      "Merge, split, sign, and annotate PDFs with advanced editing options including forms, passwords, and digital signatures.",
    icon: FaFilePdf({ size: 24 }),
    category: "Document Tools",
    component: "PDFEditor", // Add component identifier
    link: "/toolbox/advanced-pdf-editor",
    isPremium: true,
  },
  {
    title: "Resume & CV Analyzer",
    description:
      "Analyze and score your resume against industry standards and job descriptions with detailed feedback and improvement tips.",
    icon: FaUserTie({ size: 24 }),
    category: "Career Tools",
    component: "ResumeAnalyzer", // Add component identifier
    link: "",
    isPremium: true,
  },
  {
    title: "Code Complexity Analyzer",
    description:
      "Detect and measure code complexity, maintainability, and hotspots in your codebase with detailed metrics and recommendations.",
    icon: FaCodeBranch({ size: 24 }),
    category: "Developer Tools",
    component: "CodeComplexityAnalyzer",
    link: "",
    isPremium: true,
  },
  {
    title: "Bulk Image Watermarker",
    description:
      "Apply watermarks to multiple images at once for branding and copyright protection with customizable positioning and opacity.",
    icon: FaStamp({ size: 24 }),
    category: "Image Tools",
    component: "BulkImageWatermarker",
    link: "",
    isPremium: true,
  },
];

const calculators = [
  {
    title: "Calculator",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: TbCalculator({ size: 24 }),
    link: "",
  },
  {
    title: "Scientific Calculator",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: GiCalculator({ size: 24 }),
    link: "",
  },
  {
    title: "BMI Calculator",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
    icon: TbMicroscope({ size: 24 }),
    link: "",
  },
  {
    title: "OhmsLawCalculator",
    description:
      "Easily calculate voltage (V), current (I), or resistance (R) using the fundamental principles of Ohm's Law. This intuitive tool allows you to input any two known values and instantly compute the third.",
    icon: FaCalculator({ size: 24 }),
    link: "",
  },
  // {
  //   title: "OhmsLawCalculator",
  //   content: "Calculate voltage, current, and resistance using Ohm's Law.",
  // },
];

interface DashboardContentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
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

  //Toools
  // Add state for active tool
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Update the handleLaunchTool function
  const handleLaunchTool = (toolComponent: string) => {
    setActiveTool(toolComponent);
  };

  // Create a function to handle closing tools
  const handleCloseTool = () => {
    setActiveTool(null);
  };
  // // Add state for active tool
  // const [activeTool, setActiveTool] = useState<string | null>(null);

  // // Update the handleLaunchTool function
  // const handleLaunchTool = (toolComponent: string) => {
  //   setActiveTool(toolComponent);
  // };

  // Create a function to render the active tool component
  const renderToolComponent = () => {
    switch (activeTool) {
      case "CurrencyConverter":
        return <CurrencyConvert onClose={handleCloseTool} />;
      case "ResumeAnalyzer":
        return <ResumeAnalyzing onClose={handleCloseTool} />;
      case "BackgroundRemover":
        return <BackgroundRemove onClose={handleCloseTool} />;
      case "PDFEditor":
        return <PdfEdit onClose={handleCloseTool} />;
      default:
        return null;
    }
  };

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
      title: "Scientific Calculator",
      description:
        "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
      icon: FaCalculator({ size: 24 }),
      link: "/calculators/sciencecalculate",
    },
    {
      title: "BMI Calculator",
      description:
        "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
      icon: GiCalculator({ size: 24 }),
      link: "/calculators/bmicalcute",
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
            <p style={{ color: "#000000", marginBottom: "20px" }}>
              Access various tools for your tasks.
            </p>
            {activeTool ? (
              // Render the active tool component
              <div>
                <button
                  onClick={() => setActiveTool(null)}
                  style={{
                    marginBottom: "20px",
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
                {renderToolComponent()}
              </div>
            ) : (
              // Render the tools grid
              <>
                <div className="soft-dev-content">
                  {tools.map((tech, index) => (
                    <ToolsCard
                      key={index}
                      title={tech.title}
                      description={tech.description}
                      icon={tech.icon}
                      link={tech.link}
                      onLaunch={
                        tech.component
                          ? () => handleLaunchTool(tech.component)
                          : undefined
                      }
                      className="process-card"
                    />
                    // <CoreValueCardThree
                    //   key={index}
                    //   title={tech.title}
                    //   description={tech.description}
                    //   icon={tech.icon}
                    //   link={tech.link}
                    //   onLaunch={
                    //     tech.component
                    //       ? () => handleLaunchTool(tech.component)
                    //       : undefined
                    //   }
                    //   className="process-card"
                    // />
                  ))}
                </div>
              </>
            )}
            {/* </Section> */}
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
                marginBottom: "50px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
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
            <div className="soft-dev-content">
              {calculators.map((tech, index) => (
                <CoreValueCardThree
                  key={index}
                  title={tech.title}
                  description={tech.description}
                  icon={tech.icon}
                  link={tech.link}
                  className="process-card"
                />
              ))}
            </div>
            {/* <div>
              <Calculate />
              <ScientificCalculator />
              <Bmi />
            </div> */}
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
            {/* <p style={{ color: "#000000" }}>
              Share your thoughts and feedback here.
            </p> */}
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
              {/* @ts-ignore */}
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
            {/* @ts-ignore */}
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
