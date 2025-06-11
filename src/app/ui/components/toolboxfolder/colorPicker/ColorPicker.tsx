import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ColorPicker: React.FC = () => {
    const [color, setColor] = useState("#0099e5");
    const [rgb, setRgb] = useState("");
    const [hsl, setHsl] = useState("");
    const navigate = useNavigate();

    const convertToRgbAndHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const rgbString = `rgb(${r}, ${g}, ${b})`;
        const hslString = rgbToHslString(r, g, b);

        setRgb(rgbString);
        setHsl(hslString);
    };

    const rgbToHslString = (r: number, g: number, b: number): string => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h *= 60;
        }

        return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setColor(newColor);
        convertToRgbAndHsl(newColor);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Copied to clipboard!", {
                style: { background: "#4BB543", color: "#fff" },
            });
        }).catch(() => {
            toast.error("Failed to copy", {
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
                    <h1 className="software-header">Color Picker</h1>
                    <p>
                        A sleek, user-friendly tool that lets you select any color and instantly view its HEX, RGB, and HSL values. With one-click copy functionality and a real-time color preview, it’s perfect for designers, developers, and anyone working with color.
                    </p>
                </div>
            </div>
            <div style={styles.container}>

                <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Simple Color Picker</h2>

                <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    style={{ ...styles.inputColor, backgroundColor: color }}
                />

                <div style={styles.outputGroup}>
                    <OutputRow label="HEX" value={color} onCopy={handleCopy} />
                    <OutputRow label="RGB" value={rgb} onCopy={handleCopy} />
                    <OutputRow label="HSL" value={hsl} onCopy={handleCopy} />
                </div>

                <div style={{ ...styles.preview, backgroundColor: color }}>
                    <p style={{ color: "#fff" }}>Color Preview</p>
                </div>
            </div>
        </>
    );
};

const OutputRow: React.FC<{ label: string, value: string, onCopy: (text: string) => void }> = ({ label, value, onCopy }) => (
    <div style={{ ...styles.outputRow, color: "#000000" }}>
        <span style={{ fontWeight: "bold" }}>{label}:</span>
        <button
            onClick={() => onCopy(value)}
            style={styles.copyButton}
            disabled={!value}
        >
            📋 {value}
        </button>
    </div>
);

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "sans-serif",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    inputColor: {
        width: "100%",
        height: "60px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "1.5rem",
    },
    outputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.5rem",
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
    preview: {
        height: "100px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
    },
};

export default ColorPicker;
