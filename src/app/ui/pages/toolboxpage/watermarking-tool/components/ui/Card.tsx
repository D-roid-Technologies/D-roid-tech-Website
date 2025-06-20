// Card components
import type React from "react"

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`wt-card ${className}`}>{children}</div>
)

export const CardHeader: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`wt-card__header ${className}`}>{children}</div>
)

export const CardTitle: React.FC<CardProps> = ({ className = "", children }) => (
  <h3 className={`wt-card__title ${className}`}>{children}</h3>
)

export const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`wt-card__content ${className}`}>{children}</div>
)
