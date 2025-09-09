import type React from "react";
import "../CoreValueCard/NewwebsiteCard.css";

interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
}

export function NewwebsiteCard({
  icon,
  title,
  description,
  className,
  url,
  link,
  onClick,
}: DashboardCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    } else {
      const targetUrl = url ?? link; // TypeScript-safe
      if (!targetUrl) return; // ✅ exit if undefined

      if (targetUrl.startsWith("http")) {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = targetUrl; // ✅ safe, string guaranteed
      }
    }
  };

  return (
    <div
      className={`dashboard-card ${url || link ? "clickable-card" : ""} ${
        className || ""
      }`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-content">
        <div className="card-icon-containers">
          <div className="card-icons">{icon}</div>
        </div>
        <div className="card-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
}
