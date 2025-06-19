"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
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
} from "react-icons/fa";
import PDFViewer from "./pdf-viewer";
import type { PDFFile } from "./pdf-editor";

interface PDFAnnotatorProps {
  selectedFile: PDFFile | null;
}

interface Annotation {
  id: string;
  type: "pen" | "highlight" | "rectangle" | "circle" | "text";
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
  text?: string;
  color: string;
  strokeWidth: number;
  pageNumber: number;
}

const PDFAnnotator: React.FC<PDFAnnotatorProps> = ({ selectedFile }) => {
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentTool, setCurrentTool] = useState<
    "pen" | "highlight" | "rectangle" | "circle" | "text"
  >("pen");
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );
  const [undoStack, setUndoStack] = useState<Annotation[][]>([]);
  const [redoStack, setRedoStack] = useState<Annotation[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);

  const tools = [
    { id: "pen", label: "Pen", icon: FaPen },
    { id: "highlight", label: "Highlight", icon: FaHighlighter },
    { id: "rectangle", label: "Rectangle", icon: FaSquare },
    { id: "circle", label: "Circle", icon: FaCircle },
    { id: "text", label: "Text", icon: FaFont },
  ];

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#000000",
  ];

  const handlePageRender = useCallback(
    (pageNumber: number, pdfCanvas: HTMLCanvasElement) => {
      setTotalPages(Math.max(totalPages, pageNumber));

      // Set up overlay canvas to match PDF canvas
      const overlayCanvas = overlayCanvasRef.current;
      if (overlayCanvas) {
        overlayCanvas.width = pdfCanvas.width;
        overlayCanvas.height = pdfCanvas.height;
        overlayCanvas.style.width = pdfCanvas.style.width;
        overlayCanvas.style.height = pdfCanvas.style.height;

        // Redraw annotations for current page
        redrawAnnotations();
      }
    },
    [totalPages]
  );

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: currentTool,
      x: pos.x,
      y: pos.y,
      color: currentColor,
      strokeWidth: strokeWidth,
      pageNumber: currentPage,
      points: currentTool === "pen" ? [pos] : undefined,
    };

    if (currentTool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        newAnnotation.text = text;
        addAnnotation(newAnnotation);
      }
      setIsDrawing(false);
      return;
    }

    setCurrentAnnotation(newAnnotation);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation) return;

    const pos = getMousePos(e);

    if (currentTool === "pen") {
      setCurrentAnnotation((prev) =>
        prev
          ? {
              ...prev,
              points: [...(prev.points || []), pos],
            }
          : null
      );
    } else {
      setCurrentAnnotation((prev) =>
        prev
          ? {
              ...prev,
              width: pos.x - prev.x,
              height: pos.y - prev.y,
            }
          : null
      );
    }

    redrawAnnotations();
  };

  const stopDrawing = () => {
    if (currentAnnotation && isDrawing) {
      addAnnotation(currentAnnotation);
    }
    setIsDrawing(false);
    setCurrentAnnotation(null);
  };

  const addAnnotation = (annotation: Annotation) => {
    setUndoStack((prev) => [...prev, annotations]);
    setRedoStack([]);
    setAnnotations((prev) => [...prev, annotation]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [annotations, ...prev]);
      setAnnotations(previousState);
      setUndoStack((prev) => prev.slice(0, -1));
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack((prev) => [...prev, annotations]);
      setAnnotations(nextState);
      setRedoStack((prev) => prev.slice(1));
    }
  };

  const redrawAnnotations = () => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the overlay canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw annotations for current page
    const pageAnnotations = annotations.filter(
      (ann) => ann.pageNumber === currentPage
    );
    pageAnnotations.forEach((annotation) => {
      drawAnnotation(ctx, annotation);
    });

    // Draw current annotation being created
    if (currentAnnotation && currentAnnotation.pageNumber === currentPage) {
      drawAnnotation(ctx, currentAnnotation);
    }
  };

  const drawAnnotation = (
    ctx: CanvasRenderingContext2D,
    annotation: Annotation
  ) => {
    ctx.strokeStyle = annotation.color;
    ctx.fillStyle =
      annotation.type === "highlight"
        ? annotation.color + "40"
        : annotation.color;
    ctx.lineWidth = annotation.strokeWidth;

    switch (annotation.type) {
      case "pen":
        if (annotation.points && annotation.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(annotation.points[0].x, annotation.points[0].y);
          annotation.points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.stroke();
        }
        break;

      case "highlight":
        if (annotation.width && annotation.height) {
          ctx.fillRect(
            annotation.x,
            annotation.y,
            annotation.width,
            annotation.height
          );
        }
        break;

      case "rectangle":
        if (annotation.width && annotation.height) {
          ctx.strokeRect(
            annotation.x,
            annotation.y,
            annotation.width,
            annotation.height
          );
        }
        break;

      case "circle":
        if (annotation.width && annotation.height) {
          const radius =
            Math.sqrt(annotation.width ** 2 + annotation.height ** 2) / 2;
          ctx.beginPath();
          ctx.arc(
            annotation.x + annotation.width / 2,
            annotation.y + annotation.height / 2,
            radius,
            0,
            2 * Math.PI
          );
          ctx.stroke();
        }
        break;

      case "text":
        if (annotation.text) {
          ctx.font = `${annotation.strokeWidth * 8}px Arial`;
          ctx.fillText(annotation.text, annotation.x, annotation.y);
        }
        break;
    }
  };

  const downloadAnnotatedPDF = async () => {
    // In a real implementation, you would merge annotations back into the PDF
    // For now, we'll create a combined image of each page
    alert(
      "In a production app, this would merge annotations back into the original PDF using pdf-lib"
    );
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    redrawAnnotations();
  }, [annotations, currentPage]);

  if (!selectedFile) {
    return (
      <div className="pdf-annotator">
        <div className="no-file-selected">
          <FaEdit className="no-file-icon" />
          <h3>No PDF Selected</h3>
          <p>Please select a PDF file from the Upload tab to annotate it.</p>
        </div>
      </div>
    );
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
              onClick={() => setCurrentTool(tool.id as any)}
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
                className={`color-btn ${
                  currentColor === color ? "active" : ""
                }`}
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
          <button
            className="action-btn"
            onClick={undo}
            disabled={undoStack.length === 0}
            title="Undo"
          >
            <FaUndo />
          </button>
          <button
            className="action-btn"
            onClick={redo}
            disabled={redoStack.length === 0}
            title="Redo"
          >
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
        <div className="pdf-container">
          <PDFViewer
            pdfFile={selectedFile}
            onPageRender={handlePageRender}
            scale={scale}
            pageNumber={currentPage}
          />
          <canvas
            ref={overlayCanvasRef}
            className="annotation-overlay"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFAnnotator;
