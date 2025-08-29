import type React from "react";
import ToolboxFeatureCard from "../cards/ToolboxFeatureCard";
import ToolboxSpecCard from "../cards/ToolboxSpecCard";
import ToolboxStepCard from "../cards/ToolboxStepCard";
import ToolboxBenefitCard from "../cards/ToolboxBenefitCard";
import "../imageresizing/ImageResizerFeatures.css";

const ImageCompressorFeatures: React.FC = () => {
  const features = [
    {
      title: "Drag & Drop Compression",
      description: "Easily upload images for compression",
      icon: "📁",
      benefits: [
        "Drag & drop multiple images at once",
        "Visual feedback while uploading",
        "Supports JPEG, PNG, WebP, and GIF",
        "Option to browse files manually",
      ],
    },
    {
      title: "Quality Control",
      description: "Adjust compression level for optimal size",
      icon: "⚡",
      benefits: [
        "Set compression from 10% to 100%",
        "Real-time size preview",
        "Balance between quality and file size",
        "Automatic recommendation for web use",
      ],
    },
    {
      title: "Batch Processing",
      description: "Compress multiple images simultaneously",
      icon: "⚙️",
      benefits: [
        "Process unlimited images in one go",
        "Compare original vs compressed",
        "Keep history of previous compressions",
        "Save time for large projects",
      ],
    },
    {
      title: "Format Support",
      description: "Works with all popular image formats",
      icon: "🖼️",
      benefits: [
        "JPEG, PNG, WebP, GIF supported",
        "Automatic format detection",
        "Maintains original format if needed",
        "High-quality compression algorithms",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Supported Formats", value: "JPEG, PNG, WebP, GIF" },
    { label: "Max File Size", value: "50MB per image (configurable)" },
    { label: "Compression Range", value: "10% - 100%" },
    { label: "Processing", value: "Client-side (no upload to server)" },
    { label: "Batch Limit", value: "Unlimited images" },
    { label: "Preview", value: "Instant before/after comparison" },
  ];

  const steps = [
    { step: 1, title: "Upload Images", description: "Drag & drop or click to select images" },
    { step: 2, title: "Set Compression", description: "Adjust quality slider or use presets" },
    { step: 3, title: "Preview Results", description: "Check size and quality before download" },
    { step: 4, title: "Download Compressed Images", description: "Save images individually or as a batch" },
  ];

  const benefits = [
    { icon: "⚡", title: "Lightning Fast", description: "Instant compression in the browser" },
    { icon: "🔒", title: "Privacy First", description: "All processing happens locally, no uploads" },
    { icon: "🎯", title: "High Quality", description: "Smart algorithms minimize quality loss" },
    { icon: "🌐", title: "Cross-Platform", description: "Works on desktop, tablet, and mobile devices" },
  ];

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">Image Compressor Features</h2>
          <p className="irf-subtitle">
            Compress images quickly while maintaining high quality, all in your browser
          </p>
        </header>

        {/* Features */}
        <section className="irf-features-grid">
          {features.map((f, i) => (
            <ToolboxFeatureCard key={i} {...f} />
          ))}
        </section>

        {/* Technical Specs */}
        <section className="irf-technical-specs">
          <h3 className="irf-specs-title">Technical Specifications</h3>
          <div className="irf-specs-grid">
            {technicalSpecs.map((s, i) => (
              <ToolboxSpecCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="irf-usage-flow">
          <h3 className="irf-flow-title">How It Works</h3>
          <div className="irf-steps">
            {steps.map((s, i) => (
              <ToolboxStepCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="irf-benefits">
          <h3 className="irf-benefits-title">Why Choose This Tool?</h3>
          <div className="irf-benefits-list">
            {benefits.map((b, i) => (
              <ToolboxBenefitCard key={i} {...b} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageCompressorFeatures;
