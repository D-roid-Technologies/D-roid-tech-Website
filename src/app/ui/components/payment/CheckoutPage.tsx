"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, CreditCard, Building2, User, Shield } from "lucide-react"
import type { Plan } from "./types"
import { formatCurrency, initializePaystackPayment, generateReference } from "./utils/paystack"
import styles from "./CheckoutPage.module.css"

interface CheckoutPageProps {
  selectedPlan?: Plan
  onBack?: () => void
  onPaymentSuccess?: () => void
  onPaymentInitiated?: () => void
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlan,
  onBack,
  onPaymentSuccess,
  onPaymentInitiated,
}) => {
  const plan = selectedPlan || {
  
    name: "Premium Tools Access",
    price: 2999,
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

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_transfer">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone

  const handlePayment = async () => {
    if (!isFormValid) return

    setIsProcessing(true)

    if (onPaymentInitiated) {
      onPaymentInitiated()
    }

    const reference = generateReference()

    if (paymentMethod === "card") {
      initializePaystackPayment(
        customerInfo.email,
        plan.price,
        reference,
        (response) => {
          setIsProcessing(false)
          if (onPaymentSuccess) {
            onPaymentSuccess()
          } else {
            alert("Payment successful! You now have access to premium tools.")
          }
        },
        () => {
          setIsProcessing(false)
        },
      )
    } else {
      // Bank transfer simulation
      setTimeout(() => {
        setIsProcessing(false)
        if (onPaymentSuccess) {
          onPaymentSuccess()
        } else {
          alert("Bank transfer instructions sent to your email!")
        }
      }, 2000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {onBack && (
          <button onClick={onBack} className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Plans
          </button>
        )}

        <div className={styles.gridContainer}>
          {/* Order Summary */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>

            <div className={styles.orderSummary}>
              <div className={styles.orderItem}>
                <div className={styles.orderItemName}>{plan.name}</div>
                <div className={styles.orderItemPrice}>{formatCurrency(plan.price)}</div>
              </div>
              <div className={styles.billingInterval}>Billed {plan.interval}ly</div>
            </div>

            <div className={styles.divider}>
              <div className={styles.total}>
                <span>Total</span>
                <span>{formatCurrency(plan.price)}</span>
              </div>
            </div>

            <div className={styles.guarantees}>
              <p>30-day money-back guarantee</p>
              <p>Instant account activation</p>
              <p>24/7 customer support</p>
              <p>Secure payment processing</p>
            </div>
          </div>

          {/* Checkout Form */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Complete Your Order</h2>

            {/* Customer Information */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <User size={20} />
                Customer Information
              </h3>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Shield size={20} />
                Payment Method
              </h3>

              <div className={styles.paymentMethods}>
                <label className={`${styles.paymentMethod} ${paymentMethod === "card" ? styles.selected : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value as "card")}
                  />
                  <CreditCard size={24} />
                  <div className={styles.paymentMethodInfo}>
                    <div className={styles.paymentMethodName}>Card / USSD</div>
                    <div className={styles.paymentMethodDescription}>Pay with your debit/credit card or USSD</div>
                  </div>
                </label>

                <label
                  className={`${styles.paymentMethod} ${paymentMethod === "bank_transfer" ? styles.selected : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value as "bank_transfer")}
                  />
                  <Building2 size={24} />
                  <div className={styles.paymentMethodInfo}>
                    <div className={styles.paymentMethodName}>Bank Transfer</div>
                    <div className={styles.paymentMethodDescription}>Direct bank transfer with account details</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={!isFormValid || isProcessing}
              className={`${styles.submitButton} ${isFormValid && !isProcessing ? styles.enabled : styles.disabled}`}
            >
              {isProcessing ? (
                <div className={styles.processingSpinner}>
                  <div className={styles.spinner} />
                  Processing Payment...
                </div>
              ) : (
                `Complete Payment - ${formatCurrency(plan.price)}`
              )}
            </button>

            <p className={styles.disclaimer}>
              🔒 Secured by Paystack. Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
