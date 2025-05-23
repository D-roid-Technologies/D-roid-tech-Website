import React from "react";
import { useNavigate } from "react-router-dom";
import ColorConv from "../../../components/toolboxfolder/Colorconv/ColorConv";

const ColorConverter: React.FC = () => {
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
                cursor: "pointer"
              }}
            >
              ← Back
            </button>
          </div>
          <h1 className="software-header">Color Converter</h1>
          <p>
            A sleek, intuitive tool that lets you instantly switch between
            color formats like HEX, RGB, and HSL with pinpoint accuracy. Whether
            you're a designer perfecting a palette or a developer fine-tuning UI
            elements, Color Converter simplifies your workflow and ensures color
            precision every time.
          </p>
        </div>
      </div>
      {/* color converter */}
      <ColorConv />
    </div>
  );
};

export default ColorConverter;
