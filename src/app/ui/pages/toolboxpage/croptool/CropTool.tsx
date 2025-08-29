// @ts-nocheck

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ToolProps } from "../../../../utils/Types";
import CropToolItem from "./CropToolItem";
import CropToolFeatures from "../../../components/toolboxfolder/crop/CropToolFeatures";

const CropTool: React.FC = ({onClose} : ToolProps) => {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 50, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  };

  const handleCopy = (label: string, value: string | number) => {
    navigator.clipboard
      .writeText(String(value))
      .then(() => {
        toast.success(`${label} copied to clipboard!`, {
          style: { background: "#4BB543", color: "#fff" },
        });
      })
      .catch(() => {
        toast.error(`Failed to copy ${label}`, {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  };

  return (
    <>
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
              ← Back to ToolBox
            </button>
          </div>
          <h1 className="software-header">Image Crop Tool</h1>
          <p>
            Upload and crop your image with ease. Get precise crop dimensions
            for your projects.
          </p>
        </div>
      </div>
<CropToolItem/>
<CropToolFeatures/>
    
    </>
  );
};



export default CropTool;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../../../components/navbar/NavBar";
// import ColorConv from "../../../components/toolboxfolder/Colorconv/ColorConv";
// import Crop from "../../../components/toolboxfolder/crop/Crop";

// const CropTool: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div className="software-main">
//         <div className="software-main-content">
//           <div style={{ margin: "1rem 0" }}>
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 padding: "10px 16px",
//                 backgroundColor: "blue",
//                 border: "1px solid #000000",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               ← Back
//             </button>
//           </div>
//           <h1 className="software-header">Crop Tool</h1>
//           <p>
//             A powerful, easy-to-use feature that allows you to trim and frame
//             images with pixel-perfect precision. Whether you're enhancing
//             composition for social media or preparing visuals for print, the
//             Crop Tool streamlines your editing process and puts creative control
//             at your fingertips.
//           </p>
//         </div>
//       </div>
//       {/*crop tool */}
//       <Crop />
//     </div>
//   );
// };

// export default CropTool;
