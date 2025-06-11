import React from "react";
import { useNavigate } from "react-router-dom";
import PricingCalculator from "./PricingCalclator";

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <div style={{ margin: "1rem 0" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#071D6A",
                  color: "#fff",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </div>
            <h1 className="software-header">Pricing Calculator</h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "1.5rem",
              }}
            >
              Use our calculator below to estimate your total cost based on
              selected services, quantity, and additional factors like discounts
              or taxes.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <PricingCalculator />
      </div>
    </div>
  );
};

export default PricingPage;
