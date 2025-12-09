import React from "react";
import { useNavigate } from "react-router-dom";
import AiBuilderDescription from "./AiBuilderDescription";

const AiBuilder: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
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
              ← Back to ToolBox
            </button>
          </div>

          <h1 className="software-header">AI Builder</h1>
          <p>
            AI Builder helps you build smarter and faster using intelligent
            automation. Perfect for creators and developers who want efficient,
            AI-powered solutions in one place.
          </p>
        </div>
      </div>
      <AiBuilderDescription />
    </div>
  );
};

export default AiBuilder;
