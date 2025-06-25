import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ImageCompress from "../../../components/toolboxfolder/imagecompress/ImageCompress";
import { ToolProps } from "../../../../utils/Types";

const ImageCompressor = ({onClose} :ToolProps ) => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">Image Compressor</h1>
          <p>
            Effortlessly reduce image file sizes while preserving stunning
            clarity. Perfect for faster websites, quicker uploads, and more
            storage space without sacrificing visual impact.
          </p>
        </div>
      </div>
      {/* Items */}

      {/* Image compressor */}
      <ImageCompress />
    </div>
  );
};

export default ImageCompressor;
