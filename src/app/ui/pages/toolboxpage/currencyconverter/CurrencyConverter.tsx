import React from "react";
import { useNavigate } from "react-router-dom";
import ColorConv from "../../../components/toolboxfolder/Colorconv/ColorConv";

const CurrencyConverter: React.FC = () => {
  const navigate = useNavigate();
  return (
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
              ← Back to Toolbox
            </button>
          </div>
          <h1 className="software-header">Currency Converter</h1>
          <p>
            A fast, user-friendly tool that allows you to convert between major
            global currencies in real time. Whether you're a traveler planning
            expenses or a business tracking international rates, Currency
            Converter streamlines your process with accurate, up-to-date
            exchange data and a seamless interface.
          </p>
        </div>
      </div>
      {/* currency converter */}
      {/* <ColorConv /> */}
    </div>
  );
};

export default CurrencyConverter;
