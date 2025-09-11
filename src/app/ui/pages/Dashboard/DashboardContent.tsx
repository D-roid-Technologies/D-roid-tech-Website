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
  FaHandsHelping,
  FaChalkboard,
  FaBriefcase,
  FaUsers,
  FaFolderOpen,
  FaHeart,
  FaDonate,
  FaServicestack,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
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
import { GiCalculator } from "react-icons/gi";
import { TbCalculator, TbMicroscope } from "react-icons/tb";
import ScientificCalculator from "../../components/scientificcalculator/ScientificCalculator";
import Bmi from "../calculator/Bmi";
import ToolsCard from "../../components/CoreValueCard/ToolsCard";
import ResumeAnalyzing from "../toolboxpage/premiumtoolbox/ResumeAnalyzing";
import PdfEdit from "../toolboxpage/premiumtoolbox/PdfEdit";
import CurrencyConvert from "../toolboxpage/premiumtoolbox/CurrencyConvert";
import ImageMark from "../toolboxpage/premiumtoolbox/ImageMark";
import JsonFormatter from "../../components/toolboxfolder/jsonformat/JsonFormater";
import { FaWallet } from "react-icons/fa6";
import ClassRoom from "./ClassRoom";
import Staffs from "./Staffs";
import Library from "./Library";
import Finance from "./Finance";
import CareersDashboard from "./CareersDashboard";
import ColorConv from "../../components/toolboxfolder/Colorconv/ColorConv";
import WordCounterItem from "../../components/toolboxfolder/WordCounter/WordCounterItem";
import UuidGeneratorItem from "../toolboxpage/uuidgenerator/UuidGeneratorItem";
import EncoderItem from "../toolboxpage/Encoder/EncoderItem";
import { Alltools } from "../toolboxpage/ToolBoxItems";
import ImageRezised from "../../components/toolboxfolder/imageresizing/ImageRezised";
import ImageCompressItem from "../../components/toolboxfolder/imagecompress/ImageCompressItem";
import CropToolItem from "../toolboxpage/croptool/CropToolItem";
import ColorPickerItem from "../../components/toolboxfolder/colorPicker/colorPickerItem";
import BackgroundRemoverItem from "../toolboxpage/premiumtoolbox/BackgroundRemoverItem";
import AdminScheduleTool from "../schedule/AdminScheduleTool";
import ServicesItems from "./Services";
import UnderDevelopmentPage from "../underDevelopment/UnderDevelopmentPage";
import { VolunteersSection } from "./volunteers-section";
import { DonationsSection } from "./donations-section";
import { GroupsSection } from "./groups-section";
import { ImpactSection } from "./impact-section";
import { OutreachSection } from "./outreach-section";
import { PartnersSection } from "./partners-section";
import { ClientsSection } from "./clients-section";
import { DepartmentsSection } from "./departments-section";
import { ProjectsSection } from "./projects-section";
import { ReportsSection } from "./reports-section";
import StaffUserHomePage from "./staff/StaffUserHomePage";
import SchoolDashboard from "./organization/SchoolDashboard";
import BusinessDashboard from "./organization/BusinessDashboard";
import NGODashboard from "./organization/NGODashboard";
import { AllToolsCard } from "../../components/CoreValueCard/AllToolsCard";
import MemberDashboard from "./member/MemberDashboard";
import { NewwebsiteCard } from "../../components/CoreValueCard/NewwebsiteCard";

