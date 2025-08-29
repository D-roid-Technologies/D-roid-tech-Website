import React from "react";
import "../imageresizing/ImageResizerFeatures.css"


interface ToolboxBenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

const ToolboxBenefitCard: React.FC<ToolboxBenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="irf-benefit-highlight">
      <h4>{icon} {title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default ToolboxBenefitCard;
