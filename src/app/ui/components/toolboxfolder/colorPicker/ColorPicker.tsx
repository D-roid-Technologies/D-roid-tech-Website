import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ColorPickerItem from "./colorPickerItem";
import ColorPickerFeatures from "./ColorPickerFeatures";

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
            <ColorPickerItem/>
            <ColorPickerFeatures/>
        </>
    );
};





export default ColorPicker;