// const tools = [
//   {
//     title: "Currency Converter",
//     description:
//       "Get real-time conversion rates for global currencies with historical data and live exchange rate updates for accuracy.",
//     icon: BsCurrencyExchange({ size: 24 }),
//     category: "Calculation Tools",
//     component: "CurrencyConverter", // Add component identifier
//     link: "",
//   },
//   {
//     title: "AI Background Remover",
//     description:
//       "Automatically remove backgrounds from images using AI with high precision and speed for professional photo editing results.",
//     icon: FaMagic({ size: 24 }),
//     category: "Image Tools",
//     component: "BackgroundRemove", // Add component identifier
//     link: "",
//     isPremium: true,
//   },
//   {
//     title: "Advanced PDF Editor",
//     description:
//       "Merge, split, sign, and annotate PDFs with advanced editing options including forms, passwords, and digital signatures.",
//     icon: FaFilePdf({ size: 24 }),
//     category: "Document Tools",
//     component: "PDFEditor", // Add component identifier
//     link: "",
//     isPremium: true,
//   },
//   {
//     title: "Resume & CV Analyzer",
//     description:
//       "Analyze and score your resume against industry standards and job descriptions with detailed feedback and improvement tips.",
//     icon: FaUserTie({ size: 24 }),
//     category: "Career Tools",
//     component: "ResumeAnalyzer", // Add component identifier
//     link: "",
//     isPremium: true,
//   },
//   {
//     title: "Code Complexity Analyzer",
//     description:
//       "Detect and measure code complexity, maintainability, and hotspots in your codebase with detailed metrics and recommendations.",
//     icon: FaCodeBranch({ size: 24 }),
//     category: "Developer Tools",
//     component: "CodeComplexityAnalyzer",
//     link: "",
//     isPremium: true,
//   },
//   {
//     title: "Bulk Image Watermarker",
//     description:
//       "Apply watermarks to multiple images at once for branding and copyright protection with customizable positioning and opacity.",
//     icon: FaStamp({ size: 24 }),
//     category: "Image Tools",
//     component: "BulkImageWatermarker",
//     link: "",
//     isPremium: true,
//   },
// ];

