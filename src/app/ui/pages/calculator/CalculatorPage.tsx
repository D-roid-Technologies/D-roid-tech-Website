import React from "react";
import NavBar from "../../components/navbar/NavBar";

const CalculatorPage: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">D'roid Calculate</h1>
          <p>
            D'roid Calculate is your sleek, all-in-one calculator built to simplify math, budgeting, and everyday problem-solving.
          </p>
        </div>
      </div>
      {/* Items */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Calculator
        </span>
      </div>
    </div>
  );
};

export default CalculatorPage;
