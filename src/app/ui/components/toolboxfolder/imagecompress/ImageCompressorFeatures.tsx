// ImageCompressorFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaFileUpload,
  FaSlidersH,
  FaLayerGroup,
  FaImage,
  FaBolt,
  FaDownload,
} from "react-icons/fa";

const ImageCompressorFeatures: React.FC = () => {
  const features = [
    {
      title: "Drag & Drop Compression",
      description: "Easily upload images for compression with intuitive drag & drop.",
      icon: <FaFileUpload />,
    },
    {
      title: "Quality Control",
      description: "Adjust compression levels for the perfect balance of size and quality.",
      icon: <FaSlidersH />,
    },
    {
      title: "Batch Processing",
      description: "Compress multiple images at once to save time on large projects.",
      icon: <FaLayerGroup />,
    },
    {
      title: "Format Support",
      description: "Supports JPEG, PNG, WebP, GIF with automatic detection.",
      icon: <FaImage />,
    },
    {
      title: "Lightning Fast",
      description: "Instant compression in the browser without uploading files.",
      icon: <FaBolt />,
    },
    {
      title: "Download Options",
      description: "Download images individually or as a batch after compression.",
      icon: <FaDownload />,
    },
  ];

  const technicalSpecs = [
    "Supported Formats: JPEG, PNG, WebP, GIF",
    "Max File Size: 50MB per image",
    "Compression Range: 10% - 100%",
    "Processing: Client-side only (no server uploads)",
    "Batch Limit: Unlimited images",
    "Preview: Instant before/after comparison",
  ];

  return (
    <FeaturesTemplate
      title="Image Compressor Features"
      subtitle="Compress images quickly while maintaining high quality, all in your browser"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default ImageCompressorFeatures;
