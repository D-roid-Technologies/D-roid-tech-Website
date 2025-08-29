import type React from "react";
import ToolboxFeatureCard from "../cards/ToolboxFeatureCard";
import ToolboxSpecCard from "../cards/ToolboxSpecCard";
import ToolboxStepCard from "../cards/ToolboxStepCard";
import ToolboxBenefitCard from "../cards/ToolboxBenefitCard";
import "../imageresizing/ImageResizerFeatures.css";

const WordCounterFeatures: React.FC = () => {
  const features = [
    {
      title: "Real-time Counting",
      description: "Instantly count words, characters, and sentences",
      icon: "⌨️",
      benefits: [
        "Counts as you type",
        "Shows total words, characters, and lines",
        "Handles multiple languages",
        "Includes/excludes spaces option",
      ],
    },
    {
      title: "Detailed Statistics",
      description: "Get insights into readability and text composition",
      icon: "📊",
      benefits: [
        "Average word length",
        "Sentence count",
        "Paragraph count",
        "Readability score estimation",
      ],
    },
    {
      title: "Text Cleaning Tools",
      description: "Optimize your text for better counting",
      icon: "🧹",
      benefits: [
        "Trim extra spaces",
        "Remove duplicate words",
        "Convert case (upper/lower/title)",
        "Clean special characters",
      ],
    },
    {
      title: "Export & Share",
      description: "Save and share your text analysis easily",
      icon: "💾",
      benefits: [
        "Copy results to clipboard",
        "Download text and stats",
        "Share via email or social apps",
        "Integrate with other writing tools",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Supported Input", value: "Plain text, Markdown, Rich text" },
    { label: "Metrics", value: "Words, Characters, Sentences, Paragraphs" },
    { label: "Real-time Processing", value: "Client-side, instant updates" },
    { label: "Languages", value: "Supports multiple languages" },
    { label: "Export Options", value: "Copy, Download, Share" },
    { label: "Privacy", value: "100% local processing, no uploads" },
  ];

  const steps = [
    { step: 1, title: "Enter Text", description: "Type or paste your text into the input area" },
    { step: 2, title: "View Counts", description: "See live word, character, sentence, and paragraph counts" },
    { step: 3, title: "Clean & Optimize", description: "Use text cleaning tools to prepare your content" },
    { step: 4, title: "Export or Share", description: "Copy, download, or share your text and statistics" },
  ];

  const benefits = [
    { icon: "⚡", title: "Instant Feedback", description: "Real-time counting without waiting" },
    { icon: "🔒", title: "Privacy Protected", description: "All processing happens locally in your browser" },
    { icon: "🎯", title: "Accurate Metrics", description: "Reliable and professional text analysis" },
    { icon: "🌐", title: "Cross-Platform", description: "Works on desktop, tablet, and mobile devices" },
  ];

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">Word Counter Features</h2>
          <p className="irf-subtitle">
            Count words, characters, sentences, and paragraphs instantly with real-time stats and text tools
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

export default WordCounterFeatures;
