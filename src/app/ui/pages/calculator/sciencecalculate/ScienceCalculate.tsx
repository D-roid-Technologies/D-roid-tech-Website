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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi a id
            dolores, odit nesciunt recusandae nisi veritatis dolore. Modi
            provident earum deserunt nostrum quibusdam, accusamus saepe. Illo
            nostrum ea placeat!
          </p>
        </div>
      </div>
      {/* Items */}

      {/* scientific calculator */}
      <ScientificCalculator />
    </div>
  );
};

export default ScienceCalculate;
