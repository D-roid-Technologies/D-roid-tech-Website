import type React from "react"
import componentStyles from "../components.module.css"

interface StatCardProps {
  title: string
  value: string
  change: React.ReactNode
  icon: React.ComponentType<any>
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, onClick }) => (
  <div className={componentStyles.statCard} onClick={onClick} style={{ cursor: "pointer" }}>
    <div className={componentStyles.statCardHeader}>
      <h3 className={componentStyles.statCardTitle}>{title}</h3>
      <Icon className={componentStyles.statCardIcon} />
    </div>
    <h2 className={componentStyles.statCardValue}>{value}</h2>
    <p className={componentStyles.statCardChange}>{change}</p>
  </div>
)
