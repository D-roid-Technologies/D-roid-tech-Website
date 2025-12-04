"use client";

import type React from "react";
import { useState, useMemo } from "react";
import SearchBar from "../../components/search/SearchBar";
import SearchFilters from "../../components/search/SearchFilters";
import { useNavigate } from "react-router-dom";
import { UpgradeToAccessTools } from "../../components/UpgradeToAccessTools";
import {
  FaCompressArrowsAlt,
  FaPalette,
  FaImages,
  FaCodeBranch,
  FaUserTie,
  FaStamp,
  FaMagic,
  FaFilePdf,
  FaQrcode,
  FaRobot,
} from "react-icons/fa";
import { BiSolidCrop } from "react-icons/bi";
import { CgColorPicker } from "react-icons/cg";
import { FaFileWord } from "react-icons/fa6";
import { BsCurrencyExchange } from "react-icons/bs";
import { LuFileJson } from "react-icons/lu";
import { GiPowerGenerator } from "react-icons/gi";
import { SiLetsencrypt } from "react-icons/si";
import { AllToolsCard } from "../../components/CoreValueCard/AllToolsCard";
import { ConfirmationPage } from "../../components/payment/ConfirmationPage";
import { PendingConfirmation } from "../../components/payment/PendingConfirmation";

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
  // {
  //   title: "AI Background Remover",
  //   description: "Remove backgrounds from images using AI precision.",
  //   icon: FaMagic({ size: 24 }),
  //   component: "BackgroundRemove",
  //   category: "Image Tools",
  //   link: "/toolbox/ai-background-remover",
  //   isPremium: true,
  // },
  {
    title: "Color Converter",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration.",
    icon: FaPalette({ size: 24 }),
    component: "ColorConverter",
    category: "Color Tools",
    link: "/toolbox/colorconverter",
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
    title: "Bulk Image Watermarker",
    description: "Add watermarks to multiple images for branding/copyright.",
    icon: FaStamp({ size: 24 }),
    component: "BulkImageWatermarker",
    category: "Image Tools",
    link: "/toolbox/bulk-image",
    isPremium: true,
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
    title: "AI Background Remover",
    description: "Remove backgrounds from images using AI precision.",
    icon: FaMagic({ size: 24 }),
    component: "BackgroundRemove",
    category: "Image Tools",
    link: "/toolbox/ai-background-remover",
    isPremium: true,
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
  // {
  //   title: "AI Background Remover",
  //   description: "Remove backgrounds from images using AI precision.",
  //   icon: FaMagic({ size: 24 }),
  //   component: "BackgroundRemove",
  //   category: "Image Tools",
  //   link: "/toolbox/ai-background-remover",
  //   isPremium: true,
  // },
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
];

