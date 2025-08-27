"use client";

import type React from "react";
import { useState, useMemo } from "react";
import SearchBar from "../../components/search/SearchBar";
import SearchFilters from "../../components/search/SearchFilters";
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
import CoreValueCardThree from "../../components/CoreValueCard/CoreValueCardThree";
import AllToolsCard from "../../components/CoreValueCard/AllToolsCard";

export const Alltools = [
  {
    title: "Image Resizing",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: FaCompressArrowsAlt({ size: 24 }),
    component: "ImageResizing",
    category: "Image Tools",
    link: "/toolbox/imageresizing",
  },
  {
    title: "Color Converter",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration.",
    icon: FaPalette({ size: 24 }),
    component: "ColorConverter",
    category: "Color Tools",
    link: "./colorconverter/ColorConverter",
  },
  {
    title: "Image Compressor",
    description:
      "Smart compression reduces file sizes up to 90% without quality loss.",
    icon: FaImages({ size: 24 }),
    component: "ImageCompressor",
    category: "Image Tools",
    link: "/toolbox/imagecompressor",
  },
  {
    title: "Crop Tool",
    description:
      "Trim or cut images to focus on specific parts with precision.",
    icon: BiSolidCrop({ size: 24 }),
    component: "CropTool",
    category: "Image Tools",
    link: "/toolbox/croptool",
  },
  {
    title: "Color Picker",
    description: "Select and copy hex/RGB/HSV codes from screen or palette.",
    icon: CgColorPicker({ size: 24 }),
    component: "ColorPicker",
    category: "Color Tools",
    link: "/toolbox/colorPicker",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, paragraphs, and reading time.",
    icon: FaFileWord({ size: 24 }),
    component: "WordCounter",
    category: "Text Tools",
    link: "/toolbox/wordcounter",
  },
  {
    title: "Currency Converter",
    description: "Get real-time conversion rates for global currencies.",
    icon: BsCurrencyExchange({ size: 24 }),
    component: "CurrencyConverter", // 👈 used in switch
    category: "Calculation Tools",
    link: "/toolbox/currency-converter",
  },
  {
    title: "JSON Formatter",
    description: "Beautify and format JSON with syntax highlighting.",
    icon: LuFileJson({ size: 24 }),
    component: "JsonFormatter",
    category: "Developer Tools",
    link: "/toolbox/jsonformatter",
  },
  {
    title: "UUID Generator",
    description: "Generate UUIDs for development with bulk options.",
    icon: GiPowerGenerator({ size: 24 }),
    component: "UUIDGenerator",
    category: "Developer Tools",
    link: "/toolbox/uuidgenerator",
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode or decode base64 for secure data handling.",
    icon: SiLetsencrypt({ size: 24 }),
    component: "Base64EncoderDecoder",
    category: "Developer Tools",
    link: "/toolbox/encoderbasetool",
  },
  {
    title: "AI Background Remover",
    description: "Remove backgrounds from images using AI precision.",
    icon: FaMagic({ size: 24 }),
    component: "BackgroundRemove",
    category: "Image Tools",
    link: "/toolbox/ai-background-remover",
    isPremium: true,
  },
  {
    title: "Advanced PDF Editor",
    description: "Merge, split, sign, and annotate PDFs with advanced tools.",
    icon: FaFilePdf({ size: 24 }),
    component: "PDFEditor",
    category: "Document Tools",
    link: "/toolbox/advanced-pdf-editor",
    isPremium: true,
  },
  {
    title: "Resume & CV Analyzer",
    description: "Analyze and score your resume with AI feedback.",
    icon: FaUserTie({ size: 24 }),
    component: "ResumeAnalyzer",
    category: "Career Tools",
    link: "/toolbox/resumeanalyzer",
    isPremium: true,
  },
  {
    title: "Code Complexity Analyzer",
    description: "Detect code complexity and hotspots in your codebase.",
    icon: FaCodeBranch({ size: 24 }),
    component: "CodeComplexityAnalyzer",
    category: "Developer Tools",
    link: "/toolbox/code-complexity",
    isPremium: true,
  },
  {
    title: "Bulk Image Watermarker",
    description: "Add watermarks to multiple images for branding/copyright.",
    icon: FaStamp({ size: 24 }),
    component: "BulkImageWatermarker",
    category: "Image Tools",
    link: "/toolbox/bulk-image",
    isPremium: true,
  },
];

