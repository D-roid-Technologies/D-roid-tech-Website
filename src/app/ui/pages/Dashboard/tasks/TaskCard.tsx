"use client"

import type React from "react"
import type { Task, TaskStatus } from "../../../../redux/slices/tasksSlice"

import styles from "./Tasks.module.css"
import { ChevronDown, AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface TaskCardProps {
  task: Task
  status: TaskStatus
  isExpanded: boolean
  onToggleExpand: () => void
  onStatusChange: (id: number, status: TaskStatus) => void
}

const priorityConfig = {
  high: { label: "High", color: "high" },
  medium: { label: "Medium", color: "medium" },
  low: { label: "Low", color: "low" },
}

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  not_started: <AlertCircle size={16} />,
  ongoing: <Clock size={16} />,
  completed: <CheckCircle2 size={16} />,
}

const TaskCard: React.FC<TaskCardProps> = ({ task, status, isExpanded, onToggleExpand, onStatusChange }) => {
  const formatDate = (date?: string) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <article className={`${styles.taskCard} ${styles[`card-${status}`]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleSection}>
          <button className={styles.expandBtn} onClick={onToggleExpand} aria-expanded={isExpanded}>
            <ChevronDown size={18} className={`${styles.chevronIcon} ${isExpanded ? styles.expanded : ""}`} />
          </button>
          <div className={styles.titleContent}>
            <h3 className={styles.cardTitle}>{task.title}</h3>
            {task.priority && (
              <span className={`${styles.priorityBadge} ${styles[`priority-${task.priority}`]}`}>
                {priorityConfig[task.priority].label}
              </span>
            )}
          </div>
        </div>
        <div className={styles.statusIcon}>{statusIcons[status]}</div>
      </div>

      <p className={styles.cardDescription}>{task.description}</p>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.taskMeta}>
            {task.dueDate && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Due Date:</span>
                <span className={styles.metaValue}>{formatDate(task.dueDate)}</span>
              </div>
            )}
            {task.assignee && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Assignee:</span>
                <span className={styles.metaValue}>{task.assignee}</span>
              </div>
            )}
          </div>

          <div className={styles.statusChangeSection}>
            <label className={styles.statusLabel}>Change Status</label>
            <select
              value={status}
              onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
              className={styles.statusSelect}
            >
              <option value="not_started">Not Started</option>
              <option value="ongoing">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      )}
    </article>
  )
}

export default TaskCard
