"use client"

import type React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../../redux/Store"
import { type TaskStatus, updateTaskStatus, setPage } from "../../../../redux/slices/tasksSlice"
import styles from "./Tasks.module.css"
import TaskCard from "./TaskCard"
import TasksHeader from "./TasksHeader"

const statusLabels: Record<TaskStatus, string> = {
  not_started: "Not Started",
  ongoing: "In Progress",
  completed: "Completed",
}

const statusColors: Record<TaskStatus, string> = {
  not_started: "draft",
  ongoing: "progress",
  completed: "success",
}

interface TasksProps {
  itemsPerPage?: number
}

const Tasks: React.FC<TasksProps> = ({ itemsPerPage = 6 }) => {
  const dispatch = useDispatch()
  const { tasks, page } = useSelector((state: RootState) => state.tasks)
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TaskStatus>("not_started")

  const handleStatusChange = (id: number, newStatus: TaskStatus) => {
    dispatch(updateTaskStatus({ id, status: newStatus }))
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPage({ status: activeTab, page: newPage }))
  }

  const renderTasksByStatus = (status: TaskStatus) => {
    const filtered = tasks.filter((task) => task.status === status)
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const currentPage = page[status]

    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
      <>
        {paginated.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>No tasks in this status</p>
          </div>
        ) : (
          <div className={styles.tasksGrid}>
            {paginated.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                status={status}
                isExpanded={expandedTaskId === task.id}
                onToggleExpand={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination}>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
              aria-label="Previous page"
            >
              ←
            </button>
            <div className={styles.paginationInfo}>
              <span className={styles.pageNumber}>{currentPage}</span>
              <span className={styles.pageTotal}>of {totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
              aria-label="Next page"
            >
              →
            </button>
          </nav>
        )}
      </>
    )
  }

  return (
    <main className={styles.container}>
      <TasksHeader totalTasks={tasks.length} />

      <div className={styles.tabsContainer}>
        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          {(Object.entries(statusLabels) as [TaskStatus, string][]).map(([status, label]) => {
            const count = tasks.filter((task) => task.status === status).length
            return (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`${styles.tab} ${activeTab === status ? styles.tabActive : ""}`}
              >
                <div className={`${styles.statusBadge} ${styles[statusColors[status]]}`}></div>
                <span>{label}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>{renderTasksByStatus(activeTab)}</div>
      </div>
    </main>
  )
}

export default Tasks
