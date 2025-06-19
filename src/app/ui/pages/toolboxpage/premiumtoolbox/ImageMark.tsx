import React from "react";
import { WatermarkingTool } from "../../watermarking-tool";


interface ComponentProps {
  onClose: () => void;
}

const ImageMark: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  
  return <div style={{ color: "#333" }}> 
  <WatermarkingTool/>
  </div>;
};

export default ImageMark;
