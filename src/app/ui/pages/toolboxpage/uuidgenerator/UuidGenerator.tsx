import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UUIDGenerator: React.FC = () => {
  const [uuid, setUUID] = useState(generateUUID());
  const navigate = useNavigate();

  function generateUUID() {
    return crypto.randomUUID();
  }

  const handleGenerate = () => {
    const newUUID = generateUUID();
    setUUID(newUUID);
    toast.success("New UUID generated!", {
      style: { background: "#4BB543", color: "#fff" },
    });
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(uuid)
      .then(() => {
        toast.success("UUID copied to clipboard!", {
          style: { background: "#4BB543", color: "#fff" },
        });
      })
      .catch(() => {
        toast.error("Failed to copy UUID", {
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
          <h1 className="software-header">UUID Generator</h1>
          <p>
            Instantly generate and copy universally unique identifiers (UUIDs).
            Ideal for developers and data handling tasks.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={{ color: "#071D6A", fontWeight: "900" }}>
          Simple UUID Generator
        </h2>

        <div style={styles.uuidDisplay}>
          <code style={{ wordBreak: "break-all" }}>{uuid}</code>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleGenerate} style={styles.actionButton}>
            🔄 Generate New
          </button>
          <button onClick={handleCopy} style={styles.actionButton}>
            📋 Copy UUID
            {/* <MdOutlineContentCopy /> Copy UUID */}
          </button>
        </div>
      </div>
    </>
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
  uuidDisplay: {
    backgroundColor: "#fff",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  actionButton: {
    backgroundColor: "#071D6A",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.25rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default UUIDGenerator;
