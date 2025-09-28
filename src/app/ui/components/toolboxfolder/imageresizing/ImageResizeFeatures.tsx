// ImageResizeFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import { FaFileUpload, FaImage, FaRuler, FaLock, FaBolt, FaBullseye } from "react-icons/fa";

const ImageResizeFeatures: React.FC = () => {
  const features = [
    {
      title: "Drag & Drop Interface",
      description: "Intuitive file uploading with visual feedback",
      icon: <FaFileUpload />,
    },
    {
      title: "Multiple Format Support",
      description: "Works with all common image formats",
      icon: <FaImage />,
    },
    {
      title: "Custom Dimensions",
      description: "Precise control over image dimensions",
      icon: <FaRuler />,
    },
    {
      title: "Aspect Ratio Preservation",
      description: "Maintain image proportions automatically",
      icon: <FaLock />,
    },
    {
      title: "Quality Control",
      description: "Adjustable compression for optimal file sizes",
      icon: <FaBolt />,
    },
    {
      title: "Preset Size Options",
      description: "Quick resizing with common dimensions",
      icon: <FaBullseye />,
    },
  ];

  const technicalSpecs = [
    "Max Width: 1920px (configurable)",
    "Quality Range: 10% - 100%",
    "Supported Formats: JPG, PNG, GIF, WebP",
    "Processing: Client-side (no uploads)",
    "Canvas Smoothing: High-quality resizing",
    "Preset Sizes: HD, Full HD, SD, Thumbnail",
  ];

  return (
    <FeaturesTemplate
      title="Image Resizer Features"
      subtitle="Resize images quickly with custom dimensions, aspect ratio preservation, and quality control"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default ImageResizeFeatures;
