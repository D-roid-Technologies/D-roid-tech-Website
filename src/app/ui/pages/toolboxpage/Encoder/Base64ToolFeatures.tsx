import React from "react";
import "../../../pages/toolboxpage/Encoder/Base64ToolFeatures.css";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { FaUnlockKeyhole } from "react-icons/fa6";
import {
  MdErrorOutline,
  MdOutlineContentCopy,
  MdOutlineFeedback,
} from "react-icons/md";
import { SiCssdesignawards } from "react-icons/si";

const Base64ToolFeatures: React.FC = () => {
  const features = [
    {
      icon: <RiShieldKeyholeFill />,
      title: "Base64 Encoding",
      description:
        "Convert plain text into Base64 encoded format for secure data transmission and storage.",
    },
    {
      icon: <FaUnlockKeyhole />,
      title: "Base64 Decoding",
      description:
        "Decode Base64 encoded strings back to their original plain text format.",
    },
    {
      icon: <MdOutlineContentCopy />,
      title: "One-Click Copy",
      description:
        "Instantly copy encoded or decoded results to your clipboard with a single click.",
    },
    {
      icon: <MdOutlineFeedback />,
      title: "Real-time Feedback",
      description:
        "Get immediate success or error notifications for all encoding and decoding operations.",
    },
    {
      icon: <MdErrorOutline />,
      title: "Error Handling",
      description:
        "Built-in error handling ensures graceful failure for invalid Base64 input strings.",
    },
    {
      icon: <SiCssdesignawards />,
      title: "Responsive Design",
      description:
        "Clean, modern interface that works seamlessly across desktop and mobile devices.",
    },
  ];

  return (
    <div className="base64-features-container">
      <div className="base64-features-header">
        <h2 className="base64-features-title">Tool Features</h2>
        <p className="base64-features-subtitle">
          Powerful Base64 encoding and decoding capabilities designed for
          developers and security professionals
        </p>
      </div>

      <div className="base64-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="base64-feature-card">
            <div className="base64-feature-icon">{feature.icon}</div>
            <h3 className="base64-feature-title">{feature.title}</h3>
            <p className="base64-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="base64-features-footer">
        <div className="base64-features-stats">
          <div className="base64-stat-item">
            <span className="base64-stat-number">100%</span>
            <span className="base64-stat-label">Browser Compatible</span>
          </div>
          <div className="base64-stat-item">
            <span className="base64-stat-number">0ms</span>
            <span className="base64-stat-label">Processing Delay</span>
          </div>
          <div className="base64-stat-item">
            <span className="base64-stat-number">∞</span>
            <span className="base64-stat-label">Text Length Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64ToolFeatures;
