// src/components/StatDetailModal.tsx
import React from "react"
import { Modal } from "../../pages/Dashboard/micro-ui/modal"
import styles from "./StatDetailModal.module.css"

type StatHistoryItem = {
  date: string
  event: string
}

type StatDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  stat: {
    title: string
    value: string
    change: string
    icon: React.ComponentType<{ size?: number }>
  } | null
  description: string
  history: StatHistoryItem[]
}

export const StatDetailModal: React.FC<StatDetailModalProps> = ({
  isOpen,
  onClose,
  stat,
  description,
  history,
}) => {
  if (!stat) return null

  const Icon = stat.icon

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" description="">
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <Icon size={32} />
          <div>
            <h2 className={styles.title}>{stat.title}</h2>
            <p className={styles.value}>{stat.value}</p>
          </div>
        </div>

        {/* Change/Status Text */}
        <div className={styles.change}>
          <p>{stat.change}</p>
        </div>

        {/* Details Section */}
        <div className={styles.details}>
          <h3 className={styles.detailsTitle}>Details</h3>
          <p className={styles.description}>{description}</p>

          {/* History Section */}
          <h4 className={styles.historyTitle}>Recent History</h4>
          <div className={styles.historyList}>
            {history.length > 0 ? (
              history.map((item, idx) => (
                <div key={idx} className={styles.historyItem}>
                  <span className={styles.historyEvent}>{item.event}</span>
                  <span className={styles.historyDate}>{item.date}</span>
                </div>
              ))
            ) : (
              <p className={styles.noHistory}>No history available</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
