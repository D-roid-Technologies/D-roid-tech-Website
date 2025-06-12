import React from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  FaCompressArrowsAlt,
  FaPalette,
  FaImages,
  FaCodeBranch,
  FaUserTie,
  FaStamp,
  FaMagic,
  FaFilePdf,
} from "react-icons/fa";
import { BiSolidCrop } from "react-icons/bi";
import { CgColorPicker } from "react-icons/cg";
import { FaFileWord } from "react-icons/fa6";
import { BsCurrencyExchange } from "react-icons/bs";
import { LuFileJson } from "react-icons/lu";
import { GiPowerGenerator } from "react-icons/gi";
import { SiLetsencrypt } from "react-icons/si";
// import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { RoutePaths } from "../../../routes/Index";
import CoreValueCardThree from "../../components/CoreValueCard/CoreValueCardThree";

const tools = [
  {
    title: "Image Resizing",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: FaCompressArrowsAlt({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/imageresizing",
  },
  {
    title: "Color Converter",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready and digital files.",
    icon: FaPalette({ size: 24 }),
    category: "Color Tools",
    link: "/toolbox/colorconverter",
  },
  {
    title: "Image Compressor",
    description:
      "Smart compression reduces file sizes up to 90% without quality loss, preserving visual clarity while optimizing storage speed.",
    icon: FaImages({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/imagecompressor",
  },
  {
    title: "Crop Tool",
    description:
      "Trim or cut images to focus on specific parts with precision cropping tools for perfect composition and framing results.",
    icon: BiSolidCrop({ size: 24 }),
    category: "Image Tools",
    link: "/under-development",
  },
  {
    title: "Color Picker",
    description:
      "Select and copy hex/RGB/HSV codes from color palettes or screen captures for accurate color matching and design work.",
    icon: CgColorPicker({ size: 24 }),
    category: "Color Tools",
    link: "/toolbox/colorPicker",
  },
  {
    title: "Word Counter",
    description:
      "Count words, characters, paragraphs, and reading time with detailed statistics for content analysis and optimization.",
    icon: FaFileWord({ size: 24 }),
    link: "/toolbox/wordconter",
  },
  {
    title: "Currency Converter",
    description:
      "Get real-time conversion rates for global currencies with historical data and live exchange rate updates for accuracy.",
    icon: BsCurrencyExchange({ size: 24 }),
    category: "Calculation Tools",
    link: "/toolbox/currency-converter",
  },
  {
    title: "JSON Formatter",
    description:
      "Beautify, validate, and format JSON code with syntax highlighting, error detection, and proper indentation structure.",
    icon: LuFileJson({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/jsonformatter",
  },
  {
    title: "UUID Generator",
    description:
      "Generate unique identifiers for development projects with multiple UUID versions and bulk generation capabilities.",
    icon: GiPowerGenerator({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/uuidgenerator",
  },
  {
    title: "Base64 Encoder/Decoder",
    description:
      "Encode or decode base64 strings with support for text, files, and URLs for secure data transmission and storage.",
    icon: SiLetsencrypt({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/encoderbasetool",
  },
  // {
  //   title: "Image Resizing",
  //   description:
  //     "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
  //   icon: FaCompressArrowsAlt({ size: 24 }),
  //   category: "Image Tools",
  //   link: "/toolbox/imageresizing",
  // },
  // {
  //   title: "Color Converter",
  //   description:
  //     "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
  //   icon: FaPalette({ size: 24 }),
  //   category: "Color Tools",
  //   link: "/toolbox/colorconverter",
  // },
  // {
  //   title: "Image Compressor",
  //   description:
  //     "Smart compression algorithms reduce file sizes up to 90% without noticeable quality loss, using advanced techniques that preserve visual clarity while optimizing storage and faster web loading.",
  //   icon: FaImages({ size: 24 }),
  //   category: "Image Tools",
  //   link: "/toolbox/imagecompressor",
  // },
  // {
  //   title: "Crop Tool",
  //   description: "Trim or cut images to focus on specific parts",
  //   icon: BiSolidCrop({ size: 24 }),
  //   category: "Image Tools",
  //   link: "/toolbox/croptool",
  // },
  // {
  //   title: "Color Picker",
  //   description:
  //     "Select and copy hex/RGB/HSV codes from a color palette or screen",
  //   icon: CgColorPicker({ size: 24 }),
  //   category: "Color Tools",
  //   link: "/toolbox/colorPicker",
  // },
  // {
  //   title: "Word Counter",
  //   description: "Count words, characters, and paragraphs",
  //   icon: FaFileWord({ size: 24 }),
  //   link: "/toolbox/wordconter",
  // },
  // {
  //   title: "Currency Converter",
  //   description: "Get real-time conversion rates for global currencies",
  //   icon: BsCurrencyExchange({ size: 24 }),
  //   category: "Calculation Tools",
  //   link: "/calculator/scientific",
  // },
  // {
  //   title: "JSON Formatter",
  //   description: "Beautify and validate JSON code",
  //   icon: LuFileJson({ size: 24 }),
  //   category: "Developer Tools",
  //   link: "/toolbox/jsonformatter",
  // },
  // {
  //   title: "UUID Generator",
  //   description: "Generate unique identifiers for development",
  //   icon: GiPowerGenerator({ size: 24 }),
  //   category: "Developer Tools",
  //   link: "/toolbox/uuidgenerator",
  // },
  // {
  //   title: "Base64 Encoder/Decoder",
  //   description: "Encode or decode base64 strings",
  //   icon: SiLetsencrypt({ size: 24 }),
  //   category: "Developer Tools",
  //   link: "/toolbox/encoderbasetool",
  // },

  // === Premium Tools ===

  {
    title: "AI Background Remover",
    description:
      "Automatically remove backgrounds from images using AI with high precision and speed for professional photo editing results.",
    icon: FaMagic({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/ai-background-remover",
    isPremium: true,
  },
  {
    title: "Advanced PDF Editor",
    description:
      "Merge, split, sign, and annotate PDFs with advanced editing options including forms, passwords, and digital signatures.",
    icon: FaFilePdf({ size: 24 }),
    category: "Document Tools",
    link: "/toolbox/advanced-pdf-editor",
    isPremium: true,
  },
  {
    title: "Resume & CV Analyzer",
    description:
      "Analyze and score your resume against industry standards and job descriptions with detailed feedback and improvement tips.",
    icon: FaUserTie({ size: 24 }),
    category: "Career Tools",
    link: "/toolbox/resumeanalyzer",
    isPremium: true,
  },
  {
    title: "Code Complexity Analyzer",
    description:
      "Detect and measure code complexity, maintainability, and hotspots in your codebase with detailed metrics and recommendations.",
    icon: FaCodeBranch({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/code-complexity",
    isPremium: true,
  },
  {
    title: "Bulk Image Watermarker",
    description:
      "Apply watermarks to multiple images at once for branding and copyright protection with customizable positioning and opacity.",
    icon: FaStamp({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/bulk-image",
    isPremium: true,
  },
  // {
  //   title: "AI Background Remover",
  //   description:
  //     "Automatically remove backgrounds from images using AI with high precision.",
  //   icon: FaMagic({ size: 24 }),
  //   category: "Image Tools",
  //   link: "/toolbox/ai-background-remover",
  //   isPremium: true,
  // },
  // {
  //   title: "Advanced PDF Editor",
  //   description:
  //     "Merge, split, sign, and annotate PDFs with advanced editing options.",
  //   icon: FaFilePdf({ size: 24 }),
  //   category: "Document Tools",
  //   link: "/toolbox/advanced-pdf-editor",
  //   isPremium: true,
  // },
  // {
  //   title: "Resume & CV Analyzer",
  //   description:
  //     "Analyze and score your resume against industry standards and job descriptions.",
  //   icon: FaUserTie({ size: 24 }),
  //   category: "Career Tools",
  //   link: "/toolbox/resumeanalyzer",
  //   isPremium: true,
  // },
  // {
  //   title: "Code Complexity Analyzer",
  //   description:
  //     "Detect and measure code complexity, maintainability, and hotspots in your codebase.",
  //   icon: FaCodeBranch({ size: 24 }),
  //   category: "Developer Tools",
  //   link: "/toolbox/code-complexity",
  //   isPremium: true,
  // },
  // {
  //   title: "Bulk Image Watermarker",
  //   description:
  //     "Apply watermarks to multiple images at once for branding and copyright protection.",
  //   icon: FaStamp({ size: 24 }),
  //   category: "Image Tools",
  //   link: "/toolbox/bulk-image",
  //   isPremium: true,
  // },
];

const ToolBoxPage: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">D'roid ToolBox</h1>
          <p>
            Toolbox is your ultimate Android companion — a powerful all-in-one
            utility app designed to help you manage, optimize, and customize
            your tasks with ease.
          </p>
        </div>
      </div>
      {/* Items */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Tool collection
        </span>
        <div className="soft-dev-content">
          {tools.map((tech, index) => (
            <CoreValueCardThree
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              link={tech.link}
              className="process-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolBoxPage;
