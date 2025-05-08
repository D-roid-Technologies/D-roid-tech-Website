import React, { useState, useEffect } from "react";
import "./ColorConverter.css";

type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "cmyk";

interface ColorState {
  hex: string;
  rgb: { r: number; g: number; b: number };
  rgba: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number };
  hsla: { h: number; s: number; l: number; a: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

const initialState: ColorState = {
  hex: "#3498db",
  rgb: { r: 52, g: 152, b: 219 },
  rgba: { r: 52, g: 152, b: 219, a: 1 },
  hsl: { h: 204, s: 70, l: 53 },
  hsla: { h: 204, s: 70, l: 53, a: 1 },
  cmyk: { c: 76, m: 31, y: 0, k: 14 },
};

const ColorConv: React.FC = () => {
  const [colors, setColors] = useState<ColorState>(initialState);
  const [activeFormat, setActiveFormat] = useState<ColorFormat>("hex");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const componentToHex = (c: number): string => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const hexToRgb = (
    hex: string
  ): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
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

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const rgbToCmyk = (
    r: number,
    g: number,
    b: number
  ): { c: number; m: number; y: number; k: number } => {
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    const k = 1 - Math.max(normalizedR, normalizedG, normalizedB);

    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }

    const c = (1 - normalizedR - k) / (1 - k);
    const m = (1 - normalizedG - k) / (1 - k);
    const y = (1 - normalizedB - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  const cmykToRgb = (
    c: number,
    m: number,
    y: number,
    k: number
  ): { r: number; g: number; b: number } => {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
    };
  };

  const updateAllColors = (updatedFormat: ColorFormat, value: any) => {
    try {
      setError(null);
      let newColors = { ...colors };

      switch (updatedFormat) {
        case "hex": {
          if (!/^#[0-9A-F]{6}$/i.test(value)) {
            throw new Error("Invalid HEX format. Use #RRGGBB");
          }
          const rgb = hexToRgb(value);
          if (!rgb) throw new Error("Invalid HEX color");

          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

          newColors = {
            hex: value,
            rgb,
            rgba: { ...rgb, a: colors.rgba.a },
            hsl,
            hsla: { ...hsl, a: colors.hsla.a },
            cmyk,
          };
          break;
        }

        case "rgb": {
          const { r, g, b } = value;
          if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            throw new Error("RGB values must be between 0-255");
          }

          const hex = rgbToHex(r, g, b);
          const hsl = rgbToHsl(r, g, b);
          const cmyk = rgbToCmyk(r, g, b);

          newColors = {
            hex,
            rgb: { r, g, b },
            rgba: { r, g, b, a: colors.rgba.a },
            hsl,
            hsla: { ...hsl, a: colors.hsla.a },
            cmyk,
          };
          break;
        }

        case "rgba": {
          const { r, g, b, a } = value;
          if (
            r < 0 ||
            r > 255 ||
            g < 0 ||
            g > 255 ||
            b < 0 ||
            b > 255 ||
            a < 0 ||
            a > 1
          ) {
            throw new Error(
              "RGB values must be between 0-255, Alpha between 0-1"
            );
          }

          const hex = rgbToHex(r, g, b);
          const hsl = rgbToHsl(r, g, b);
          const cmyk = rgbToCmyk(r, g, b);

          newColors = {
            hex,
            rgb: { r, g, b },
            rgba: { r, g, b, a },
            hsl,
            hsla: { ...hsl, a },
            cmyk,
          };
          break;
        }

        case "hsl": {
          const { h, s, l } = value;
          if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
            throw new Error("H must be 0-360, S and L must be 0-100");
          }

          const rgb = hslToRgb(h, s, l);
          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

          newColors = {
            hex,
            rgb,
            rgba: { ...rgb, a: colors.rgba.a },
            hsl: { h, s, l },
            hsla: { h, s, l, a: colors.hsla.a },
            cmyk,
          };
          break;
        }

        case "hsla": {
          const { h, s, l, a } = value;
          if (
            h < 0 ||
            h > 360 ||
            s < 0 ||
            s > 100 ||
            l < 0 ||
            l > 100 ||
            a < 0 ||
            a > 1
          ) {
            throw new Error(
              "H must be 0-360, S and L must be 0-100, Alpha between 0-1"
            );
          }

          const rgb = hslToRgb(h, s, l);
          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

          newColors = {
            hex,
            rgb,
            rgba: { ...rgb, a },
            hsl: { h, s, l },
            hsla: { h, s, l, a },
            cmyk,
          };
          break;
        }

        case "cmyk": {
          const { c, m, y, k } = value;
          if (
            c < 0 ||
            c > 100 ||
            m < 0 ||
            m > 100 ||
            y < 0 ||
            y > 100 ||
            k < 0 ||
            k > 100
          ) {
            throw new Error("CMYK values must be between 0-100");
          }

          const rgb = cmykToRgb(c, m, y, k);
          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

          newColors = {
            hex,
            rgb,
            rgba: { ...rgb, a: colors.rgba.a },
            hsl,
            hsla: { ...hsl, a: colors.hsla.a },
            cmyk: { c, m, y, k },
          };
          break;
        }
      }

      setColors(newColors);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid color format");
    }
  };

  const handleInputChange = (
    format: ColorFormat,
    field: string,
    value: string
  ) => {
    try {
      const numValue = field === "a" ? parseFloat(value) : parseInt(value, 10);

      if (isNaN(numValue)) {
        return;
      }

      // Type-safe approach to updating specific color format
      switch (format) {
        case "hex":
          // Hex is a string, handled separately
          break;
        case "rgb":
          {
            const updatedRgb = { ...colors.rgb };
            if (field === "r" || field === "g" || field === "b") {
              updatedRgb[field] = numValue;
              updateAllColors("rgb", updatedRgb);
            }
          }
          break;
        case "rgba":
          {
            const updatedRgba = { ...colors.rgba };
            if (
              field === "r" ||
              field === "g" ||
              field === "b" ||
              field === "a"
            ) {
              updatedRgba[field] = numValue;
              updateAllColors("rgba", updatedRgba);
            }
          }
          break;
        case "hsl":
          {
            const updatedHsl = { ...colors.hsl };
            if (field === "h" || field === "s" || field === "l") {
              updatedHsl[field] = numValue;
              updateAllColors("hsl", updatedHsl);
            }
          }
          break;
        case "hsla":
          {
            const updatedHsla = { ...colors.hsla };
            if (
              field === "h" ||
              field === "s" ||
              field === "l" ||
              field === "a"
            ) {
              updatedHsla[field] = numValue;
              updateAllColors("hsla", updatedHsla);
            }
          }
          break;
        case "cmyk":
          {
            const updatedCmyk = { ...colors.cmyk };
            if (
              field === "c" ||
              field === "m" ||
              field === "y" ||
              field === "k"
            ) {
              updatedCmyk[field] = numValue;
              updateAllColors("cmyk", updatedCmyk);
            }
          }
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setColors({ ...colors, hex: value });

      if (value.length === 7 && /^#[0-9A-F]{6}$/i.test(value)) {
        updateAllColors("hex", value);
      }
    }
  };

  const getColorString = (format: ColorFormat): string => {
    switch (format) {
      case "hex":
        return colors.hex;
      case "rgb": {
        const { r, g, b } = colors.rgb;
        return `rgb(${r}, ${g}, ${b})`;
      }
      case "rgba": {
        const { r, g, b, a } = colors.rgba;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }
      case "hsl": {
        const { h, s, l } = colors.hsl;
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
      case "hsla": {
        const { h, s, l, a } = colors.hsla;
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
      }
      case "cmyk": {
        const { c, m, y, k } = colors.cmyk;
        return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
      }
    }
  };

  const copyToClipboard = () => {
    const colorString = getColorString(activeFormat);
    navigator.clipboard
      .writeText(colorString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        setError("Failed to copy to clipboard");
      });
  };

  const handleRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    updateAllColors("rgb", { r, g, b });
  };

  return (
    <div className="color-converter">
      <h1>Color Converter</h1>

      <div className="color-preview" style={{ backgroundColor: colors.hex }}>
        <div className="actions">
          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <button className="random-button" onClick={handleRandomColor}>
            Random
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tabs">
        {["hex", "rgb", "rgba", "hsl", "hsla", "cmyk"].map((format) => (
          <button
            key={format}
            className={`tab ${activeFormat === format ? "active" : ""}`}
            onClick={() => setActiveFormat(format as ColorFormat)}
          >
            {format.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="input-section">
        {activeFormat === "hex" && (
          <div className="input-group">
            <label htmlFor="hex-input">HEX:</label>
            <input
              id="hex-input"
              type="text"
              value={colors.hex}
              onChange={handleHexChange}
              maxLength={7}
              placeholder="#RRGGBB"
            />
          </div>
        )}

        {activeFormat === "rgb" && (
          <div className="rgb-inputs">
            <div className="input-group">
              <label htmlFor="r-input">R:</label>
              <input
                id="r-input"
                type="number"
                min="0"
                max="255"
                value={colors.rgb.r}
                onChange={(e) => handleInputChange("rgb", "r", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="g-input">G:</label>
              <input
                id="g-input"
                type="number"
                min="0"
                max="255"
                value={colors.rgb.g}
                onChange={(e) => handleInputChange("rgb", "g", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="b-input">B:</label>
              <input
                id="b-input"
                type="number"
                min="0"
                max="255"
                value={colors.rgb.b}
                onChange={(e) => handleInputChange("rgb", "b", e.target.value)}
              />
            </div>
          </div>
        )}

        {activeFormat === "rgba" && (
          <div className="rgba-inputs">
            <div className="input-group">
              <label htmlFor="rgba-r-input">R:</label>
              <input
                id="rgba-r-input"
                type="number"
                min="0"
                max="255"
                value={colors.rgba.r}
                onChange={(e) => handleInputChange("rgba", "r", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rgba-g-input">G:</label>
              <input
                id="rgba-g-input"
                type="number"
                min="0"
                max="255"
                value={colors.rgba.g}
                onChange={(e) => handleInputChange("rgba", "g", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rgba-b-input">B:</label>
              <input
                id="rgba-b-input"
                type="number"
                min="0"
                max="255"
                value={colors.rgba.b}
                onChange={(e) => handleInputChange("rgba", "b", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rgba-a-input">A:</label>
              <input
                id="rgba-a-input"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={colors.rgba.a}
                onChange={(e) => handleInputChange("rgba", "a", e.target.value)}
              />
            </div>
          </div>
        )}

        {activeFormat === "hsl" && (
          <div className="hsl-inputs">
            <div className="input-group">
              <label htmlFor="h-input">H:</label>
              <input
                id="h-input"
                type="number"
                min="0"
                max="360"
                value={colors.hsl.h}
                onChange={(e) => handleInputChange("hsl", "h", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="s-input">S:</label>
              <input
                id="s-input"
                type="number"
                min="0"
                max="100"
                value={colors.hsl.s}
                onChange={(e) => handleInputChange("hsl", "s", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            <div className="input-group">
              <label htmlFor="l-input">L:</label>
              <input
                id="l-input"
                type="number"
                min="0"
                max="100"
                value={colors.hsl.l}
                onChange={(e) => handleInputChange("hsl", "l", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
          </div>
        )}

        {activeFormat === "hsla" && (
          <div className="hsla-inputs">
            <div className="input-group">
              <label htmlFor="hsla-h-input">H:</label>
              <input
                id="hsla-h-input"
                type="number"
                min="0"
                max="360"
                value={colors.hsla.h}
                onChange={(e) => handleInputChange("hsla", "h", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="hsla-s-input">S:</label>
              <input
                id="hsla-s-input"
                type="number"
                min="0"
                max="100"
                value={colors.hsla.s}
                onChange={(e) => handleInputChange("hsla", "s", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            <div className="input-group">
              <label htmlFor="hsla-l-input">L:</label>
              <input
                id="hsla-l-input"
                type="number"
                min="0"
                max="100"
                value={colors.hsla.l}
                onChange={(e) => handleInputChange("hsla", "l", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            <div className="input-group">
              <label htmlFor="hsla-a-input">A:</label>
              <input
                id="hsla-a-input"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={colors.hsla.a}
                onChange={(e) => handleInputChange("hsla", "a", e.target.value)}
              />
            </div>
          </div>
        )}

        {activeFormat === "cmyk" && (
          <div className="cmyk-inputs">
            <div className="input-group">
              <label htmlFor="c-input">C:</label>
              <input
                id="c-input"
                type="number"
                min="0"
                max="100"
                value={colors.cmyk.c}
                onChange={(e) => handleInputChange("cmyk", "c", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            <div className="input-group">
              <label htmlFor="m-input">M:</label>
              <input
                id="m-input"
                type="number"
                min="0"
                max="100"
                value={colors.cmyk.m}
                onChange={(e) => handleInputChange("cmyk", "m", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            <div className="input-group">
              <label htmlFor="y-input">Y:</label>
              <input
                id="y-input"
                type="number"
                min="0"
                max="100"
                value={colors.cmyk.y}
                onChange={(e) => handleInputChange("cmyk", "y", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
            <div className="input-group">
              <label htmlFor="k-input">K:</label>
              <input
                id="k-input"
                type="number"
                min="0"
                max="100"
                value={colors.cmyk.k}
                onChange={(e) => handleInputChange("cmyk", "k", e.target.value)}
              />
              <span className="unit">%</span>
            </div>
          </div>
        )}
      </div>

      <div className="color-output">
        <h3>Color Values</h3>
        <div className="output-values">
          <div className="output-item">
            <label>HEX:</label>
            <span>{colors.hex}</span>
          </div>
          <div className="output-item">
            <label>RGB:</label>
            <span>
              rgb({colors.rgb.r}, {colors.rgb.g}, {colors.rgb.b})
            </span>
          </div>
          <div className="output-item">
            <label>RGBA:</label>
            <span>
              rgba({colors.rgba.r}, {colors.rgba.g}, {colors.rgba.b},{" "}
              {colors.rgba.a})
            </span>
          </div>
          <div className="output-item">
            <label>HSL:</label>
            <span>
              hsl({colors.hsl.h}, {colors.hsl.s}%, {colors.hsl.l}%)
            </span>
          </div>
          <div className="output-item">
            <label>HSLA:</label>
            <span>
              hsla({colors.hsla.h}, {colors.hsla.s}%, {colors.hsla.l}%,{" "}
              {colors.hsla.a})
            </span>
          </div>
          <div className="output-item">
            <label>CMYK:</label>
            <span>
              cmyk({colors.cmyk.c}%, {colors.cmyk.m}%, {colors.cmyk.y}%,{" "}
              {colors.cmyk.k}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConv;
