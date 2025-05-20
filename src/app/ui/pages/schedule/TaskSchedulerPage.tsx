import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Taskscheduler from "../../pages/schedule/TaskScheduler";

const TaskSchedulerPage = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <h1 className="software-header">Task Scheduler</h1>
            <p>
              Unlock the power of precision with our advanced Scientific
              Calculator. Designed for students, engineers, and everyday
              problem-solvers, it handles complex equations, trigonometric
              functions, logarithms, and more. All in one sleek interface.
            </p>
          </div>
        </div>
      </div>
      {/* Items */}

      <Taskscheduler />
    </div>
  );
};

export default TaskSchedulerPage;
