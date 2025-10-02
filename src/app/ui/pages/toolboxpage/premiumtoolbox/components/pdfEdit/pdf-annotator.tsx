"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  FaEdit,
  FaPen,
  FaHighlighter,
  FaSquare,
  FaCircle,
  FaFont,
  FaDownload,
  FaUndo,
  FaRedo,
  FaChevronLeft,
  FaChevronRight,
  FaImage,
} from "react-icons/fa"
import { PDFDocument, rgb } from "pdf-lib"
import PDFViewer from "./pdf-viewer"
import type { PDFFile } from "./pdf-editor"

interface PDFAnnotatorProps {
  selectedFile: PDFFile | null
}

interface Annotation {
  id: string
  type: "pen" | "highlight" | "rectangle" | "circle" | "text" | "image"
  x: number
  y: number
  width?: number
  height?: number
  points?: { x: number; y: number }[]
  text?: string
  color: string
  strokeWidth: number
  pageNumber: number
  imageData?: string
}

const PDFAnnotator: React.FC<PDFAnnotatorProps> = ({ selectedFile }) => {
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [currentTool, setCurrentTool] = useState<"pen" | "highlight" | "rectangle" | "circle" | "text" | "image">("pen")
  const [currentColor, setCurrentColor] = useState("#ff0000")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null)
  const [undoStack, setUndoStack] = useState<Annotation[][]>([])
  const [redoStack, setRedoStack] = useState<Annotation[][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.5)

  const tools = [
    { id: "pen", label: "Pen", icon: FaPen },
    { id: "highlight", label: "Highlight", icon: FaHighlighter },
    { id: "rectangle", label: "Rectangle", icon: FaSquare },
    { id: "circle", label: "Circle", icon: FaCircle },
    { id: "text", label: "Text", icon: FaFont },
    { id: "image", label: "Image", icon: FaImage },
  ]

  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#000000"]

  const handlePageRender = useCallback(
    (pageNumber: number, pdfCanvas: HTMLCanvasElement) => {
      const overlayCanvas = overlayCanvasRef.current
      if (overlayCanvas) {
        overlayCanvas.width = pdfCanvas.width
        overlayCanvas.height = pdfCanvas.height
        overlayCanvas.style.width = pdfCanvas.style.width
        overlayCanvas.style.height = pdfCanvas.style.height
        overlayCanvas.style.position = "absolute"
        overlayCanvas.style.top = "0"
        overlayCanvas.style.left = "0"

        redrawAnnotations()
      }
    },
    [annotations, currentPage],
  )

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = overlayCanvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)
    setIsDrawing(true)

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: currentTool,
      x: pos.x,
      y: pos.y,
      color: currentColor,
      strokeWidth: strokeWidth,
      pageNumber: currentPage,
      points: currentTool === "pen" ? [pos] : undefined,
    }

    if (currentTool === "text") {
      const text = prompt("Enter text:")
      if (text) {
        newAnnotation.text = text
        addAnnotation(newAnnotation)
      }
      setIsDrawing(false)
      return
    }

    if (currentTool === "image") {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            newAnnotation.imageData = e.target?.result as string
            newAnnotation.width = 100
            newAnnotation.height = 100
            addAnnotation(newAnnotation)
          }
          reader.readAsDataURL(file)
        }
      }
      input.click()
      setIsDrawing(false)
      return
    }

    setCurrentAnnotation(newAnnotation)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation) return

    const pos = getMousePos(e)

    if (currentTool === "pen") {
      setCurrentAnnotation((prev) =>
        prev
          ? {
              ...prev,
              points: [...(prev.points || []), pos],
            }
          : null,
      )
    } else {
      setCurrentAnnotation((prev) =>
        prev
          ? {
              ...prev,
              width: pos.x - prev.x,
              height: pos.y - prev.y,
            }
          : null,
      )
    }

    redrawAnnotations()
  }

  const stopDrawing = () => {
    if (currentAnnotation && isDrawing) {
      addAnnotation(currentAnnotation)
    }
    setIsDrawing(false)
    setCurrentAnnotation(null)
  }

  const addAnnotation = (annotation: Annotation) => {
    setUndoStack((prev) => [...prev, annotations])
    setRedoStack([])
    setAnnotations((prev) => [...prev, annotation])
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1]
      setRedoStack((prev) => [annotations, ...prev])
      setAnnotations(previousState)
      setUndoStack((prev) => prev.slice(0, -1))
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0]
      setUndoStack((prev) => [...prev, annotations])
      setAnnotations(nextState)
      setRedoStack((prev) => prev.slice(1))
    }
  }

  const redrawAnnotations = () => {
    const canvas = overlayCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const pageAnnotations = annotations.filter((ann) => ann.pageNumber === currentPage)
    pageAnnotations.forEach((annotation) => {
      drawAnnotation(ctx, annotation)
    })

    if (currentAnnotation && currentAnnotation.pageNumber === currentPage) {
      drawAnnotation(ctx, currentAnnotation)
    }
  }

  const drawAnnotation = (ctx: CanvasRenderingContext2D, annotation: Annotation) => {
    ctx.strokeStyle = annotation.color
    ctx.fillStyle = annotation.type === "highlight" ? annotation.color + "40" : annotation.color
    ctx.lineWidth = annotation.strokeWidth

    switch (annotation.type) {
      case "pen":
        if (annotation.points && annotation.points.length > 1) {
          ctx.beginPath()
          ctx.moveTo(annotation.points[0].x, annotation.points[0].y)
          annotation.points.forEach((point) => {
            ctx.lineTo(point.x, point.y)
          })
          ctx.stroke()
        }
        break

      case "highlight":
        if (annotation.width && annotation.height) {
          ctx.fillRect(annotation.x, annotation.y, annotation.width, annotation.height)
        }
        break

      case "rectangle":
        if (annotation.width && annotation.height) {
          ctx.strokeRect(annotation.x, annotation.y, annotation.width, annotation.height)
        }
        break

      case "circle":
        if (annotation.width && annotation.height) {
          const radius = Math.sqrt(annotation.width ** 2 + annotation.height ** 2) / 2
          ctx.beginPath()
          ctx.arc(annotation.x + annotation.width / 2, annotation.y + annotation.height / 2, radius, 0, 2 * Math.PI)
          ctx.stroke()
        }
        break

      case "text":
        if (annotation.text) {
          ctx.font = `${annotation.strokeWidth * 8}px Arial`
          ctx.fillText(annotation.text, annotation.x, annotation.y)
        }
        break

      case "image":
      if (
  annotation.imageData &&
  typeof annotation.width === "number" &&
  typeof annotation.height === "number"
) {
  const img = new Image()
  img.src = annotation.imageData
  img.onload = () => {
    ctx.drawImage(img, annotation.x, annotation.y, annotation.width!, annotation.height!)
  }
}

        break
    }
  }

  const downloadAnnotatedPDF = async () => {
    if (!selectedFile) return

    try {
      const arrayBuffer = await selectedFile.file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      // Group annotations by page
      const annotationsByPage = annotations.reduce(
        (acc, ann) => {
          if (!acc[ann.pageNumber]) {
            acc[ann.pageNumber] = []
          }
          acc[ann.pageNumber].push(ann)
          return acc
        },
        {} as Record<number, Annotation[]>,
      )

      // Add annotations to each page
      for (const [pageNum, pageAnnotations] of Object.entries(annotationsByPage)) {
        const page = pdfDoc.getPage(Number.parseInt(pageNum) - 1)
        const { height } = page.getSize()

        for (const ann of pageAnnotations) {
          // Convert canvas coordinates to PDF coordinates (flip Y axis)
          const pdfY = height - ann.y

          // Parse color
          const colorMatch = ann.color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
          const r = colorMatch ? Number.parseInt(colorMatch[1], 16) / 255 : 1
          const g = colorMatch ? Number.parseInt(colorMatch[2], 16) / 255 : 0
          const b = colorMatch ? Number.parseInt(colorMatch[3], 16) / 255 : 0

          if (ann.type === "text" && ann.text) {
            page.drawText(ann.text, {
              x: ann.x,
              y: pdfY,
              size: ann.strokeWidth * 8,
              color: rgb(r, g, b),
            })
          } else if (ann.type === "rectangle" && ann.width && ann.height) {
            page.drawRectangle({
              x: ann.x,
              y: pdfY - ann.height,
              width: ann.width,
              height: ann.height,
              borderColor: rgb(r, g, b),
              borderWidth: ann.strokeWidth,
            })
          }
          // Note: pdf-lib has limited drawing capabilities
          // For complex annotations, consider rendering canvas to image and embedding
        }
      }

      const pdfBytes = await pdfDoc.save()
      //@ts-ignore
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `annotated-${selectedFile.name}`
      link.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting annotated PDF:", error)
      alert("Error exporting PDF. Some annotations may not be supported.")
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    redrawAnnotations()
  }, [annotations, currentPage])

  if (!selectedFile) {
    return (
      <div className="pdf-annotator">
        <div className="no-file-selected">
          <FaEdit className="no-file-icon" />
          <h3>No PDF Selected</h3>
          <p>Please select a PDF file from the Upload tab to annotate it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pdf-annotator">
      <div className="annotator-header">
        <h2>
          <FaEdit className="section-icon" />
          Annotate PDF
        </h2>
        <p>Add annotations to "{selectedFile.name}"</p>
      </div>

      <div className="annotator-toolbar">
        <div className="tool-group">
          <label>Tools:</label>
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`tool-btn ${currentTool === tool.id ? "active" : ""}`}
              onClick={() => setCurrentTool(tool.id as typeof currentTool)}
              title={tool.label}
            >
              <tool.icon />
            </button>
          ))}
        </div>

        <div className="tool-group">
          <label>Color:</label>
          <div className="color-palette">
            {colors.map((color) => (
              <button
                key={color}
                className={`color-btn ${currentColor === color ? "active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="tool-group">
          <label>Stroke Width:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number.parseInt(e.target.value))}
          />
          <span>{strokeWidth}px</span>
        </div>

        <div className="tool-group">
          <label>Zoom:</label>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(Number.parseFloat(e.target.value))}
          />
          <span>{Math.round(scale * 100)}%</span>
        </div>

        <div className="tool-group">
          <button className="action-btn" onClick={undo} disabled={undoStack.length === 0} title="Undo">
            <FaUndo />
          </button>
          <button className="action-btn" onClick={redo} disabled={redoStack.length === 0} title="Redo">
            <FaRedo />
          </button>
        </div>

        <div className="tool-group">
          <button className="download-btn" onClick={downloadAnnotatedPDF}>
            <FaDownload />
            Download
          </button>
        </div>
      </div>

      <div className="page-navigation">
        <button onClick={prevPage} disabled={currentPage <= 1}>
          <FaChevronLeft />
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage >= totalPages}>
          Next
          <FaChevronRight />
        </button>
      </div>

      <div className="annotator-canvas-container">
        <div className="pdf-container" ref={containerRef} style={{ position: "relative" }}>
          <PDFViewer
            pdfFile={selectedFile}
            onPageRender={handlePageRender}
            currentPage={currentPage}
            scale={scale}
            onLoadSuccess={setTotalPages}
          />
          <canvas
            ref={overlayCanvasRef}
            className="annotation-overlay"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              cursor: "crosshair",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PDFAnnotator
