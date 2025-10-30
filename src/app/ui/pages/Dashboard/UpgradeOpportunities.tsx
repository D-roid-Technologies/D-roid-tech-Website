"use client";
import React, { useState } from "react";
import { CheckoutPage } from "../../components/payment/CheckoutPage";
import { X } from "lucide-react";

interface UpgradeOpportunitiesProps {
  currentTier: string;
}

export const UpgradeOpportunities: React.FC<UpgradeOpportunitiesProps> = ({
  currentTier,
}) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const tiers = [
    {
      name: "Gold",
      icon: "🥇",
      color: "#EAB308",
      bg: "#FEFCE8",
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

  const handleUpgradeClick = (tier: string) => {
    setSelectedTier(tier);
    setShowCheckout(true); // ✅ open modal instead of navigate
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedTier(null);
  };

  const selectedPlan = tiers.find((t) => t.name === selectedTier);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "16px",
          textAlign: "center",
          color: "#374151",
        }}
      >
        🚀 Upgrade Your Membership
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#6B7280",
          marginBottom: "24px",
          fontSize: "14px",
        }}
      >
        Unlock exclusive benefits and rewards as you move up to Gold or Platinum tiers.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {upgradeTiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              backgroundColor: tier.bg,
              border: `1px solid ${tier.color}`,
              borderRadius: "12px",
              padding: "20px",
              boxShadow: `0 4px 10px rgba(0,0,0,0.05)`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: tier.color,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              {tier.icon} {tier.name} Tier
            </h3>

            <ul style={{ paddingLeft: "18px", marginBottom: "16px", color: "#374151" }}>
              {tier.benefits.map((b, i) => (
                <li key={i} style={{ fontSize: "13px", marginBottom: "4px" }}>
                  ✅ {b}
                </li>
              ))}
            </ul>

            <button
              style={{
                backgroundColor: tier.color,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                width: "100%",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleUpgradeClick(tier.name)}
            >
              {tier.buttonText} – ₦{tier.price.toLocaleString()}
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Modal Checkout */}
      {showCheckout && selectedPlan && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <button
              onClick={handleCloseCheckout}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={20} color="#6B7280" />
            </button>

            <CheckoutPage
              selectedPlan={{
                id:"",
                name: selectedPlan.name,
                price: selectedPlan.price,
                interval: selectedPlan.interval,
                features: selectedPlan.benefits,
              }}
              onBack={handleCloseCheckout}
              onPaymentSuccess={() => {
                alert(`✅ Successfully upgraded to ${selectedPlan.name} tier!`);
                handleCloseCheckout();
              }}
              onPaymentInitiated={() => console.log("Payment started")}
            />
          </div>
        </div>
      )}
    </div>
  );
};
