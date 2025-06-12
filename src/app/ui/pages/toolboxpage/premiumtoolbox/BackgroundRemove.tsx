import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const BackgroundRemove: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div>BackgroundRemove</div>;
};

export default BackgroundRemove;
