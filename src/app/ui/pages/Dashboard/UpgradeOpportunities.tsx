export const UpgradeOpportunities: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const tiers = [
    {
      name: "Gold",
      icon: "🥇",
      color: "#EAB308",
      bg: "#FEFCE8",
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
      benefits: [
        "Enjoy 100% completion milestone",
        "Access to all premium & lifetime features",
        "Early access to new updates",
        "Platinum-only events & networking",
      ],
      buttonText: "Upgrade to Platinum",
    },
  ];

  // Filter only higher tiers than current
  const upgradeTiers = tiers.filter(
    (tier) => tier.name !== currentTier && (currentTier === "Silver" || tier.name === "Platinum")
  );

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
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 6px 16px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.05)";
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
              onClick={() => alert(`Upgrade request to ${tier.name} coming soon 🚀`)}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
