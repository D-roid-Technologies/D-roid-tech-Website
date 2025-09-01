// ColorConverterFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import { FaPalette, FaEye, FaTh, FaBolt, FaLock, FaDesktop } from "react-icons/fa";

const ColorConverterFeatures: React.FC = () => {
  const features = [
    {
      title: "HEX to RGB/HSB/CMYK",
      description: "Instantly convert HEX colors to other color spaces with 1-click copy.",
      icon: <FaPalette />,
    },
    {
      title: "Real-time Preview",
      description: "See color results live as you type, including text/background contrast.",
      icon: <FaEye />,
    },
    {
      title: "Palette Generator",
      description: "Automatically generate harmonious color palettes for your projects.",
      icon: <FaTh />,
    },
    {
      title: "Fast Conversion",
      description: "Lightning-fast client-side calculations with no server upload.",
      icon: <FaBolt />,
    },
    {
      title: "Privacy First",
      description: "All processing happens locally; your colors are never uploaded.",
      icon: <FaLock />,
    },
    {
      title: "Cross-Platform",
      description: "Works on browser, mobile, and integrates with design apps seamlessly.",
      icon: <FaDesktop />,
    },
  ];

  const technicalSpecs = [
    "Supported Inputs: HEX, RGB, HSL, CMYK",
    "Export Formats: CSS, Tailwind, Figma-ready",
    "Accuracy: DeltaE < 1 for RGB/CMYK",
    "Conversion Speed: Instant (client-side)",
    "Accessibility Check: WCAG contrast ratios",
    "Copy Options: 1-click copy for all formats",
  ];

  return (
    <FeaturesTemplate
      title="Color Converter Features"
      subtitle="Convert HEX, RGB, HSL, and CMYK instantly with live preview and accessibility checks"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default ColorConverterFeatures;
