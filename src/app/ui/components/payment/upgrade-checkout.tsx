import React from "react";
import { CheckoutPage } from "./CheckoutPage";

export const UpgradeCheckout: React.FC<{ tier: "Gold" | "Platinum" }> = ({ tier }) => {
  const plan = tier === "Gold"
    ? {id:"1",
        name: "Gold Membership",
        price: 5000,
        interval: "one-time",
        features: [
          "Earn up to 56% completion milestone",
          "Priority access to premium content",
          "Exclusive membership rewards",
          "Recognition badge on your profile",
        ],
      }
    : {id:"2",
        name: "Platinum Membership",
        price: 15000,
        interval: "one-time",
        features: [
          "100% completion milestone",
          "Access all lifetime features",
          "Early access to new updates",
          "Platinum-only events",
        ],
      };

  return <CheckoutPage selectedPlan={plan} />;
};
