// UuidGeneratorFeatures.tsx
import React from "react";
import "../../../pages/toolboxpage/uuidgenerator/UuidGeneratorFeatures.css";
import { FaStream } from "react-icons/fa";
import {
  MdErrorOutline,
  MdFormatOverline,
  MdOutlineContentCopy,
  MdOutlineFeedback,
} from "react-icons/md";
import { VscSymbolInterface } from "react-icons/vsc";

const UuidGeneratorFeatures: React.FC = () => {
  const features = [
    {
      title: "Instant UUID Generation",
      description:
        "Generate cryptographically secure UUIDs instantly using the browser's native crypto.randomUUID() API",
      icon: <FaStream />,
    },
    {
      title: "One-Click Copy",
      description:
        "Copy generated UUIDs to your clipboard with a single click for seamless integration into your projects",
      icon: <MdOutlineContentCopy />,
    },
    {
      title: "Visual Feedback",
      description:
        "Get instant toast notifications for successful generation and copy operations with custom styling",
      icon: <MdOutlineFeedback />,
    },
    {
      title: "Clean Interface",
      description:
        "Simple, intuitive design with clear UUID display and easy-to-use action buttons",
      icon: <VscSymbolInterface />,
    },
    {
      title: "Format Preservation",
      description:
        "Generated UUIDs maintain standard formatting (8-4-4-4-12) for universal compatibility",
      icon: <MdFormatOverline />,
    },
    {
      title: "Error Handling",
      description:
        "Built-in error handling for clipboard operations with user-friendly error messages",
      icon: <MdErrorOutline />,
    },
  ];

  return (
    <div className="uuid-features-container">
      <div className="uuid-features-header">
        <h2 className="uuid-features-title">UUID Generator Features</h2>
        <p className="uuid-features-subtitle">
          A powerful yet simple tool for generating unique identifiers
        </p>
      </div>

      <div className="uuid-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="uuid-feature-card">
            <div className="uuid-feature-icon">{feature.icon}</div>
            <h3 className="uuid-feature-title">{feature.title}</h3>
            <p className="uuid-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="uuid-features-technical">
        <h3 className="uuid-technical-title">Technical Specifications</h3>
        <ul className="uuid-technical-list">
          <li>Uses Web Crypto API for secure random number generation</li>
          <li>Generates UUID v4 format (random/pseudo-random)</li>
          <li>122-bit entropy for collision resistance</li>
          <li>Compatible with all modern browsers</li>
          <li>No external dependencies for UUID generation</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </div>
    </div>
  );
};

export default UuidGeneratorFeatures;
