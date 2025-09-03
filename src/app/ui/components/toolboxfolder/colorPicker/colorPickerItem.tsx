import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Palette } from "lucide-react";

const ColorPickerItem: React.FC = () => {
  const [color, setColor] = useState<string>("#071D6A");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Populate RGB/HSL for the initial color on mount
    convertToRgbAndHsl(color);
  }, []); // run once

  const convertToRgbAndHsl = (hex: string) => {
    if (!hex || hex[0] !== "#" || hex.length !== 7) return;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    setRgb(`rgb(${r}, ${g}, ${b})`);
    setHsl(rgbToHslString(r, g, b));
  };

  const rgbToHslString = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%)`;
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setTouched(true);
    convertToRgbAndHsl(newColor);
  };

  const handleWrapperKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
      setTouched(true);
    }
  };

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Copy failed — try again (HTTPS required).");
    }
  };

  return (
    <>
      {/* Ensure you render <Toaster /> once in your app (root). */}
      <Toaster position="top-right" />
      <div style={styles.container}>
        <h2 style={{ color: "#071D6A", fontWeight: 900 }}>Simple Color Picker</h2>

        <div
          role="button"
          tabIndex={0}
          aria-label="Open color picker"
          onKeyDown={handleWrapperKeyDown}
          style={{ ...styles.colorPickerWrapper, backgroundColor: color }}
        >
          <Palette size={18} style={{ marginRight: 10 }} />
          {!touched && <span style={styles.placeholder}>Click to pick a color</span>

          /* hidden native input overlays the wrapper so clicks open the picker */
          }
          <input
            ref={inputRef}
            id="color-input"
            aria-label="Color input"
            type="color"
            value={color}
            onChange={handleColorChange}
            style={styles.inputColor}
          />
        </div>

        <div style={styles.outputGroup}>
          <OutputRow label="HEX" value={color} onCopy={handleCopy} />
          <OutputRow label="RGB" value={rgb} onCopy={handleCopy} />
          <OutputRow label="HSL" value={hsl} onCopy={handleCopy} />
        </div>

        <div style={{ ...styles.preview, backgroundColor: color }}>
          <p style={{ color: "#fff", fontWeight: 700 }}>Color Preview</p>
        </div>
      </div>
    </>
  );
};

const OutputRow: React.FC<{
  label: string;
  value: string;
  onCopy: (text: string) => void;
}> = ({ label, value, onCopy }) => (
  <div style={{ ...styles.outputRow, color: "#000" }}>
    <span style={{ fontWeight: "bold" }}>{label}:</span>
    <button
      onClick={() => onCopy(value)}
      style={styles.copyButton}
      disabled={!value}
      aria-disabled={!value}
    >
       {value || "—"}
    </button>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f5f7ff",
    borderRadius: 10,
    textAlign: "center",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  colorPickerWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    marginBottom: "1.25rem",
    cursor: "pointer",
    minHeight: 48,
    color: "#fff",
  },
  placeholder: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    flex: 1,
  },
  inputColor: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  outputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    marginBottom: "1.25rem",
  },
  outputRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #e6e6e6",
    padding: "0.75rem 1rem",
    borderRadius: 6,
  },
  copyButton: {
    backgroundColor: "#071D6A",
    color: "#fff",
    border: "none",
    padding: "0.45rem 0.9rem",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  preview: {
    height: 100,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
};

export default ColorPickerItem;
