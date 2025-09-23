"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Crown, Star, Zap, Shield } from "lucide-react"
import styles from "./UpgradeToAccessTools.module.css"
import { CheckoutPage } from "./payment/CheckoutPage"

interface UpgradeToAccessToolsProps {
  toolName?: string
  onClose?: () => void
}

export const UpgradeToAccessTools: React.FC<UpgradeToAccessToolsProps> = ({ toolName = "Premium Tools", onClose }) => {
  const navigate = useNavigate()
  const [showCheckout, setShowCheckout] = useState(false)

  const selectedPlan = {
    id:"",
    name: "Premium Tools Access",
    price: 5999, // Price in kobo (₦29.99)
    interval: "month",
    features: [
      "Access to all premium tools",
      "AI Background Remover",
      "Advanced PDF Editor",
      "Resume & CV Analyzer",
      "Code Complexity Analyzer",
      "Bulk Image Watermarker",
      "Priority support",
    ],
  }

  const handleUpgrade = () => {
    setShowCheckout(true)
  }

  const handleBackFromCheckout = () => {
    setShowCheckout(false)
  }

  if (showCheckout) {
    return (
      <div className={styles.checkoutWrapper}>
        <button className={styles.backButton} onClick={handleBackFromCheckout}>
          ← Back to Upgrade
        </button>
        <CheckoutPage selectedPlan={selectedPlan} onBack={handleBackFromCheckout} />
      </div>
    )
  }

  const premiumFeatures = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "AI-Powered Tools",
      description: "Advanced AI tools for background removal and content analysis",
    },
    {
      icon: <Star className={styles.featureIcon} />,
      title: "Professional Features",
      description: "PDF editing, resume analysis, and code complexity tools",
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Priority Support",
      description: "24/7 premium support and faster processing",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.crownIcon}>
          <Crown size={48} />
        </div>
        <h2 className={styles.title}>Upgrade to Access {toolName}</h2>
        <p className={styles.subtitle}>Unlock powerful premium tools to supercharge your productivity</p>
      </div>

      <div className={styles.featuresGrid}>
        {premiumFeatures.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            {feature.icon}
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.pricingSection}>
        <div className={styles.priceTag}>
          <span className={styles.currency}>₦</span>
          <span className={styles.price}>5000</span>
          <span className={styles.period}>/month</span>
        </div>
        <p className={styles.pricingNote}>Cancel anytime • 30-day money-back guarantee</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.upgradeButton} onClick={handleUpgrade}>
          <Crown size={20} />
          Upgrade Now
        </button>
        {onClose && (
          <button className={styles.cancelButton} onClick={onClose}>
            Maybe Later
          </button>
        )}
      </div>

      <div className={styles.benefits}>
        <h4 className={styles.benefitsTitle}>What you'll get:</h4>
        <ul className={styles.benefitsList}>
          <li>✓ AI Background Remover</li>
          <li>✓ Advanced PDF Editor</li>
          <li>✓ Resume & CV Analyzer</li>
          <li>✓ Code Complexity Analyzer</li>
          <li>✓ Bulk Image Watermarker</li>
          <li>✓ Priority customer support</li>
        </ul>
      </div>
    </div>
  )
}
