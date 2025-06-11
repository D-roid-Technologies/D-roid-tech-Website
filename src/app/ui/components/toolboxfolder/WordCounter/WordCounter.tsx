import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WordCounter: React.FC = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;
    const spaceCount = (text.match(/\s/g) || []).length;

    const handleCopy = (label: string, value: string | number) => {
        navigator.clipboard.writeText(String(value))
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
                                cursor: "pointer"
                            }}
                        >
                            ← Back to ToolBox
                        </button>
                    </div>
                    <h1 className="software-header">Word Counter</h1>
                    <p>
                        A real-time word, character, and space counting tool. Perfect for writers, students, and developers needing quick insights into their text.
                    </p>
                </div>
            </div>

            <div style={styles.container}>
                <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Simple Word Counter</h2>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    style={styles.textarea}
                />

                <div style={styles.outputGroup}>
                    <OutputRow label="Words" value={wordCount} onCopy={handleCopy} />
                    <OutputRow label="Characters" value={charCount} onCopy={handleCopy} />
                    <OutputRow label="Spaces" value={spaceCount} onCopy={handleCopy} />
                </div>
            </div>
        </>
    );
};

const OutputRow: React.FC<{ label: string, value: string | number, onCopy: (label: string, value: string | number) => void }> = ({ label, value, onCopy }) => (
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
    textarea: {
        width: "100%",
        height: "150px",
        padding: "1rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "1.5rem",
        resize: "vertical"
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

export default WordCounter;