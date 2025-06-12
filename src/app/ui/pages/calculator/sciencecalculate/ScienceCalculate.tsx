import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ScientificCalculator from "../../../components/scientificcalculator/ScientificCalculator";

const ScienceCalculate = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
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
