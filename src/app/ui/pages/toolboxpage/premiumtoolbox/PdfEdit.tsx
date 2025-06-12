import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const PdfEdit: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div style={{ color: "#333" }}>PdfEdit</div>;
};

export default PdfEdit;
