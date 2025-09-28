// Constants and configuration
export const DEFAULT_WATERMARK_SETTINGS = {
  position: "bottom-right" as const,
  size: 20,
  opacity: 80,
  type: "image" as const,
  text: "Watermark",
  fontSize: 48,
  color: "#ffffff",
  rotation: 0,
  shadow: false,
  shadowColor: "#000000",
  shadowBlur: 5,
}

export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]

export const EXPORT_FORMATS = [
  { value: "png", label: "PNG (Best Quality)", mimeType: "image/png" },
  { value: "jpg", label: "JPG (Smaller Size)", mimeType: "image/jpeg" },
  { value: "webp", label: "WebP (Modern)", mimeType: "image/webp" },
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_IMAGE_DIMENSION = 4096
export const MIN_IMAGE_DIMENSION = 50

export const CANVAS_OPTIONS = {
  DEFAULT_GRID_SIZE: 50,
  DEFAULT_BACKGROUND_COLOR: "#ffffff",
  QUALITY_HIGH: 0.95,
  QUALITY_MEDIUM: 0.8,
  QUALITY_LOW: 0.6,
}

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
}
