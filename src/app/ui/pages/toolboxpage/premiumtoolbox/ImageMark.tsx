import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const ImageMark: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div style={{ color: "#333" }}> ImageMark</div>;
};

export default ImageMark;
