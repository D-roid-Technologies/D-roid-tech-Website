import React from "react";
import PDFEditor from "./components/pdfEdit/pdf-editor";

interface ComponentProps {
  onClose: () => void;
}

const PdfEdit: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div style={{ color: "#333" }}>
      <PDFEditor />
    </div>
  );
};

export default PdfEdit;
