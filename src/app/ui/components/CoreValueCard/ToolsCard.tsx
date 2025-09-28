import React from "react";

interface CoreValueCardThreeProps {
  title: string;
  description: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  link?: string;
  className?: string;
  onLaunch?: () => void;
  isPremium?: boolean;
  onClick?: (e: any) => void;
  pressable?: boolean;
}

const ToolsCard: React.FC<CoreValueCardThreeProps> = ({
  title,
  description,
  icon,
  link,
  className,
  onLaunch,
  isPremium = false,
  imageSrc,
  onClick,
  pressable = false, // Add pressable prop
}) => {
  const handleClick = () => {
    if (onLaunch) {
      // If onLaunch is provided, use it (for tools that launch in-app)
      onLaunch();
    } else if (link) {
      // If link is provided, navigate to it
      window.open(link, "_blank");
    }
  };

  return (
    <div className={`core-value-card ${className}`}>
      {imageSrc && (
        <img src={imageSrc} alt={title} className="core-value-card-icon" />
      )}
      {icon && <div className="core-value-card-icon-icon">{icon}</div>}
      <div style={{ padding: "24px" }}>
        <h3 className="core-value-card-title">{title}</h3>
        <p className="core-value-card-description">{description}</p>
        {isPremium && <span className="premium-badge">Premium</span>}
        <button
          onClick={handleClick}
          className="launch-button"
          disabled={!onLaunch && !link}
          style={{
            backgroundColor: onLaunch ? "#081d67" : "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: onLaunch || link ? "pointer" : "not-allowed",
          }}
        >
          {onLaunch ? "Launch" : "Open"}
        </button>
      </div>
    </div>
  );
};
export default ToolsCard;
