import React from "react";
import "../imageresizing/ImageResizerFeatures.css"


interface ToolboxSpecCardProps {
  label: string;
  value: string;
}

const ToolboxSpecCard: React.FC<ToolboxSpecCardProps> = ({ label, value }) => {
  return (
    <div className="irf-spec-item">
      <span className="irf-spec-label">{label}:</span>
      <span className="irf-spec-value">{value}</span>
    </div>
  );
};

export default ToolboxSpecCard;
