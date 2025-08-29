import React from "react";
import "../imageresizing/ImageResizerFeatures.css"


interface ToolboxFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const ToolboxFeatureCard: React.FC<ToolboxFeatureCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => {
  return (
    <div className="irf-feature-card">
      <div className="irf-feature-icon">{icon}</div>
      <h3 className="irf-feature-title">{title}</h3>
      <p className="irf-feature-description">{description}</p>
      <ul className="irf-feature-benefits">
        {benefits.map((benefit, i) => (
          <li key={i} className="irf-benefit-item">
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolboxFeatureCard;
