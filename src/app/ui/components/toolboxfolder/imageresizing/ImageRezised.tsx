// ImageResizer.tsx
import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import "../imageresizing/ImageRezised.css";

interface ResizedImage {
  width: number;
  height: number;
  url: string;
  size: string;
  quality: number;
}

interface ImageResizerProps {
  presetSizes?: Array<{ width: number; height: number; label: string }>;
  maxWidth?: number;
  defaultQuality?: number;
}

const ImageRezised: React.FC<ImageResizerProps> = ({
  presetSizes = [
    { width: 1280, height: 720, label: "HD (1280×720)" },
    { width: 1920, height: 1080, label: "Full HD (1920×1080)" },
    { width: 640, height: 480, label: "SD (640×480)" },
    { width: 320, height: 240, label: "Thumbnail (320×240)" },
  ],
  maxWidth = 1920,
  defaultQuality = 90,
}) => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([]);
  const [customWidth, setCustomWidth] = useState<number>(800);
  const [customHeight, setCustomHeight] = useState<number>(600);
  const [quality, setQuality] = useState<number>(defaultQuality);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setResizedImages([]);
    setErrorMessage("");
  };

  const handleImageLoad = useCallback(
    (file: File) => {
      resetState();
      setIsProcessing(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          setOriginalFile(file);

          // Set default custom dimensions based on loaded image
          if (preserveAspectRatio) {
            const aspectRatio = img.width / img.height;
            if (img.width > img.height) {
              setCustomWidth(Math.min(img.width, maxWidth));
              setCustomHeight(
                Math.round(Math.min(img.width, maxWidth) / aspectRatio)
              );
            } else {
              setCustomHeight(Math.min(img.height, maxWidth));
              setCustomWidth(
                Math.round(Math.min(img.height, maxWidth) * aspectRatio)
              );
            }
          }

          setIsProcessing(false);
        };
        img.onerror = () => {
          setErrorMessage("Failed to load image. Please try another file.");
          setIsProcessing(false);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        setErrorMessage("Failed to read file. Please try again.");
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    },
    [maxWidth, preserveAspectRatio]
  );

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        handleImageLoad(file);
      } else {
        setErrorMessage("Please select a valid image file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        handleImageLoad(file);
      } else {
        setErrorMessage("Please drop a valid image file.");
      }
    }
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value, 10);
    setCustomWidth(width);

    if (originalImage && preserveAspectRatio) {
      const aspectRatio = originalImage.width / originalImage.height;
      setCustomHeight(Math.round(width / aspectRatio));
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value, 10);
    setCustomHeight(height);

    if (originalImage && preserveAspectRatio) {
      const aspectRatio = originalImage.width / originalImage.height;
      setCustomWidth(Math.round(height * aspectRatio));
    }
  };

  const handleQualityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuality(parseInt(e.target.value, 10));
  };

  const handleAspectRatioToggle = () => {
    setPreserveAspectRatio(!preserveAspectRatio);

    // Update dimensions when toggling aspect ratio
    if (!preserveAspectRatio && originalImage) {
      const aspectRatio = originalImage.width / originalImage.height;
      setCustomHeight(Math.round(customWidth / aspectRatio));
    }
  };

  const resizeImage = (width: number, height: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        if (!originalImage) {
          reject("No image loaded");
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Failed to get canvas context");
          return;
        }

        // Draw the image with smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(originalImage, 0, 0, width, height);

        // Get the resized image as a data URL
        const format = originalFile?.type || "image/jpeg";
        const dataUrl = canvas.toDataURL(format, quality / 100);
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    });
  };

  const calculateFileSize = (dataUrl: string): string => {
    // Rough estimation of file size from data URL
    const base64 = dataUrl.split(",")[1];
    const sizeInBytes = (base64.length * 3) / 4;

    if (sizeInBytes < 1024) {
      return `${sizeInBytes.toFixed(2)} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const handleCustomResize = async () => {
    if (!originalImage) return;

    try {
      setIsProcessing(true);
      const dataUrl = await resizeImage(customWidth, customHeight);

      // Add to the beginning of the array so newest is at the top
      setResizedImages((prev) => [
        {
          width: customWidth,
          height: customHeight,
          url: dataUrl,
          size: calculateFileSize(dataUrl),
          quality,
        },
        ...prev,
      ]);

      setIsProcessing(false);
    } catch (error) {
      setErrorMessage("Error resizing image. Please try again.");
      setIsProcessing(false);
    }
  };

  const handlePresetResize = async (
    width: number,
    height: number,
    label: string
  ) => {
    if (!originalImage) return;

    try {
      setIsProcessing(true);
      const dataUrl = await resizeImage(width, height);

      setResizedImages((prev) => [
        {
          width,
          height,
          url: dataUrl,
          size: calculateFileSize(dataUrl),
          quality,
        },
        ...prev,
      ]);

      setIsProcessing(false);
    } catch (error) {
      setErrorMessage("Error resizing image. Please try again.");
      setIsProcessing(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const downloadImage = (dataUrl: string, width: number, height: number) => {
    const link = document.createElement("a");
    link.href = dataUrl;

    // Create filename with dimensions and quality
    const originalName = originalFile?.name || "image";
    const extension = originalFile?.type.split("/")[1] || "jpg";
    const nameParts = originalName.split(".");
    nameParts.pop(); // Remove the extension
    const baseName = nameParts.join(".");

    link.download = `${baseName}_${width}x${height}_q${quality}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-resizer">
      <h2>Image Resizer</h2>

      <div
        ref={dropAreaRef}
        className={`drop-area ${isDragging ? "dragging" : ""} ${
          originalImage ? "has-image" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!originalImage ? triggerFileInput : undefined}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
          className="file-input"
        />

        {!originalImage && (
          <div className="drop-message">
            <div className="icon">📁</div>
            <p>Drag & drop an image here or click to browse</p>
            <p className="supported-formats">Supports JPG, PNG, GIF, WebP</p>
          </div>
        )}

        {originalImage && (
          <div className="image-preview-container">
            <div className="image-info">
              <div className="original-image">
                <img
                  src={originalImage.src}
                  alt="Original"
                  className="preview-image"
                />
              </div>
              <div className="image-details">
                <h3>Original Image</h3>
                <p>
                  Dimensions: {originalImage.width} × {originalImage.height} px
                </p>
                <p>File: {originalFile?.name}</p>
                <p>
                  Size:{" "}
                  {originalFile?.size
                    ? `${(originalFile.size / 1024).toFixed(2)} KB`
                    : "Unknown"}
                </p>
                <button className="change-image-btn" onClick={triggerFileInput}>
                  Change Image
                </button>
              </div>
            </div>
          </div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      {originalImage && (
        <div className="resize-controls">
          <div className="control-section">
            <h3>Custom Size</h3>
            <div className="dimension-controls">
              <div className="dimension-input">
                <label htmlFor="width">Width (px)</label>
                <input
                  type="number"
                  id="width"
                  min="1"
                  max={maxWidth * 2}
                  value={customWidth}
                  onChange={handleWidthChange}
                />
              </div>

              <div className="dimension-input">
                <label htmlFor="height">Height (px)</label>
                <input
                  type="number"
                  id="height"
                  min="1"
                  max={maxWidth * 2}
                  value={customHeight}
                  onChange={handleHeightChange}
                />
              </div>
            </div>

            <div className="aspect-ratio-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={preserveAspectRatio}
                  onChange={handleAspectRatioToggle}
                />
                Preserve aspect ratio
              </label>
            </div>

            <div className="quality-control">
              <label htmlFor="quality">Quality: {quality}%</label>
              <input
                type="range"
                id="quality"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={handleQualityChange}
              />
            </div>

            <button
              className="resize-btn"
              onClick={handleCustomResize}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Resize"}
            </button>
          </div>

          <div className="control-section">
            <h3>Preset Sizes</h3>
            <div className="preset-buttons">
              {presetSizes.map((size, index) => (
                <button
                  key={index}
                  className="preset-btn"
                  onClick={() =>
                    handlePresetResize(size.width, size.height, size.label)
                  }
                  disabled={isProcessing}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {resizedImages.length > 0 && (
        <div className="resized-images">
          <h3>Resized Images</h3>
          <div className="image-grid">
            {resizedImages.map((img, index) => (
              <div className="resized-image-card" key={index}>
                <div className="resized-preview">
                  <img
                    src={img.url}
                    alt={`Resized ${img.width}×${img.height}`}
                  />
                </div>
                <div className="resized-details">
                  <p>
                    {img.width} × {img.height} px
                  </p>
                  <p>Size: {img.size}</p>
                  <p>Quality: {img.quality}%</p>
                  <button
                    className="download-btn"
                    onClick={() =>
                      downloadImage(img.url, img.width, img.height)
                    }
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageRezised;
