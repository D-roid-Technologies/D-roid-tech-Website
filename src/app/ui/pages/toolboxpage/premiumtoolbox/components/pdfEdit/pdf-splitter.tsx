"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { FaCut, FaDownload } from "react-icons/fa";
import { PDFDocument } from "pdf-lib";
import type { PDFFile } from "./pdf-editor";

interface PDFSplitterProps {
  selectedFile: PDFFile | null;
}

const PDFSplitter: React.FC<PDFSplitterProps> = ({ selectedFile }) => {
  const [splitMethod, setSplitMethod] = useState<"pages" | "ranges">("pages");
  const [pageRanges, setPageRanges] = useState("");
  const [pagesPerFile, setPagesPerFile] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const splitByPages = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await selectedFile.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();

      for (let i = 0; i < totalPages; i += pagesPerFile) {
        const newPdf = await PDFDocument.create();
        const endPage = Math.min(i + pagesPerFile, totalPages);

        const pageIndices = Array.from(
          { length: endPage - i },
          (_, index) => i + index
        );

        const pages = await newPdf.copyPages(pdf, pageIndices);
        pages.forEach((page: any) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const fileName = `${selectedFile.name.replace(".pdf", "")}_pages_${
          i + 1
        }-${endPage}.pdf`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Error splitting PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, pagesPerFile]);

  const splitByRanges = useCallback(async () => {
    if (!selectedFile || !pageRanges.trim()) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await selectedFile.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();

      const ranges = pageRanges.split(",").map((range) => range.trim());

      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        const newPdf = await PDFDocument.create();

        let pageIndices: number[];
        if (range.includes("-")) {
          const [start, end] = range
            .split("-")
            .map((s) => Number.parseInt(s.trim()) - 1);
          pageIndices = Array.from(
            { length: Math.min(end, totalPages - 1) - Math.max(start, 0) + 1 },
            (_, index) => Math.max(start, 0) + index
          );
        } else {
          const pageIndex = Number.parseInt(range) - 1;
          if (pageIndex >= 0 && pageIndex < totalPages) {
            pageIndices = [pageIndex];
          } else {
            continue;
          }
        }

        const pages = await newPdf.copyPages(pdf, pageIndices);
        pages.forEach((page: any) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const fileName = `${selectedFile.name.replace(
          ".pdf",
          ""
        )}_range_${range.replace("-", "to")}.pdf`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Error splitting PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, pageRanges]);

  if (!selectedFile) {
    return (
      <div className="pdf-splitter">
        <div className="no-file-selected">
          <FaCut className="no-file-icon" />
          <h3>No PDF Selected</h3>
          <p>Please select a PDF file from the Upload tab to split it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-splitter">
      <div className="splitter-header">
        <h2>
          <FaCut className="section-icon" />
          Split PDF
        </h2>
        <p>Split "{selectedFile.name}" into multiple files</p>
      </div>

      <div className="splitter-content">
        <div className="split-methods">
          <div className="method-selector">
            <label className="radio-label">
              <input
                type="radio"
                value="pages"
                checked={splitMethod === "pages"}
                onChange={(e) => setSplitMethod(e.target.value as "pages")}
              />
              Split by number of pages
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="ranges"
                checked={splitMethod === "ranges"}
                onChange={(e) => setSplitMethod(e.target.value as "ranges")}
              />
              Split by page ranges
            </label>
          </div>

          {splitMethod === "pages" && (
            <div className="pages-method">
              <div className="input-group">
                <label>Pages per file:</label>
                <input
                  type="number"
                  min="1"
                  value={pagesPerFile}
                  onChange={(e) =>
                    setPagesPerFile(Number.parseInt(e.target.value) || 1)
                  }
                />
              </div>
              <button
                className="split-btn"
                onClick={splitByPages}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <FaDownload />
                    Split & Download
                  </>
                )}
              </button>
            </div>
          )}

          {splitMethod === "ranges" && (
            <div className="ranges-method">
              <div className="input-group">
                <label>Page ranges (e.g., 1-3,5,7-9):</label>
                <input
                  type="text"
                  value={pageRanges}
                  onChange={(e) => setPageRanges(e.target.value)}
                  placeholder="1-3,5,7-9"
                />
              </div>
              <div className="ranges-help">
                <p>Examples:</p>
                <ul>
                  <li>1-3: Pages 1 to 3</li>
                  <li>5: Page 5 only</li>
                  <li>1-3,5,7-9: Pages 1-3, page 5, and pages 7-9</li>
                </ul>
              </div>
              <button
                className="split-btn"
                onClick={splitByRanges}
                disabled={isProcessing || !pageRanges.trim()}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <FaDownload />
                    Split & Download
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFSplitter;
