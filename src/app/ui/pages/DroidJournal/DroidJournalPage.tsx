import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Blog from "./Blog";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { useNavigate } from "react-router-dom";

const DroidJournalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Blog />
    </>
  );
};

export default DroidJournalPage;
