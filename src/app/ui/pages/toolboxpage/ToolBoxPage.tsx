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
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { RoutePaths } from "../../../routes/Index";

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
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
    icon: FaPalette({ size: 24 }),
    category: "Color Tools",
    link: "/toolbox/colorconverter",
  },
  {
    title: "Image Compressor",
    description: "Reduce file size while maintaining quality",
    icon: FaImages({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/imagecompressor",
  },
  {
    title: "Crop Tool",
    description: "Trim or cut images to focus on specific parts",
    icon: BiSolidCrop({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/croptool",
  },
  {
    title: "Color Picker",
    description:
      "Select and copy hex/RGB/HSV codes from a color palette or screen",
    icon: CgColorPicker({ size: 24 }),
    category: "Color Tools",
    link: "/toolbox/colorPicker",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, and paragraphs",
    icon: FaFileWord({ size: 24 }),
    link: "/toolbox/wordconter",
  },
  {
    title: "Currency Converter",
    description: "Get real-time conversion rates for global currencies",
    icon: BsCurrencyExchange({ size: 24 }),
    category: "Calculation Tools",
    link: "/calculator/scientific",
  },
  {
    title: "JSON Formatter",
    description: "Beautify and validate JSON code",
    icon: LuFileJson({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/jsonformatter",
  },
  {
    title: "UUID Generator",
    description: "Generate unique identifiers for development",
    icon: GiPowerGenerator({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/uuidgenerator",
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode or decode base64 strings",
    icon: SiLetsencrypt({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/encoderbasetool",
  },

  // === Premium Tools ===

  {
    title: "AI Background Remover",
    description:
      "Automatically remove backgrounds from images using AI with high precision.",
    icon: FaMagic({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/ai-background-remover",
    isPremium: true,
  },
  {
    title: "Advanced PDF Editor",
    description:
      "Merge, split, sign, and annotate PDFs with advanced editing options.",
    icon: FaFilePdf({ size: 24 }),
    category: "Document Tools",
    link: "/toolbox/advanced-pdf-editor",
    isPremium: true,
  },
  {
    title: "Resume & CV Analyzer",
    description:
      "Analyze and score your resume against industry standards and job descriptions.",
    icon: FaUserTie({ size: 24 }),
    category: "Career Tools",
    link: "/toolbox/resumeanalyzer",
    isPremium: true,
  },
  {
    title: "Code Complexity Analyzer",
    description:
      "Detect and measure code complexity, maintainability, and hotspots in your codebase.",
    icon: FaCodeBranch({ size: 24 }),
    category: "Developer Tools",
    link: "/toolbox/code-complexity",
    isPremium: true,
  },
  {
    title: "Bulk Image Watermarker",
    description:
      "Apply watermarks to multiple images at once for branding and copyright protection.",
    icon: FaStamp({ size: 24 }),
    category: "Image Tools",
    link: "/toolbox/bulk-image",
    isPremium: true,
  },
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
          Tools
        </span>
        <div className="soft-dev-content">
          {tools.map((tech, index) => (
            <CoreValueCardTwo
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
