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

const Index: React.FunctionComponent<RouterType> = ({ width }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/products" element={<Animation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/training" element={<Training />} />
        <Route path="/drone" element={<Drone />} />
        <Route path="/offices" element={<Equipments />} />
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
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
