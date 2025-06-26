import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UuidGeneratorItem from "./UuidGeneratorItem";

const UUIDGenerator: React.FC = () => {
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
          <h1 className="software-header">UUID Generator</h1>
          <p>
            Instantly generate and copy universally unique identifiers (UUIDs).
            Ideal for developers and data handling tasks.
          </p>
        </div>
      </div>
      <UuidGeneratorItem />
    </>
  );
};

export default UUIDGenerator;
