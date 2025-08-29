import type React from "react";
import ToolboxFeatureCard from "../cards/ToolboxFeatureCard";
import ToolboxSpecCard from "../cards/ToolboxSpecCard";
import ToolboxStepCard from "../cards/ToolboxStepCard";
import ToolboxBenefitCard from "../cards/ToolboxBenefitCard";
import "../imageresizing/ImageResizerFeatures.css";

const JSONFormatterFeatures: React.FC = () => {
  const features = [
    {
      title: "Beautify JSON",
      description: "Format messy JSON into readable structure",
      icon: "🎨",
      benefits: [
        "Automatic indentation and line breaks",
        "Highlight nested structures",
        "Supports large JSON files",
        "One-click copy formatted JSON",
      ],
    },
    {
      title: "Minify JSON",
      description: "Reduce JSON size for fast transmission",
      icon: "⚡",
      benefits: [
        "Removes all unnecessary spaces and line breaks",
        "Preserves data integrity",
        "Ideal for APIs and web apps",
        "Quick copy after minifying",
      ],
    },
    {
      title: "Validate JSON",
      description: "Check for syntax errors instantly",
      icon: "✅",
      benefits: [
        "Instant error detection",
        "Shows exact line & character errors",
        "Helps prevent broken API calls",
        "Guided fixes for invalid JSON",
      ],
    },
    {
      title: "Convert JSON",
      description: "Convert JSON to CSV, XML, or YAML",
      icon: "🔄",
      benefits: [
        "Supports multiple export formats",
        "Copy or download results",
        "Maintains correct data mapping",
        "One-click conversion",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Supported File Types", value: "JSON (.json), Plain Text" },
    { label: "File Size Limit", value: "Up to 5MB per file" },
    { label: "Conversion Formats", value: "CSV, XML, YAML" },
    { label: "Validation", value: "Instant syntax checking" },
    { label: "Processing", value: "Client-side (no upload)" },
    { label: "Performance", value: "Fast even for large files" },
  ];

  const steps = [
    { step: 1, title: "Paste or Upload JSON", description: "Input your JSON data into the tool" },
    { step: 2, title: "Choose Action", description: "Beautify, Minify, Validate, or Convert" },
    { step: 3, title: "Preview Results", description: "See the formatted or converted JSON instantly" },
    { step: 4, title: "Copy or Download", description: "Copy to clipboard or download in desired format" },
  ];

  const benefits = [
    { icon: "⚡", title: "Fast & Reliable", description: "Instant client-side processing with no delay" },
    { icon: "🔒", title: "Privacy First", description: "All JSON data stays in your browser" },
    { icon: "✅", title: "Error-Free", description: "Instant validation ensures your JSON is correct" },
    { icon: "🌐", title: "Cross-Platform", description: "Works in desktop, mobile, and browser apps" },
  ];

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">JSON Formatter Features</h2>
          <p className="irf-subtitle">
            Beautify, minify, validate, and convert JSON instantly with real-time preview
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

export default JSONFormatterFeatures;
