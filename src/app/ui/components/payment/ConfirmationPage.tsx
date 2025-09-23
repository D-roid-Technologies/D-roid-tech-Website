"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CheckCircle, Download, Mail, Home } from "lucide-react"
import type { PaymentResponse, Plan } from "./types"
import { formatCurrency } from "./utils/paystack"
import styles from "./ConfirmationPage.module.css"

interface ConfirmationPageProps {
  plan?: Plan
  customerInfo?: { name: string; email: string; phone: string }
  paymentResponse?: PaymentResponse
  onReturnHome?: () => void
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  plan,
  customerInfo,
  paymentResponse,
  onReturnHome,
}) => {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!plan || !customerInfo || !paymentResponse) {
      return
    }

    // Trigger success animation
    const timer = setTimeout(() => setShowSuccess(true), 500)
    return () => clearTimeout(timer)
  }, [plan, customerInfo, paymentResponse])

  if (!plan || !customerInfo || !paymentResponse) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          {/* Success Animation */}
          <div className={`${styles.successAnimation} ${showSuccess ? styles.show : ""}`}>
            <div className={styles.successIcon}>
              <CheckCircle size={64} />
            </div>
          </div>

          <div className={`${styles.titleSection} ${showSuccess ? styles.show : ""}`}>
            <h1 className={styles.title}>{paymentResponse.success ? "Payment Successful!" : "Payment Processing"}</h1>
            <p className={styles.subtitle}>{paymentResponse.message}</p>
          </div>

          {/* Order Details */}
          <div className={`${styles.card} ${styles.orderDetails} ${showSuccess ? styles.show : ""}`}>
            <h2 className={styles.cardTitle}>Order Details</h2>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Plan:</span>
                <span className={styles.detailValue}>{plan.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Amount:</span>
                <span className={styles.detailValue}>{formatCurrency(plan.price)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Billing:</span>
                <span className={styles.detailValue}>Every {plan.interval}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Reference:</span>
                <span className={`${styles.detailValue} ${styles.referenceValue}`}>{paymentResponse.reference}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Customer:</span>
                <span className={styles.detailValue}>{customerInfo.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email:</span>
                <span className={styles.detailValue}>{customerInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className={`${styles.card} ${styles.nextSteps} ${showSuccess ? styles.show : ""}`}>
            <h3 className={styles.cardTitle}>What's Next?</h3>
            <div className={styles.stepsList}>
              <div className={styles.stepItem}>
                <Mail className={`${styles.stepIcon} ${styles.mail}`} size={20} />
                <span>Check your email for account setup instructions</span>
              </div>
              <div className={styles.stepItem}>
                <Download className={`${styles.stepIcon} ${styles.download}`} size={20} />
                <span>Download our mobile app for easy access</span>
              </div>
              <div className={styles.stepItem}>
                <CheckCircle className={`${styles.stepIcon} ${styles.check}`} size={20} />
                <span>Your account will be activated within 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`${styles.actionSection} ${showSuccess ? styles.show : ""}`}>
            <button onClick={onReturnHome} className={styles.homeButton}>
              <Home size={20} />
              Return to Homepage
            </button>

            <p className={styles.supportText}>Need help? Contact our support team at support@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
