import type React from "react";
import { useState, useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../redux/Store";
import type { UserType } from "../../../utils/Types";
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
  FaPencilAlt,
} from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import PersonalDetails from "./PersonalDetails";
import AllUsers from "./users/AllUsers";
import { authService } from "../../../redux/configuration/auth.service";
import SignInOut from "./SignInOut";
import StaffPay from "./StaffPay";
import WelcomePage from "./WelcomePage";
import Onboarding from "./Onboarding";
import Tasks from "./tasks/Tasks";
import Announcements from "./Notifications";
import SayIt from "./SayIt";
import Trainings from "./Trainings";
import Progression from "./progression/Progressions";
import styles from "./DashboardContent.module.css";
import Section from "./Section";
import { GiCalculator } from "react-icons/gi";
import { TbMicroscope } from "react-icons/tb";
import ScientificCalculator from "../../components/scientificcalculator/ScientificCalculator";
import Bmi from "../calculator/Bmi";
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
import CodeComplex from "../toolboxpage/premiumtoolbox/CodeComplex";
import { UpgradeToAccessTools } from "../../components/UpgradeToAccessTools";
import { PendingConfirmation } from "../../components/payment/PendingConfirmation";
import TakeTestFolder from "./takeTest/TakeTestFolder";
import CompleteOnboarding from "./CompleteOnbording";
import { isAboveSixMonths } from "../../../utils/isAboveSixMonths";
import NotEligibleForTraining from "../../../utils/statusMessages";
import { getToolAccessMessage } from "../../../redux/utils/toolAccessManager";
import { useFreeTierTools } from "../../../hooks/useFreeTierTools";

const calculators = [
  {
    title: "Scientific Calculator",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: GiCalculator({ size: 24 }),
    component: "ScientificCalculator",
    link: "",
  },
  {
    title: "BMI Calculator",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
    icon: TbMicroscope({ size: 24 }),
    component: "Bmi",
    link: "",
  },
  {
    title: "OhmsLawCalculator",
    description:
      "Easily calculate voltage (V), current (I), or resistance (R) using the fundamental principles of Ohm's Law.",
    icon: FaCalculator({ size: 24 }),
    component: "OhmslawCalculator",
    link: "",
  },
]

