import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../ui/pages/home/Home";
import AboutUs from "../ui/pages/aboutus/AboutUs";
import Animation from "../ui/pages/animations/Animation";
import Contact from "../ui/pages/contact/Contact";
import ProgrammingHome from "../ui/pages/programming/ProgrammingHome";
import Training from "../ui/pages/training/Training";
import { RouterType } from "../utils/Types";
import Equipments from "../ui/pages/equipments/Equipments";
import Drone from "../ui/pages/drone/Drone";
import Staff from "../ui/pages/staff/Staff";
import AllStaffs from "../ui/pages/staff/allstaffs/AllStaffs";
import CourseDetail from "../ui/pages/training/course/CourseDetail";

const Index: React.FunctionComponent<RouterType> = ({ width }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/programminghome" element={<ProgrammingHome />} />
        <Route path="/training" element={<Training />} />
        <Route path="/drone" element={<Drone />} />
        <Route path="/offices" element={<Equipments />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/allstaffs" element={<AllStaffs />} />
        <Route path="/training/course-detail/:courseId" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
