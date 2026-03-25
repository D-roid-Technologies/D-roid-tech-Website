import type React from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  actions,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Close modal when clicking outside (on overlay)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent modal content clicks from closing
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.microModalOverlay} onClick={handleOverlayClick}>
      <div className={styles.microModalBox} onClick={handleContentClick}>
        <button
          className={styles.microModalCloseBtn}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close modal"
        >
          <X size={20} className={styles.microModalCloseIcon} />
        </button>
        
        <div className={styles.microModalHeader}>
          {title && <h2 className={styles.microModalTitle}>{title}</h2>}
          {description && (
            <p className={styles.microModalDesc}>{description}</p>
          )}
        </div>
        
        <div className={styles.microModalBody}>{children}</div>
        
        {actions && <div className={styles.microModalActions}>{actions}</div>}
      </div>
    </div>
  );
};