import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const Crop: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropBox, setCropBox] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const cropImage = () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;

    if (img && canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = cropBox.width;
      canvas.height = cropBox.height;

      ctx.drawImage(
        img,
        cropBox.x * scaleX,
        cropBox.y * scaleY,
        cropBox.width * scaleX,
        cropBox.height * scaleY,
        0,
        0,
        cropBox.width,
        cropBox.height
      );

      const croppedDataUrl = canvas.toDataURL("image/png");
      setCroppedImage(croppedDataUrl);
    }
  };

  const downloadCroppedImage = () => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = "cropped-image.png";
      link.click();

      toast.success("Image downloaded 🎉", {
        style: { background: "#4BB543", color: "#fff" },
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#071D6A", fontWeight: "900" }}>Simple Crop Tool</h2>
      <p style={{ color: "#000000", margin: "1rem 0" }}>
        Upload and crop an image.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={styles.input}
      />

      {image && (
        <div style={styles.previewWrapper}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              ref={imageRef}
              src={image}
              alt="To Crop"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
            <div
              style={{
                position: "absolute",
                border: "2px dashed #ff4d4f",
                top: cropBox.y,
                left: cropBox.x,
                width: cropBox.width,
                height: cropBox.height,
              }}
            />
          </div>

          <div style={styles.sliderContainer}>
            <label>
              X:{" "}
              <input
                type="range"
                min="0"
                max="300"
                value={cropBox.x}
                onChange={(e) => setCropBox({ ...cropBox, x: +e.target.value })}
              />
            </label>
            <label>
              Y:{" "}
              <input
                type="range"
                min="0"
                max="300"
                value={cropBox.y}
                onChange={(e) => setCropBox({ ...cropBox, y: +e.target.value })}
              />
            </label>
            <label>
              Width:{" "}
              <input
                type="range"
                min="50"
                max="300"
                value={cropBox.width}
                onChange={(e) =>
                  setCropBox({ ...cropBox, width: +e.target.value })
                }
              />
            </label>
            <label>
              Height:{" "}
              <input
                type="range"
                min="50"
                max="300"
                value={cropBox.height}
                onChange={(e) =>
                  setCropBox({ ...cropBox, height: +e.target.value })
                }
              />
            </label>
          </div>

          <button onClick={cropImage} style={styles.copyButton}>
            ✂️ Crop
          </button>
        </div>
      )}

      {croppedImage && (
        <div>
          <h3 style={{ color: "#000" }}>Cropped Result</h3>
          <img src={croppedImage} alt="Cropped" style={styles.resultImg} />
          <button
            onClick={downloadCroppedImage}
            style={{ ...styles.copyButton, marginTop: "1rem" }}
          >
            📥 Download Cropped Image
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
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
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
  },
  previewWrapper: {
    marginTop: "1rem",
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "stretch",
    marginTop: "1rem",
    marginBottom: "1rem",
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
  },
  resultImg: {
    maxWidth: "100%",
    marginTop: "1rem",
    borderRadius: "8px",
  },
};

export default Crop;
