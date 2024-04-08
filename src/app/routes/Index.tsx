import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../ui/pages/home/Home";
import AboutUs from "../ui/pages/aboutus/AboutUs";
import Animation from "../ui/pages/animations/Animation";
import Contact from "../ui/pages/contact/Contact";
import ProgrammingHome from "../ui/pages/programming/ProgrammingHome";
import Training from "../ui/pages/training/Training";
import { RouterType } from "../utils/Types";

const Index: React.FunctionComponent<RouterType> = ({width}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/programminghome" element={<ProgrammingHome />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
