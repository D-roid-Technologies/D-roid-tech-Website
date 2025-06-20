// Type definitions for the watermarking tool
export type WatermarkPosition = "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right"
export type WatermarkType = "image" | "text"
export type ExportFormat = "png" | "jpg" | "webp"

export interface WatermarkSettings {
  position: WatermarkPosition
  size: number
  opacity: number
  type: WatermarkType
  text: string
  fontSize: number
  color: string
  rotation: number
  shadow: boolean
  shadowColor: string
  shadowBlur: number
}

export interface WatermarkingToolProps {
  className?: string
  onImageProcessed?: (imageData: string, filename: string) => void
  onError?: (error: string) => void
  defaultSettings?: Partial<WatermarkSettings>
  showHeader?: boolean
  compact?: boolean
  maxImageSize?: number
  allowedFormats?: string[]
}

export interface ImageUploadResult {
  image: HTMLImageElement
  file: File
  dimensions: {
    width: number
    height: number
  }
}

export interface CanvasDrawOptions {
  showGrid?: boolean
  gridSize?: number
  backgroundColor?: string
}
