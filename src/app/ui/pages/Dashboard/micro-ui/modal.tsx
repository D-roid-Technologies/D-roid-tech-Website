"use client"

import type React from "react"
import { X } from "lucide-react"
import componentStyles from "../components.module.css"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null

  return (
    <div className={componentStyles.modal} onClick={onClose}>
      <div className={componentStyles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={componentStyles.modalClose} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={componentStyles.modalHeader}>
          <h2 className={componentStyles.modalTitle}>{title}</h2>
          {description && <p className={componentStyles.modalDescription}>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
