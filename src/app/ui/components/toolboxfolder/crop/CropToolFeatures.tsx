// CropToolFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaCrop,
  FaVectorSquare,
  FaSearchPlus,
  FaEye,
  FaDownload,
  FaThLarge,
} from "react-icons/fa";

const CropToolFeatures: React.FC = () => {
  const features = [
    {
      title: "Interactive Crop Interface",
      description: "Drag to select and crop images visually with ease.",
      icon: <FaCrop />,
    },
    {
      title: "Multiple Aspect Ratios",
      description: "Use presets like 16:9, 4:3, 1:1, or set a custom ratio.",
      icon: <FaVectorSquare />,
    },
    {
      title: "Zoom & Pan",
      description: "Easily zoom and reposition to crop precisely.",
      icon: <FaSearchPlus />,
    },
    {
      title: "Real-time Preview",
      description: "See cropped results instantly before exporting.",
      icon: <FaEye />,
    },
    {
      title: "Export Options",
      description: "Download cropped images in JPEG, PNG, WebP, or GIF.",
      icon: <FaDownload />,
    },
    {
      title: "Precision Tools",
      description: "Snap-to-grid and aspect ratio locks for accuracy.",
      icon: <FaThLarge />,
    },
  ];

  const technicalSpecs = [
    "Supported Formats: JPEG, PNG, WebP, GIF",
    "Max Image Size: 50MB per image",
    "Aspect Ratios: Custom or preset (16:9, 4:3, 1:1, etc.)",
    "Processing: 100% client-side (no uploads)",
    "Zoom & Pan: Smooth, responsive interaction",
    "Output Options: Download in original format",
  ];

  return (
    <FeaturesTemplate
      title="Crop Tool Features"
      subtitle="Crop images precisely with live preview, aspect ratio control, and intuitive interface"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default CropToolFeatures;
