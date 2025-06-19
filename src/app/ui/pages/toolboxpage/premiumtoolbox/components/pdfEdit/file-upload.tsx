"use client"

import type React from "react"
import { useCallback, useState, useRef } from "react"
import { FaUpload, FaFilePdf, FaTrash, FaEye } from "react-icons/fa"
import type { PDFFile } from "./pdf-editor"

interface FileUploadProps {
  pdfFiles: PDFFile[]
  onFileAdd: (file: File) => void
  onFileRemove: (id: string) => void
  selectedFile: PDFFile | null
  onFileSelect: (file: PDFFile) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ pdfFiles, onFileAdd, onFileRemove, selectedFile, onFileSelect }) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      files.forEach((file) => {
        if (file.type === "application/pdf") {
          onFileAdd(file)
        }
      })
    },
    [onFileAdd],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      files.forEach((file) => {
        if (file.type === "application/pdf") {
          onFileAdd(file)
        }
      })
      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [onFileAdd],
  )

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="file-upload">
      <div className="upload-section">
        <div
          className={`drop-zone ${dragOver ? "drag-over" : ""}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={handleDropZoneClick}
        >
          <FaUpload className="upload-icon" />
          <h3>Drop PDF files here or click to browse</h3>
          <p>Support for multiple PDF files</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileInput}
            className="file-input"
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="files-section">
        <h3>Uploaded Files ({pdfFiles.length})</h3>
        {pdfFiles.length === 0 ? (
          <div className="no-files">
            <FaFilePdf className="no-files-icon" />
            <p>No PDF files uploaded yet</p>
          </div>
        ) : (
          <div className="files-list">
            {pdfFiles.map((file) => (
              <div
                key={file.id}
                className={`file-item ${selectedFile?.id === file.id ? "selected" : ""}`}
                onClick={() => onFileSelect(file)}
              >
                <div className="file-info">
                  <FaFilePdf className="file-icon" />
                  <div className="file-details">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{formatFileSize(file.file.size)}</div>
                  </div>
                </div>
                <div className="file-actions">
                  <button
                    className="action-btn view-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onFileSelect(file)
                    }}
                    title="Select for editing"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onFileRemove(file.id)
                    }}
                    title="Remove file"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload
