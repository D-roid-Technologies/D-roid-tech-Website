import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../ui/pages/home/Home";
import AboutUs from "../ui/pages/aboutus/AboutUs";
import Animation from "../ui/pages/animations/Animation";
import Contact from "../ui/pages/contact/Contact";
import Training from "../ui/pages/training/Training";
import { RouterType } from "../utils/Types";
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

const Index: React.FunctionComponent<RouterType> = ({ width }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/StartProjectPage" element={<StartProjectPage />} />

        {/* Services Dropdown Routes */}
        <Route
          path="/software-development"
          element={<SoftwareDevelopmentPage />}
        />
        <Route path="/training" element={<TrainingProgramsPage />} />
        <Route path="/animation" element={<AnimationPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />

        {/* Resources Dropdown Routes */}
        <Route path="/toolbox" element={<ToolBoxPage />} />
        <Route path="/calculators" element={<CalculatorPage />} />
        <Route path="/schedules" element={<SchedulePage />} />
        <Route path="/muzik" element={<Muzik />} />
        <Route path="/knowledge-city" element={<KnowledgeCity />} />

        {/* More Dropdown Routes */}
        <Route path="/blog" element={<DroidJournalPage />} />
        <Route path="/products" element={<Products />} />

        {/* Existing Routes */}
        <Route path="/products" element={<Animation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/training" element={<Training />} />
        <Route path="/devtools" element={<Drone />} />
        <Route path="/droidicons" element={<Equipments />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/allstaffs" element={<AllStaffs />} />
        <Route path="/software" element={<Software />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/details" element={<Details />} />
        {/* <Route path="/StartProjectPage" element={<StartProjectPage />} /> */}
        <Route path="/trainingprograms" element={<TrainingPrograms />} />
        <Route
          path="/training/course-detail/:courseId"
          element={<CourseDetail />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/taketest" element={<TakeTest />} />
        <Route path="/ai" element={<AI />} />

        <Route
          path="/knowledgecitydetails"
          element={<KnowledgeCityDetails />}
        />
        <Route path="/cashbasket" element={<Cashbasket />} />
        <Route path="/dome" element={<Dome />} />
        <Route path="/website" element={<Website />} />
        <Route path="/webwelcome" element={<WebWelcome />} />
        <Route path="/weboverview" element={<WebOverview />} />
        <Route path="/project" element={<Project />} />
        <Route path="/webfoarm" element={<WebFoarm />} />
        <Route path="/services" element={<WebFoarm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
