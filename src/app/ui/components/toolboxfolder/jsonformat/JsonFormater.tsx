import React, { useState } from "react";
import toast from "react-hot-toast";
// import "../JsonFormatter/JsonFormatter.css";

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatJson = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e) {
      setOutput("Invalid JSON");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#071D6A", fontWeight: "900" }}>
        Simple JSON Formatter
      </h2>
      <p style={{ color: "#000000", marginTop: 20, marginBottom: 20 }}>
        Paste raw JSON in the input box below.
      </p>

      <textarea
        placeholder="Enter raw JSON here"
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);
          formatJson(val);
        }}
        style={styles.input}
        rows={10}
      />

      <div style={styles.output}>
        <button
          onClick={() => {
            if (output) {
              navigator.clipboard
                .writeText(output)
                .then(() => {
                  toast.success("Formatted JSON copied to clipboard. 📋", {
                    style: {
                      background: "#4BB543",
                      color: "#fff",
                    },
                  });
                })
                .catch(() => {
                  toast.error("Copy failed. 🚫", {
                    style: {
                      background: "#ff4d4f",
                      color: "#fff",
                    },
                  });
                });
            }
          }}
          style={styles.copyButton}
          disabled={!output || output === "Invalid JSON"}
          title="Click to copy"
        >
          {output
            ? `📋 Copy Formatted JSON`
            : "Formatted output will appear here"}
        </button>
      </div>

      <pre style={styles.preview}>{output}</pre>
    </div>
  );
};

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
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    fontFamily: "monospace",
  },
  output: {
    marginBottom: "1.5rem",
    fontSize: "1.1rem",
  },
  copyButton: {
    backgroundColor: "#000000",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  preview: {
    textAlign: "left",
    backgroundColor: "#2d2d2d",
    color: "#00ff88",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
    maxHeight: "400px",
  },
};

export default JsonFormatter;
