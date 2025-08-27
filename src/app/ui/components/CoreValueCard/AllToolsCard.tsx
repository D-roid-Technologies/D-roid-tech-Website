import React, { ReactNode } from "react";
import "./CoreValueCardThree.css";

interface CoreValueCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  icon?: ReactNode;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
  onLaunch?: () => void;
  pressable?: boolean;
  isPremium?: boolean; // ✅ new prop
}

const AllToolsCard: React.FC<CoreValueCardProps> = ({
  title,
  description,
  imageSrc,
  className = "",
  icon,
  url,
  link,
  onClick,
  pressable = false,
  onLaunch,
  isPremium = false, // ✅ default = false
}) => {
  return (
    <div className={`tools-value-card ${className}`} style={{ position: "relative" }}>
      {/* Premium/Free Badge */}
      <div
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          zIndex: 10,
        }}
      >
        <span
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "0.375rem", 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            background: isPremium
              ? "linear-gradient(to right, #facc15, #ca8a04)" // yellow-400 → yellow-600
              : "linear-gradient(to right, #4ade80, #16a34a)", // green-400 → green-600
            color: isPremium ? "#713f12" : "#14532d", // text-yellow-900 / text-green-900
          }}
        >
          {isPremium ? "PREMIUM" : "FREE"}
        </span>
      </div>

      {imageSrc && (
        <img src={imageSrc} alt={title} className="tools-value-card-icon" />
      )}
      {icon && (
        <div className="tools-value-card-icon">
          <div className="tools-value-card-icon-icon">{icon}</div>
        </div>
      )}
      <div className="tools-value-card-content">
        <h3 className="tools-value-card-title">{title}</h3>
        <p className="tools-value-card-description">{description}</p>
        {(onLaunch || link) && (
          <div className="launch-button-container">
            {onLaunch ? (
              <button className="launch-button" onClick={onLaunch}>
                Launch
              </button>
            ) : (
              <a href={link} className="launch-button">
                Launch
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllToolsCard;
