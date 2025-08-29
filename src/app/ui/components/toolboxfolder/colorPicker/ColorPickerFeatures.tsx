import type React from "react";
import ToolboxFeatureCard from "../cards/ToolboxFeatureCard";
import ToolboxSpecCard from "../cards/ToolboxSpecCard";
import ToolboxStepCard from "../cards/ToolboxStepCard";
import ToolboxBenefitCard from "../cards/ToolboxBenefitCard";
import "../imageresizing/ImageResizerFeatures.css";

const ColorPickerFeatures: React.FC = () => {
  const features = [
    {
      title: "Pick Any Color",
      description: "Select colors from images or live previews",
      icon: "🎨",
      benefits: [
        "Click to pick from the screen",
        "Eye-dropper tool for precise selection",
        "Supports HEX, RGB, HSL, and CMYK",
        "Live preview while picking",
      ],
    },
    {
      title: "Customizable Palettes",
      description: "Save and organize your favorite colors",
      icon: "🖌️",
      benefits: [
        "Create multiple palettes",
        "Drag & drop colors within palettes",
        "Export palettes to CSS, Tailwind, or design tools",
        "Share palettes with team members",
      ],
    },
    {
      title: "Real-time Color Info",
      description: "Get instant color codes and contrast details",
      icon: "👁️",
      benefits: [
        "HEX, RGB, HSL, CMYK values shown",
        "WCAG contrast ratio check",
        "Copy color codes in one click",
        "Preview color on text or background",
      ],
    },
    {
      title: "Integration Ready",
      description: "Use colors directly in your design workflow",
      icon: "⚡",
      benefits: [
        "Drag colors into design tools",
        "Supports Figma, Photoshop, Illustrator",
        "Copy CSS or SCSS snippets",
        "Easy integration into web projects",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Supported Formats", value: "HEX, RGB, HSL, CMYK" },
    { label: "Pick Modes", value: "Image, Screen, Live Preview" },
    { label: "Export Options", value: "CSS, Tailwind, Figma-ready" },
    { label: "Contrast Check", value: "WCAG accessibility standards" },
    { label: "Processing", value: "Client-side (no uploads)" },
    { label: "Cross-Platform", value: "Desktop, Mobile, Browser" },
  ];

  const steps = [
    { step: 1, title: "Select Color Source", description: "Choose image, screen, or live preview" },
    { step: 2, title: "Pick Color", description: "Use eye-dropper or click to pick the color" },
    { step: 3, title: "View Details", description: "See HEX, RGB, HSL, CMYK, and contrast ratio" },
    { step: 4, title: "Save or Export", description: "Add to palette or export to CSS/design tools" },
  ];

  const benefits = [
    { icon: "⚡", title: "Fast & Responsive", description: "Instant color picking and preview" },
    { icon: "🔒", title: "Privacy First", description: "All picking and processing happens locally" },
    { icon: "🎯", title: "Accurate Colors", description: "Professional-grade color math and contrast info" },
    { icon: "🌐", title: "Cross-Platform", description: "Works in browser, desktop, and mobile apps" },
  ];

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">Color Picker Features</h2>
          <p className="irf-subtitle">
            Pick colors precisely from images, screen, or live preview with instant code and contrast info
          </p>
        </header>

        {/* Features */}
        <section className="irf-features-grid">
          {features.map((f, i) => (
            <ToolboxFeatureCard key={i} {...f} />
          ))}
        </section>

        {/* Technical Specs */}
        <section className="irf-technical-specs">
          <h3 className="irf-specs-title">Technical Specifications</h3>
          <div className="irf-specs-grid">
            {technicalSpecs.map((s, i) => (
              <ToolboxSpecCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="irf-usage-flow">
          <h3 className="irf-flow-title">How It Works</h3>
          <div className="irf-steps">
            {steps.map((s, i) => (
              <ToolboxStepCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="irf-benefits">
          <h3 className="irf-benefits-title">Why Choose This Tool?</h3>
          <div className="irf-benefits-list">
            {benefits.map((b, i) => (
              <ToolboxBenefitCard key={i} {...b} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorPickerFeatures;
