"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"
import ExamDashboard from "./examsAndRecord/ExamDashboard"
import styles from "./DashboardContent.module.css"

interface ExamProps {
  onBack: () => void
}

const Exam: React.FC<ExamProps> = ({ onBack }) => {
  return (
    <div>
      <button className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Class Details
      </button>

      <ExamDashboard />
    </div>
  )
}

export default Exam
