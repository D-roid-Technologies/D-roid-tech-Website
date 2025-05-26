import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ImageCompress from "../../../components/toolboxfolder/imagecompress/ImageCompress";
import JsonFormatter from "../../../components/toolboxfolder/jsonformat/JsonFormater";
import { useNavigate } from "react-router-dom";

const JsonFormating = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <NavBar /> */}
      {/* Hero */}
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
              ← Back
            </button>
          </div>
          <h1 className="software-header">JSON Formatter</h1>
          <p>
            Easily format and beautify your JSON data for improved readability
            and debugging. Ideal for developers who want cleaner code, quicker
            troubleshooting, and error-free data structures without the hassle
            of manual formatting.
          </p>
        </div>
      </div>
      {/* Items */}

      {/* Image compressor */}
      <JsonFormatter />
    </div>
  );
};

export default JsonFormating;
