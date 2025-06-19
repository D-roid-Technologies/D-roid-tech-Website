import React, { useState, useRef, useCallback } from "react";
import { MdOutlineCropFree } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { CiImageOn, CiSaveDown2 } from "react-icons/ci";
import { BiLoaderAlt } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import "./BackgroundRemove.css";

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  stage: string;
}

interface ComponentProps {
  onClose: () => void;
}

const BackgroundRemove: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    stage: "",
  });
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  };
  // Commentttttttttttttttttt
  const simulateAIProcessing = async (): Promise<string> => {
    const stages = [
      "Analyzing image...",
      "Detecting objects...",
      "Identifying background...",
      "Processing edges...",
      "Removing background...",
      "Finalizing image...",
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessing((prev) => ({
        ...prev,
        stage: stages[i],
        progress: ((i + 1) / stages.length) * 100,
      }));

      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 400)
      );
    }

    // Simulate background removal by creating a canvas
    return new Promise((resolve) => {
      if (!originalImageRef.current) {
        resolve(originalImage!);
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = originalImageRef.current;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (ctx) {
        // Draw the original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple background removal simulation (remove pixels similar to corners)
        const cornerColor = [data[0], data[1], data[2]];
        const threshold = 100;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const diff = Math.sqrt(
            Math.pow(r - cornerColor[0], 2) +
              Math.pow(g - cornerColor[1], 2) +
              Math.pow(b - cornerColor[2], 2)
          );

          if (diff < threshold) {
            data[i + 3] = 0; // Make transparent
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      resolve(canvas.toDataURL("image/png"));
    });
  };

  const processImage = async () => {
    if (!originalImage) return;

    setProcessing({
      isProcessing: true,
      progress: 0,
      stage: "Initializing...",
    });

    try {
      const result = await simulateAIProcessing();
      setProcessedImage(result);
    } catch (err) {
      setError("Failed to process image. Please try again.");
    } finally {
      setProcessing({
        isProcessing: false,
        progress: 0,
        stage: "",
      });
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const simulateAIProcessing = async (): Promise<string> => {
  //   const stages = [
  //     "Analyzing image...",
  //     "Detecting objects...",
  //     "Identifying background...",
  //     "Processing edges...",
  //     "Removing background...",
  //     "Finalizing image...",
  //   ];

  //   for (let i = 0; i < stages.length; i++) {
  //     setProcessing((prev) => ({
  //       ...prev,
  //       stage: stages[i],
  //       progress: ((i + 1) / stages.length) * 100,
  //     }));

  //     await new Promise((resolve) =>
  //       setTimeout(resolve, 800 + Math.random() * 400)
  //     );
  //   }

  //   return new Promise((resolve) => {
  //     if (!originalImageRef.current) {
  //       resolve(originalImage!);
  //       return;
  //     }

  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     const img = originalImageRef.current;

  //     canvas.width = img.naturalWidth;
  //     canvas.height = img.naturalHeight;

  //     if (ctx) {
  //       ctx.drawImage(img, 0, 0);
  //       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //       const data = imageData.data;

  //       // Sample multiple edge points for better background detection
  //       const samplePoints = [
  //         [0, 0], // top-left
  //         [canvas.width - 1, 0], // top-right
  //         [0, canvas.height - 1], // bottom-left
  //         [canvas.width - 1, canvas.height - 1], // bottom-right
  //         [Math.floor(canvas.width / 2), 0], // top-center
  //         [Math.floor(canvas.width / 2), canvas.height - 1], // bottom-center
  //         [0, Math.floor(canvas.height / 2)], // left-center
  //         [canvas.width - 1, Math.floor(canvas.height / 2)], // right-center
  //       ];

  //       // Get background colors from sample points
  //       const backgroundColors = samplePoints.map(([x, y]) => {
  //         const index = (y * canvas.width + x) * 4;
  //         return [data[index], data[index + 1], data[index + 2]];
  //       });

  //       // Improved background removal with edge detection
  //       for (let y = 0; y < canvas.height; y++) {
  //         for (let x = 0; x < canvas.width; x++) {
  //           const index = (y * canvas.width + x) * 4;
  //           const r = data[index];
  //           const g = data[index + 1];
  //           const b = data[index + 2];

  //           // Check if pixel is close to any background color
  //           let isBackground = false;
  //           const threshold = 120; // Increased threshold for better results

  //           for (const bgColor of backgroundColors) {
  //             const colorDistance = Math.sqrt(
  //               Math.pow(r - bgColor[0], 2) +
  //                 Math.pow(g - bgColor[1], 2) +
  //                 Math.pow(b - bgColor[2], 2)
  //             );

  //             // Additional check for edge pixels (more likely to be background)
  //             const isEdgePixel =
  //               x < 20 ||
  //               x > canvas.width - 20 ||
  //               y < 20 ||
  //               y > canvas.height - 20;

  //             const adjustedThreshold = isEdgePixel
  //               ? threshold * 1.5
  //               : threshold;

  //             if (colorDistance < adjustedThreshold) {
  //               isBackground = true;
  //               break;
  //             }
  //           }

  //           // Apply gradient transparency near edges for smoother result
  //           if (isBackground) {
  //             const edgeDistance = Math.min(
  //               x,
  //               y,
  //               canvas.width - x,
  //               canvas.height - y
  //             );

  //             if (edgeDistance < 10) {
  //               // Gradient transparency near edges
  //               data[index + 3] = Math.max(0, (edgeDistance / 10) * 255);
  //             } else {
  //               // Full transparency for clear background areas
  //               data[index + 3] = 0;
  //             }
  //           }
  //         }
  //       }

  //       ctx.putImageData(imageData, 0, 0);
  //     }

  //     resolve(canvas.toDataURL("image/png"));
  //   });
  // };

  return (
    <div className="airbg-container">
      <div className="airbg-header">
        <div className="airbg-header-content">
          <MdOutlineCropFree className="airbg-header-icon" />
          <h1 className="airbg-title">AI Background Remover</h1>
          <p className="airbg-subtitle">
            Remove backgrounds from your images instantly using AI
          </p>
        </div>
      </div>

      <div className="airbg-main">
        {!originalImage ? (
          <div
            className={`airbg-upload-zone ${
              dragActive ? "airbg-drag-active" : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <BsCloudUpload className="airbg-upload-icon" />
            <h3 className="airbg-upload-title">Drop your image here</h3>
            <p className="airbg-upload-text">or click to browse files</p>
            <div className="airbg-upload-formats">
              <span>Supports: JPG, PNG, WEBP</span>
              <span>Max size: 10MB</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="airbg-file-input"
            />
          </div>
        ) : (
          <div className="airbg-editor">
            <div className="airbg-editor-header">
              <button onClick={resetImages} className="airbg-reset-btn">
                <RxCrossCircled size={16} />
                Start Over
              </button>
            </div>

            <div className="airbg-image-grid">
              <div className="airbg-image-panel">
                <div className="airbg-panel-header">
                  <CiImageOn size={16} />
                  <span>Original</span>
                </div>
                <div className="airbg-image-container">
                  <img
                    ref={originalImageRef}
                    src={originalImage}
                    alt="Original"
                    className="airbg-image"
                  />
                </div>
              </div>

              <div className="airbg-image-panel">
                <div className="airbg-panel-header">
                  <MdOutlineCropFree size={16} />
                  <span>Background Removed</span>
                </div>
                <div className="airbg-image-container airbg-transparent-bg">
                  {processing.isProcessing ? (
                    <div className="airbg-processing">
                      <BiLoaderAlt className="airbg-spinner" />
                      <div className="airbg-progress-info">
                        <div className="airbg-progress-text">
                          {processing.stage}
                        </div>
                        <div className="airbg-progress-bar">
                          <div
                            className="airbg-progress-fill"
                            style={{ width: `${processing.progress}%` }}
                          />
                        </div>
                        <div className="airbg-progress-percent">
                          {Math.round(processing.progress)}%
                        </div>
                      </div>
                    </div>
                  ) : processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="airbg-image"
                    />
                  ) : (
                    <div className="airbg-placeholder">
                      <CiImageOn className="airbg-placeholder-icon" />
                      <p>Click "Remove Background" to process</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="airbg-actions">
              {!processing.isProcessing && !processedImage && (
                <button
                  onClick={processImage}
                  className="airbg-btn airbg-btn-primary"
                >
                  <MdOutlineCropFree size={18} />
                  Remove Background
                </button>
              )}

              {processedImage && (
                <button
                  onClick={downloadImage}
                  className="airbg-btn airbg-btn-success"
                >
                  <CiSaveDown2 size={18} />
                  Download Result
                </button>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="airbg-error">
            <IoExitOutline size={16} />
            {error}
          </div>
        )}
      </div>

      <div className="airbg-features">
        <div className="airbg-feature">
          <div className="airbg-feature-icon">🎯</div>
          <h3>Precise Detection</h3>
          <p>Advanced AI accurately identifies and removes backgrounds</p>
        </div>
        <div className="airbg-feature">
          <div className="airbg-feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Process images in seconds with our optimized algorithms</p>
        </div>
        <div className="airbg-feature">
          <div className="airbg-feature-icon">📱</div>
          <h3>Any Device</h3>
          <p>Works perfectly on desktop, tablet, and mobile devices</p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemove;
