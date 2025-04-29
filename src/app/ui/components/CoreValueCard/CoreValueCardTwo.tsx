import React, { ReactNode } from "react";
import "../CoreValueCard/CoreValueCardTwo.css";

interface CoreValueCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  icon?: ReactNode;
}

const CoreValueCardTwo: React.FC<CoreValueCardProps> = ({
  title,
  description,
  imageSrc,
  className = "",
  icon,
}) => {
  return (
    <div className={`core-value-card ${className}`}>
      {imageSrc && (
        <img src={imageSrc} alt={title} className="core-value-card-icon" />
      )}
      {icon && <div className="core-value-card-icon">{icon}</div>}
      <h3 className="core-value-card-title">{title}</h3>
      <p className="core-value-card-description">{description}</p>
    </div>
  );
};

export default CoreValueCardTwo;
