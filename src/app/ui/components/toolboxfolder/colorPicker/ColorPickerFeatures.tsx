// ColorPickerFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaEyeDropper,
  FaPalette,
  FaInfoCircle,
  FaBolt,
  FaDownload,
  FaLayerGroup,
} from "react-icons/fa";

const ColorPickerFeatures: React.FC = () => {
  const features = [
    {
      title: "Pick Any Color",
      description: "Select colors from images, screen, or live preview with precision.",
      icon: <FaEyeDropper />,
    },
    {
      title: "Customizable Palettes",
      description: "Save, organize, and share your favorite color palettes.",
      icon: <FaPalette />,
    },
    {
      title: "Real-time Color Info",
      description: "Get HEX, RGB, HSL, and contrast details instantly.",
      icon: <FaInfoCircle />,
    },
    {
      title: "Integration Ready",
      description: "Use colors directly in Figma, Photoshop, or web projects.",
      icon: <FaBolt />,
    },
    {
      title: "Export Options",
      description: "Export palettes to CSS, Tailwind, or share with teammates.",
      icon: <FaDownload />,
    },
    {
      title: "Contrast & Accessibility",
      description: "Check WCAG contrast ratios for accessible designs.",
      icon: <FaLayerGroup />,
    },
  ];

  const technicalSpecs = [
    "Supported Formats: HEX, RGB, HSL, CMYK",
    "Pick Modes: Image, Screen, Live Preview",
    "Export Options: CSS, Tailwind, Figma-ready",
    "Contrast Check: WCAG accessibility standards",
    "Processing: Client-side (no uploads)",
    "Cross-Platform: Desktop, Mobile, Browser",
  ];

  return (
    <FeaturesTemplate
      title="Color Picker Features"
      subtitle="Pick colors precisely from images, screen, or live preview with instant code and contrast info"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default ColorPickerFeatures;
