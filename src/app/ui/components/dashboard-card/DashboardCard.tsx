import type React from "react";
import "./DashboardCard.css";

interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonLabel?: string;
}

export function DashboardCard({
  icon,
  title,
  description,
  buttonLabel,
}: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      <div className="card-content">
        <div className="card-icon-container">
          <div className="card-icon">{icon}</div>
        </div>
        <div className="card-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
        {buttonLabel && <button className="card-button">{buttonLabel}</button>}
      </div>
    </div>
  );
}
