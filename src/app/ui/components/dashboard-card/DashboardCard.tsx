import type React from "react"
import "./DashboardCard.css"

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function DashboardCard({ icon, title, description }: DashboardCardProps) {
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
      </div>
    </div>
  )
}
