import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar";
import ColorConv from "../../../components/toolboxfolder/Colorconv/ColorConv";
import Crop from "../../../components/toolboxfolder/crop/Crop";

const CropTool: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
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
          <h1 className="software-header">Crop Tool</h1>
          <p>
            A powerful, easy-to-use feature that allows you to trim and frame
            images with pixel-perfect precision. Whether you're enhancing
            composition for social media or preparing visuals for print, the
            Crop Tool streamlines your editing process and puts creative control
            at your fingertips.
          </p>
        </div>
      </div>
      {/*crop tool */}
      <Crop />
    </div>
  );
};

export default CropTool;
