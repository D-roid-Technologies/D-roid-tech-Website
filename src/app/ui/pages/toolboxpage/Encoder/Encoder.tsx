import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EncoderItem from "./EncoderItem";

const Base64Tool: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
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
          <h1 className="software-header">Base64 Encoder / Decoder</h1>
          <p>
            Encode and decode text using Base64. Useful for developers, data
            transport, and quick encoding tasks.
          </p>
        </div>
      </div>
      <EncoderItem />
    </>
  );
};

export default Base64Tool;
