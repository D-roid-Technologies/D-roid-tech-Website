"use client"

// Image upload area component
import type React from "react"
import { useRef } from "react"
import { Upload, X } from "lucide-react"
import { useDragAndDrop } from "../hooks/useDragAndDrop"
import Button from "./ui/Button"

interface ImageUploadAreaProps {
  onImageUpload: (file: File) => Promise<void>
  onError?: (error: string) => void
  currentImage?: HTMLImageElement | null
  onRemoveImage?: () => void
  title: string
  description: string
  accept?: string
  className?: string
  compact?: boolean
  loading?: boolean
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  onImageUpload,
  onError,
  currentImage,
  onRemoveImage,
  title,
  description,
  accept = "image/*",
  className = "",
  compact = false,
  loading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isDragging, dragHandlers } = useDragAndDrop({
    onDrop: async (files) => {
      if (files.length > 0) {
        try {
          await onImageUpload(files[0])
        } catch (error) {
          onError?.(error instanceof Error ? error.message : "Upload failed")
        }
      }
    },
    onError,
    acceptedTypes: [accept],
    maxFiles: 1,
  })

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await onImageUpload(file)
      } catch (error) {
        onError?.(error instanceof Error ? error.message : "Upload failed")
      }
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    onRemoveImage?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`wt-upload-area ${className}`}>
      <div
        className={`
          wt-upload-area__dropzone 
          ${isDragging ? "wt-upload-area__dropzone--dragging" : ""}
          ${compact ? "wt-upload-area__dropzone--compact" : ""}
          ${loading ? "wt-upload-area__dropzone--loading" : ""}
        `}
        {...dragHandlers}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="wt-upload-area__input"
          disabled={loading}
        />

        {currentImage ? (
          <div className="wt-upload-area__preview">
            <img src={currentImage.src || "/placeholder.svg"} alt={title} className="wt-upload-area__image" />
            <div className="wt-upload-area__overlay">
              <Button variant="danger" size="sm" onClick={handleRemoveImage} disabled={loading}>
                <X size={16} />
                Remove
              </Button>
              <Button variant="outline" size="sm" onClick={handleBrowseClick} disabled={loading}>
                <Upload size={16} />
                Replace
              </Button>
            </div>
          </div>
        ) : (
          <div className="wt-upload-area__empty">
            <Upload className="wt-upload-area__icon" />
            <h4 className="wt-upload-area__title">{title}</h4>
            <p className="wt-upload-area__description">{description}</p>
            <Button variant="outline" onClick={handleBrowseClick} loading={loading} disabled={loading}>
              Choose File
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploadArea
