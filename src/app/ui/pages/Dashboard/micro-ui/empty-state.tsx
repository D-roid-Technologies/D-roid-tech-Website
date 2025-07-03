import type React from "react"
import { Search } from "lucide-react"
import componentStyles from "../components.module.css"

interface EmptyStateProps {
  icon?: React.ComponentType<any>
  title: string
  description: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon = Search, title, description }) => (
  <div className={componentStyles.emptyState}>
    <Icon className={componentStyles.emptyStateIcon} />
    <h3 className={componentStyles.emptyStateTitle}>{title}</h3>
    <p className={componentStyles.emptyStateDescription}>{description}</p>
  </div>
)
