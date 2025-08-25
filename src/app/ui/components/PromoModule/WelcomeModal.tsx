"use client"

import { useState, useEffect,useRef } from "react"
import { useNavigate } from "react-router-dom"
import { IoCloseSharp } from "react-icons/io5";

import styles from "./welcome-modal.module.css"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const scrollYRef = useRef(0);

  useEffect(() => {
    // Check if modal has been shown before
        scrollYRef.current = window.scrollY;

    const hasSeenModal = localStorage.getItem("welcome-modal-seen")

    if (!hasSeenModal) {
      
      const timer = setTimeout(() => {
              const hasScrolledFar = Math.abs(window.scrollY - scrollYRef.current) > 100;

        setIsOpen(true)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Mark modal as seen so it won't show again
    localStorage.setItem("welcome-modal-seen", "true")
  }

  const handleSignUp = () => {
  
    navigate("/form")
    handleClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className={styles.modalBackdrop} onClick={handleClose} />

      <div className={styles.modalContainer}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <div onClick={handleClose} className={styles.modalCloseBtn}>
             <IoCloseSharp />
            </div>
            <h2 className={styles.modalTitle}>Get 1 Month Hosting Free!</h2>
          </div>

          <div className={styles.modalBody}>
            <p className={styles.modalSubtitle}>
              Sign up today and launch your website with zero hosting cost for the first month.
            </p>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <span className={styles.featureText}>Fast & reliable hosting</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureText}>Mobile-friendly support</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureText}>Easy upgrade options</span>
              </div>
            </div>

            <div className={styles.ctaSection}>
              <button onClick={handleSignUp} className={styles.ctaButton}>
                 Sign Up & Claim Free Hosting
              </button>
            </div>

            <p className={styles.disclaimer}>No credit card required • Cancel anytime</p>
          </div>
        </div>
      </div>
    </>
  )
}
