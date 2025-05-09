import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ColorConv from "../../../components/toolboxfolder/Colorconv/ColorConv";

const ColorConverter = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header"> Droid Color Converter</h1>
          <p>
            is a sleek, intuitive tool that lets you instantly switch between
            color formats like HEX, RGB, and HSL with pinpoint accuracy. Whether
            you're a designer perfecting a palette or a developer fine-tuning UI
            elements, Color Converter simplifies your workflow and ensures color
            precision every time.
          </p>
        </div>
      </div>
      {/* Items */}

      {/* color converter */}
      <ColorConv />
    </div>
  );
};

export default ColorConverter;
