import React, { useState } from "react";
import toast from "react-hot-toast";
import "../Colorconv/ColorConv.css";

type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "cmyk";

type Format = "hex" | "rgb" | "hsl";

const ColorConv: React.FC = () => {
  const [from, setFrom] = useState<Format>("hex");
  const [to, setTo] = useState<Format>("rgb");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("#ffffff");

  const convertColor = (value: string, from: Format, to: Format) => {
    try {
      let r = 0, g = 0, b = 0;

      // Convert to RGB first
      if (from === "hex") {
        const hex = value.replace("#", "");
        const valid = /^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
        if (!valid) throw new Error("Invalid HEX");

        const fullHex = hex.length === 3
          ? hex.split("").map((c) => c + c).join("")
          : hex;

        const intVal = parseInt(fullHex, 16);
        r = (intVal >> 16) & 255;
        g = (intVal >> 8) & 255;
        b = intVal & 255;
      } else if (from === "rgb") {
        const match = value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);
        if (!match) throw new Error("Invalid RGB");
        r = parseInt(match[1]);
        g = parseInt(match[2]);
        b = parseInt(match[3]);
      } else if (from === "hsl") {
        const match = value.match(/^hsl\((\d{1,3}),\s*(\d{1,3})%?,\s*(\d{1,3})%?\)$/i);
        if (!match) throw new Error("Invalid HSL");
        const h = parseInt(match[1]);
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let temp: [number, number, number];

        if (h < 60) temp = [c, x, 0];
        else if (h < 120) temp = [x, c, 0];
        else if (h < 180) temp = [0, c, x];
        else if (h < 240) temp = [0, x, c];
        else if (h < 300) temp = [x, 0, c];
        else temp = [c, 0, x];

        [r, g, b] = temp.map((v) => Math.round((v + m) * 255));
      }

      // Convert RGB to target format
      const result =
        to === "hex" ? rgbToHex(r, g, b) :
          to === "rgb" ? `rgb(${r}, ${g}, ${b})` :
            rgbToHslString(r, g, b);

      setOutput(result);
      setPreview(`rgb(${r}, ${g}, ${b})`);
    } catch (e: any) {
      setOutput("Invalid input");
      setPreview("#ffffff");
    }
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const rgbToHslString = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

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

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Simple Color Converter</h2>
      <p style={{ color: "#000000", marginTop: 20, }}>RGB Input Format: "RGB(0, 153, 229)"</p>
      <p style={{ color: "#000000", marginTop: 20, }}>HEX Input Format: "#0099e5"</p>
      <p style={{ color: "#000000", marginTop: 20, marginBottom: 20 }}>HSL Input Format: "hsl(200, 100%, 45%)"</p>

      <div style={styles.controls}>
        <label style={{ color: "#000000" }}>
          From: {" "}
          <select value={from} onChange={(e) => {
            setFrom(e.target.value as Format);
            setInput("");
            setOutput("");
          }}>
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>
        </label>

        <label style={{ color: "#000000" }}>
          To: {" "}
          <select value={to} onChange={(e) => {
            setTo(e.target.value as Format);
            setOutput("");
          }}>
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>
        </label>
      </div>

      <input
        type="text"
        placeholder={`Enter ${from.toUpperCase()} value`}
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          convertColor(value, from, to);
        }}
        style={styles.input}
      />

      <div style={styles.output}>
        <button
          onClick={() => {
            if (output) {
              navigator.clipboard.writeText(output).then(() => {
                toast.success('Color Copied to clipboard. 🎉', {
                  style: {
                    background: '#4BB543',
                    color: '#fff',
                  },
                });
              }).catch(() => {
                toast.error('Color not copied. 🚫', {
                  style: {
                    background: '#ff4d4f',
                    color: '#fff',
                  },
                });
              })
            }
          }}
          style={styles.copyButton}
          disabled={!output}
          title="Click to copy"
        >
          {output ? `📋 ${output}` : "Converted value will appear here"}
        </button>
      </div>


      <div style={{ ...styles.preview, backgroundColor: preview }}>
        <p style={{ color: "#fff" }}>Color Preview</p>
      </div>
    </div>
  );
};

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
  controls: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    gap: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
  },
  output: {
    marginBottom: "1.5rem",
    fontSize: "1.1rem",
  },
  preview: {
    height: "100px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
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
    // textOverflow: "ellipsis",
  },

  // copyButtonHover: {
  //   backgroundColor: "#0056b3",
  // },

};

export default ColorConv;
