import React from "react";
import NavBar from "../../components/navbar/NavBar";

const CalculatorPage = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">Driod Calculate</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi a id
            dolores, odit nesciunt recusandae nisi veritatis dolore. Modi
            provident earum deserunt nostrum quibusdam, accusamus saepe. Illo
            nostrum ea placeat!
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
        {/* <div className="soft-dev-content">
          {tools.map((tech, index) => (
            <CoreValueCardTwo
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              className="process-card"
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CalculatorPage;
