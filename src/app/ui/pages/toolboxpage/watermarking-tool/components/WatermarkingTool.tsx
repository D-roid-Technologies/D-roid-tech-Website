"use client"

// Main watermarking tool component
import type React from "react"
import { useEffect, useState,useRef } from "react"
import type { WatermarkingToolProps } from "../types"
import { useWatermarking } from "../hooks/useWatermarking"
import ImageUploadArea from "./ImageUploadArea"
import WatermarkControls from "./WatermarkControls"
import PreviewCanvas from "./PreviewCanvas"

const WatermarkingTool: React.FC<WatermarkingToolProps> = ({
  className = "",
  onImageProcessed,
  onError,
  defaultSettings,
  showHeader = true,
  compact = false,
  maxImageSize = 2048,
  allowedFormats = ["image/jpeg", "image/png", "image/webp"],
}) => {
  const [showGrid, setShowGrid] = useState(false)

  const {
    mainImage,
    watermarkImage,
    exportFormat,
    watermarkSettings,
    isProcessing,
    error,
    canvasRef,
    isReady,
    hasWatermark,
    setExportFormat,
    setWatermarkSettings,
    handleImageUpload,
    processAndDownload,
    getProcessedImageData,
    resetAll,
    clearError,
    drawCanvas,
  } = useWatermarking(defaultSettings)

  const handleMainImageUpload = async (file: File) => {
    try {
      await handleImageUpload(file, false)
      clearError()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image"
      onError?.(errorMessage)
    }
  }

  const handleWatermarkImageUpload = async (file: File) => {
    try {
      await handleImageUpload(file, true)
      clearError()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload watermark"
      onError?.(errorMessage)
    }
  }

  const handleDownload = () => {
    try {
      const imageData = processAndDownload()
      if (imageData) {
        const filename = `watermarked-image.${exportFormat}`
        onImageProcessed?.(imageData, filename)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process image"
      onError?.(errorMessage)
    }
  }

  const handleToggleGrid = () => {
    const newShowGrid = !showGrid
    setShowGrid(newShowGrid)
    drawCanvas({ showGrid: newShowGrid, gridSize: 50 })
  }

  const handleError = (errorMessage: string) => {
    onError?.(errorMessage)
  }
const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }, 10);
  }, []);

  return (
    <div ref={containerRef}  className={`wt-watermarking-tool ${compact ? "wt-watermarking-tool--compact" : ""} ${className}`}>
      {showHeader && (
        <div className="wt-header">
          <h2 className="wt-header__title">Image Watermarking Tool</h2>
          <p className="wt-header__description">Add professional watermarks to your images</p>
        </div>
      )}

      {error && (
        <div className="wt-error-banner">
          <span className="wt-error-banner__message">{error}</span>
          <button className="wt-error-banner__close" onClick={clearError} aria-label="Close error">
            ×
          </button>
        </div>
      )}

      <div className={`wt-layout ${compact ? "wt-layout--compact" : ""}`}>
        {/* Sidebar */}
        <div className="wt-sidebar">
          {/* Main Image Upload */}
          <ImageUploadArea
            title="Main Image"
            description="Upload your image to watermark"
            onImageUpload={handleMainImageUpload}
            onError={handleError}
            currentImage={mainImage}
            onRemoveImage={() => {
              resetAll()
            }}
            loading={isProcessing}
            className="wt-main-upload"
          />

          {/* Watermark Controls */}
          <WatermarkControls
            settings={watermarkSettings}
            onSettingsChange={setWatermarkSettings}
            onImageUpload={handleWatermarkImageUpload}
            watermarkImage={watermarkImage}
          />
        </div>

        {/* Preview Area */}
        <div className="wt-preview-area">
          <PreviewCanvas
            ref={canvasRef}
            hasImage={!!mainImage}
            onDownload={handleDownload}
            onReset={resetAll}
            exportFormat={exportFormat}
            onExportFormatChange={setExportFormat}
            isProcessing={isProcessing}
            showGrid={showGrid}
            onToggleGrid={handleToggleGrid}
          />
        </div>
      </div>
    </div>
  )
}

export default WatermarkingTool
