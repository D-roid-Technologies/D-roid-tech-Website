"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import {

  
  ImageIcon,
  
 

  

  Zap,


} from "lucide-react"
import "./BackgroundRemover.css"
import BackgroundRemoverItem from "./BackgroundRemoverItem"

interface ProcessingState {
  isProcessing: boolean
  progress: number
  stage: string
}

interface BackgroundRemoverProps {
  onClose?: () => void
}

const BackgroundRemove: React.FC<BackgroundRemoverProps> = ({ onClose }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    stage: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState<"png" | "webp" | "jpeg">("png")
  const [outputQuality, setOutputQuality] = useState<number>(0.9)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string>("")
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const originalImageRef = useRef<HTMLImageElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return
    }

    if (file.size > 12 * 1024 * 1024) {
      setError("File size must be less than 12MB for Remove.bg")
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
      setProcessedImage(null)
    }
    reader.readAsDataURL(file)
  }

  // Convert data URL to blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",")
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  // Remove.bg API integration
  const removeBackgroundWithRemoveBg = async (imageBlob: Blob): Promise<string> => {
    if (!apiKey.trim()) {
      throw new Error("Please enter your Remove.bg API key in settings")
    }

    const formData = new FormData()
    formData.append("image_file", imageBlob)
    formData.append("size", "auto")

    setProcessing((prev) => ({ ...prev, stage: "Uploading to D'roid.bg...", progress: 20 }))

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey.trim(),
      },
      body: formData,
    })

    setProcessing((prev) => ({ ...prev, stage: "Processing with AI...", progress: 60 }))

    if (!response.ok) {
      if (response.status === 402) {
        throw new Error("D'roid.bg: Insufficient credits. Please check your account.")
      } else if (response.status === 403) {
        throw new Error("D'roid.bg: Invalid API key. Please check your API key.")
      } else if (response.status === 400) {
        throw new Error("D'roid.bg: Invalid image format or size.")
      } else {
        throw new Error(`D'roid.bg API error: ${response.status} - ${response.statusText}`)
      }
    }

    setProcessing((prev) => ({ ...prev, stage: "Downloading result...", progress: 80 }))

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  }

  // Convert image format
  const convertImageFormat = async (imageUrl: string, format: string, quality: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")!

        canvas.width = img.width
        canvas.height = img.height

        if (format === "jpeg") {
          // Add white background for JPEG
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx.drawImage(img, 0, 0)

        const mimeType = format === "jpeg" ? "image/jpeg" : `image/${format}`
        const dataUrl = canvas.toDataURL(mimeType, quality)
        resolve(dataUrl)
      }
      img.src = imageUrl
    })
  }

  // Main processing function
  const processImage = async () => {
    if (!originalImage) return

    if (!apiKey.trim()) {
      setError("Please enter your Remove.bg API key in the settings panel")
      setShowSettings(true)
      return
    }

    setProcessing({
      isProcessing: true,
      progress: 0,
      stage: "Preparing image...",
    })

    try {
      // Convert image to blob for API upload
      const imageBlob = dataURLtoBlob(originalImage)

      // Process with Remove.bg
      let result = await removeBackgroundWithRemoveBg(imageBlob)

      // Convert to desired format if needed
      if (outputFormat !== "png") {
        setProcessing((prev) => ({ ...prev, stage: "Converting format...", progress: 90 }))
        result = await convertImageFormat(result, outputFormat, outputQuality)
      }

      setProcessing((prev) => ({ ...prev, stage: "Complete!", progress: 100 }))
      setProcessedImage(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process image"
      setError(errorMessage)
      console.error("Processing error:", err)
    } finally {
      setProcessing({
        isProcessing: false,
        progress: 0,
        stage: "",
      })
    }
  }

 




  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("removebg_api_key")
    if (savedApiKey) {
      setApiKey(savedApiKey)
    } else {
      // Set the provided API key as default
      setApiKey("1pMdn4xEsgg8T4rrWtcX91Eu")
      localStorage.setItem("removebg_api_key", "1pMdn4xEsgg8T4rrWtcX91Eu")
    }
  }, [])

  return (
    <div className="airbg-container">
      <div className="airbg-header">
        <div className="airbg-header-content">
          <ImageIcon className="airbg-header-icon" />
          <h1 className="airbg-title">D'roid.bg Background Remover</h1>
          <p className="airbg-subtitle">Professional background removal using advanced AI technology</p>
          {apiKey && (
            <div className="airbg-api-status">
              <Zap size={16} />
              D'roid.bg API Connected - Ready to process!
            </div>
          )}
        </div>
      </div>
      <BackgroundRemoverItem/>

      <div className="airbg-features">
        <div className="airbg-feature">
          <div className="airbg-feature-icon">🏆</div>
          <h3>Industry Leading</h3>
          <p>Remove.bg is the most trusted background removal service used by millions</p>
        </div>
        <div className="airbg-feature">
          <div className="airbg-feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Professional results in seconds with cloud-powered AI processing</p>
        </div>
        <div className="airbg-feature">
          <div className="airbg-feature-icon">🎯</div>
          <h3>Perfect Quality</h3>
          <p>Precise edge detection and subject preservation for flawless results</p>
        </div>
      </div>
    </div>
  )
}

export default BackgroundRemove
