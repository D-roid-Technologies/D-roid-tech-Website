// BMICalculatorFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaHeartbeat,
  FaWeight,
  FaRulerVertical,
  FaChartLine,
  FaCopy,
  FaLock,
  FaMobileAlt,
} from "react-icons/fa";

const BMICalculatorFeatures: React.FC = () => {
  const features = [
    {
      title: "Real-time BMI Calculation",
      description:
        "Instantly calculates BMI as you enter weight (kg) and height (cm).",
      icon: <FaHeartbeat />,
    },
    {
      title: "Category Detection",
      description:
        "Automatically classifies your result as Underweight, Normal, Overweight, or Obese.",
      icon: <FaChartLine />,
    },
    {
      title: "Copy to Clipboard",
      description:
        "Quickly copy BMI values and categories with a single click for easy sharing.",
      icon: <FaCopy />,
    },
    {
      title: "Health-focused Design",
      description:
        "Simple, user-friendly layout optimized for tracking personal health metrics.",
      icon: <FaWeight />,
    },
    {
      title: "Height & Weight Input",
      description: "Supports metric inputs in kilograms and centimeters.",
      icon: <FaRulerVertical />,
    },
    {
      title: "Cross-Device Ready",
      description: "Responsive design works seamlessly on mobile, tablet, and desktop.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Private & Secure",
      description: "All calculations happen locally in your browser with no data stored.",
      icon: <FaLock />,
    },
  ];

  const technicalSpecs = [
    "Input Units: Weight (kg), Height (cm)",
    "Formula: BMI = weight(kg) / [height(m)]²",
    "Categories: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (≥30)",
    "Copy Function: 1-click copy for BMI and category",
    "Error Handling: Invalid or zero inputs return N/A",
    "UI: Responsive layout with styled inputs and output rows",
    "Performance: Instant client-side calculation (no server required)",
  ];

  return (
    <FeaturesTemplate
      title="BMI Calculator Features"
      subtitle="Track your Body Mass Index instantly with automatic health categorization"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default BMICalculatorFeatures;
