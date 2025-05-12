
import React from "react";
import Navbar from "../../components/navbar/NavBar";
import "../../components/liteGrid@v1.0/lite-grid.css";
import TaskScheduler from "./TaskScheduler";

const SchedulePage: React.FunctionComponent = () => {
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <h1 className="software-header">D'roid Schedules</h1>
            <p>
              D'roid Schedules is a smart scheduling tool that helps users organize, manage, and keep track of tasks, events, and activities with ease and efficiency.
            </p>
          </div>
        </div>
      </div>
      <section>
        <TaskScheduler />
      </section>

    </div>
  );
};

export default SchedulePage;
