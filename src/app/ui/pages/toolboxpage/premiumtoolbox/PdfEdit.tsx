import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const PdfEdit: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div>PdfEdit</div>;
};

export default PdfEdit;
