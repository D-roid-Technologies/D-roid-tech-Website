"use client"

import type React from "react"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"
import styles from "./PendingConfirmation.module.css"

interface PendingConfirmationProps {
  toolName?: string
  onClose?: () => void
}

export const PendingConfirmation: React.FC<PendingConfirmationProps> = ({ toolName = "Premium Tools", onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Clock className={styles.clockIcon} size={48} />
        </div>

        <h2 className={styles.title}>Payment Confirmation Pending</h2>
        <p className={styles.subtitle}>Your payment for {toolName} is being processed</p>

        <div className={styles.statusCard}>
          <div className={styles.statusItem}>
            <CheckCircle className={styles.checkIcon} size={20} />
            <span>Payment submitted successfully</span>
          </div>
          <div className={styles.statusItem}>
            <Clock className={styles.pendingIcon} size={20} />
            <span>Awaiting payment confirmation</span>
          </div>
          <div className={styles.statusItem}>
            <AlertCircle className={styles.waitingIcon} size={20} />
            <span>Tool access will be activated shortly</span>
          </div>
        </div>

        <div className={styles.infoBox}>
          <h4 className={styles.infoTitle}>What happens next?</h4>
          <ul className={styles.infoList}>
            <li>Payment confirmation typically takes 1-5 minutes</li>
            <li>You'll receive an email once payment is confirmed</li>
            <li>Premium tools will be automatically unlocked</li>
            <li>No further action required from you</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button className={styles.refreshButton} onClick={() => window.location.reload()}>
            Check Status
          </button>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
              Continue Using Free Tools
            </button>
          )}
        </div>

        <p className={styles.supportText}>Having issues? Contact our support team for immediate assistance.</p>
      </div>
    </div>
  )
}
