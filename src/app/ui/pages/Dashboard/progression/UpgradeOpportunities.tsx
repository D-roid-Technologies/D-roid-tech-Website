"use client";
import React, { useState } from "react";
import { CheckoutPage } from "../../../components/payment/CheckoutPage";
import { X } from "lucide-react";
import toast from "react-hot-toast";


interface UpgradePlan {
  id?: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  icon?: string;
  color?: string;
  metadata?: Record<string, any>;
}

interface UpgradeOpportunitiesProps {
  currentTier: string;
}

export const UpgradeOpportunities: React.FC<UpgradeOpportunitiesProps> = ({
  currentTier,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<UpgradePlan | null>(null);

  const tiers = [
    {
      name: "Gold",
      icon: "🥇",
      color: "#EAB308",
      bg: "#FEFCE8",
      borderColor: "#F59E0B",
      price: 5000,
      interval: "one-time",
      benefits: [
        "Earn up to 56% completion milestone",
        "Priority access to premium content",
        "Exclusive membership rewards",
        "Recognition badge on your profile",
      ],
      buttonText: "Upgrade to Gold",
    },
    {
      name: "Platinum",
      icon: "💎",
      color: "#60A5FA",
      bg: "#EFF6FF",
      borderColor: "#3B82F6",
      price: 15000,
      interval: "one-time",
      benefits: [
        "Enjoy 100% completion milestone",
        "Access all premium & lifetime features",
        "Early access to new updates",
        "Platinum-only events & networking",
      ],
      buttonText: "Upgrade to Platinum",
    },
  ];

  // Filter tiers higher than the user's current one
  const upgradeTiers = tiers.filter(
    (tier) =>
      tier.name !== currentTier &&
      (currentTier === "Silver" || tier.name === "Platinum")
  );

  const handleUpgradeClick = (tier: typeof tiers[0]) => {
    const planData: UpgradePlan = {
      name: tier.name,
      price: tier.price,
      interval: tier.interval,
      features: tier.benefits,
      icon: tier.icon,
      color: tier.color,
      metadata: {
        currentTier,
        upgradeFrom: currentTier,
        upgradeTo: tier.name,
      },
    };

    setSelectedPlan(planData);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div style={{ padding: "0" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "12px",
          textAlign: "center",
          color: "#1F2937",
          letterSpacing: "-0.02em",
        }}
      >
        Upgrade Your Membership
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#6B7280",
          marginBottom: "32px",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        Unlock exclusive benefits and rewards as you move up to Gold or Platinum tiers.
      </p>

      <div
        style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {upgradeTiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              backgroundColor: tier.bg,
              border: `2px solid ${tier.borderColor}`,
              borderRadius: "16px",
              padding: "28px",
              boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.12)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.08)`;
            }}
          >
            {/* Decorative gradient overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "120px",
                height: "120px",
                background: `radial-gradient(circle at top right, ${tier.color}20, transparent)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: tier.color,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontSize: "28px" }}>{tier.icon}</span>
                {tier.name} Tier
              </h3>

              <ul
                style={{
                  paddingLeft: "0",
                  marginBottom: "24px",
                  color: "#374151",
                  listStyle: "none",
                }}
              >
                {tier.benefits.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "14px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      lineHeight: "1.5",
                    }}
                  >
                    <span style={{ fontSize: "16px", flexShrink: 0 }}>✅</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <button
                style={{
                  backgroundColor: tier.color,
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px 20px",
                  width: "100%",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: `0 4px 12px ${tier.color}40`,
                }}
                onClick={() => handleUpgradeClick(tier)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 6px 16px ${tier.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${tier.color}40`;
                }}
              >
                {tier.buttonText} – ₦{tier.price.toLocaleString()}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal Checkout */}
      {isCheckoutOpen && selectedPlan && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "20px",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={handleCloseCheckout}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              animation: "slideUp 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseCheckout}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#F3F4F6",
                border: "none",
                cursor: "pointer",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F3F4F6";
              }}
            >
              <X size={20} color="#6B7280" />
            </button>

            <CheckoutPage
              selectedPlan={{
                id: "",
                name: selectedPlan.name,
                price: selectedPlan.price,
                interval: selectedPlan.interval,
                features: selectedPlan.features,
              }}
              onBack={handleCloseCheckout}
              onPaymentSuccess={() => {
                toast.success(`✅ Successfully upgraded to ${selectedPlan.name} tier!`);
                handleCloseCheckout();
              }}
              onPaymentInitiated={() => console.log("Payment started")}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
