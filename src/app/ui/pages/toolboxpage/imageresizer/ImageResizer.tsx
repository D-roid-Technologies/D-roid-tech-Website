import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ImageRezised from "../../../components/toolboxfolder/imageresizing/ImageRezised";
import { useNavigate } from "react-router-dom";

const ImageResizer = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <NavBar /> */}
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <div style={{ margin: "1rem 0" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 16px",
                backgroundColor: "blue",
                border: "1px solid #000000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
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
