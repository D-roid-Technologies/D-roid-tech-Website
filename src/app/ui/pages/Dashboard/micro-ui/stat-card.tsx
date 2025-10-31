import type React from "react"
import componentStyles from "../components.module.css"

interface StatCardProps {
  title: string
  value: string
  change: React.ReactNode
  icon: React.ComponentType<any>
  onClick?: () => void;
  button?: boolean;
  onButtonClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, onClick, button, onButtonClick }) => (
  <div className={componentStyles.statCard} onClick={onClick} style={{ cursor: "pointer" }}>
    <div className={componentStyles.statCardHeader}>
      <h3 className={componentStyles.statCardTitle}>{title}</h3>
      <Icon className={componentStyles.statCardIcon} />
    </div>
    <h2 className={componentStyles.statCardValue}>{value}</h2>
    <p className={componentStyles.statCardChange}>{change}</p>
    {button && (
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card's onClick
          onButtonClick?.();
        }}
        style={{
          width: "100%",
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          marginTop: "12px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
        }}
      >
        Upgrade
      </button>
    )}
  </div>
)
