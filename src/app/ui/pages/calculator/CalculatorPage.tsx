import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { FaCalculator } from "react-icons/fa6";
import { GiCalculator } from "react-icons/gi";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import ScientificCalculator from "../../components/scientificcalculator/ScientificCalculator";

const CalculatorPage = () => {
  const calculators = [
    {
      title: "Scientific Calculator",
      description:
        "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
      icon: FaCalculator({ size: 24 }),
    },
    {
      title: "BMI Calculator",
      description:
        "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
      icon: GiCalculator({ size: 24 }),
    },
  ];
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">Driod Calculate</h1>
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
          Calculators
        </span>
        <div className="soft-dev-content">
          {calculators.map((tech, index) => (
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

export default CalculatorPage;
