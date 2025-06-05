// @ts-nocheck

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropTool: React.FC = () => {
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

      <div style={styles.container}>
        <h2 style={{ color: "#071D6A", fontWeight: "900" }}>
          Simple Image Cropper
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />

        {src && (
          <div style={styles.cropContainer}>
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={(img) => (imageRef.current = img)}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              style={styles.cropImage}
            />
          </div>
        )}

        {completedCrop && (
          <div style={styles.outputGroup}>
            <OutputRow
              label="Width"
              value={Math.round(completedCrop.width)}
              onCopy={handleCopy}
            />
            <OutputRow
              label="Height"
              value={Math.round(completedCrop.height)}
              onCopy={handleCopy}
            />
            <OutputRow
              label="X Position"
              value={Math.round(completedCrop.x)}
              onCopy={handleCopy}
            />
            <OutputRow
              label="Y Position"
              value={Math.round(completedCrop.y)}
              onCopy={handleCopy}
            />
          </div>
        )}
      </div>
    </>
  );
};

const OutputRow: React.FC<{
  label: string;
  value: string | number;
  onCopy: (label: string, value: string | number) => void;
}> = ({ label, value, onCopy }) => (
  <div style={{ ...styles.outputRow, color: "#000000" }}>
    <span style={{ fontWeight: "bold" }}>{label}:</span>
    <button
      onClick={() => onCopy(label, value)}
      style={styles.copyButton}
      disabled={!value && value !== 0}
    >
      📋 {value}
    </button>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "sans-serif",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  fileInput: {
    marginBottom: "1.5rem",
    color: "#000000"
  },
  outputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  outputRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "0.75rem 1rem",
    borderRadius: "5px",
  },
  copyButton: {
    backgroundColor: "#071D6A",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  cropContainer: {
    maxWidth: "100%",
    margin: "0 auto",
    position: "relative",
  },
  cropImage: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
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
