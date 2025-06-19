"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { FaObjectGroup, FaDownload, FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa"
import { PDFDocument } from "pdf-lib"
import type { PDFFile } from "./pdf-editor"

interface PDFMergerProps {
  pdfFiles: PDFFile[]
}

interface MergeItem {
  id: string
  file: PDFFile
  pages: string
}

const PDFMerger: React.FC<PDFMergerProps> = ({ pdfFiles }) => {
  const [mergeList, setMergeList] = useState<MergeItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [outputFileName, setOutputFileName] = useState("merged-document.pdf")

  const addToMergeList = useCallback((file: PDFFile) => {
    const newItem: MergeItem = {
      id: Date.now().toString(),
      file,
      pages: "all",
    }
    setMergeList((prev) => [...prev, newItem])
  }, [])

  const removeFromMergeList = useCallback((id: string) => {
    setMergeList((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const moveItem = useCallback((id: string, direction: "up" | "down") => {
    setMergeList((prev) => {
      const index = prev.findIndex((item) => item.id === id)
      if (index === -1) return prev

      const newIndex = direction === "up" ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev

      const newList = [...prev]
      const [item] = newList.splice(index, 1)
      newList.splice(newIndex, 0, item)
      return newList
    })
  }, [])

  const updatePages = useCallback((id: string, pages: string) => {
    setMergeList((prev) => prev.map((item) => (item.id === id ? { ...item, pages } : item)))
  }, [])

  const mergePDFs = useCallback(async () => {
    if (mergeList.length === 0) return

    setIsProcessing(true)
    try {
      const mergedPdf = await PDFDocument.create()

      for (const item of mergeList) {
        const arrayBuffer = await item.file.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)

        let pageIndices: number[]
        if (item.pages === "all") {
          pageIndices = Array.from({ length: pdf.getPageCount() }, (_, i) => i)
        } else {
          // Parse page ranges like "1-3,5,7-9"
          pageIndices = parsePageRanges(item.pages, pdf.getPageCount())
        }

        const pages = await mergedPdf.copyPages(pdf, pageIndices)
        pages.forEach((page:any) => mergedPdf.addPage(page))
      }

      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = outputFileName
      link.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error merging PDFs:", error)
      alert("Error merging PDFs. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }, [mergeList, outputFileName])

  const parsePageRanges = (ranges: string, totalPages: number): number[] => {
    const indices: number[] = []
    const parts = ranges.split(",").map((s) => s.trim())

    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map((s) => Number.parseInt(s.trim()) - 1)
        for (let i = Math.max(0, start); i <= Math.min(totalPages - 1, end); i++) {
          if (!indices.includes(i)) indices.push(i)
        }
      } else {
        const pageIndex = Number.parseInt(part) - 1
        if (pageIndex >= 0 && pageIndex < totalPages && !indices.includes(pageIndex)) {
          indices.push(pageIndex)
        }
      }
    }

    return indices.sort((a, b) => a - b)
  }

  return (
    <div className="pdf-merger">
      <div className="merger-header">
        <h2>
          <FaObjectGroup className="section-icon" />
          Merge PDFs
        </h2>
        <p>Combine multiple PDF files into a single document</p>
      </div>

      <div className="merger-content">
        <div className="available-files">
          <h3>Available Files</h3>
          {pdfFiles.length === 0 ? (
            <p className="no-files-message">No PDF files available. Please upload files first.</p>
          ) : (
            <div className="files-grid">
              {pdfFiles.map((file) => (
                <div key={file.id} className="file-card">
                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                  </div>
                  <button
                    className="add-btn"
                    onClick={() => addToMergeList(file)}
                    disabled={mergeList.some((item) => item.file.id === file.id)}
                  >
                    Add to Merge
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="merge-queue">
          <h3>Merge Queue ({mergeList.length})</h3>
          {mergeList.length === 0 ? (
            <p className="empty-queue">No files in merge queue</p>
          ) : (
            <>
              <div className="queue-list">
                {mergeList.map((item, index) => (
                  <div key={item.id} className="queue-item">
                    <div className="item-order">{index + 1}</div>
                    <div className="item-info">
                      <div className="item-name">{item.file.name}</div>
                      <div className="pages-input">
                        <label>Pages:</label>
                        <input
                          type="text"
                          value={item.pages}
                          onChange={(e) => updatePages(item.id, e.target.value)}
                          placeholder="all or 1-3,5,7-9"
                        />
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="move-btn" onClick={() => moveItem(item.id, "up")} disabled={index === 0}>
                        <FaArrowUp />
                      </button>
                      <button
                        className="move-btn"
                        onClick={() => moveItem(item.id, "down")}
                        disabled={index === mergeList.length - 1}
                      >
                        <FaArrowDown />
                      </button>
                      <button className="remove-btn" onClick={() => removeFromMergeList(item.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="merge-controls">
                <div className="output-name">
                  <label>Output filename:</label>
                  <input type="text" value={outputFileName} onChange={(e) => setOutputFileName(e.target.value)} />
                </div>
                <button className="merge-btn" onClick={mergePDFs} disabled={isProcessing || mergeList.length === 0}>
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <FaDownload />
                      Merge & Download
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PDFMerger
