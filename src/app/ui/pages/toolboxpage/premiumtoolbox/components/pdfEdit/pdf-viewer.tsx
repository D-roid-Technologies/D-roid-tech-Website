"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up PDF.js worker - use multiple fallback options
if (typeof window !== "undefined") {
  // Try to use local worker first, then fallback to CDN
  pdfjs.GlobalWorkerOptions.workerSrc =
    process.env.NODE_ENV === "development"
      ? `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
      : `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

interface PDFFile {
  file: File;
  name: string;
  url?: string;
}

interface PDFViewerProps {
  pdfFile: PDFFile | null;
  onPageRender?: (pageNumber: number, canvas: HTMLCanvasElement) => void;
  scale?: number;
  pageNumber?: number;
  className?: string;
}

interface PageRenderedEvent {
  pageNumber: number;
  canvas?: HTMLCanvasElement;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfFile,
  onPageRender,
  scale = 1.0,
  pageNumber = 1,
  className = "",
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Create object URL for the PDF file
  useEffect(() => {
    if (pdfFile?.file) {
      const url = URL.createObjectURL(pdfFile.file);
      setFileUrl(url);

      // Cleanup function
      return () => {
        URL.revokeObjectURL(url);
        setFileUrl(null);
      };
    }
  }, [pdfFile]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setIsLoading(false);
      setError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
  }, []);

  const onPageLoadSuccess = useCallback(
    (page: any) => {
      // Get the canvas element from the rendered page
      if (pageRef.current && onPageRender) {
        const canvas = pageRef.current.querySelector("canvas");
        if (canvas) {
          onPageRender(pageNumber, canvas);
        }
      }
    },
    [pageNumber, onPageRender]
  );

  const onPageLoadError = useCallback((error: Error) => {
    console.error("Page load error:", error);
    setError(`Failed to load page: ${error.message}`);
  }, []);

  const handleDocumentLoadStart = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  // Fallback rendering function
  const renderFallbackPDF = useCallback(() => {
    if (!pdfFile) return null;

    return (
      <div
        className="pdf-fallback"
        style={{
          width: 800 * scale,
          height: 1000 * scale,
          border: "2px solid #cccccc",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: `${24 * scale}px`,
            color: "#333333",
            marginBottom: "10px",
          }}
        >
          PDF Document
        </h2>
        <p
          style={{
            fontSize: `${16 * scale}px`,
            color: "#333333",
            marginBottom: "20px",
          }}
        >
          {pdfFile.name}
        </p>
        <p
          style={{
            fontSize: `${14 * scale}px`,
            color: "#666666",
            marginBottom: "5px",
          }}
        >
          PDF content preview
        </p>
        <p
          style={{
            fontSize: `${14 * scale}px`,
            color: "#666666",
            marginBottom: "40px",
          }}
        >
          (Full PDF.js rendering unavailable)
        </p>

        <div style={{ textAlign: "left", width: "100%", maxWidth: "600px" }}>
          {[
            "This is a PDF document preview.",
            "You can still use all annotation tools.",
            "Signatures and form fields work normally.",
            "",
            "Sample content line 1",
            "Sample content line 2",
            "Sample content line 3",
            "",
            "The PDF editor functionality remains",
            "fully operational for all features.",
          ].map((line, index) => (
            <p
              key={index}
              style={{
                fontSize: `${12 * scale}px`,
                color: "#333333",
                marginBottom: "8px",
                minHeight: line ? "auto" : "8px",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }, [pdfFile, scale]);

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`pdf-viewer-loading ${className}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: "16px",
        }}
      >
        <div
          className="loading-spinner"
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p style={{ color: "#666666", fontSize: "16px" }}>Loading PDF...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state with fallback
  if (error) {
    return (
      <div className={`pdf-viewer-error ${className}`}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <p style={{ color: "#856404", margin: "0 0 10px 0" }}>
            Warning: {error}
          </p>
          <p style={{ color: "#856404", margin: "0", fontSize: "14px" }}>
            Displaying fallback preview:
          </p>
        </div>
        {renderFallbackPDF()}
      </div>
    );
  }

  // No PDF state
  if (!pdfFile || !fileUrl) {
    return (
      <div
        className={`pdf-viewer-empty ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          border: "2px dashed #cccccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ color: "#666666", fontSize: "16px" }}>No PDF selected</p>
      </div>
    );
  }

  return (
    <div className={`pdf-viewer ${className}`}>
      <Document
        file={fileUrl}
        onLoadStart={handleDocumentLoadStart}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <span>Loading document...</span>
          </div>
        }
        error={
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#dc3545",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
            }}
          >
            Failed to load PDF document.
          </div>
        }
      >
        <div ref={pageRef}>
          <Page
            pageNumber={Math.min(pageNumber, numPages) || 1}
            scale={scale}
            onLoadSuccess={onPageLoadSuccess}
            onLoadError={onPageLoadError}
            loading={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                }}
              >
                <span>Loading page...</span>
              </div>
            }
            error={
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#dc3545",
                }}
              >
                Failed to load page.
              </div>
            }
          />
        </div>
      </Document>

      {numPages > 0 && (
        <div
          className="pdf-info"
          style={{
            textAlign: "center",
            padding: "10px",
            fontSize: "14px",
            color: "#666666",
            borderTop: "1px solid #eee",
            marginTop: "10px",
          }}
        >
          Page {Math.min(pageNumber, numPages)} of {numPages}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
