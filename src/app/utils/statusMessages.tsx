import React from "react";

interface NotEligibleProps {
  message?: string;
}

const NotEligibleForTraining: React.FC<NotEligibleProps> = ({
  message = "Not eligible for training yet. You must have at least 6 months or 1 year of service to qualify. Terms and conditions apply.",
}) => {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#FEF2F2",
        border: "1px solid #FCA5A5",
        borderRadius: "8px",
        color: "#B91C1C",
        textAlign: "center",
        fontWeight: 500,
      }}
    >
      {message}
    </div>
  );
};

export default NotEligibleForTraining;
