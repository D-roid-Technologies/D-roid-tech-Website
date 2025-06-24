"use client";

import React, { useRef, useEffect, useState } from "react";

interface PDFFile {
  file: File;
  name: string;
  url?: string;
}

interface PDFViewerProps {
  pdfFile: PDFFile | null;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile, className = "" }) => {
  const [parsedText, setParsedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const extractPdfText = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setError(null);
    setParsedText(null);

    try {
      const res = await fetch("http://localhost:3001/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.text) {
        setParsedText(data.text);
      } else {
        setError("No text extracted from PDF.");
      }
    } catch (err) {
      console.error("PDF parse error:", err);
      setError("Failed to extract text from PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pdfFile?.file) {
      extractPdfText(pdfFile.file);
    }
  }, [pdfFile]);

  if (!pdfFile) {
    return (
      <div
        className={`pdf-viewer-empty ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ color: "#666" }}>No PDF selected</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`pdf-viewer-loading ${className}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ color: "#666" }}>Extracting PDF text...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`pdf-viewer-error ${className}`}
        style={{
          padding: "20px",
          backgroundColor: "#ffe0e0",
          border: "1px solid #ffb3b3",
          borderRadius: "6px",
          color: "#990000",
        }}
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div
      className={`pdf-parsed-text ${className}`}
      style={{
        whiteSpace: "pre-wrap",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#f9f9f9",
        fontFamily: "monospace",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      {parsedText || "No text content available."}
    </div>
  );
};

export default PDFViewer;
