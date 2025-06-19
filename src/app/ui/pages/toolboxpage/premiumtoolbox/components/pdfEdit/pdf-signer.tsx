"use client"

import React, { useState, useRef, useCallback } from "react"
import { FaSignature, FaDownload, FaEraser } from "react-icons/fa"
import type { PDFFile } from "./pdf-editor"

interface PDFSignerProps {
  selectedFile: PDFFile | null
}

interface Signature {
  id: string
  dataUrl: string
  x: number
  y: number
  width: number
  height: number
}

const PDFSigner: React.FC<PDFSignerProps> = ({ selectedFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null)
  const [signatures, setSignatures] = useState<Signature[]>([])
  const [isDrawingSignature, setIsDrawingSignature] = useState(false)
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [signatureText, setSignatureText] = useState("")
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw")

  const createSignature = useCallback(() => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (signatureMode === "type" && signatureText.trim()) {
      // Create typed signature
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = "32px cursive"
      ctx.fillStyle = "#000000"
      ctx.textAlign = "center"
      ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2 + 10)
    }

    const dataUrl = canvas.toDataURL()
    const newSignature: Signature = {
      id: Date.now().toString(),
      dataUrl,
      x: 100,
      y: 100,
      width: 200,
      height: 80,
    }

    setSignatures((prev) => [...prev, newSignature])
    setShowSignaturePad(false)
    clearSignaturePad()
  }, [signatureMode, signatureText])

  const clearSignaturePad = () => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureText("")
  }

  const startDrawingSignature = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (signatureMode !== "draw") return

    setIsDrawingSignature(true)
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const drawSignature = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingSignature || signatureMode !== "draw") return

    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawingSignature = () => {
    setIsDrawingSignature(false)
  }

  const placeSignatureOnPDF = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (signatures.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Use the most recent signature
    const latestSignature = signatures[signatures.length - 1]
    const updatedSignature = {
      ...latestSignature,
      x,
      y,
    }

    setSignatures((prev) => [...prev.slice(0, -1), updatedSignature])
    redrawPDFWithSignatures()
  }

  const redrawPDFWithSignatures = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear and redraw PDF background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000000"
    ctx.font = "16px Arial"
    ctx.fillText(`PDF: ${selectedFile?.name || "Document"}`, 20, 30)
    ctx.fillText("(PDF content would be rendered here)", 20, 60)
    ctx.fillText("Click to place signature", 20, 90)

    // Draw border
    ctx.strokeStyle = "#cccccc"
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Draw signatures
    signatures.forEach((signature) => {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, signature.x, signature.y, signature.width, signature.height)
      }
      img.src = signature.dataUrl
    })
  }

  const downloadSignedPDF = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    redrawPDFWithSignatures()

    setTimeout(() => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `signed_${selectedFile?.name || "document"}.png`
          link.click()
          URL.revokeObjectURL(url)
        }
      })
    }, 100)
  }

  React.useEffect(() => {
    if (selectedFile && canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = 800
      canvas.height = 1000
      redrawPDFWithSignatures()
    }
  }, [selectedFile])

  React.useEffect(() => {
    if (showSignaturePad && signatureCanvasRef.current) {
      const canvas = signatureCanvasRef.current
      canvas.width = 400
      canvas.height = 150

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
      }
    }
  }, [showSignaturePad])

  if (!selectedFile) {
    return (
      <div className="pdf-signer">
        <div className="no-file-selected">
          <FaSignature className="no-file-icon" />
          <h3>No PDF Selected</h3>
          <p>Please select a PDF file from the Upload tab to sign it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pdf-signer">
      <div className="signer-header">
        <h2>
          <FaSignature className="section-icon" />
          Sign PDF
        </h2>
        <p>Add digital signatures to "{selectedFile.name}"</p>
      </div>

      <div className="signer-toolbar">
        <button className="create-signature-btn" onClick={() => setShowSignaturePad(true)}>
          <FaSignature />
          Create Signature
        </button>

        {signatures.length > 0 && (
          <button className="download-btn" onClick={downloadSignedPDF}>
            <FaDownload />
            Download Signed PDF
          </button>
        )}
      </div>

      {showSignaturePad && (
        <div className="signature-modal">
          <div className="signature-modal-content">
            <h3>Create Signature</h3>

            <div className="signature-mode-selector">
              <label className="radio-label">
                <input
                  type="radio"
                  value="draw"
                  checked={signatureMode === "draw"}
                  onChange={(e) => setSignatureMode(e.target.value as "draw")}
                />
                Draw Signature
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="type"
                  checked={signatureMode === "type"}
                  onChange={(e) => setSignatureMode(e.target.value as "type")}
                />
                Type Signature
              </label>
            </div>

            {signatureMode === "draw" && (
              <div className="signature-pad">
                <canvas
                  ref={signatureCanvasRef}
                  className="signature-canvas"
                  onMouseDown={startDrawingSignature}
                  onMouseMove={drawSignature}
                  onMouseUp={stopDrawingSignature}
                  onMouseLeave={stopDrawingSignature}
                />
                <p>Draw your signature above</p>
              </div>
            )}

            {signatureMode === "type" && (
              <div className="signature-text">
                <input
                  type="text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="Type your name"
                  className="signature-input"
                />
                <canvas ref={signatureCanvasRef} className="signature-canvas" />
              </div>
            )}

            <div className="signature-actions">
              <button className="clear-btn" onClick={clearSignaturePad}>
                <FaEraser />
                Clear
              </button>
              <button className="cancel-btn" onClick={() => setShowSignaturePad(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={createSignature}>
                Save Signature
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pdf-canvas-container">
        <canvas ref={canvasRef} className="pdf-canvas" onClick={placeSignatureOnPDF} />
        {signatures.length === 0 && (
          <div className="canvas-overlay">
            <p>Create a signature first, then click on the document to place it</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFSigner
