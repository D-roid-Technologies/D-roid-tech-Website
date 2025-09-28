import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { FaCalculator } from "react-icons/fa6";
import { GiCalculator } from "react-icons/gi";
import { NewwebsiteCard } from "../../components/CoreValueCard/NewwebsiteCard";
import { AllToolsCard } from "../../components/CoreValueCard/AllToolsCard";
import { useNavigate } from "react-router-dom";
const CalculatorPage = () => {
  const navigate = useNavigate();
  const calculators = [
    {
      title: "Scientific Calculator",
      description:
        "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
      icon: <FaCalculator size={24} />, // ✅ JSX not function call
      link: "/calculators/sciencecalculate", // ✅ or RoutePaths.ScientificCalculate
    },
    {
      title: "BMI Calculator",
      description:
        "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
      icon: <GiCalculator size={24} />,
      link: "/calculators/bmicalcute",
    },
  ];

  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">D'roid Calculate</h1>
          <p>
            D'roid Calculate is your sleek, all-in-one calculator built to
            simplify math, budgeting, and everyday problem-solving.
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
           <AllToolsCard
                key={index}
                title={tech.title}
                description={tech.description}
                icon={tech.icon}
                className="process-card"
                url={tech.link} 
                onClick={
                  tech.link
                    ? () => navigate(tech.link)
                    : undefined
                }
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
