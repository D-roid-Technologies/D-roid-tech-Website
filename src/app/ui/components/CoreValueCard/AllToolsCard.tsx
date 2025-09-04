import type React from "react";
import { useNavigate } from "react-router-dom";
import "./AllToolsCard.css";

interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
  isPremium?: boolean;
  component?: string | React.ComponentType<any>; // 👈 can be string OR component
}

export function AllToolsCard({
  icon,
  title,
  description,
  className,
  url,
  link,
  onClick,
  isPremium = false,
  component,
}: DashboardCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if (component) {
      if (typeof component === "string") {
        // component is just a tool name (string)
        console.log("Launch tool by name:", component);
        // TODO: you can hook this into a modal or dynamic loader
      } else {
        // component is an actual React component
        console.log("Render tool component directly");
        // You could also set state to show it in a modal
      }
      return;
    }

    if (url || link) {
      const targetUrl = url || link;
      if (targetUrl?.startsWith("http")) {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        navigate(targetUrl!);
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  // If `component` is a React component, prepare it
  const Component = typeof component === "string" ? null : component;

  return (
    <div
      className={`AllToolsCard ${url || link || component ? "AllToolsCard-clickable-card" : ""} ${
        className || ""
      }`}
      onClick={handleCardClick}
      style={{
        position: "relative",
        cursor: "pointer",
      }}
    >
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
            color: isPremium ? "#713f12" : "#14532d",
          }}
        >
          {isPremium ? "PREMIUM" : "FREE"}
        </span>
      </div>

      <div className="AllToolsCard-content">
        <div className="AllToolsCard-card-icon-containers">
          <div className="card-icons">{icon}</div>
        </div>
        <div className="AllToolsCard-card-text">
          <h3 className="AllToolsCard-card-title">{title}</h3>
          <p className="AllToolsCard-card-description">{description}</p>
        </div>
      </div>

      {/* If it's a real React component, render it */}
      {Component && (
        <div className="AllToolsCard-component">
          <Component />
        </div>
      )}
    </div>
  );
}
