// Importing all dependencies first
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Importing all the pages/components
import Home from "../ui/pages/home/Home";
import AboutUs from "../ui/pages/aboutus/AboutUs";
import Contact from "../ui/pages/contact/Contact";
import Training from "../ui/pages/training/Training";
import Equipments from "../ui/pages/equipments/Equipments";
import Drone from "../ui/pages/drone/Drone";
import Staff from "../ui/pages/staff/Staff";
import AllStaffs from "../ui/pages/staff/allstaffs/AllStaffs";
import CourseDetail from "../ui/pages/training/course/CourseDetail";
import Services from "../ui/pages/home/services/Services";
import NotFound from "../ui/pages/notfound/NotFound";
import Software from "../ui/pages/software/Software";
import PrivacyPolicy from "../ui/pages/privacy/PrivacyPolicy";
import TrainingPrograms from "../ui/pages/training/trainingprograms/TrainingPrograms";
import Details from "../ui/pages/details/Details";
import Website from "../ui/pages/website/Website";
import WebWelcome from "../ui/pages/website/webwelcome/WebWelcome";
import KnowledgeCityDetails from "../ui/pages/animations/knowledgecitydetailspage/KnowledgeCityDetails";
import Cashbasket from "../ui/pages/animations/cashbasket/Cashbasket";
import Dome from "../ui/pages/animations/dome/Dome";
import WebOverview from "../ui/pages/website/weboverview/WebOverview";
import Project from "../ui/pages/website/project/Project";
import WebFoarm from "../ui/pages/website/webfoarm/WebFoarm";
import StartProjectPage from "../ui/pages/startproject/StartProjectPage";
import CareersPage from "../ui/pages/careers/CareersPage";
import SoftwareDevelopmentPage from "../ui/pages/softwareDevelopment/SoftwareDevelopmentPage";
import ConsultingPage from "../ui/pages/consultingPage/ConsltingPage";
import AnimationPage from "../ui/pages/animationPage/AnimationPage";
import TrainingProgramsPage from "../ui/pages/trainingPrograms/TrainingProgramsPage";
import ToolBoxPage from "../ui/pages/toolboxpage/ToolBoxPage";
import CalculatorPage from "../ui/pages/calculator/CalculatorPage";
import SchedulePage from "../ui/pages/schedule/SchedulePage";
import UnderDevelopmentPage from "../ui/pages/underDevelopment/UnderDevelopmentPage";
import Muzik from "../ui/pages/muzik/Muzik";
import KnowledgeCity from "../ui/pages/animations/knowledgecity/KnowledgeCity";
import DroidJournalPage from "../ui/pages/DroidJournal/DroidJournalPage";
import Products from "../ui/pages/products/Products";
import SignUp from "../ui/pages/signup/Signup";
import StaffLogin from "../ui/pages/staffLogin/StaffLogin";
import ForgotPassword from "../ui/pages/ForgotPassword/ForgotPassword";
import MemberLogin from "../ui/pages/memberLogin/MemberLogin";
import TermsAndConditions from "../ui/pages/termsandcondition/TermsAndCondition";
import Dashboard from "../ui/pages/Dashboard/Dashboard";
import ScienceCalculate from "../ui/pages/calculator/sciencecalculate/ScienceCalculate";
import ImageResizer from "../ui/pages/toolboxpage/imageresizer/ImageResizer";
import DroidLanding from "../ui/pages/mobile/DroidLanding";
import ColorConverter from "../ui/pages/toolboxpage/colorconverter/ColorConverter";
import FrontendDevelopmentPage from "../ui/pages/softwareDevelopment/SoftwarePages/FrontendDevelopmentPage";
import ProtectedRoute from "./ProtectedRoutes";
import ColorPicker from "../ui/components/toolboxfolder/colorPicker/ColorPicker";
import WordCounter from "../ui/components/toolboxfolder/WordCounter/WordCounter";
import BackendDevelopment from "../ui/pages/softwareDevelopment/SoftwarePages/BackendDevelopment";
import TrainingDescriptionPage from "../ui/pages/trainingPrograms/TrainingDescriptionPage";
import PartnersPage from "../ui/pages/partnerPage/PartnersPage";
import ImageCompress from "../ui/components/toolboxfolder/imagecompress/ImageCompress";
import CropTool from "../ui/pages/toolboxpage/croptool/CropTool";
import JsonFormating from "../ui/pages/toolboxpage/jsonformat/JsonFormating";
import DatabaseAndCloud from "../ui/pages/softwareDevelopment/SoftwarePages/DatabaseAndCloud";
import CrossplatformApp from "../ui/pages/softwareDevelopment/SoftwarePages/CrossplatformApp";
import TaskSchedulerPage from "../ui/pages/schedule/TaskSchedulerPage";
import UUIDGenerator from "../ui/pages/toolboxpage/uuidgenerator/UuidGenerator";
import Base64Tool from "../ui/pages/toolboxpage/Encoder/Encoder";
import BMICalculator from "../ui/pages/calculator/sciencecalculate/bmicalculator/BMICalculator";
import BlogPost from "../ui/pages/DroidJournal/blog/BlogPost";
import BlogPostView from "../ui/pages/DroidJournal/blog/BlogPostView";
import ResumeAnalyzerPage from "../ui/pages/resumeAnalyser/ResumeAnalyser";
import PricingPage from "../ui/pages/pricingpage/PricingPage";
import CareerDescriptionPage from "../ui/pages/careers/CareerDescriptionPage";
import AnimationDescriptionPage from "../ui/pages/animationPage/AnimationDescriptionPage";
import BackgroundRemover from "../ui/pages/backgroundremover/BackgroundRemover";
import PdfEditor from "../ui/pages/pdfeditor/PdfEditor";
import CodeComplexity from "../ui/pages/codecomplexity/CodeComplexity";
import BulkImage from "../ui/pages/bulkimage/BulkImage";
import CurrencyConverter from "../ui/pages/toolboxpage/currencyconverter/CurrencyConverter";
import { userInfo } from "os";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

