import type React from "react"
import componentStyles from "../components.module.css"

interface ProgressBarProps {
  value: number
  label: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => (
  <div className={componentStyles.progressSection}>
    <div className={componentStyles.progressHeader}>
      <span className={componentStyles.progressLabel}>{label}</span>
      <span className={componentStyles.progressPercent}>{value}%</span>
    </div>
    <div className={componentStyles.progress}>
      <div className={componentStyles.progressBar} style={{ width: `${value}%` }} />
    </div>
  </div>
)
