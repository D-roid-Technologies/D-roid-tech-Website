import React from "react";
import { useNavigate } from "react-router-dom";

const QrCodeScanner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
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

            <h1 className="software-header">Qr Code Scanner </h1>
            <p>
              QR Code Scanner allows you to quickly scan and decode QR codes in
              real time. Instantly access links, text, and embedded data with
              accuracy and speed, making it ideal for everyday use and
              professional workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
