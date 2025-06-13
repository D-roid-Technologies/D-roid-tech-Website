import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const navigate = useNavigate();

  const calculateBMI = (): number => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h || h <= 0) return 0;
    return parseFloat((w / (h * h)).toFixed(2));
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi === 0) return "N/A";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const bmi = calculateBMI();
  const category = getBMICategory(bmi);

  const handleCopy = (label: string, value: string | number) => {
    navigator.clipboard
      .writeText(String(value))
      .then(() => {
        toast.success(`${label} copied to clipboard!`, {
          style: { background: "#4BB543", color: "#fff" },
        });
      })
      .catch(() => {
        toast.error(`Failed to copy ${label}`, {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  };

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
              ← Back to Calculators
            </button>
          </div>
          <h1 className="software-header">BMI Calculator</h1>
          <p>
            A real-time Body Mass Index (BMI) calculator. Ideal for tracking
            your health metrics quickly and effectively.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={{ color: "#071D6A", fontWeight: "900" }}>
          Calculate Your BMI
        </h2>

        <input
          type="number"
          placeholder="Enter weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Enter height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={styles.input}
        />

        <div style={styles.outputGroup}>
          <OutputRow label="BMI" value={bmi || "N/A"} onCopy={handleCopy} />
          <OutputRow label="Category" value={category} onCopy={handleCopy} />
        </div>
      </div>
    </>
  );
};

const OutputRow: React.FC<{
  label: string;
  value: string | number;
  onCopy: (label: string, value: string | number) => void;
}> = ({ label, value, onCopy }) => (
  <div style={{ ...styles.outputRow, color: "#000000" }}>
    <span style={{ fontWeight: "bold" }}>{label}:</span>
    <button
      onClick={() => onCopy(label, value)}
      style={styles.copyButton}
      disabled={!value && value !== 0}
    >
      📋 {value}
    </button>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "sans-serif",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
  },
  outputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  outputRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "0.75rem 1rem",
    borderRadius: "5px",
  },
  copyButton: {
    backgroundColor: "#071D6A",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default BMICalculator;