export const tools = [
  {
    title: "Image Resizing",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: FaCompressArrowsAlt({ size: 24 }),
    component: "ImageResizing",
    category: "Image Tools",
    link: "/toolbox/imageresizing",
  },
  {
    title: "Color Converter",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready and digital files.",
    icon: FaPalette({ size: 24 }),
    category: "Color Tools",
    component: "ColorConverter",
    link: "./colorconverter/ColorConverter",
  },
  {
    title: "Image Compressor",
    description:
      "Smart compression reduces file sizes up to 90% without quality loss, preserving visual clarity while optimizing storage speed.",
    icon: FaImages({ size: 24 }),
    category: "Image Tools",
    component: "ImageCompress",

    link: "/toolbox/imagecompressor",
  },
  {
    title: "Crop Tool",
    description:
      "Trim or cut images to focus on specific parts with precision cropping tools for perfect composition and framing results.",
    icon: BiSolidCrop({ size: 24 }),
    category: "Image Tools",
    component: "Crop",

    link: "/toolbox/croptool",
  },
  {
    title: "Color Picker",
    description:
      "Select and copy hex/RGB/HSV codes from color palettes or screen captures for accurate color matching and design work.",
    icon: CgColorPicker({ size: 24 }),
    category: "Color Tools",
    component: "ColorPicker",
    link: "/toolbox/colorPicker",
  },
  {
    title: "Word Counter",
    description:
      "Count words, characters, paragraphs, and reading time with detailed statistics for content analysis and optimization.",
    icon: FaFileWord({ size: 24 }),
    category: "Text Tools",
    component: "WordCounter",
    link: "/toolbox/wordconter",
  },
  {
    title: "Currency Converter",
    description:
      "Get real-time conversion rates for global currencies with historical data and live exchange rate updates for accuracy.",
    icon: BsCurrencyExchange({ size: 24 }),
    category: "Calculation Tools",
    component: "CurrencyConverter",
    link: "/toolbox/currency-converter",
  },
  {
    title: "JSON Formatter",
    description:
      "Beautify, validate, and format JSON code with syntax highlighting, error detection, and proper indentation structure.",
    icon: LuFileJson({ size: 24 }),
    category: "Developer Tools",
    component: "JsonFormatter",
    link: "/toolbox/jsonformatter",
  },
  {
    title: "UUID Generator",
    description:
      "Generate unique identifiers for development projects with multiple UUID versions and bulk generation capabilities.",
    icon: GiPowerGenerator({ size: 24 }),
    component: "UUIDGenerator",

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
  {
    title: "AI Background Remover",
    description:
      "Automatically remove backgrounds from images using AI with high precision and speed for professional photo editing results.",
    icon: FaMagic({ size: 24 }),
    category: "Image Tools",
    component: "BackgroundRemove",
    link: "/toolbox/ai-background-remover",
    isPremium: true,
  },
  {
    title: "Advanced PDF Editor",
    description:
      "Merge, split, sign, and annotate PDFs with advanced editing options including forms, passwords, and digital signatures.",
    icon: FaFilePdf({ size: 24 }),
    category: "Document Tools",
    component: "PDFEditor",
    link: "/toolbox/advanced-pdf-editor",
    isPremium: true,
  },
  {
    title: "Resume & CV Analyzer",
    description:
      "Analyze and score your resume against industry standards and job descriptions with detailed feedback and improvement tips.",
    icon: FaUserTie({ size: 24 }),
    category: "Career Tools",
    component: "ResumeAnalyzer",
    link: "/toolbox/resumeanalyzer",
    isPremium: true,
  },
  {
    title: "Code Complexity Analyzer",
    description:
      "Detect and measure code complexity, maintainability, and hotspots in your codebase with detailed metrics and recommendations.",
    icon: FaCodeBranch({ size: 24 }),
    category: "Developer Tools",
    component: "CodeComplexityAnalyzer",

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
    component: "BulkImageWatermarker",

    isPremium: true,
  },
];

const ToolBoxItems: React.FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const categoryArr = tools.map((tool) => tool.category);
    return categoryArr
      .filter((cat, i) => categoryArr.indexOf(cat) === i)
      .sort();
  }, []);

  // Filter tools based on search query, category, and premium status
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;

      const matchesPremium = !showPremiumOnly || tool.isPremium;

      return matchesSearch && matchesCategory && matchesPremium;
    });
  }, [searchQuery, selectedCategory, showPremiumOnly]);

  return (
    <div>
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

      {/* Search Section */}

      {/* Tools Grid */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Tool collection
        </span>
        <div className="" style={{ paddingTop: "2rem", paddingBottom: "1rem" }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tools by name, description, or category..."
            className="mb-6"
          />

          <SearchFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showPremiumOnly={showPremiumOnly}
            onPremiumToggle={setShowPremiumOnly}
          />

          {/* Results Count */}
          <div className="text-center">
            <p className="text-gray-600">
              {filteredTools.length === tools.length
                ? `Showing all ${tools.length} tools`
                : `Found ${filteredTools.length} of ${tools.length} tools`}
            </p>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="soft-dev-content">
            {filteredTools.map((tech, index) => (
              <div key={`${tech.title}-${index}`} className="relative">
            

                <AllToolsCard
                  title={tech.title}
                  description={tech.description}
                  icon={tech.icon}
                  isPremium={tech.isPremium}
                  link={tech.link}
                  className="process-card"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No tools found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setShowPremiumOnly(false);
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolBoxItems;