// Define an enum for all route paths

export enum RoutePaths {
  Home = "/",
  AboutUs = "/aboutus",
  Careers = "/careers",
  CareersDescriptionPage = "/careers/description",
  StartProjectPage = "/StartProjectPage",

  // Services Routes
  SoftwareDevelopment = "/software-development",
  Training = "/training",
  Animation = "/animation",
  UnderDevelopment = "/under-development",
  AnimationDescriptionPage = "/animation/description",
  Consulting = "/consulting",

  // Resources Routes
  Toolbox = "/toolbox",
  Calculators = "/calculators",
  Schedules = "/schedules",
  Muzik = "/muzik",
  KnowledgeCity = "/knowledge-city",

  // toolbox routes
  ColorConverter = "/toolbox/colorconverter",
  ColorPicker = "/toolbox/colorPicker",
  WordCounter = "/toolbox/wordconter",
  ToolImageResizer = "/toolbox/imageresizing",
  ImageCompressor = "/toolbox/imagecompressor",
  CropTool = "/toolbox/croptool",
  JsonFomat = "/toolbox/jsonformatter",
  UuidGenerator = "/toolbox/uuidgenerator",
  Encoder = "/toolbox/encoderbasetool",
  ResumerAnalyser = "/toolbox/resumeanalyzer",
  AiBackgroundRemover = "/toolbox/ai-background-remover",
  AdvancedPdfEditor = "/toolbox/advanced-pdf-editor",
  CodeComplexity = "/toolbox/code-complexity",
  BulkImage = "/toolbox/bulk-image",
  CurrencyConvert = "/toolbox/currency-converter",
  Base64Tool = "/toolbox/base64-tool",

  // calculator routes
  ScientificCalculate = "/calculators/sciencecalculate",
  BMICalculator = "/calculators/bmicalcute",

  //
  TaskScheduler = "/schedules/task-scheduler",

  // Parent "More" route
  More = "/more",
  Partners = "/partners",

  // More Routes (nested under /more)
  Blog = `/more/blog`,
  BlogPost = `/more/blog/:slug`,
  Products = "/more/products",
  Pricing = "/more/pricing",
  JoinOurCommunity = "/auth/join-our-community",
  Signup = "/auth/signup",

  // Existing Routes
  Contact = "/contact",
  TrainingPage = "/training",
  TrainingDescriptionPage = "/training/description",
  DevTools = "/devtools",
  DroidIcons = "/droidicons",
  Staff = "/staff",
  AllStaffs = "/allstaffs",
  Software = "/software",
  Details = "/details",
  PrivacyPolicy = "/privacy-policy",
  TermsAndCondition = "/terms-and-condition",
  TrainingPrograms = "/trainingprograms",
  CourseDetail = "/training/course-detail/:courseId",
  Services = "/services",
  NotFound = "*",
  TakeTest = "/taketest",
  AI = "/ai",
  ForgotPassword = "/auth/forgot-password",
  StaffLogin = "/auth/staff-login",
  MemberLogin = "/auth/member-login",
  MobilePhone = "/mobile",
  DashBoard = "/auth/dashboard",

  // Animation Routes
  KnowledgeCityDetails = "/knowledgecitydetails",
  CashBasket = "/cashbasket",
  Dome = "/dome",

