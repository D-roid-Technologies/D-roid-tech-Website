import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const BackgroundRemove: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div style={{ color: "#333" }}>BackgroundRemove</div>;
};

export default BackgroundRemove;
