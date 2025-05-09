
import React from "react";
import Navbar from "../../components/navbar/NavBar";
import "../../components/liteGrid@v1.0/lite-grid.css";

const SchedulePage: React.FunctionComponent = () => {
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <h1 className="software-header">Driod Schedules</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi a
              id dolores, odit nesciunt recusandae nisi veritatis dolore. Modi
              provident earum deserunt nostrum quibusdam, accusamus saepe. Illo
              nostrum ea placeat!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
