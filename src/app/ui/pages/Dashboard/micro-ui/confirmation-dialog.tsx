"use client"

import type React from "react"
import { AlertTriangle } from "lucide-react"
import { Modal } from "./modal"
import componentStyles from "../components.module.css"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "danger" | "warning" | "info"
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <AlertTriangle size={48} color={type === "danger" ? "#dc2626" : "#f59e0b"} style={{ margin: "0 auto 1rem" }} />
        <p style={{ color: "#64748b", margin: 0 }}>{message}</p>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button className={`${componentStyles.button} ${componentStyles.buttonSecondary}`} onClick={onClose}>
          {cancelText}
        </button>
        <button
          className={`${componentStyles.button} ${type === "danger" ? componentStyles.buttonDanger : componentStyles.buttonPrimary}`}
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}
