// WordCounterFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaKeyboard,
  FaChartBar,
  FaBroom,
  FaSave,
  FaLanguage,
  FaDownload,
} from "react-icons/fa";

const WordCounterFeatures: React.FC = () => {
  const features = [
    {
      title: "Real-time Counting",
      description: "Instantly count words, characters, sentences, and paragraphs as you type.",
      icon: <FaKeyboard />,
    },
    {
      title: "Detailed Statistics",
      description: "Get insights into readability, text length, and structure.",
      icon: <FaChartBar />,
    },
    {
      title: "Text Cleaning Tools",
      description: "Trim spaces, remove duplicates, and clean special characters.",
      icon: <FaBroom />,
    },
    {
      title: "Export & Share",
      description: "Copy results, download reports, or share text analysis easily.",
      icon: <FaSave />,
    },
    {
      title: "Multi-Language Support",
      description: "Accurate counting across multiple languages and writing systems.",
      icon: <FaLanguage />,
    },
    {
      title: "Download Reports",
      description: "Export word count statistics as a downloadable file for records.",
      icon: <FaDownload />,
    },
  ];

  const technicalSpecs = [
    "Supported Input: Plain text, Markdown, Rich text",
    "Metrics: Words, Characters, Sentences, Paragraphs",
    "Real-time Processing: Client-side, instant updates",
    "Languages: Supports multiple languages",
    "Export Options: Copy, Download, Share",
    "Privacy: 100% local processing, no uploads",
  ];

  return (
    <FeaturesTemplate
      title="Word Counter Features"
      subtitle="Count words, characters, sentences, and paragraphs instantly with real-time stats and text tools"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default WordCounterFeatures;
