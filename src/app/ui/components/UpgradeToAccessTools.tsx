"use client"

import type React from "react"
import { useState } from "react"
import { Crown, Star, Zap, Shield } from "lucide-react"
import styles from "./UpgradeToAccessTools.module.css"
import { CheckoutPage } from "./payment/CheckoutPage"

interface UpgradePlan {
  id?: string
  name: string
  price: number
  interval: string
  features: string[]
}

interface UpgradeToAccessToolsProps {
  toolName?: string | null
  onClose?: () => void
  onPaymentSuccess?: () => void
  onPaymentInitiated?: () => void
  onUpgrade?: () => void
}

export const UpgradeToAccessTools: React.FC<UpgradeToAccessToolsProps> = ({
  toolName = "Premium Tools",
  onClose,
  onPaymentSuccess,
  onPaymentInitiated,
}) => {
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedTier, setSelectedTier] = useState<"Gold" | "Platinum">("Gold")

  // Plan based on selected tier
  const selectedPlan: UpgradePlan = {
    id: selectedTier === "Gold" ? "gold-tier" : "platinum-tier",
    name: `${selectedTier} Tier Access`,
    price: selectedTier === "Gold" ? 5000 : 15000,
    interval: "one-time",
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
    if (onPaymentInitiated) {
      onPaymentInitiated()
    }
  }

  const handleBackFromCheckout = () => {
    setShowCheckout(false)
  }

  const handleCheckoutSuccess = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess()
    }
    setShowCheckout(false)
  }

  const handleCheckoutInitiated = () => {
    // Placeholder for the actual implementation
  }

  if (showCheckout) {
    return (
      <div className={styles.checkoutWrapper}>
        <button className={styles.backButton} onClick={handleBackFromCheckout}>
          ← Back to Upgrade
        </button>
        <CheckoutPage
          selectedPlan={{
            ...selectedPlan,
            id: selectedPlan.id || "",
          }}
          onBack={handleBackFromCheckout}
          onPaymentSuccess={handleCheckoutSuccess}
          onPaymentInitiated={handleCheckoutInitiated}
        />
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
        {/* Tier Selector */}
        <div style={{ marginBottom: "24px" }}>
        {(
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", gap: "12px" }}>
            <button
              onClick={() => setSelectedTier("Gold")}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                border: selectedTier === "Gold" ? "2px solid #EAB308" : "1px solid #e5e7eb",
                backgroundColor: selectedTier === "Gold" ? "#FEFCE8" : "white",
                color: selectedTier === "Gold" ? "#854D0E" : "#374151",
                fontWeight: selectedTier === "Gold" ? "700" : "500",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>🥇</span> Gold
            </button>
            <button
              onClick={() => setSelectedTier("Platinum")}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                border: selectedTier === "Platinum" ? "2px solid #60A5FA" : "1px solid #e5e7eb",
                backgroundColor: selectedTier === "Platinum" ? "#EFF6FF" : "white",
                color: selectedTier === "Platinum" ? "#1E40AF" : "#374151",
                fontWeight: selectedTier === "Platinum" ? "700" : "500",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>💎</span> Platinum
            </button>
          </div>
        )}
        </div>

        <div className={styles.priceTag}>
          <span className={styles.currency}>₦</span>
          <span className={styles.price}>{selectedPlan.price.toLocaleString()}</span>
          <span className={styles.period} style={{ fontSize: "14px", color: "#6B7280" }}>
            {selectedPlan.interval === "one-time" ? "/one-time" : `/${selectedPlan.interval}`}
          </span>
        </div>
        <p className={styles.pricingNote} style={{ marginTop: "8px" }}>
          {selectedTier === "Gold" 
            ? "Includes priority access & rewards" 
            : "Includes all features & lifetime access"}
        </p>
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
