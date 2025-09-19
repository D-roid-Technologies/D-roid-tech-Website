import React from "react";
import { Questions } from "../../../../utils/questions";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";

const TakeTestFolder = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#fff" }}
        >
          Test Your Knowledge
        </span>
        <div className="soft-dev-content">
          {Array.isArray(Questions) &&
            Questions.map((prog, index) => (
              <div
                key={index}
                onClick={() => navigate("/training/quize", { state: prog })}
                style={{ cursor: "pointer" }}
              >
                <CoreValueCardTwo
                  title={`Take ${prog.title} Test`}
                  description={prog.summary}
                  url={prog.url}
                  className="process-card"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TakeTestFolder;