const calculators = [
  // {
  //   title: "Calculator",
  //   description:
  //     "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
  //   icon: TbCalculator({ size: 24 }),
  //   component: "Calculate", // Add component identifier
  //   link: "",
  // },
  {
    title: "Scientific Calculator",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: GiCalculator({ size: 24 }),
    component: "ScientificCalculator", // Add component identifier
    link: "",
  },
  {
    title: "BMI Calculator",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
    icon: TbMicroscope({ size: 24 }),
    component: "Bmi", // Add component identifier
    link: "",
  },
  {
    title: "OhmsLawCalculator",
    description:
      "Easily calculate voltage (V), current (I), or resistance (R) using the fundamental principles of Ohm's Law. This intuitive tool allows you to input any two known values and instantly compute the third.",
    icon: FaCalculator({ size: 24 }),
    component: "OhmslawCalculator", // Add component identifier
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
  const [currentTime] = useState(new Date());

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
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

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

  // Create a function to render the active tool component
  // const renderToolComponent = () => {
  //   switch (activeTool) {
  //     case "CurrencyConverter":
  //       return <CurrencyConvert onClose={handleCloseTool} />;
  //     case "ResumeAnalyzer":
  //       return <ResumeAnalyzing onClose={handleCloseTool} />;
  //     case "BackgroundRemove":
  //       return <BackgroundRemove onClose={handleCloseTool} />;
  //     case "PDFEditor":
  //       return <PdfEdit onClose={handleCloseTool} />;
  //     case "CodeComplexityAnalyzer":
  //       return <CodeComplex onClose={handleCloseTool} />;
  //     case "BulkImageWatermarker":
  //       return <ImageMark onClose={handleCloseTool} />;

  //     default:
  //       return null;
  //   }
  // };

  const renderToolComponent = () => {
    switch (activeTool) {
      case "ImageResizing":
        return <ImageRezised />; //working but onClose={handleCloseTool}
      case "ColorConverter":
        return <ColorConv />; //working but onClose={handleCloseTool} is not
      case "ImageCompressor":
        return <ImageCompressItem />; //// working but onClose={handleCloseTool} is not
      case "CropTool":
        return <CropToolItem />;
      case "ColorPicker":
        return <ColorPickerItem />; ////Not working
      case "WordCounter":
        return <WordCounterItem />; //working but onClose={handleCloseTool} is not
      case "CurrencyConverter":
        return <CurrencyConvert onClose={handleCloseTool} />; //working but No item
      case "JsonFormatter":
        return <JsonFormatter />; // working
      case "UUIDGenerator":
        return <UuidGeneratorItem />;
      case "Base64EncoderDecoder":
        return <EncoderItem />;
      case "BackgroundRemove":
        return <BackgroundRemoverItem onClose={handleCloseTool} />;
      case "PDFEditor":
        return <PdfEdit onClose={handleCloseTool} />;
      case "ResumeAnalyzer":
        return <ResumeAnalyzing />;
      case "CodeComplexityAnalyzer":
        return <UnderDevelopmentPage />;
      case "BulkImageWatermarker":
        return <ImageMark onClose={handleCloseTool} />;
      default:
        return <p>Select a tool to get started.</p>;
    }
  };

  //Calculator
  // Update the handleLaunchTool function
  const handleLaunchCalculator = (calculatorComponent: string) => {
    setActiveCalculator(calculatorComponent);
  };

  // Create a function to handle closing tools
  const handleCloseCalculator = () => {
    setActiveCalculator(null);
  };

  // Create a function to render the active tool component
  const renderCalculatorComponent = () => {
    switch (activeCalculator) {
      // case "Calculate":
      //   return <Calculate onClose={handleCloseCalculator} />;
      case "ScientificCalculator":
        return <ScientificCalculator onClose={handleCloseCalculator} />;
      case "Bmi":
        return <Bmi onClose={handleCloseCalculator} />;
      case "OhmslawCalculator":
        return <UnderDevelopmentPage />;

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
  const userType = userDetails.userType;
  const orgType = userDetails.organisationalType?.toLowerCase() as
    | "school"
    | "business"
    | "ngo"
    | undefined;

  const organizationType: "school" | "business" | "ngo" = "school";

  const orgSpecificItems: Record<
    "school" | "business" | "ngo",
    { label: string; icon: any }[]
  > = {
    school: [
      { label: "Classroom", icon: FaChalkboard },
      // { label: "Students", icon: FaUsers },
      { label: "Staffs", icon: FaUsers },
      // { label: "Grades", icon: FaChartLine },
      { label: "Library", icon: FaBookOpen },
      { label: "Finance", icon: FaWallet },
    ],
    business: [
      { label: "Departments", icon: FaBriefcase },
      { label: "Projects", icon: FaFolderOpen },
      { label: "Clients", icon: FaUsers },
      { label: "Finance", icon: FaFileInvoiceDollar },
      { label: "Reports", icon: FaChartLine },
    ],
    ngo: [
      { label: "Volunteers", icon: FaHandsHelping },
      { label: "Donations", icon: FaDonate },
      { label: "Outreach", icon: FaBullhorn },
      { label: "Impact", icon: FaHeart },
      { label: "Partners", icon: FaUsers },
      { label: "Groups", icon: FaUsers },
    ],
  };

  const menuItems = [
    ...(isUserRole ? [{ label: "Users", icon: FaUser }] : []),
    // {
    //   label:
    //     userType === "Staff"
    //       ? "Staff Details"
    //       : userType === "Member"
    //         ? "Member Details"
    //         : "Organisation Details",
    //   icon: FaUser
    // },
    {
      label: "Personal Details",
      icon: FaUser,
    },
    ...(userType === "Organisation" && orgType && orgSpecificItems[orgType]
      ? orgSpecificItems[orgType]
      : []),
    { label: "Services", icon: FaServicestack },
    { label: "Careers", icon: FaBriefcase },
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

  const renderContent = () => {
    if (!selectedMenu) {
      switch (userType) {
        case "Staff":
          return (
            <>
              <Section title="Staff Dashboard">
                <StaffUserHomePage />
              </Section>
            </>
          );
        case "Organisation":
          // Check organization type and render appropriate home page
          switch (orgType) {
            case "school":
              return (
                <>
                  <Section title="School Dashboard">
                    <SchoolDashboard />
                  </Section>
                </>
              );
            case "business":
              return (
                <>
                  <Section title="Business Dashboard">
                    <BusinessDashboard />
                  </Section>
                </>
              );
            case "ngo":
              return (
                <>
                  <Section title="NGO Dashboard">
                    <NGODashboard />
                  </Section>
                </>
              );
            default:
              return (
                <>
                  <Section title="Organization Dashboard">
                    <p>Please configure your organization type in settings.</p>
                  </Section>
                </>
              );
          }
        // case "Organisation":
        //   return (
        //     <>
        //       <Section title="Organization Dashboard">
        //         <p> Organization Home Page goes here </p>
        //       </Section>
        //     </>
        //   );
        case "Member":
          return (
            <>
              <Section title="Member Dashboard">
                <MemberDashboard setSelectedMenu={setSelectedMenu} />
              </Section>
            </>
          );
        default:
          return (
            <>
              <Section title="Welcome to your D'roid One Account">
                <WelcomePage />
              </Section>
            </>
          );
      }
    }

    switch (selectedMenu) {
      case "Users":
        return (
          <Section title="Users" isActive={selectedMenu === "Users"}>
            <AllUsers />
          </Section>
        );
      case "Personal Details":
        return (
          <Section
            title="Personal Details"
            isActive={selectedMenu === "Personal Details"}
          >
            <PersonalDetails />
          </Section>
        );
      case "Announcements":
        return (
          <Section
            title="Announcements"
            isActive={selectedMenu === "Announcements"}
          >
            <Announcements />
          </Section>
        );
      case "Tasks":
        return (
          <Section title="Tasks" isActive={selectedMenu === "Tasks"}>
            <p style={{ color: "#000000" }}>See all list of all tasks here.</p>
            <Tasks />
          </Section>
        );
      case "Payslips":
        return (
          <Section title="Payslips" isActive={selectedMenu === "Payslips"}>
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
          <Section title="Onboarding" isActive={selectedMenu === "Onboarding"}>
            <Onboarding />
          </Section>
        );
      case "Training":
        return (
          <Section title="Training" isActive={selectedMenu === "Training"}>
            <p style={{ color: "#000000" }}>
              Access your training materials here.
            </p>
            <Trainings />
          </Section>
        );
      case "Progressions":
        return (
          <Section
            title="Progressions"
            isActive={selectedMenu === "Progressions"}
          >
            <p style={{ color: "#000000" }}>
              Track your professional progress here.
            </p>
            <Progression />
          </Section>
        );
      case "Resource":
        return (
          <Section title="Resource" isActive={selectedMenu === "Resource"}>
            <p style={{ color: "#000000" }}>
              Browse useful resources and documents.
            </p>
            <SignInOut />
          </Section>
        );
      case "Schedules":
        return (
          <Section title="Schedules" isActive={selectedMenu === "Schedules"}>
            <p style={{ color: "#000000" }}>
              Manage and view your working schedules.
            </p>
            <div style={{ marginTop: "10px" }}>
              <AdminScheduleTool />
            </div>
          </Section>
        );
      case "Tool Box":
        return (
          <Section title="Tool Box" isActive={selectedMenu === "Tool Box"}>
            <p style={{ color: "#000000", marginBottom: "20px" }}>
              Access various tools for your tasks
            </p>
            {activeTool ? (
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
              <div className="soft-dev-content">
                {Alltools.map((tech, index) => (
                  <AllToolsCard
                    key={index}
                    title={tech.title}
                    description={tech.description}
                    icon={tech.icon}
                    isPremium={tech.isPremium}
                    onClick={
                      tech.component
                        ? () => handleLaunchTool(tech.component)
                        : undefined
                    }
                    className="process-card"
                  />
                ))}
              </div>
            )}
          </Section>
        );
      case "Calculate":
        return (
          <Section title="Calculate" isActive={selectedMenu === "Calculate"}>
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
            </div>
            {activeCalculator ? (
              <div>
                <button
                  onClick={() => setActiveCalculator(null)}
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
                {renderCalculatorComponent()}
              </div>
            ) : (
              <div className="soft-dev-content">
                {calculators.map((tech, index) => (
                  <NewwebsiteCard
                    key={index}
                    title={tech.title}
                    description={tech.description}
                    icon={tech.icon}
                    className="process-card"
                    url={tech.link} // ✅ if it’s a link/route
                    onClick={
                      tech.component
                        ? () => handleLaunchCalculator(tech.component) // ✅ if it’s a tool component
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </Section>
        );
      case "Say It":
        return (
          <Section title="Contact us" isActive={selectedMenu === "Say It"}>
            <SayIt />
          </Section>
        );
      case "Classroom":
        return (
          <Section
            title="Your Class Room"
            isActive={selectedMenu === "Classroom"}
          >
            <ClassRoom />
          </Section>
        );
      case "Staffs":
        return (
          <Section title="Your Staffs" isActive={selectedMenu === "Staffs"}>
            <Staffs />
          </Section>
        );
      case "Library":
        return (
          <Section title="Your Library" isActive={selectedMenu === "Library"}>
            <Library />
          </Section>
        );
      case "Services":
        return (
          <Section title="Your Services" isActive={selectedMenu === "Services"}>
            <ServicesItems />
          </Section>
        );
      case "Careers":
        return (
          <Section title="Your Careers" isActive={selectedMenu === "Careers"}>
            <CareersDashboard />
          </Section>
        );
      case "Finance":
        return (
          <Section title="Your Finance" isActive={selectedMenu === "Finance"}>
            <Finance />
          </Section>
        );
      case "Volunteers":
        return (
          <Section
            title="Your Volunteers"
            isActive={selectedMenu === "Volunteers"}
          >
            <VolunteersSection />
          </Section>
        );
      case "Donations":
        return (
          <Section
            title="Your Donations"
            isActive={selectedMenu === "Donations"}
          >
            <DonationsSection />
          </Section>
        );
      case "Outreach":
        return (
          <Section title="Your Outreach" isActive={selectedMenu === "Outreach"}>
            <OutreachSection />
          </Section>
        );
      case "Impact":
        return (
          <Section title="Your Impact" isActive={selectedMenu === "Impact"}>
            <ImpactSection />
          </Section>
        );
      case "Partners":
        return (
          <Section title="Your Partners" isActive={selectedMenu === "Partners"}>
            <PartnersSection />
          </Section>
        );
      case "Groups":
        return (
          <Section title="Your Groups" isActive={selectedMenu === "Groups"}>
            <GroupsSection />
          </Section>
        );
      case "Departments":
        return (
          <Section
            title="Your Departments"
            isActive={selectedMenu === "Departments"}
          >
            <DepartmentsSection />
          </Section>
        );
      case "Clients":
        return (
          <Section title="Your Clients" isActive={selectedMenu === "Clients"}>
            <ClientsSection />
          </Section>
        );
      case "Projects":
        return (
          <Section title="Your Projects" isActive={selectedMenu === "Projects"}>
            <ProjectsSection />
          </Section>
        );
      case "Reports":
        return (
          <Section title="Your Reports" isActive={selectedMenu === "Reports"}>
            <ReportsSection />
          </Section>
        );
      default:
        return (
          <Section title="Dashboard" isActive={selectedMenu === "Dashboard"}>
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
            Good{" "}
            {currentTime.getHours() < 12
              ? "Morning"
              : currentTime.getHours() < 18
              ? "Afternoon"
              : "Evening"}
            , {userDetails.firstName}
            {/* Hello, {userDetails.firstName} {userDetails.lastName} */}
          </h3>
          <p>{userDetails.email}</p>
          <div className={styles.userMeta}>
            <span>{userDetails.userType} Account</span>
            <span>
              <span style={{ fontWeight: "700" }}>ID: </span>
              {userDetails.staffId}
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
            <IoHomeSharp />
            Home
          </button>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardContent;
