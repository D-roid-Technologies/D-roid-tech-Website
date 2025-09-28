// src/pages/training/TrainingDescriptionItem.tsx
import React, { useState } from "react";
import './TrainingDescriptionPage.css'
import { useLocation, useNavigate } from "react-router-dom";
import TrainingApplicationForm from "./TrainingApplicationform";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import toast from "react-hot-toast";

const TrainingDescriptionItem: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state;

  const [showForm, setShowForm] = useState(false);
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!program) {
    return (
      <div style={{ padding: 40 }}>
        <h2 style={{ color: "#000000" }}>No program data found.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <>hello livinus </>

  );
};

export default TrainingDescriptionItem;
