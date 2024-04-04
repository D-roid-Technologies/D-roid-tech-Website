import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../ui/pages/home/Home";
import AboutUs from "../ui/pages/aboutus/AboutUs";
import Animation from "../ui/pages/animations/Animation";
import Contact from "../ui/pages/contact/Contact";
import ProgrammingHome from "../ui/pages/programming/ProgrammingHome";
import Training from "../ui/pages/training/Training";

const Index: React.FunctionComponent<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/programming" element={<ProgrammingHome />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
