import React from "react";
import styles from "./NotEligibleForTraining.module.css";

interface NotEligibleProps {
  message?: string;
}

const NotEligibleForTraining: React.FC<NotEligibleProps> = ({
  message = "Not eligible for training yet. You must have at least 6 months or 1 year of service to qualify. Terms and conditions apply.",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default NotEligibleForTraining;
