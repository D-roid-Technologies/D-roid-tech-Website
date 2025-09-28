import React, { useState, useEffect } from "react";
// import { Copy, Palette, RefreshCw, CheckCircle } from "lucide-react";
import "../Colorconv/ColorConv.css";
import { BsPalette2 } from "react-icons/bs";
import { FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { ToolProps } from "../../../../utils/Types";
import ColorConverterFeatures from "./ColorConverterFeatures";

type Format = "hex" | "rgb" | "hsl";

const ColorConv: React.FC = ({ onClose }: ToolProps) => {
  const [from, setFrom] = useState<Format>("hex");
  const [to, setTo] = useState<Format>("rgb");
  const [input, setInput] = useState("#071D6A");
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("#071D6A");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Auto-convert on mount and input changes
useEffect(() => {
  if (!input) {
    setPreview("#ffffff"); // empty input → default preview
    setOutput("");
    setError("");
    return;
  }

  try {
    setError("");
    let r = 0, g = 0, b = 0;

    // HEX
    if (from === "hex") {
      const hex = input.replace("#", "");
      if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) throw new Error("Invalid HEX");

      const fullHex = hex.length === 3 ? hex.split("").map(c => c + c).join("") : hex;
      const intVal = parseInt(fullHex, 16);
      r = (intVal >> 16) & 255;
      g = (intVal >> 8) & 255;
      b = intVal & 255;
    }

    // RGB
    else if (from === "rgb") {
      const match = input.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);
      if (!match) throw new Error("Invalid RGB");
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    }

    // HSL
    else if (from === "hsl") {
      const match = input.match(/^hsl\((\d{1,3}),\s*(\d{1,3})%?,\s*(\d{1,3})%?\)$/i);
      if (!match) throw new Error("Invalid HSL");

      const h = parseInt(match[1]), s = parseInt(match[2]) / 100, l = parseInt(match[3]) / 100;
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

      [r, g, b] = temp.map(v => Math.round((v + m) * 255));
    }

    // always update preview
    setPreview(`rgb(${r}, ${g}, ${b})`);

    // convert to target format
    const result =
      to === "hex" ? rgbToHex(r, g, b) :
      to === "rgb" ? `rgb(${r}, ${g}, ${b})` :
      rgbToHslString(r, g, b);

    setOutput(result);
  } catch (err: any) {
    setError(err.message);
    setOutput("");
    setPreview("#071D6A"); // fallback for invalid input
  }
}, [input, from, to]);


  const convertColor = (value: string, from: Format, to: Format) => {
    try {
      setError("");
      let r = 0,
        g = 0,
        b = 0;

      // Convert to RGB first
      if (from === "hex") {
        const hex = value.replace("#", "");
        const valid = /^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
        if (!valid) throw new Error("Invalid HEX format");

        const fullHex =
          hex.length === 3
            ? hex
                .split("")
                .map((c) => c + c)
                .join("")
            : hex;

        const intVal = parseInt(fullHex, 16);
        r = (intVal >> 16) & 255;
        g = (intVal >> 8) & 255;
        b = intVal & 255;
      } else if (from === "rgb") {
        const match = value.match(
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
        );
        if (!match) throw new Error("Invalid RGB format");
        r = parseInt(match[1]);
        g = parseInt(match[2]);
        b = parseInt(match[3]);

        if (r > 255 || g > 255 || b > 255)
          throw new Error("RGB values must be 0-255");
      } else if (from === "hsl") {
        const match = value.match(
          /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/i
        );
        if (!match) throw new Error("Invalid HSL format");
        const h = parseInt(match[1]);
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;

        if (h > 360 || s > 1 || l > 1) throw new Error("Invalid HSL range");

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
        to === "hex"
          ? rgbToHex(r, g, b)
          : to === "rgb"
          ? `rgb(${r}, ${g}, ${b})`
          : rgbToHslString(r, g, b);

      setOutput(result);
      setPreview(`rgb(${r}, ${g}, ${b})`);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
      setPreview("#f3f4f6");
    }
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  };

  const rgbToHslString = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0,
      s = 0;

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

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const swapFormats = () => {
    setFrom(to);
    setTo(from);
    setInput(output || "");
  };

  const getPlaceholder = (format: Format) => {
    switch (format) {
      case "hex":
        return "#071D6A";
      case "rgb":
        return "rgb(7, 29, 106)";
      case "hsl":
        return "hsl(217, 91%, 60%)";
    }
  };

  const formatLabels = {
    hex: "HEX",
    rgb: "RGB",
    hsl: "HSL",
  };

  return (
    <div className="color-converter">
      <div className="color-converter__container">
        {/* Header */}
        <div className="color-converter__header">
          <div className="color-converter__title-wrapper">
            <BsPalette2 className="color-converter__icon" />
            <h1 className="color-converter__title">Color Converter</h1>
          </div>
          <p className="color-converter__description">
            Convert between HEX, RGB, and HSL color formats instantly with live
            preview
          </p>
        </div>

        {/* Main Card */}
        <div className="color-converter__card">
          {/* Format Selectors */}
          <div className="color-converter__selectors">
            <div className="color-converter__selectors-wrapper">
              {/* From Selector */}
              <div className="color-converter__selector-group">
                <label className="color-converter__label">Convert from</label>
                <select
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value as Format);
                    setInput("");
                    setOutput("");
                  }}
                  className="color-converter__select"
                >
                  {Object.entries(formatLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="color-converter__swap-wrapper">
                <button
                  onClick={swapFormats}
                  className="color-converter__swap-btn"
                  title="Swap formats"
                >
                  <FiRefreshCw className="color-converter__swap-icon" />
                </button>
              </div>

              {/* To Selector */}
              <div className="color-converter__selector-group">
                <label className="color-converter__label">Convert to</label>
                <select
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value as Format);
                    setOutput("");
                  }}
                  className="color-converter__select"
                >
                  {Object.entries(formatLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="color-converter__content">
            {/* Input Section */}
            <div className="color-converter__input-section">
              <label className="color-converter__input-label">
                Enter {formatLabels[from]} value
              </label>
              <input
                type="text"
                placeholder={getPlaceholder(from)}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`color-converter__input ${
                  error ? "color-converter__input--error" : ""
                }`}
              />
              {error && (
                <p className="color-converter__error">
                  <span className="color-converter__error-dot"></span>
                  {error}
                </p>
              )}
            </div>

            {/* Output Section */}
            {output && (
              <div className="color-converter__output-section">
                <label className="color-converter__output-label">
                  {formatLabels[to]} result
                </label>
                <div className="color-converter__output-wrapper">
                  <div className="color-converter__output">{output}</div>
                  <button
                    onClick={handleCopy}
                    className={`color-converter__copy-btn ${
                      copied ? "color-converter__copy-btn--copied" : ""
                    }`}
                    title={copied ? "Copied!" : "Copy to clipboard"}
                  >
                    {copied ? (
                      <FiCheckCircle className="color-converter__copy-icon" />
                    ) : (
                      <IoCopyOutline className="color-converter__copy-icon" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Color Preview */}
            <div className="color-converter__preview-section">
              <label className="color-converter__preview-label">
                Color preview
              </label>
              <div className="color-converter__preview" style={{ 
                  backgroundColor: preview, 
                }}>
                <span
                  className="color-converter__preview-text"
                  style={{
                    color: preview === "#f3f4f6" ? "#6b7280" : "white",
                    backgroundColor:
                      preview === "#f3f4f6"
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgb(7, 29, 106)",
                  }}
                >
                  {preview === "#f3f4f6" ? "Enter a valid color" : "Preview"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Format Examples */}
        <div className="color-converter__examples">
          <div className="color-converter__example">
            <h3 className="color-converter__example-title">HEX</h3>
            <code className="color-converter__example-code">#071D6A</code>
          </div>
          <div className="color-converter__example">
            <h3 className="color-converter__example-title">RGB</h3>
            <code className="color-converter__example-code">
              rgb(59, 130, 246)
            </code>
          </div>
          <div className="color-converter__example">
            <h3 className="color-converter__example-title">HSL</h3>
            <code className="color-converter__example-code">
              hsl(217, 91%, 60%)
            </code>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ColorConverterFeatures />
      </div>
    </div>
  );
};

export default ColorConv;

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import "../Colorconv/ColorConv.css";

// type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "cmyk";

// type Format = "hex" | "rgb" | "hsl";

// const ColorConv: React.FC = () => {
//   const [from, setFrom] = useState<Format>("hex");
//   const [to, setTo] = useState<Format>("rgb");
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [preview, setPreview] = useState("#ffffff");

//   const convertColor = (value: string, from: Format, to: Format) => {
//     try {
//       let r = 0, g = 0, b = 0;

//       // Convert to RGB first
//       if (from === "hex") {
//         const hex = value.replace("#", "");
//         const valid = /^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
//         if (!valid) throw new Error("Invalid HEX");

//         const fullHex = hex.length === 3
//           ? hex.split("").map((c) => c + c).join("")
//           : hex;

//         const intVal = parseInt(fullHex, 16);
//         r = (intVal >> 16) & 255;
//         g = (intVal >> 8) & 255;
//         b = intVal & 255;
//       } else if (from === "rgb") {
//         const match = value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);
//         if (!match) throw new Error("Invalid RGB");
//         r = parseInt(match[1]);
//         g = parseInt(match[2]);
//         b = parseInt(match[3]);
//       } else if (from === "hsl") {
//         const match = value.match(/^hsl\((\d{1,3}),\s*(\d{1,3})%?,\s*(\d{1,3})%?\)$/i);
//         if (!match) throw new Error("Invalid HSL");
//         const h = parseInt(match[1]);
//         const s = parseInt(match[2]) / 100;
//         const l = parseInt(match[3]) / 100;

//         const c = (1 - Math.abs(2 * l - 1)) * s;
//         const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
//         const m = l - c / 2;
//         let temp: [number, number, number];

//         if (h < 60) temp = [c, x, 0];
//         else if (h < 120) temp = [x, c, 0];
//         else if (h < 180) temp = [0, c, x];
//         else if (h < 240) temp = [0, x, c];
//         else if (h < 300) temp = [x, 0, c];
//         else temp = [c, 0, x];

//         [r, g, b] = temp.map((v) => Math.round((v + m) * 255));
//       }

//       // Convert RGB to target format
//       const result =
//         to === "hex" ? rgbToHex(r, g, b) :
//           to === "rgb" ? `rgb(${r}, ${g}, ${b})` :
//             rgbToHslString(r, g, b);

//       setOutput(result);
//       setPreview(`rgb(${r}, ${g}, ${b})`);
//     } catch (e: any) {
//       setOutput("Invalid input");
//       setPreview("#ffffff");
//     }
//   };

//   const rgbToHex = (r: number, g: number, b: number): string => {
//     return (
//       "#" +
//       [r, g, b]
//         .map((x) => x.toString(16).padStart(2, "0"))
//         .join("")
//     );
//   };

//   const rgbToHslString = (r: number, g: number, b: number): string => {
//     r /= 255;
//     g /= 255;
//     b /= 255;

//     const max = Math.max(r, g, b);
//     const min = Math.min(r, g, b);
//     const l = (max + min) / 2;
//     let h = 0, s = 0;

//     if (max !== min) {
//       const d = max - min;
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//       switch (max) {
//         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//         case g: h = (b - r) / d + 2; break;
//         case b: h = (r - g) / d + 4; break;
//       }
//       h *= 60;
//     }

//     return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Simple Color Converter</h2>
//       <p style={{ color: "#000000", marginTop: 20, }}>RGB Input Format: "RGB(0, 153, 229)"</p>
//       <p style={{ color: "#000000", marginTop: 20, }}>HEX Input Format: "#0099e5"</p>
//       <p style={{ color: "#000000", marginTop: 20, marginBottom: 20 }}>HSL Input Format: "hsl(200, 100%, 45%)"</p>

//       <div style={styles.controls}>
//         <label style={{ color: "#000000" }}>
//           From: {" "}
//           <select value={from} onChange={(e) => {
//             setFrom(e.target.value as Format);
//             setInput("");
//             setOutput("");
//           }}>
//             <option value="hex">HEX</option>
//             <option value="rgb">RGB</option>
//             <option value="hsl">HSL</option>
//           </select>
//         </label>

//         <label style={{ color: "#000000" }}>
//           To: {" "}
//           <select value={to} onChange={(e) => {
//             setTo(e.target.value as Format);
//             setOutput("");
//           }}>
//             <option value="hex">HEX</option>
//             <option value="rgb">RGB</option>
//             <option value="hsl">HSL</option>
//           </select>
//         </label>
//       </div>

//       <input
//         type="text"
//         placeholder={`Enter ${from.toUpperCase()} value`}
//         value={input}
//         onChange={(e) => {
//           const value = e.target.value;
//           setInput(value);
//           convertColor(value, from, to);
//         }}
//         style={styles.input}
//       />

//       <div style={styles.output}>
//         <button
//           onClick={() => {
//             if (output) {
//               navigator.clipboard.writeText(output).then(() => {
//                 toast.success('Color Copied to clipboard. 🎉', {
//                   style: {
//                     background: '#4BB543',
//                     color: '#fff',
//                   },
//                 });
//               }).catch(() => {
//                 toast.error('Color not copied. 🚫', {
//                   style: {
//                     background: '#ff4d4f',
//                     color: '#fff',
//                   },
//                 });
//               })
//             }
//           }}
//           style={styles.copyButton}
//           disabled={!output}
//           title="Click to copy"
//         >
//           {output ? `📋 ${output}` : "Converted value will appear here"}
//         </button>
//       </div>

//       <div style={{ ...styles.preview, backgroundColor: preview }}>
//         <p style={{ color: "#fff" }}>Color Preview</p>
//       </div>
//     </div>
//   );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "500px",
//     margin: "2rem auto",
//     padding: "2rem",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "10px",
//     textAlign: "center",
//     fontFamily: "sans-serif",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   controls: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "1rem",
//     gap: "1rem",
//   },
//   input: {
//     width: "100%",
//     padding: "0.5rem",
//     fontSize: "1rem",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     marginBottom: "1rem",
//   },
//   output: {
//     marginBottom: "1.5rem",
//     fontSize: "1.1rem",
//   },
//   preview: {
//     height: "100px",
//     borderRadius: "8px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "1rem",
//   },
//   copyButton: {
//     backgroundColor: "#000000",
//     color: "#fff",
//     border: "none",
//     padding: "0.75rem 1rem",
//     fontSize: "1rem",
//     borderRadius: "5px",
//     cursor: "pointer",

//     width: "100%",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     // textOverflow: "ellipsis",
//   },

//   // copyButtonHover: {
//   //   backgroundColor: "#0056b3",
//   // },

// };

// export default ColorConv;
