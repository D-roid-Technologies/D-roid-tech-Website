import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ImageRezised from "../../../components/toolboxfolder/imageresizing/ImageRezised";

const ImageResizer = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header"> Droid Image Resizer</h1>
          <p>
            Droid image Resizer is a fast and user-friendly tool designed to
            quickly adjust the dimensions of your images without compromising
            quality.
          </p>
        </div>
      </div>
      {/* Items */}

      {/* Image resizer */}
      <ImageRezised />
    </div>
  );
};

export default ImageResizer;
