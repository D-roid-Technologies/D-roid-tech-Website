// FeaturesTemplate.tsx
import React from "react";
import "./Features.css";
import { IconType } from "react-icons"; 

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

interface FeaturesTemplateProps {
  title: string;
  subtitle: string;
  features: Feature[];
  technicalSpecs: string[];
}

const FeaturesTemplate: React.FC<FeaturesTemplateProps> = ({
  title,
  subtitle,
  features,
  technicalSpecs,
}) => {
  return (
    <div className="uuid-features-container">
      {/* Header */}
      <div className="uuid-features-header">
        <h2 className="uuid-features-title">{title}</h2>
        <p className="uuid-features-subtitle">{subtitle}</p>
      </div>

      {/* Features Grid */}
      <div className="uuid-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="uuid-feature-card">
            <div className="uuid-feature-icon">{feature.icon}</div>
            <h3 className="uuid-feature-title">{feature.title}</h3>
            <p className="uuid-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Technical Specs */}
      <div className="uuid-features-technical">
        <h3 className="uuid-technical-title">Technical Specifications</h3>
        <ul className="uuid-technical-list">
          {technicalSpecs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturesTemplate;
