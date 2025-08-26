import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  label?: string;
  step?: number;
}

const BackButton: React.FC<BackButtonProps> = ({ label = "Back", step = -1 }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(step)} className={styles.backButton}>
    <h3>{label}</h3>  
    </div>
  );
};

export default BackButton;
