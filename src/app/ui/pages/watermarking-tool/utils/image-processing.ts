// Image processing utilities
import type { ImageUploadResult } from "../types"

export const validateImageFile = (
  file: File,
  allowedFormats: string[] = ["image/jpeg", "image/png", "image/webp"],
): boolean => {
  return allowedFormats.includes(file.type)
}

export const resizeImageIfNeeded = (image: HTMLImageElement, maxSize = 2048): HTMLCanvasElement => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  let { width, height } = image

  // Calculate new dimensions if image is too large
  if (width > maxSize || height > maxSize) {
    const ratio = Math.min(maxSize / width, maxSize / height)
    width = width * ratio
    height = height * ratio
  }

  canvas.width = width
  canvas.height = height

  ctx.drawImage(image, 0, 0, width, height)
  return canvas
}

export const loadImageFromFile = (file: File): Promise<ImageUploadResult> => {
  return new Promise((resolve, reject) => {
    if (!validateImageFile(file)) {
      reject(new Error("Invalid file format. Please upload a valid image file."))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          image: img,
          file,
          dimensions: {
            width: img.width,
            height: img.height,
          },
        })
      }
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })
}

export const getImageDataUrl = (canvas: HTMLCanvasElement, format: string, quality = 0.95): string => {
  switch (format) {
    case "jpg":
    case "jpeg":
      return canvas.toDataURL("image/jpeg", quality)
    case "webp":
      return canvas.toDataURL("image/webp", quality)
    default:
      return canvas.toDataURL("image/png")
  }
}

export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement("a")
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const getFileSizeFromDataUrl = (dataUrl: string): number => {
  const base64 = dataUrl.split(",")[1]
  const bytes = atob(base64).length
  return bytes
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
