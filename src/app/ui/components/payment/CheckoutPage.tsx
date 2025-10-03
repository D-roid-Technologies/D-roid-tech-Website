import type React from "react";
import { useState } from "react";
import { ArrowLeft, User, Shield } from "lucide-react";
import type { Plan } from "./types";
import { formatCurrency } from "./utils/paystack";
import styles from "./CheckoutPage.module.css";

interface CheckoutPageProps {
  selectedPlan?: Plan;
  onBack?: () => void;
  onPaymentSuccess?: () => void;
  onPaymentInitiated?: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
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
  };

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone;

  const generateReferenceNumber = (): string => {
    const prefix = "PT";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.email) {
      alert("Please enter a valid email!");
      return;
    }

    const generatedRef = generateReferenceNumber();
    setReferenceNumber(generatedRef);

    if (onPaymentInitiated) {
      onPaymentInitiated();
    }

    setIsProcessing(true);

    try {
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const payStack = new PaystackPop();

      payStack.newTransaction({
        key: "pk_live_d2b967eddda456841f504b85549767fc33cc9fd4",
        email: customerInfo.email,
        amount: plan.price * 100,
        reference: generatedRef,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: customerInfo.name,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: customerInfo.phone,
            },
            {
              display_name: "Plan",
              variable_name: "plan",
              value: plan.name,
            },
          ],
        },
        onSuccess: async (response: any) => {
          console.log("Payment success:", response);

          const emailjs = (await import("emailjs-com")).default;

          const templateParams = {
            name: customerInfo.name,
            title: `Thank You for Your Purchase!

            Your subscription to ${plan.name} has been successfully activated. We're excited to have you on board!

            Your Details:
            • Name: ${customerInfo.name}
            • Email: ${customerInfo.email}
            • Phone: ${customerInfo.phone}
            • Plan: ${plan.name}
            • Amount Paid: ${formatCurrency(plan.price)}
            • Reference: ${generatedRef}

            Your premium features are now available! Log in to access all the tools and features included in your plan.

            If you have any questions or need assistance, our support team is available 24/7.

            Thank you for choosing us!`,
            email: customerInfo.email,
          };

          try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            alert(`✅ Payment successful! Welcome ${customerInfo.name}. Check your email for confirmation.`);

            if (onPaymentSuccess) {
              onPaymentSuccess();
            }

            setCustomerInfo({
              name: "",
              email: "",
              phone: "",
            });
          } catch (error) {
            console.error("Error sending email:", error);
            alert("Payment successful, but we couldn't send the confirmation email. Please contact support.");
          }

          setIsProcessing(false);
        },
        onCancel: () => {
          console.log("Payment cancelled");
          alert("❌ Payment was cancelled.");
          setIsProcessing(false);
        },
        onError: (error: any) => {
          console.error("Payment error:", error);
          alert(`⚠️ Payment error: ${error.message || "Something went wrong"}`);
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

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

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Complete Your Order</h2>

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

           <div className={styles.formSection}>
  <h3 className={styles.sectionTitle}>
    <Shield size={20} />
    Payment Information
  </h3>

  <div className={styles.paymentInfo}>
    <p>Click the button below to proceed with secure payment via Paystack.</p>
    <p>You can pay with:</p>
    <ul>
      <li>Debit/Credit Card</li>
      <li>Bank Transfer</li>
      <li>USSD</li>
      <li>Mobile Money</li>
    </ul>
    <p className={styles.disclaimer}>
      🔒 We do not store your card or payment details. All transactions are handled securely by Paystack.
    </p>
  </div>
</div>


            <button
              onClick={handlePayment}
              disabled={!isFormValid || isProcessing}
              className={`${styles.submitButton} ${isFormValid && !isProcessing ? styles.enabled : styles.disabled}`}
            >
              {isProcessing ? (
                <div className={styles.processingSpinner}>
                  <div className={styles.spinner} />
                  Initializing Payment...
                </div>
              ) : (
                `Proceed to Payment - ${formatCurrency(plan.price)}`
              )}
            </button>

            <p className={styles.disclaimer}>
              🔒 Secured by Paystack. Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
