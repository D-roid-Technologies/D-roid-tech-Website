import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Base64Tool: React.FC = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const navigate = useNavigate();

  const handleEncode = () => {
    try {
      const encodedText = btoa(text);
      setEncoded(encodedText);
      toast.success("Text encoded successfully!", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch {
      toast.error("Encoding failed!", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  };

  const handleDecode = () => {
    try {
      const decodedText = atob(text);
      setDecoded(decodedText);
      toast.success("Text decoded successfully!", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch {
      toast.error("Decoding failed!", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  };

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard
      .writeText(value)
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
              ← Back
            </button>
          </div>
          <h1 className="software-header">Base64 Encoder / Decoder</h1>
          <p>
            Encode and decode text using Base64. Useful for developers, data
            transport, and quick encoding tasks.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Base64 Tool</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encode or decode..."
          style={styles.textarea}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button onClick={handleEncode} style={styles.actionButton}>
            Encode
          </button>
          <button onClick={handleDecode} style={styles.actionButton}>
            Decode
          </button>
        </div>

        {encoded && (
          <OutputRow label="Encoded" value={encoded} onCopy={handleCopy} />
        )}

        {decoded && (
          <OutputRow label="Decoded" value={decoded} onCopy={handleCopy} />
        )}
      </div>
    </>
  );
};

const OutputRow: React.FC<{
  label: string;
  value: string;
  onCopy: (label: string, value: string) => void;
}> = ({ label, value, onCopy }) => (
  <div style={{ ...styles.outputRow, color: "#000000" }}>
    <span style={{ fontWeight: "bold" }}>{label}:</span>
    <button onClick={() => onCopy(label, value)} style={styles.copyButton}>
      📋 Copy
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
  textarea: {
    width: "100%",
    height: "150px",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1.5rem",
    resize: "vertical",
  },
  actionButton: {
    backgroundColor: "#071D6A",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  outputRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "0.75rem 1rem",
    borderRadius: "5px",
    marginBottom: "1rem",
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

export default Base64Tool;
