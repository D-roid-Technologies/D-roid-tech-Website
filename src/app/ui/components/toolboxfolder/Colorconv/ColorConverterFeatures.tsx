import type React from "react"
import ToolboxFeatureCard from "../cards/ToolboxFeatureCard"
import ToolboxSpecCard from "../cards/ToolboxSpecCard"
import ToolboxStepCard from "../cards/ToolboxStepCard"
import ToolboxBenefitCard from "../cards/ToolboxBenefitCard"
import "../imageresizing/ImageResizerFeatures.css"

const ColorConverterFeatures: React.FC = () => {
  const features = [
    {
      title: "HEX to RGB/HSB/CMYK",
      description: "Instantly convert HEX colors to other color spaces",
      icon: "🎨",
      benefits: [
        "Copy & paste HEX values",
        "Accurate RGB and CMYK conversion",
        "Supports HSL and HSV too",
        "One-click copy results",
      ],
    },
    {
      title: "Real-time Preview",
      description: "See color results as you type",
      icon: "👀",
      benefits: [
        "Instant background preview",
        "Preview text on light/dark surfaces",
        "Helps with contrast validation",
        "Improves color choice confidence",
      ],
    },
    {
      title: "Palette Generator",
      description: "Automatically create color palettes",
      icon: "🎨",
      benefits: [
        "Generate complementary colors",
        "Analogous & triadic schemes",
        "Save palettes for later",
        "Copy palette to clipboard",
      ],
    },
  ]

  const technicalSpecs = [
    { label: "Supported Inputs", value: "HEX, RGB, HSL, CMYK" },
    { label: "Export Formats", value: "CSS, Tailwind, Figma-ready" },
    { label: "Accuracy", value: "DeltaE < 1 for RGB/CMYK" },
    { label: "Conversion Speed", value: "Instant (client-side)" },
    { label: "Accessibility Check", value: "WCAG contrast ratios" },
    { label: "Copy Options", value: "1-click copy for all formats" },
  ]

  const steps = [
    { step: 1, title: "Enter Color Value", description: "Type or paste HEX/RGB/CMYK value" },
    { step: 2, title: "View Conversion", description: "See results instantly in other formats" },
    { step: 3, title: "Preview & Adjust", description: "Use real-time preview to test colors" },
    { step: 4, title: "Export/Copy", description: "Copy values or export palette to CSS/Design tools" },
  ]

  const benefits = [
    { icon: "⚡", title: "Fast Conversion", description: "Lightning-fast client-side calculations" },
    { icon: "🔒", title: "Privacy First", description: "No colors or data are uploaded anywhere" },
    { icon: "🎯", title: "Accurate Colors", description: "Professional-grade color math" },
    { icon: "🌐", title: "Cross-Platform", description: "Works in browser, mobile, and design apps" },
  ]

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">Color Converter Features</h2>
          <p className="irf-subtitle">
            Convert HEX, RGB, HSL, and CMYK instantly with live preview and accessibility checks
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
  )
}

export default ColorConverterFeatures
