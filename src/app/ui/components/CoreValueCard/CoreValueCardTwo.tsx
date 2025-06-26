import React, { ReactNode } from "react";
import "../CoreValueCard/CoreValueCardTwo.css";

interface CoreValueCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  icon?: ReactNode;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
  pressable?: boolean;
  readmore?: boolean;
}

const CoreValueCardTwo: React.FC<CoreValueCardProps> = ({
  title,
  description,
  imageSrc,
  className = "",
  icon,
  url,
  link,
  onClick,
  pressable = false,
  readmore = true,
}) => {
  return (
    <div className={`core-value-card ${className}`}>
      {imageSrc && (
        <img src={imageSrc} alt={title} className="core-value-card-icon" />
      )}
      {icon && <div className="core-value-card-icon-icon">{icon}</div>}
      <div style={{ padding: "24px" }}>
        <h3 className="core-value-card-title">{title}</h3>
        <p className="core-value-card-description">{description}</p>

        {(link || onClick) && (
  <div className="mt-3">
    {link ? (
      <a href={link} className="launch-button">
        Launch
      </a>
    ) : (
      <button className="launch-button" onClick={onClick}>
        Launch
      </button>
    )}
  </div>
)}


        {link && (
          <div className="mt-2">
            <a href={link} className="launch-button">
              Launch
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoreValueCardTwo;
