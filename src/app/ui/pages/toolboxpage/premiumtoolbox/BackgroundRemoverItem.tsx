"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import {
  Upload,
  X,
  ImageIcon,
  Download,
  Loader2,
  RotateCcw,
  Settings,
  ChevronDown,
  Zap,
  Key,
  ExternalLink,
} from "lucide-react"
import './BackgroundRemover.css'
interface ProcessingState {
  isProcessing: boolean
  progress: number
  stage: string
}

interface BackgroundRemoverProps {
  onClose?: () => void
}

const BackgroundRemoverItem: React.FC<BackgroundRemoverProps> = ({ onClose }) => {
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

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    const formatExtension = outputFormat === "jpeg" ? "jpg" : outputFormat
    link.download = `background-removed-${Date.now()}.${formatExtension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetImages = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("removebg_api_key", apiKey.trim())
      setShowApiKeyInput(false)
      setError(null)
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
     

      <div className="airbg-main">
        {!originalImage ? (
          <div
            className={`airbg-upload-zone ${dragActive ? "airbg-drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="airbg-upload-icon" />
            <h3 className="airbg-upload-title">Drop your image here</h3>
            <p className="airbg-upload-text">or click to browse files</p>
            <div className="airbg-upload-formats">
              <span>Supports: JPG, PNG, WEBP</span>
              <span>Max size: 12MB</span>
            </div>
            <div className="airbg-removebg-note">
              <Zap size={16} />
              <span>Powered by D'roid.bg • Advanced AI Processing</span>
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
                <RotateCcw size={16} />
                Start Over
              </button>
            </div>

            <div className="airbg-settings-panel">
              <button onClick={() => setShowSettings(!showSettings)} className="airbg-settings-toggle">
                <Settings size={16} />
                API & Output Settings
                <ChevronDown size={16} className={showSettings ? "rotate-180" : ""} />
              </button>

              {showSettings && (
                <div className="airbg-settings-content">
                  <div className="airbg-setting-group">
                    <label className="airbg-setting-label">D'roid.bg API Key</label>
                    {!showApiKeyInput && apiKey ? (
                      <div className="airbg-api-key-display">
                        <div className="airbg-api-key-masked">
                          <Key size={16} />
                          <span>API Key: ••••••••{apiKey.slice(-4)}</span>
                          <button onClick={() => setShowApiKeyInput(true)} className="airbg-change-key-btn">
                            Change
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="airbg-api-key-input">
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter your Remove.bg API key"
                          className="airbg-setting-input"
                        />
                        <button onClick={saveApiKey} className="airbg-save-key-btn">
                          Save
                        </button>
                      </div>
                    )}
                    <div className="airbg-api-help">
                      <ExternalLink size={14} />
                      <span>Powered by advanced AI technology for professional results</span>
                    </div>
                  </div>

                  <div className="airbg-setting-group">
                    <label className="airbg-setting-label">Output Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value as "png" | "webp" | "jpeg")}
                      className="airbg-setting-select"
                    >
                      <option value="png">PNG (Lossless, Transparent)</option>
                      <option value="webp">WebP (Modern, Smaller Size)</option>
                      <option value="jpeg">JPEG (Smallest Size, No Transparency)</option>
                    </select>
                  </div>

                  {(outputFormat === "webp" || outputFormat === "jpeg") && (
                    <div className="airbg-setting-group">
                      <label className="airbg-setting-label">Quality: {Math.round(outputQuality * 100)}%</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={outputQuality}
                        onChange={(e) => setOutputQuality(Number.parseFloat(e.target.value))}
                        className="airbg-setting-slider"
                      />
                      <div className="airbg-quality-labels">
                        <span>Lower Size</span>
                        <span>Higher Quality</span>
                      </div>
                    </div>
                  )}

                  {outputFormat === "jpeg" && (
                    <div className="airbg-setting-note">
                      <X size={14} />
                      Note: JPEG format doesn't support transparency. Background will be white.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="airbg-image-grid">
              <div className="airbg-image-panel">
                <div className="airbg-panel-header">
                  <ImageIcon size={16} />
                  <span>Original</span>
                </div>
                <div className="airbg-image-container">
                  <img
                    ref={originalImageRef}
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="airbg-image"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>

              <div className="airbg-image-panel">
                <div className="airbg-panel-header">
                  <Zap size={16} />
                  <span>Background Removed</span>
                </div>
                <div className="airbg-image-container airbg-transparent-bg">
                  {processing.isProcessing ? (
                    <div className="airbg-processing">
                      <Loader2 className="airbg-spinner" />
                      <div className="airbg-progress-info">
                        <div className="airbg-progress-text">{processing.stage}</div>
                        <div className="airbg-progress-bar">
                          <div className="airbg-progress-fill" style={{ width: `${processing.progress}%` }} />
                        </div>
                        <div className="airbg-progress-percent">{Math.round(processing.progress)}%</div>
                      </div>
                    </div>
                  ) : processedImage ? (
                    <img src={processedImage || "/placeholder.svg"} alt="Processed" className="airbg-image" />
                  ) : (
                    <div className="airbg-placeholder">
                      <Zap className="airbg-placeholder-icon" />
                      <p>Click "Remove Background" to process</p>
                      <p className="airbg-placeholder-subtext">Powered by D'roid.bg AI</p>
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
                  disabled={processing.isProcessing || !apiKey.trim()}
                >
                  <Zap size={18} />
                  Remove Background with D'roid.bg
                </button>
              )}

              {processedImage && (
                <button onClick={downloadImage} className="airbg-btn airbg-btn-success">
                  <Download size={18} />
                  Download Result
                </button>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="airbg-error">
            <X size={16} />
            {error}
          </div>
        )}
      </div>

     
    </div>
  )
}

export default BackgroundRemoverItem
