import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EncoderItem from "./EncoderItem";

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
<EncoderItem/>
    
    </>
  );
};


export default Base64Tool;
