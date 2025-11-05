"use client"

import type React from "react"
import styles from "./Tasks.module.css"
import { ListTodo } from "lucide-react"

interface TasksHeaderProps {
  totalTasks: number
}

const TasksHeader: React.FC<TasksHeaderProps> = ({ totalTasks }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerTitleSection}>
          <div className={styles.iconWrapper}>
            <ListTodo size={28} />
          </div>
          <div>
            <h1 className={styles.mainTitle}>My Tasks</h1>
            <p className={styles.subtitle}>Manage and track your work progress</p>
          </div>
        </div>
        <div className={styles.statsBox}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalTasks}</span>
            <span className={styles.statLabel}>Total Tasks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksHeader
