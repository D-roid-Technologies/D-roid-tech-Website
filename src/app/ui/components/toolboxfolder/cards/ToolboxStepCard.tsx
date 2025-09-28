import React from "react";
import "../imageresizing/ImageResizerFeatures.css"

interface ToolboxStepCardProps {
  step: number;
  title: string;
  description: string;
}

const ToolboxStepCard: React.FC<ToolboxStepCardProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <div className="irf-step">
      <div className="irf-step-number">{step}</div>
      <div className="irf-step-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ToolboxStepCard;
