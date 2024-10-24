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
import KnowledgeCityDetails from "../ui/pages/knowledgecitydetailspage/KnowledgeCityDetails";
import Cashbasket from "../ui/pages/cashbasket/Cashbasket";
import Dome from "../ui/pages/dome/Dome";
import WebOverview from "../ui/pages/website/weboverview/WebOverview";
import Project from "../ui/pages/website/project/Project";
import WebFoarm from "../ui/pages/website/webfoarm/WebFoarm";

const Index: React.FunctionComponent<RouterType> = ({ width }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
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
        <Route path="/trainingprograms" element={<TrainingPrograms />} />
        <Route
          path="/training/course-detail/:courseId"
          element={<CourseDetail />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/taketest" element={<TakeTest />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/website" element={<Website />} />
        <Route path="/webwelcome" element={<WebWelcome />} />
        <Route
          path="/knowledgecitydetails"
          element={<KnowledgeCityDetails />}
        />
        <Route path="/cashbasket" element={<Cashbasket />} />
        <Route path="/dome" element={<Dome />} />
        <Route path="/weboverview" element={<WebOverview />} />
        <Route path="/project" element={<Project />} />
        <Route path="/webfoarm" element={<WebFoarm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
