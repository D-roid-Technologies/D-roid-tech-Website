"use client"

// Main watermarking hook
import { useState, useRef, useCallback, useEffect } from "react"
import type { WatermarkSettings, ExportFormat, ImageUploadResult, CanvasDrawOptions } from "../types"
import { loadImageFromFile, getImageDataUrl, downloadImage } from "../utils/image-processing"
import { drawMainImage, drawImageWatermark, drawTextWatermark } from "../utils/canvas-utils"
import { DEFAULT_WATERMARK_SETTINGS } from "../lib/constants"

export const useWatermarking = (initialSettings?: Partial<WatermarkSettings>) => {
  const [mainImageResult, setMainImageResult] = useState<ImageUploadResult | null>(null)
  const [watermarkImageResult, setWatermarkImageResult] = useState<ImageUploadResult | null>(null)
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    ...DEFAULT_WATERMARK_SETTINGS,
    ...initialSettings,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawCanvas = useCallback(
    (options: CanvasDrawOptions = {}) => {
      const canvas = canvasRef.current
      if (!canvas || !mainImageResult) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      try {
        // Draw main image with options
        drawMainImage(ctx, canvas, mainImageResult.image, options)

        // Draw watermark
        if (watermarkSettings.type === "image" && watermarkImageResult) {
          drawImageWatermark(ctx, canvas, watermarkImageResult.image, watermarkSettings)
        } else if (watermarkSettings.type === "text" && watermarkSettings.text.trim()) {
          drawTextWatermark(ctx, canvas, watermarkSettings)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to draw canvas")
      }
    },
    [mainImageResult, watermarkImageResult, watermarkSettings],
  )

  const handleImageUpload = useCallback(async (file: File, isWatermark = false): Promise<void> => {
    setIsProcessing(true)
    setError(null)

    try {
      const result = await loadImageFromFile(file)

      if (isWatermark) {
        setWatermarkImageResult(result)
      } else {
        setMainImageResult(result)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const processAndDownload = useCallback((): string | null => {
    const canvas = canvasRef.current
    if (!canvas || !mainImageResult) return null

    try {
      setIsProcessing(true)

      const dataUrl = getImageDataUrl(canvas, exportFormat)
      const filename = `watermarked-${mainImageResult.file.name.split(".")[0]}.${exportFormat}`

      downloadImage(dataUrl, filename)

      return dataUrl
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process image"
      setError(errorMessage)
      return null
    } finally {
      setIsProcessing(false)
    }
  }, [mainImageResult, exportFormat])

  const getProcessedImageData = useCallback((): string | null => {
    const canvas = canvasRef.current
    if (!canvas || !mainImageResult) return null

    try {
      return getImageDataUrl(canvas, exportFormat)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get image data")
      return null
    }
  }, [mainImageResult, exportFormat])

  const resetAll = useCallback(() => {
    setMainImageResult(null)
    setWatermarkImageResult(null)
    setWatermarkSettings({
      ...DEFAULT_WATERMARK_SETTINGS,
      ...initialSettings,
    })
    setError(null)
    setIsProcessing(false)
  }, [initialSettings])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Auto-draw canvas when dependencies change
  useEffect(() => {
    if (mainImageResult) {
      drawCanvas()
    }
  }, [drawCanvas, mainImageResult])

  return {
    // State
    mainImage: mainImageResult?.image || null,
    watermarkImage: watermarkImageResult?.image || null,
    mainImageFile: mainImageResult?.file || null,
    watermarkImageFile: watermarkImageResult?.file || null,
    exportFormat,
    watermarkSettings,
    isProcessing,
    error,
    canvasRef,

    // Computed
    isReady: !!mainImageResult && !isProcessing,
    hasWatermark:
      (watermarkSettings.type === "image" && !!watermarkImageResult) ||
      (watermarkSettings.type === "text" && !!watermarkSettings.text.trim()),
    imageDimensions: mainImageResult?.dimensions || null,

    // Actions
    setExportFormat,
    setWatermarkSettings,
    handleImageUpload,
    processAndDownload,
    getProcessedImageData,
    resetAll,
    clearError,
    drawCanvas,
  }
}
