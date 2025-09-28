import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const OhmslawCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div style={{ color: "#333" }}> Ohm'slaw Calculator </div>;
};

export default OhmslawCalculator;