  // Website Routes
  Website = "/website",
  WebWelcome = "/webwelcome",
  WebOverview = "/weboverview",
  Project = "/project",
  WebFoarm = "/webfoarm",
  // Existing Routes
  Login = "Login",
  ToolColorConverter = "ToolColorConverter", // Existing Routes

  // Software Developemnets Pages
  FrontendDevelopmentPage = "/software-development/front-end",
  BackendDevelopment = "/software-development/back-end",
  CrossPlatformApps = "/software-development/cross-platform-apps",
  DatabaseAndCloud = "/software-development/database-and-cloud",
  // PricingPage = "PricingPage",
}

interface DropdownItem {
  title: string;
  link: string;
}

interface DropdownItems {
  services: DropdownItem[];
  resources: DropdownItem[];
  more: DropdownItem[];
}

export const dropdownItems: DropdownItems = {
  services: [
    { title: "Software Development", link: RoutePaths.SoftwareDevelopment },
    { title: "Training Programs", link: RoutePaths.Training },
    { title: "Animation / Short Stories", link: RoutePaths.Animation },
    { title: "Consulting", link: RoutePaths.Consulting },
  ],
  resources: [
    { title: "Toolbox", link: RoutePaths.Toolbox },
    { title: "Calculate", link: RoutePaths.UnderDevelopment },
    { title: "Schedules", link: RoutePaths.UnderDevelopment },
    { title: "Muzik", link: RoutePaths.UnderDevelopment },
    { title: "Knowledge City", link: RoutePaths.UnderDevelopment },
  ],
  more: [
    { title: "D'roid Journal", link: RoutePaths.Blog },
    { title: "Products", link: RoutePaths.Products },
    { title: "Pricing", link: RoutePaths.Pricing },
    { title: "Partners", link: RoutePaths.Partners },
    { title: "Contact", link: RoutePaths.Contact },
    { title: "Join Our Community", link: RoutePaths.JoinOurCommunity },
  ],
};

