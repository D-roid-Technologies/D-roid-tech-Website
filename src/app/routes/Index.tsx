// Importing all dependencies first
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importing all the pages/components
import Home from "../ui/pages/home/Home";
import AboutUs from "../ui/pages/aboutus/AboutUs";
import Animation from "../ui/pages/animations/Animation";
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
import TakeTest from "../ui/pages/taketest/TakeTest";
import TrainingPrograms from "../ui/pages/training/trainingprograms/TrainingPrograms";
import Details from "../ui/pages/details/Details";
import AI from "../ui/pages/AI/AI";
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
import Muzik from "../ui/pages/muzik/Muzik";
import KnowledgeCity from "../ui/pages/animations/knowledgecity/KnowledgeCity";
import DroidJournalPage from "../ui/pages/DroidJournal/DroidJournalPage";
import Products from "../ui/pages/products/Products";
import SignUp from "../ui/pages/signup/Signup";

// Define an enum for all route paths
export enum RoutePaths {
  Home = "/",
  AboutUs = "/aboutus",
  Careers = "/careers",
  StartProjectPage = "/StartProjectPage",
  
  // Services Routes
  SoftwareDevelopment = "/software-development",
  Training = "/training",
  Animation = "/animation",
  Consulting = "/consulting",
  
  // Resources Routes
  Toolbox = "/toolbox",
  Calculators = "/calculators",
  Schedules = "/schedules",
  Muzik = "/muzik",
  KnowledgeCity = "/knowledge-city",

  // More Routes
  Blog = "/blog",
  Products = "/products",
  JoinOurCommnity = "/our-commnity",

  // Existing Routes
  Contact = "/contact",
  TrainingPage = "/training",
  DevTools = "/devtools",
  DroidIcons = "/droidicons",
  Staff = "/staff",
  AllStaffs = "/allstaffs",
  Software = "/software",
  PrivacyPolicy = "/privacy",
  Details = "/details",
  TrainingPrograms = "/trainingprograms",
  CourseDetail = "/training/course-detail/:courseId",
  Services = "/services",
  NotFound = "*",
  TakeTest = "/taketest",
  AI = "/ai",

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
}

const Index: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Home} element={<Home />} />
        <Route path={RoutePaths.AboutUs} element={<AboutUs />} />
        <Route path={RoutePaths.Careers} element={<CareersPage />} />
        <Route path={RoutePaths.StartProjectPage} element={<StartProjectPage />} />

        {/* Services Routes */}
        <Route path={RoutePaths.SoftwareDevelopment} element={<SoftwareDevelopmentPage />} />
        <Route path={RoutePaths.Training} element={<TrainingProgramsPage />} />
        <Route path={RoutePaths.Animation} element={<AnimationPage />} />
        <Route path={RoutePaths.Consulting} element={<ConsultingPage />} />

        {/* Resources Routes */}
        <Route path={RoutePaths.Toolbox} element={<ToolBoxPage />} />
        <Route path={RoutePaths.Calculators} element={<CalculatorPage />} />
        <Route path={RoutePaths.Schedules} element={<SchedulePage />} />
        <Route path={RoutePaths.Muzik} element={<Muzik />} />
        <Route path={RoutePaths.KnowledgeCity} element={<KnowledgeCity />} />

        {/* More Routes */}
        <Route path={RoutePaths.Blog} element={<DroidJournalPage />} />
        <Route path={RoutePaths.Products} element={<Products />} />
        <Route path={RoutePaths.JoinOurCommnity} element={<SignUp />} />

        {/* Existing Routes */}
        <Route path={RoutePaths.Contact} element={<Contact />} />
        <Route path={RoutePaths.TrainingPage} element={<Training />} />
        <Route path={RoutePaths.DevTools} element={<Drone />} />
        <Route path={RoutePaths.DroidIcons} element={<Equipments />} />
        <Route path={RoutePaths.Staff} element={<Staff />} />
        <Route path={RoutePaths.AllStaffs} element={<AllStaffs />} />
        <Route path={RoutePaths.Software} element={<Software />} />
        <Route path={RoutePaths.PrivacyPolicy} element={<PrivacyPolicy />} />
        <Route path={RoutePaths.Details} element={<Details />} />
        <Route path={RoutePaths.TrainingPrograms} element={<TrainingPrograms />} />
        <Route path={RoutePaths.CourseDetail} element={<CourseDetail />} />
        <Route path={RoutePaths.Services} element={<Services />} />

        {/* Animation Routes */}
        <Route path={RoutePaths.KnowledgeCityDetails} element={<KnowledgeCityDetails />} />
        <Route path={RoutePaths.CashBasket} element={<Cashbasket />} />
        <Route path={RoutePaths.Dome} element={<Dome />} />

        {/* Website Routes */}
        <Route path={RoutePaths.Website} element={<Website />} />
        <Route path={RoutePaths.WebWelcome} element={<WebWelcome />} />
        <Route path={RoutePaths.WebOverview} element={<WebOverview />} />
        <Route path={RoutePaths.Project} element={<Project />} />
        <Route path={RoutePaths.WebFoarm} element={<WebFoarm />} />

        {/* 404 Page */}
        <Route path={RoutePaths.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
