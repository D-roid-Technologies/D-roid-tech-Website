import type React from "react";
import ToolboxFeatureCard from "../cards/ToolboxFeatureCard";
import ToolboxSpecCard from "../cards/ToolboxSpecCard";
import ToolboxStepCard from "../cards/ToolboxStepCard";
import ToolboxBenefitCard from "../cards/ToolboxBenefitCard";
import "../imageresizing/ImageResizerFeatures.css";

const CropToolFeatures: React.FC = () => {
  const features = [
    {
      title: "Interactive Crop Interface",
      description: "Drag to select and crop images visually",
      icon: "✂️",
      benefits: [
        "Resize crop area freely",
        "Aspect ratio presets available",
        "Snap-to-grid for precision",
        "Live preview of cropped area",
      ],
    },
    {
      title: "Multiple Aspect Ratios",
      description: "Predefined ratios for social media and web",
      icon: "📐",
      benefits: [
        "16:9, 4:3, 1:1, custom ratios",
        "Maintain ratio toggle on/off",
        "Ideal for Instagram, YouTube, and more",
        "Quickly switch between presets",
      ],
    },
    {
      title: "Zoom & Pan",
      description: "Easily adjust which part of the image to crop",
      icon: "🔍",
      benefits: [
        "Pinch to zoom (mobile supported)",
        "Drag to reposition",
        "Precision cropping for large images",
        "Smooth pan and zoom animations",
      ],
    },
    {
      title: "Real-time Preview",
      description: "See the cropped result instantly",
      icon: "👁️",
      benefits: [
        "Compare original vs cropped",
        "Instant feedback on crop area",
        "Check image composition before export",
        "Preview in multiple output sizes",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Supported Formats", value: "JPEG, PNG, WebP, GIF" },
    { label: "Max Image Size", value: "50MB per image" },
    { label: "Aspect Ratios", value: "Custom or preset ratios" },
    { label: "Processing", value: "Client-side (no uploads)" },
    { label: "Zoom & Pan", value: "Smooth, responsive interaction" },
    { label: "Output Options", value: "Download cropped image in original format" },
  ];

  const steps = [
    { step: 1, title: "Upload Image", description: "Drag & drop or select an image" },
    { step: 2, title: "Select Crop Area", description: "Resize and move the crop box to desired area" },
    { step: 3, title: "Adjust Ratio & Preview", description: "Choose aspect ratio and preview the result" },
    { step: 4, title: "Download Cropped Image", description: "Export your cropped image in original format" },
  ];

  const benefits = [
    { icon: "⚡", title: "Fast & Responsive", description: "Instant crop preview in the browser" },
    { icon: "🔒", title: "Privacy First", description: "All cropping happens locally, no uploads" },
    { icon: "🎯", title: "Precision Cropping", description: "High accuracy with aspect ratio and grid tools" },
    { icon: "🌐", title: "Cross-Platform", description: "Works on desktop, tablet, and mobile devices" },
  ];

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">Crop Tool Features</h2>
          <p className="irf-subtitle">
            Crop images precisely with live preview, aspect ratio control, and intuitive interface
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

export default CropToolFeatures;
