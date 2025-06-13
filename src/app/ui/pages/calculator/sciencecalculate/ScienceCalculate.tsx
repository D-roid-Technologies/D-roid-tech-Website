import React from "react";

import ScientificCalculator from "../../../components/scientificcalculator/ScientificCalculator";
import { useNavigate } from "react-router-dom";

const ScienceCalculate = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <div style={{ margin: "1rem 0" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 16px",
                backgroundColor: "blue",
                border: "1px solid #000000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ← Back to Calculators
            </button>
          </div>
          <h1 className="software-header">Scientific Calculator</h1>
          <p>
            Unlock the power of precision with our advanced Scientific
            Calculator. Designed for students, engineers, and everyday
            problem-solvers, it handles complex equations, trigonometric
            functions, logarithms, and more. All in one sleek interface.
          </p>
        </div>
      </div>
      {/* Items */}

      {/* scientific calculator */}
      {/* <ScientificCalculator /> */}
      <ScientificCalculator />
    </div>
  );
};

export default ScienceCalculate;
