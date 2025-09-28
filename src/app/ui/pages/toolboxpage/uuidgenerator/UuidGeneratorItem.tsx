import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UuidGeneratorItem: React.FC = () => {
  const [uuid, setUUID] = useState<string | null>(null);

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
  if (!uuid) return; 

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
      <div style={styles.container}>
        <h2 style={{ color: "#071D6A", fontWeight: "900" }}>
          Simple UUID Generator
        </h2>

        <div style={styles.uuidDisplay}>
          {uuid ? (
            <code style={{ wordBreak: "break-all", color: "#071D6A" }}>
              {uuid}
            </code>
          ) : (
            <span style={{ color: "#999" }}>Generate a unique ID here...</span>
          )}
        </div>
        <div style={styles.buttonGroup}>
          <button
            onClick={handleGenerate}
            style={{
              ...styles.actionButton,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaArrowsRotate /> Generate New
          </button>
          <button
            onClick={handleCopy}
            disabled={!uuid}
            style={{
              ...styles.actionButton,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IoCopy /> Copy UUID
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

export default UuidGeneratorItem;
