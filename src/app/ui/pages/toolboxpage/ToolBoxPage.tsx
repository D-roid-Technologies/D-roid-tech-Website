"use client";

import type React from "react";
import { useState, useMemo } from "react";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/search/SearchBar";
import SearchFilters from "../../components/search/SearchFilters";
import {
  FaCompressArrowsAlt,
  FaPalette,
  FaImages,
  FaCodeBranch,
  FaUserTie,
  FaStamp,
  FaMagic,
  FaFilePdf,
} from "react-icons/fa";
import { BiSolidCrop } from "react-icons/bi";
import { CgColorPicker } from "react-icons/cg";
import { FaFileWord } from "react-icons/fa6";
import { BsCurrencyExchange } from "react-icons/bs";
import { LuFileJson } from "react-icons/lu";
import { GiPowerGenerator } from "react-icons/gi";
import { SiLetsencrypt } from "react-icons/si";
import CoreValueCardThree from "../../components/CoreValueCard/CoreValueCardThree";
import ToolBoxItems from "./ToolBoxItems";



const ToolBoxPage: React.FunctionComponent = () => {

  

  return (
    <div>
      <NavBar />
      
  <ToolBoxItems/>
    </div>
  );
};

export default ToolBoxPage;
