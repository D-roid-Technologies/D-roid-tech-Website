import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const CodeComplex: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div style={{ color: "#333" }}> CodeComplex</div>;
};

export default CodeComplex;
