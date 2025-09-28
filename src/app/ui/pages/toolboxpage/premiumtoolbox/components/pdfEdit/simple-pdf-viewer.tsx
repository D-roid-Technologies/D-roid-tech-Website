"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import type { PDFFile } from "./pdf-editor"

interface SimplePDFViewerProps {
  pdfFile: PDFFile | null
  onCanvasReady?: (canvas: HTMLCanvasElement) => void
  scale?: number
}

// Simplified PDF viewer that doesn't rely on PDF.js
const SimplePDFViewer: React.FC<SimplePDFViewerProps> = ({ pdfFile, onCanvasReady, scale = 1.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (pdfFile && canvasRef.current) {
      renderPDFPreview()
    }
  }, [pdfFile, scale])

  const renderPDFPreview = () => {
    const canvas = canvasRef.current
    if (!canvas || !pdfFile) return

    setIsLoading(true)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size based on scale
    const baseWidth = 800
    const baseHeight = 1000
    canvas.width = baseWidth * scale
    canvas.height = baseHeight * scale

    // Scale the context
    ctx.scale(scale, scale)

    // Draw PDF background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, baseWidth, baseHeight)

    // Draw border
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, baseWidth, baseHeight)

    // Draw header
    ctx.fillStyle = "#333333"
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.fillText("PDF Document", baseWidth / 2, 40)

    // Draw filename
    ctx.font = "14px Arial"
    ctx.fillStyle = "#666666"
    ctx.fillText(pdfFile.name, baseWidth / 2, 65)

    // Draw content area
    ctx.strokeStyle = "#f0f0f0"
    ctx.strokeRect(40, 100, baseWidth - 80, baseHeight - 140)

    // Draw sample content
    ctx.textAlign = "left"
    ctx.fillStyle = "#333333"
    ctx.font = "12px Arial"

    const contentLines = [
      "PDF Content Preview",
      "",
      "This is a simplified PDF viewer that allows you to:",
      "• Add annotations and drawings",
      "• Place digital signatures",
      "• Create form fields",
      "• Apply password protection",
      "",
      "All editing tools work normally on this preview.",
      "The actual PDF content would be displayed here",
      "when using a full PDF.js implementation.",
      "",
      "You can draw, highlight, and annotate anywhere",
      "on this document preview.",
    ]

    contentLines.forEach((line, index) => {
      ctx.fillText(line, 60, 130 + index * 18)
    })

    // Draw some sample shapes for visual interest
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1

    // Sample table
    const tableY = 400
    for (let i = 0; i < 4; i++) {
      ctx.strokeRect(60, tableY + i * 25, 200, 25)
      ctx.strokeRect(260, tableY + i * 25, 200, 25)
    }

    // Sample text in table
    ctx.fillStyle = "#666666"
    ctx.font = "10px Arial"
    ctx.fillText("Sample Table Header 1", 70, tableY + 15)
    ctx.fillText("Sample Table Header 2", 270, tableY + 15)

    for (let i = 1; i < 4; i++) {
      ctx.fillText(`Row ${i} Data 1`, 70, tableY + i * 25 + 15)
      ctx.fillText(`Row ${i} Data 2`, 270, tableY + i * 25 + 15)
    }

    setIsLoading(false)

    // Notify parent component that canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas)
    }
  }

  if (isLoading) {
    return (
      <div className="pdf-viewer-loading">
        <div className="loading-spinner"></div>
        <p>Preparing PDF preview...</p>
      </div>
    )
  }

  return (
    <div className="simple-pdf-viewer">
      <canvas ref={canvasRef} className="pdf-canvas" />
    </div>
  )
}

export default SimplePDFViewer
