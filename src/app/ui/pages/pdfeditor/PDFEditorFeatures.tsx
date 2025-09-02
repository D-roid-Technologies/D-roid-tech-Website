import React from "react";
import {
  FaUpload,
  FaObjectGroup,
  FaCut,
  FaSignature,
  FaWpforms,
  FaLock,
  FaFileAlt,
  FaShieldAlt,
  FaCogs,
  FaBolt,
  FaUsers,
  FaCloudUploadAlt,
} from "react-icons/fa";
import "../pdfeditor/PDFEditorFeatures.css";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
}

const PDFEditorFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      id: "upload",
      title: "Smart File Upload",
      description:
        "Easily upload and manage multiple PDF files with drag-and-drop functionality and instant preview.",
      icon: FaUpload,
      benefits: [
        "Multiple file support",
        "Drag & drop interface",
        "Instant file preview",
        "File size validation",
      ],
    },
    {
      id: "merge",
      title: "PDF Merger",
      description:
        "Combine multiple PDF documents into a single file with customizable page ordering and arrangement.",
      icon: FaObjectGroup,
      benefits: [
        "Merge unlimited PDFs",
        "Custom page ordering",
        "Preserve document quality",
        "Batch processing",
      ],
    },
    {
      id: "split",
      title: "PDF Splitter",
      description:
        "Extract specific pages or split PDFs into separate documents with precision control.",
      icon: FaCut,
      benefits: [
        "Page range selection",
        "Individual page extraction",
        "Bulk splitting options",
        "Original quality maintained",
      ],
    },
    {
      id: "sign",
      title: "Digital Signature",
      description:
        "Add legally binding digital signatures to your PDF documents with advanced security features.",
      icon: FaSignature,
      benefits: [
        "Digital signature creation",
        "Multiple signature types",
        "Signature positioning",
        "Legal compliance",
      ],
    },
    {
      id: "forms",
      title: "Form Editor",
      description:
        "Create, edit, and fill interactive PDF forms with various field types and validation options.",
      icon: FaWpforms,
      benefits: [
        "Interactive form creation",
        "Field validation",
        "Auto-fill capabilities",
        "Form data export",
      ],
    },
    {
      id: "password",
      title: "Password Protection",
      description:
        "Secure your PDFs with strong encryption and password protection to control access and permissions.",
      icon: FaLock,
      benefits: [
        "256-bit encryption",
        "User permissions control",
        "Print & copy restrictions",
        "Access level management",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: FaBolt,
      title: "Lightning Fast",
      description:
        "Optimized performance for quick processing of large PDF files",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Processing",
      description: "All operations performed locally with privacy protection",
    },
    {
      icon: FaCogs,
      title: "Advanced Tools",
      description:
        "Professional-grade features for comprehensive PDF management",
    },
    {
      icon: FaUsers,
      title: "User Friendly",
      description:
        "Intuitive interface designed for both beginners and experts",
    },
  ];

  return (
    <div className="pdf-features">
      <div className="pdf-features__container">
        {/* Header Section */}
        <header className="pdf-features__header">
          <div className="pdf-features__header-content">
            <FaFileAlt className="pdf-features__header-icon" />
            <h2 className="pdf-features__title">
              Advanced PDF Editor Features
            </h2>
            <p className="pdf-features__subtitle">
              Comprehensive PDF editing tools for all your document management
              needs
            </p>
          </div>
        </header>

        {/* Main Features Grid */}
        <section className="pdf-features__main">
          <div className="pdf-features__grid">
            {features.map((feature) => (
              <div key={feature.id} className="pdf-features__card">
                <div className="pdf-features__card-header">
                  <div className="pdf-features__icon-wrapper">
                    <feature.icon className="pdf-features__card-icon" />
                  </div>
                  <h3 className="pdf-features__card-title">{feature.title}</h3>
                </div>
                <p className="pdf-features__card-description">
                  {feature.description}
                </p>
                <ul className="pdf-features__benefits">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="pdf-features__benefit">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section className="pdf-features__additional">
          <h3 className="pdf-features__section-title">
            Why Choose Our PDF Editor?
          </h3>
          <div className="pdf-features__additional-grid">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="pdf-features__highlight">
                <feature.icon className="pdf-features__highlight-icon" />
                <div className="pdf-features__highlight-content">
                  <h4 className="pdf-features__highlight-title">
                    {feature.title}
                  </h4>
                  <p className="pdf-features__highlight-description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PDFEditorFeatures;
