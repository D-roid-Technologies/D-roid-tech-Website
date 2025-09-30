"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import * as pdfjsLib from "pdfjs-dist"
//@ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js"

// 👇 Tell pdf.js to use the worker from node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString()

interface PDFFile {
  file: File
  name: string
  url?: string
}

interface PDFViewerProps {
  pdfFile: PDFFile | null
  className?: string
  onPageRender?: (pageNumber: number, canvas: HTMLCanvasElement) => void
  currentPage?: number
  scale?: number
  onLoadSuccess?: (numPages: number) => void
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfFile,
  className = "",
  onPageRender,
  currentPage = 1,
  scale = 1.5,
  onLoadSuccess,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState(0)

  const loadPDF = useCallback(
    async (file: File) => {
      setIsLoading(true)
      setError(null)
      try {
        const arrayBuffer = await file.arrayBuffer()
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
        const pdf = await loadingTask.promise
        setPdfDoc(pdf)
        setNumPages(pdf.numPages)
        onLoadSuccess?.(pdf.numPages)
      } catch (err) {
        console.error("PDF load error:", err)
        setError("Failed to load PDF file.")
      } finally {
        setIsLoading(false)
      }
    },
    [onLoadSuccess]
  )

  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return
      try {
        const page = await pdfDoc.getPage(pageNum)
        const viewport = page.getViewport({ scale })
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return
        canvas.height = viewport.height
        canvas.width = viewport.width
        await page.render({ canvasContext: context, viewport }).promise
        onPageRender?.(pageNum, canvas)
      } catch (err) {
        console.error("Page render error:", err)
        setError("Failed to render PDF page.")
      }
    },
    [pdfDoc, scale, onPageRender]
  )

  useEffect(() => {
    if (pdfFile?.file) loadPDF(pdfFile.file)
  }, [pdfFile, loadPDF])

  useEffect(() => {
    if (pdfDoc && currentPage > 0 && currentPage <= numPages) {
      renderPage(currentPage)
    }
  }, [pdfDoc, currentPage, numPages, renderPage])

  if (!pdfFile) {
    return <div>No PDF selected</div>
  }
  if (isLoading) return <div>Loading PDF...</div>
  if (error) return <div style={{ color: "red" }}>{error}</div>

  return (
    <div className={`pdf-viewer ${className}`}>
      <canvas ref={canvasRef} style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  )
}

export default PDFViewer