const Index: React.FunctionComponent = () => {
  const userId = useSelector((state: RootState) => state.user.uniqueId)
  return (
    // <BrowserRouter>
    <Routes>
      <Route path={RoutePaths.Home} element={userId !== "" ? <Navigate to={RoutePaths.DashBoard} replace /> : <Home />} />
      <Route path={RoutePaths.AboutUs} element={<AboutUs />} />
      <Route path={RoutePaths.Careers} element={<CareersPage />} />
      <Route
        path={RoutePaths.CareersDescriptionPage}
        element={<CareerDescriptionPage />}
      />
      <Route
        path={RoutePaths.StartProjectPage}
        element={<StartProjectPage />}
      />
      {/* Services Routes */}
      <Route
        path={RoutePaths.SoftwareDevelopment}
        element={<SoftwareDevelopmentPage />}
      />
      <Route path={RoutePaths.Training} element={<TrainingProgramsPage />} />
      <Route
        path={RoutePaths.UnderDevelopment}
        element={<UnderDevelopmentPage />}
      />
      <Route path={RoutePaths.Animation} element={<AnimationPage />} />
      <Route
        path={RoutePaths.AnimationDescriptionPage}
        element={<AnimationDescriptionPage />}
      />

      <Route path={RoutePaths.Consulting} element={<ConsultingPage />} />

      {/* Resources Routes */}
      <Route path={RoutePaths.Toolbox} element={<ToolBoxPage />} />
      <Route path={RoutePaths.ToolImageResizer} element={<ImageResizer />} />
      <Route path={RoutePaths.ColorConverter} element={<ColorConverter />} />
      <Route path={RoutePaths.ColorPicker} element={<ColorPicker />} />
      <Route path={RoutePaths.WordCounter} element={<WordCounter />} />
      <Route
        path={RoutePaths.CurrencyConvert}
        element={<CurrencyConverter />}
      />
      <Route path={RoutePaths.ImageCompressor} element={<ImageCompress />} />
      <Route path={RoutePaths.CropTool} element={<CropTool />} />
      <Route path={RoutePaths.JsonFomat} element={<JsonFormating />} />
      <Route path={RoutePaths.UuidGenerator} element={<UUIDGenerator />} />
      <Route path={RoutePaths.Encoder} element={<Base64Tool />} />
      <Route
        path={RoutePaths.ResumerAnalyser}
        element={<ResumeAnalyzerPage />}
      />
      <Route
        path={RoutePaths.AiBackgroundRemover}
        element={<BackgroundRemover />}
      />
      <Route path={RoutePaths.AdvancedPdfEditor} element={<PdfEditor />} />
      <Route path={RoutePaths.CodeComplexity} element={<CodeComplexity />} />
      <Route path={RoutePaths.BulkImage} element={<BulkImage />} />

      {/* Calculators */}
      <Route path={RoutePaths.Calculators} element={<CalculatorPage />} />
      <Route
        path={RoutePaths.ScientificCalculate}
        element={<ScienceCalculate />}
      />
      <Route path={RoutePaths.BMICalculator} element={<BMICalculator />} />
      <Route path={RoutePaths.TaskScheduler} element={<TaskSchedulerPage />} />
      <Route path={RoutePaths.Schedules} element={<SchedulePage />} />
      <Route path={RoutePaths.Muzik} element={<Muzik />} />
      <Route path={RoutePaths.KnowledgeCity} element={<KnowledgeCity />} />
      <Route path={RoutePaths.Partners} element={<PartnersPage />} />
      {/* Grouped More Routes */}
      <Route path={RoutePaths.More}>
        <Route index element={<Navigate to={RoutePaths.Blog} replace />} />
        <Route path={RoutePaths.Blog} element={<DroidJournalPage />} />
        <Route path={RoutePaths.BlogPost} element={<BlogPost />} />
        <Route
          path={`${RoutePaths.Blog}/events/:title`}
          element={<BlogPostView />}
        />
        <Route
          path={`${RoutePaths.Blog}/tech/:title`}
          element={<BlogPostView />}
        />
        <Route
          path={`${RoutePaths.Blog}/business/:title`}
          element={<BlogPostView />}
        />
        <Route path={RoutePaths.Products} element={<Products />} />
        <Route path={RoutePaths.Pricing} element={<PricingPage />} />
      </Route>
      {/* Existing Routes */}
      <Route path={RoutePaths.Contact} element={<Contact />} />
      <Route path={RoutePaths.TrainingPage} element={<Training />} />
      <Route
        path={RoutePaths.TrainingDescriptionPage}
        element={<TrainingDescriptionPage />}
      />
      <Route path={RoutePaths.DevTools} element={<Drone />} />
      <Route path={RoutePaths.DroidIcons} element={<Equipments />} />
      <Route path={RoutePaths.Staff} element={<Staff />} />
      <Route path={RoutePaths.AllStaffs} element={<AllStaffs />} />
      <Route path={RoutePaths.Software} element={<Software />} />
      <Route path={RoutePaths.PrivacyPolicy} element={<PrivacyPolicy />} />
      <Route path={RoutePaths.Details} element={<Details />} />
      <Route
        path={RoutePaths.TrainingPrograms}
        element={<TrainingPrograms />}
      />
      <Route path={RoutePaths.CourseDetail} element={<CourseDetail />} />
      <Route path={RoutePaths.Services} element={<Services />} />
      <Route path={RoutePaths.JoinOurCommunity} element={ <SignUp />} />
      <Route path={RoutePaths.StaffLogin} element={userId !== "" ? <Navigate to={RoutePaths.DashBoard} replace /> : <StaffLogin />} />
      <Route path={RoutePaths.ForgotPassword} element={<ForgotPassword />} />
      <Route path={RoutePaths.MemberLogin} element={userId !== "" ? <Navigate to={RoutePaths.DashBoard} replace /> : <MemberLogin />} />
      <Route path={RoutePaths.MobilePhone} element={<DroidLanding />} />
      <Route
        path={RoutePaths.TermsAndCondition}
        element={<TermsAndConditions />}
      />
      {/* Animation Routes */}
      <Route
        path={RoutePaths.KnowledgeCityDetails}
        element={<KnowledgeCityDetails />}
      />
      {/* <Route path={RoutePaths.CashBasket} element={<Cashbasket />} /> */}
      {/* <Route path={RoutePaths.Dome} element={<Dome />} /> */}
      {/* Website Routes */}
      <Route path={RoutePaths.Website} element={<Website />} />
      {/* <Route path={RoutePaths.WebWelcome} element={<WebWelcome />} />
      <Route path={RoutePaths.WebOverview} element={<WebOverview />} />
      <Route path={RoutePaths.Project} element={<Project />} />
      <Route path={RoutePaths.WebFoarm} element={<WebFoarm />} /> */}
      <Route
        path={RoutePaths.FrontendDevelopmentPage}
        element={<FrontendDevelopmentPage />}
      />
      <Route
        path={RoutePaths.BackendDevelopment}
        element={<BackendDevelopment />}
      />
      <Route
        path={RoutePaths.BackendDevelopment}
        element={<BackendDevelopment />}
      />
      <Route
        path={RoutePaths.DatabaseAndCloud}
        element={<DatabaseAndCloud />}
      />
      <Route
        path={RoutePaths.CrossPlatformApps}
        element={<CrossplatformApp />}
      />

      {/* Private Routes */}
      <Route
        path={RoutePaths.DashBoard}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* 404 Page */}
      <Route path={RoutePaths.NotFound} element={<NotFound />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default Index;