export const tools = [
  {
    title: "Crop Tool",
    description:
      "Trim or cut images to focus on specific parts with precision cropping tools for perfect composition and framing results.",
    icon: BiSolidCrop({ size: 24 }),
    category: "Image Tools",
    component: "Crop",
    link: "/toolbox/croptool",
  },
  // {
  //   title: "AI Background Remover",
  //   description:
  //     "Automatically remove backgrounds from images using AI with high precision and speed for professional photo editing results.",
  //   icon: FaMagic({ size: 24 }),
  //   category: "Image Tools",
  //   component: "BackgroundRemove",
  //   link: "/toolbox/ai-background-remover",
  //   isPremium: true,
  // },
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
    title: "AI Builder",
    description:
      "Generate fully responsive, SEO-optimized websites instantly using AI. Simply describe your idea and get a complete website layout, structure, and content in seconds.",
    icon: FaRobot({ size: 24 }),
    category: "AI Tools",
    component: "AiWebsiteBuilder",
    link: "/toolbox/ai-website-builder",
  },

  {
    title: "QR Code Scanner",
    description:
      "Scan and decode QR codes directly from your browser using your device camera or uploaded images. Fast, secure, and easy to use.",
    icon: FaQrcode({ size: 24 }),
    category: "Utility Tools",
    component: "QrScanner",
    link: "/toolbox/qr-scanner",
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
    title: "Color Converter",
    description:
      "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready and digital files.",
    icon: FaPalette({ size: 24 }),
    category: "Color Tools",
    component: "ColorConverter",
    link: "/toolbox/colorconverter",
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
  {
    title: "Currency Converter",
    description:
      "Get real-time conversion rates for global currencies with historical data and live exchange rate updates for accuracy.",
    icon: BsCurrencyExchange({ size: 24 }),
    category: "Calculation Tools",
    component: "CurrencyConverter",
    link: "/toolbox/currency-converter",
    isPremium: true,
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
    title: "JSON Formatter",
    description:
      "Beautify, validate, and format JSON code with syntax highlighting, error detection, and proper indentation structure.",
    icon: LuFileJson({ size: 24 }),
    category: "Developer Tools",
    component: "JsonFormatter",
    link: "/toolbox/jsonformatter",
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
    title: "Image Resizing",
    description:
      "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
    icon: FaCompressArrowsAlt({ size: 24 }),
    component: "ImageResizing",
    category: "Image Tools",
    link: "/toolbox/imageresizing",
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
    title: "Color Picker",
    description:
      "Select and copy hex/RGB/HSV codes from color palettes or screen captures for accurate color matching and design work.",
    icon: CgColorPicker({ size: 24 }),
    category: "Color Tools",
    link: "/toolbox/colorPicker",
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
    title: "Image Compressor",
    description:
      "Smart compression reduces file sizes up to 90% without quality loss, preserving visual clarity while optimizing storage speed.",
    icon: FaImages({ size: 24 }),
    category: "Image Tools",
    component: "ImageCompress",
    link: "/toolbox/imagecompressor",
  },
  // {
  //   title: "Advanced PDF Editor",
  //   description:
  //     "Merge, split, sign, and annotate PDFs with advanced editing options including forms, passwords, and digital signatures.",
  //   icon: FaFilePdf({ size: 24 }),
  //   category: "Document Tools",
  //   component: "PDFEditor",
  //   link: "/toolbox/advanced-pdf-editor",
  //   isPremium: true,
  // },
];
type FlowState = null | "upgrade" | "payment" | "success" | "pending";

const ToolBoxItems: React.FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [flow, setFlow] = useState<FlowState>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const [showUpgradePrompt, setShowUpgradePrompt] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  const categories = useMemo(() => {
    const categoryArr = tools.map((tool) => tool.category);
    return categoryArr
      .filter((cat, i) => categoryArr.indexOf(cat) === i)
      .sort();
  }, []);

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

  const handleToolClick = (tool: any) => {
    if (tool.isPremium) {
      if (flow === "success") {
        setFlow("pending"); // after payment, show pending confirmation
      } else {
        setFlow("upgrade");
      }
      setSelectedTool(tool.title);
    } else {
      if (tool.link) {
        navigate(tool.link);
      }
    }
  };

  const handleCloseUpgrade = () => {
    setShowUpgradePrompt(null);
  };

  return (
    <div>
      {flow && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          {flow === "upgrade" && (
            <UpgradeToAccessTools
              toolName={selectedTool}
              onUpgrade={() => setFlow("payment")}
              onClose={() => setFlow(null)}
            />
          )}

          {flow === "payment" && <div>payment</div>}

          {flow === "success" && <div>success</div>}

          {flow === "pending" && <div>pending</div>}
        </div>
      )}

      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">D'roid ToolBox</h1>
          <p>
            Toolbox is your ultimate Android companion, a powerful all-in-one
            utility app designed to help you manage, optimize, and customize
            your tasks with ease.
          </p>
        </div>
      </div>

      {/* Search Section */}

      {/* Tools Grid */}
      <div style={{ marginBottom: "3rem" }}>
        <div className="wrapper soft-wrapper">
          <span
            className="soft-dev-header title_span"
            style={{ background: "#e2e8f0" }}
          >
            Tool collection
          </span>
          <div
            className=""
            style={{ paddingTop: "2rem", paddingBottom: "1rem" }}
          >
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
              <p style={{ color: "#071d6a" }}>
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
                    onClick={() => handleToolClick(tech)}
                    className="process-card"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p style={{ color: "#071d6a", padding: "1rem" }}>
                No tools found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setShowPremiumOnly(false);
                }}
                style={{
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "#071d6a",
                  color: "white",
                  borderRadius: "0.5rem",
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolBoxItems;
