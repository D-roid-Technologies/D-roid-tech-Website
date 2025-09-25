"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, CreditCard, Building2, User, Shield, Lock, Calendar, CarIcon as CardIcon } from "lucide-react"
import type { Plan } from "./types"
import { formatCurrency, initializePaystackPayment, generateReference } from "./utils/paystack"
import styles from "./CheckoutPage.module.css"

interface CheckoutPageProps {
  selectedPlan?: Plan
  onBack?: () => void
  onPaymentSuccess?: () => void
  onPaymentInitiated?: () => void
}

interface CardDetails {
  number: string
  expiry: string
  cvv: string
  name: string
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

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_transfer">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "number") {
      // Format card number with spaces
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    } else if (name === "expiry") {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    } else if (name === "cvv") {
      // Limit CVV to 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setCardDetails({
      ...cardDetails,
      [name]: formattedValue,
    })
  }

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone
  const isCardValid =
    paymentMethod === "card"
      ? cardDetails.number.replace(/\s/g, "").length >= 13 &&
        cardDetails.expiry.length === 5 &&
        cardDetails.cvv.length >= 3 &&
        cardDetails.name.length > 0
      : true

  const handlePayment = async () => {
    if (!isFormValid || !isCardValid) return

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

            {paymentMethod === "card" && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  <CardIcon size={20} />
                  Card Details
                </h3>

                <div className={styles.cardForm}>
                  <div className={styles.cardInputGroup}>
                    <label className={styles.inputLabel}>
                      <Lock size={16} />
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={handleCardInputChange}
                      className={`${styles.input} ${styles.cardInput}`}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className={styles.cardRow}>
                    <div className={styles.cardInputGroup}>
                      <label className={styles.inputLabel}>
                        <Calendar size={16} />
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        className={`${styles.input} ${styles.cardInput}`}
                        maxLength={5}
                        required
                      />
                    </div>

                    <div className={styles.cardInputGroup}>
                      <label className={styles.inputLabel}>
                        <Shield size={16} />
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        className={`${styles.input} ${styles.cardInput}`}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.cardInputGroup}>
                    <label className={styles.inputLabel}>
                      <User size={16} />
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                      className={`${styles.input} ${styles.cardInput}`}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank_transfer" && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  <Building2 size={20} />
                  Bank Transfer Details
                </h3>

                <div className={styles.bankTransferDetails}>
                  <div className={styles.bankInfo}>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankLabel}>Bank Name:</span>
                      <span className={styles.bankValue}>First Bank of Nigeria</span>
                    </div>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankLabel}>Account Name:</span>
                      <span className={styles.bankValue}>Premium Tools Ltd</span>
                    </div>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankLabel}>Account Number:</span>
                      <span className={styles.bankValue}>2034567890</span>
                    </div>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankLabel}>Amount:</span>
                      <span className={styles.bankValue}>{formatCurrency(plan.price)}</span>
                    </div>
                  </div>

                  <div className={styles.transferInstructions}>
                    <h4>Transfer Instructions:</h4>
                    <ol>
                      <li>Transfer the exact amount to the account above</li>
                      <li>Use your email address as the transfer reference</li>
                      <li>Send proof of payment to payments@premiumtools.com</li>
                      <li>Your account will be activated within 24 hours</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={!isFormValid || !isCardValid || isProcessing}
              className={`${styles.submitButton} ${isFormValid && isCardValid && !isProcessing ? styles.enabled : styles.disabled}`}
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
