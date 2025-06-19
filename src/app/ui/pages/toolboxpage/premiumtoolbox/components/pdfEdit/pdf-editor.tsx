"use client";

import type React from "react";
import { useState, useCallback } from "react";
import {
  FaFilePdf,
  FaObjectGroup,
  FaCut,
  FaEdit,
  FaSignature,
  FaWpforms,
  FaLock,
  FaUpload,
} from "react-icons/fa";
import FileUpload from "./file-upload";
import PDFMerger from "./pdf-merger";
import PDFSplitter from "./pdf-splitter";
import PDFAnnotator from "./pdf-annotator";
import PDFSigner from "./pdf-signer";
import PDFFormEditor from "./pdf-form-editor";
import PDFPasswordProtector from "./pdf-password-protector";
import "./pdf-editor.css";

export interface PDFFile {
  id: string;
  name: string;
  file: File;
  pages?: number;
  url?: string;
}

const PDFEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);

  const tabs = [
    { id: "upload", label: "Upload", icon: FaUpload },
    { id: "merge", label: "Merge", icon: FaObjectGroup },
    { id: "split", label: "Split", icon: FaCut },
    // { id: "annotate", label: "Annotate", icon: FaEdit },
    { id: "sign", label: "Sign", icon: FaSignature },
    { id: "forms", label: "Forms", icon: FaWpforms },
    { id: "password", label: "Password", icon: FaLock },
  ];

  const addPDFFile = useCallback((file: File) => {
    const newPDFFile: PDFFile = {
      id: Date.now().toString(),
      name: file.name,
      file: file,
      url: URL.createObjectURL(file),
    };
    setPdfFiles((prev) => [...prev, newPDFFile]);
  }, []);

  const removePDFFile = useCallback(
    (id: string) => {
      setPdfFiles((prev) => prev.filter((file) => file.id !== id));
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    },
    [selectedFile]
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <FileUpload
            pdfFiles={pdfFiles}
            onFileAdd={addPDFFile}
            onFileRemove={removePDFFile}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        );
      case "merge":
        return <PDFMerger pdfFiles={pdfFiles} />;
      case "split":
        return <PDFSplitter selectedFile={selectedFile} />;
      case "annotate":
        return <PDFAnnotator selectedFile={selectedFile} />;
      case "sign":
        return <PDFSigner selectedFile={selectedFile} />;
      case "forms":
        return <PDFFormEditor selectedFile={selectedFile} />;
      case "password":
        return <PDFPasswordProtector selectedFile={selectedFile} />;
      default:
        return null;
    }
  };

  return (
    <div className="pdf-editor">
      <header className="pdf-editor-header">
        <div className="pdf-header-content">
          <div className="logo">
            <FaFilePdf className="logo-icon" />
            <h1>Advanced PDF Editor</h1>
          </div>
          <div className="file-counter">
            {pdfFiles.length} PDF{pdfFiles.length !== 1 ? "s" : ""} loaded
          </div>
        </div>
      </header>

      <nav className="pdf-editor-nav">
        <div className="nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="tab-icon" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="pdf-editor-main">
        <div className="tab-content">{renderTabContent()}</div>
      </main>
    </div>
  );
};

export default PDFEditor;
