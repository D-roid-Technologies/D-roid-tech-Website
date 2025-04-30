import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { FaCompressArrowsAlt, FaPalette } from "react-icons/fa";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";

const tools = [
  {
    title: "Image Resizing",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: FaCompressArrowsAlt({ size: 24 }),
  },
  {
    title: "Color Conversion",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
    icon: FaPalette({ size: 24 }),
  },
];

const ToolBoxPage = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">Driod ToolBox</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi a id
            dolores, odit nesciunt recusandae nisi veritatis dolore. Modi
            provident earum deserunt nostrum quibusdam, accusamus saepe. Illo
            nostrum ea placeat!
          </p>
        </div>
      </div>
      {/* Items */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Tools
        </span>
        <div className="soft-dev-content">
          {tools.map((tech, index) => (
            <CoreValueCardTwo
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              className="process-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolBoxPage;