interface DashboardContentProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedMenu: string | null
  setSelectedMenu: React.Dispatch<React.SetStateAction<string | null>>
  onClose?: () => void
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedMenu,
  setSelectedMenu,
}) => {
  const navigate = useNavigate()
  const [currentTime] = useState(new Date())
  const { checkToolAccess, recordToolUsage } = useFreeTierTools()

  const userDetails: UserType = useSelector((state: RootState) => state.user)
  const staffDetails = useSelector((state: RootState) => state.SignInO.staffDetails)
  const staffInfo = useSelector((state: RootState) => state.onboarding.staffInfo)

  const isAboveSixMonth = isAboveSixMonths(staffInfo?.staffStartDate)

  const [selectedMenuItem, setSelectedMenuItem] = useState<null | {
    title: string
    content: string
    icon: ReactNode
  }>(null)
  const [input, setInput] = useState("")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const grossPay = Number.parseFloat(staffDetails?.staffGrossPay ?? "0")
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null)

  
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [freeTierWarning, setFreeTierWarning] = useState<string | null>(null)

  const filteredTools = Alltools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLaunchTool = (toolComponent: string, isPremium?: boolean) => {
    if (isPremium) {
      const access = checkToolAccess(toolComponent, true)

      if (!access.canAccess) {
        setShowUpgradePrompt(toolComponent)
        return
      }


      const warningMessage = getToolAccessMessage(access, toolComponent)
      if (warningMessage) {
        setFreeTierWarning(warningMessage)
      }

      // Record usage for this tool
      recordToolUsage(toolComponent)
    }

    setActiveTool(toolComponent)
  }

  const handleCloseTool = () => {
    setActiveTool(null)
    setShowUpgradePrompt(null)
    setFreeTierWarning(null)
  }

  const renderToolComponent = () => {
    if (showUpgradePrompt) {
      const tool = Alltools.find((t) => t.component === showUpgradePrompt)
      return <UpgradeToAccessTools toolName={tool?.title || "Premium Tool"} onClose={handleCloseTool} />
    }

    // Show free tier warning banner if applicable
    const warningBanner = freeTierWarning && (
      <div
        style={{
          marginBottom: "15px",
          padding: "12px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "4px",
          color: "#856404",
          fontSize: "14px",
        }}
      >
        {freeTierWarning}
      </div>
    )

    switch (activeTool) {
      case "ImageResizing":
        return (
          <>
            {warningBanner}
            <ImageRezised />
          </>
        )
      case "ColorConverter":
        return (
          <>
            {warningBanner}
            <ColorConv />
          </>
        )
      case "ImageCompressor":
        return (
          <>
            {warningBanner}
            <ImageCompressItem />
          </>
        )
      case "CropTool":
        return (
          <>
            {warningBanner}
            <CropToolItem />
          </>
        )
      case "ColorPicker":
        return (
          <>
            {warningBanner}
            <ColorPickerItem />
          </>
        )
      case "WordCounter":
        return (
          <>
            {warningBanner}
            <WordCounterItem />
          </>
        )
      case "CurrencyConverter":
        return (
          <>
            {warningBanner}
            <CurrencyConvert />
          </>
        )
      case "JsonFormatter":
        return (
          <>
            {warningBanner}
            <JsonFormatter />
          </>
        )
      case "UUIDGenerator":
        return (
          <>
            {warningBanner}
            <UuidGeneratorItem />
          </>
        )
      case "Base64EncoderDecoder":
        return (
          <>
            {warningBanner}
            <EncoderItem />
          </>
        )
      case "BackgroundRemove":
        return (
          <>
            {warningBanner}
            <BackgroundRemoverItem onClose={handleCloseTool} />
          </>
        )
      case "PDFEditor":
        return (
          <>
            {warningBanner}
            <PdfEdit onClose={handleCloseTool} />
          </>
        )
      case "ResumeAnalyzer":
        return (
          <>
            {warningBanner}
            <ResumeAnalyzing />
          </>
        )
      case "CodeComplexityAnalyzer":
        return (
          <>
            {warningBanner}
            <CodeComplex onClose={handleCloseTool} />
          </>
        )
      case "BulkImageWatermarker":
        return (
          <>
            {warningBanner}
            <ImageMark onClose={handleCloseTool} />
          </>
        )
      default:
        return <p>Select a tool to get started.</p>
    }
  }

  const handleLaunchCalculator = (calculatorComponent: string) => {
    setActiveCalculator(calculatorComponent)
  }

  const handleCloseCalculator = () => {
    setActiveCalculator(null)
  }

  const renderCalculatorComponent = () => {
    switch (activeCalculator) {
      case "ScientificCalculator":
        return <ScientificCalculator onClose={handleCloseCalculator} />
      case "Bmi":
        return <Bmi onClose={handleCloseCalculator} />
      case "OhmslawCalculator":
        return <UnderDevelopmentPage />
      default:
        return null
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsSidebarOpen])

  const isUserStaff = userDetails.userType === "Staff"
  const isUserRole = userDetails.role === "Superadmin"
  const userType = userDetails.userType
  const orgType = userDetails.organisationalType?.toLowerCase() as "school" | "business" | "ngo" | undefined

  const organizationType: "school" | "business" | "ngo" = "school"

  const orgSpecificItems: Record<"school" | "business" | "ngo", { label: string; icon: any }[]> = {
    school: [
      { label: "Classroom", icon: FaChalkboard },
      { label: "Staffs", icon: FaUsers },
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
  }

  const menuItems = [
    ...(isUserRole ? [{ label: "Users", icon: FaUser }] : []),
    {
      label: "Personal Details",
      icon: FaUser,
    },
    { label: "Progressions", icon: FaChartLine },

    ...(userType === "Organisation" && orgType && orgSpecificItems[orgType] ? orgSpecificItems[orgType] : []),
    { label: "Services", icon: FaServicestack },
    { label: "Careers", icon: FaBriefcase },
    { label: "Schedules", icon: FaCalendarAlt },
    { label: "Tool Box", icon: FaToolbox },
    { label: "Calculate", icon: FaCalculator },
    { label: "Say It", icon: FaCommentDots },
    ...(isUserStaff
      ? [
          { label: "Tasks", icon: FaTasks },
          { label: "Payslips", icon: FaFileInvoiceDollar },
          { label: "Onboarding", icon: FaUserPlus },
          { label: "Training", icon: FaChalkboardTeacher },
          { label: "Attendance", icon: FaBookOpen },
          { label: "Take Test", icon: FaPencilAlt },
        ]
      : []),
  ]

  const handleMenuClick = (label: string) => {
    setSelectedMenu(label)
    if (windowWidth <= 768) {
      setIsSidebarOpen(false)
    }
  }

  const handleSignOut = async () => {
    await authService
      .handleUserSignout()
      .then(() => navigate("/auth/join-our-community"))
      .catch((err) => console.error(err))
  }

  const renderContent = () => {
    if (!selectedMenu) {
      switch (userType) {
        case "Staff":
          return (
            <>
              <Section title="Staff Dashboard">
                <StaffUserHomePage setSelectedMenu={setSelectedMenu} />
              </Section>
            </>
          )
        case "Organisation":
          switch (orgType) {
            case "school":
              return (
                <>
                  <Section title="School Dashboard">
                    <SchoolDashboard />
                  </Section>
                </>
              )
            case "business":
              return (
                <>
                  <Section title="Business Dashboard">
                    <BusinessDashboard />
                  </Section>
                </>
              )
            case "ngo":
              return (
                <>
                  <Section title="NGO Dashboard">
                    <NGODashboard />
                  </Section>
                </>
              )
            default:
              return (
                <>
                  <Section title="Organization Dashboard">
                    <p>Please configure your organization type in settings.</p>
                  </Section>
                </>
              )
          }
        case "Member":
          return (
            <>
              <Section title="Member Dashboard">
                <MemberDashboard setSelectedMenu={setSelectedMenu} />
              </Section>
            </>
          )
        default:
          return (
            <>
              <Section title="Welcome to your D'roid One Account">
                <WelcomePage />
              </Section>
            </>
          )
      }
    }

    switch (selectedMenu) {
      case "Users":
        return (
          <Section title="Users" isActive={selectedMenu === "Users"}>
            <AllUsers />
          </Section>
        )
      case "Personal Details":
        return (
          <Section title="Personal Details" isActive={selectedMenu === "Personal Details"}>
            <PersonalDetails />
          </Section>
        )
      case "Tasks":
        return (
          <Section title="Tasks" isActive={selectedMenu === "Tasks"}>
            <p style={{ color: "#000000" }}>See all list of all tasks here.</p>
            <Tasks />
          </Section>
        )
      case "Payslips":
        return (
          <Section title="Payslips" isActive={selectedMenu === "Payslips"}>
            {grossPay > 0 ? (
              <>
                <p style={{ color: "#000000" }}>View your salary payslips here.</p>
                <StaffPay />
              </>
            ) : (
              <CompleteOnboarding
                handleOnboarding={() => setSelectedMenu("Onboarding")}
                handleUpdateProfile={() => setSelectedMenu("Personal Details")}
              />
            )}
          </Section>
        )
      case "Onboarding":
        return (
          <Section title="Onboarding" isActive={selectedMenu === "Onboarding"}>
            <Onboarding />
          </Section>
        )
      case "Training":
        return (
          <Section title="Training" isActive={selectedMenu === "Training"}>
            {isAboveSixMonth ? (
              <>
                <p style={{ color: "#000000" }}>Access your training materials here.</p>
                <Trainings />
              </>
            ) : (
              <NotEligibleForTraining />
            )}
          </Section>
        )
      case "Progressions":
        return (
          <Section title="Progressions" isActive={selectedMenu === "Progressions"}>
            <p style={{ color: "#000000" }}>Track your professional progress here.</p>
            <Progression />
          </Section>
        )
      case "Schedules":
        return (
          <Section title="Schedules" isActive={selectedMenu === "Schedules"}>
            <p style={{ color: "#000000" }}>Manage and view your working schedules.</p>
            <div style={{ marginTop: "10px" }}>
              <AdminScheduleTool />
            </div>
          </Section>
        )
        case "Notifications":
  return (
    <Section title="Member Notifications" isActive={selectedMenu === "Notifications"}>
      <Announcements />
    </Section>
  );

      case "Tool Box":
        return (
          <Section title="Tool Box" isActive={selectedMenu === "Tool Box"}>
            <p style={{ color: "#000000", marginBottom: "20px" }}>Access various tools for your tasks</p>

            {!activeTool && !showUpgradePrompt && (
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "20px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
            )}

            {activeTool || showUpgradePrompt ? (
              <div>
                <button
                  onClick={() => {
                    setActiveTool(null)
                    setShowUpgradePrompt(null)
                  }}
                  style={{
                    marginBottom: "20px",
                    padding: "8px 16px",
                    backgroundColor: "#071d6a ",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  ← Back to Tools
                </button>
                {renderToolComponent()}
              </div>
            ) : (
              <div className="soft-dev-content">
                {filteredTools.map((tech, index) => (
                  <AllToolsCard
                    key={index}
                    title={tech.title}
                    description={tech.description}
                    icon={tech.icon}
                    isPremium={tech.isPremium}
                    onClick={tech.component ? () => handleLaunchTool(tech.component, tech.isPremium) : undefined}
                    className="process-card"
                  />
                ))}

                {filteredTools.length === 0 && <p style={{ color: "#888", marginTop: "10px" }}>No tools found</p>}
              </div>
            )}
          </Section>
        )
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
                  <AllToolsCard
                    key={index}
                    title={tech.title}
                    description={tech.description}
                    icon={tech.icon}
                    className="process-card"
                    url={tech.link}
                    onClick={tech.component ? () => handleLaunchCalculator(tech.component) : undefined}
                  />
                ))}
              </div>
            )}
          </Section>
        )
      case "Say It":
        return (
          <Section title="Contact us" isActive={selectedMenu === "Say It"}>
            <SayIt />
          </Section>
        )
      case "Classroom":
        return (
          <Section title="Your Class Room" isActive={selectedMenu === "Classroom"}>
            <ClassRoom />
          </Section>
        )
      case "Staffs":
        return (
          <Section title="Your Staffs" isActive={selectedMenu === "Staffs"}>
            <Staffs />
          </Section>
        )
      case "Library":
        return (
          <Section title="Your Library" isActive={selectedMenu === "Library"}>
            <Library />
          </Section>
        )
      case "Services":
        return (
          <Section title="Your Services" isActive={selectedMenu === "Services"}>
            <ServicesItems onOpenSayIt={() => setSelectedMenu("Say It")} />
          </Section>
        )
      case "Careers":
        return (
          <Section title="Your Careers" isActive={selectedMenu === "Careers"}>
            <CareersDashboard />
          </Section>
        )
      case "Finance":
        return (
          <Section title="Your Finance" isActive={selectedMenu === "Finance"}>
            <Finance />
          </Section>
        )
      case "Volunteers":
        return (
          <Section title="Your Volunteers" isActive={selectedMenu === "Volunteers"}>
            <VolunteersSection />
          </Section>
        )
      case "Donations":
        return (
          <Section title="Your Donations" isActive={selectedMenu === "Donations"}>
            <DonationsSection />
          </Section>
        )
      case "Outreach":
        return (
          <Section title="Your Outreach" isActive={selectedMenu === "Outreach"}>
            <OutreachSection />
          </Section>
        )
      case "Impact":
        return (
          <Section title="Your Impact" isActive={selectedMenu === "Impact"}>
            <ImpactSection />
          </Section>
        )
      case "Partners":
        return (
          <Section title="Your Partners" isActive={selectedMenu === "Partners"}>
            <PartnersSection />
          </Section>
        )
      case "Groups":
        return (
          <Section title="Your Groups" isActive={selectedMenu === "Groups"}>
            <GroupsSection />
          </Section>
        )
      case "Departments":
        return (
          <Section title="Your Departments" isActive={selectedMenu === "Departments"}>
            <DepartmentsSection />
          </Section>
        )
      case "Clients":
        return (
          <Section title="Your Clients" isActive={selectedMenu === "Clients"}>
            <ClientsSection />
          </Section>
        )
      case "Projects":
        return (
          <Section title="Your Projects" isActive={selectedMenu === "Projects"}>
            <ProjectsSection />
          </Section>
        )
      case "Reports":
        return (
          <Section title="Your Reports" isActive={selectedMenu === "Reports"}>
            <ReportsSection />
          </Section>
        )
      case "Attendance":
        return (
          <Section title="Attendance" isActive={selectedMenu === "Attendance"}>
            <p style={{ color: "#000000" }}>Track your sign-in and sign-out times.</p>
            <SignInOut />
          </Section>
        )
      case "Take Test":
        return (
          <Section title="Take Test" isActive={selectedMenu === "Take Test"}>
            <p style={{ color: "#000000",padding: "10px", }}>Access and complete your assigned tests.</p>
            <TakeTestFolder />
          </Section>
        )
      default:
        return (
          <Section title="Dashboard" isActive={selectedMenu === "Dashboard"}>
            <TakeTestFolder />
          </Section>
        )
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.userInfo}>
          <h3>
            Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 18 ? "Afternoon" : "Evening"},{" "}
            {userDetails.firstName}
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
              className={`${styles.navItem} ${selectedMenu === item.label ? styles.navItemActive : ""}`}
              onClick={() => handleMenuClick(item.label)}
            >
              {/* @ts-ignore */}
              {item.icon && <item.icon className={styles.navIcon} />}
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
          <button className={styles.backButton} onClick={() => setSelectedMenu(null)}>
            {/* @ts-ignore */}
            <IoHomeSharp />
            Home
          </button>
        )}
        {renderContent()}
      </main>
    </div>
  )
}

export default DashboardContent
