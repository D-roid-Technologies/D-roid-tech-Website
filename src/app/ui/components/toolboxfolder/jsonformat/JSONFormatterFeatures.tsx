// JSONFormatterFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaPaintBrush,
  FaCompressAlt,
  FaCheckCircle,
  FaExchangeAlt,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

const JSONFormatterFeatures: React.FC = () => {
  const features = [
    {
      title: "Beautify JSON",
      description: "Format messy JSON into a readable structure with proper indentation.",
      icon: <FaPaintBrush />,
    },
    {
      title: "Minify JSON",
      description: "Reduce JSON size by removing unnecessary spaces and line breaks.",
      icon: <FaCompressAlt />,
    },
    {
      title: "Validate JSON",
      description: "Check JSON for syntax errors instantly with detailed feedback.",
      icon: <FaCheckCircle />,
    },
    {
      title: "Convert JSON",
      description: "Convert JSON to CSV, XML, or YAML with one click.",
      icon: <FaExchangeAlt />,
    },
    {
      title: "Search & Highlight",
      description: "Quickly find keys or values inside large JSON files with highlighting.",
      icon: <FaSearch />,
    },
    {
      title: "Export & Download",
      description: "Download your beautified, minified, or converted JSON in one click.",
      icon: <FaDownload />,
    },
  ];

  const technicalSpecs = [
    "Supports JSON (.json) and Plain Text",
    "File Size Limit: Up to 5MB per file",
    "Conversion Formats: CSV, XML, YAML",
    "Instant syntax validation",
    "Client-side processing (no upload required)",
    "Optimized for fast performance even with large files",
  ];

  return (
    <FeaturesTemplate
      title="JSON Formatter Features"
      subtitle="Beautify, minify, validate, and convert JSON instantly with real-time preview"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default JSONFormatterFeatures;
