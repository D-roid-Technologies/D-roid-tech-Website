import React from "react";
import "../../../components/toolboxfolder/imageresizing/ImageResizerFeatures.css";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

interface ImageResizerFeaturesProps {
  className?: string;
}

const ImageResizeFeatures: React.FC<ImageResizerFeaturesProps> = ({
  className = "",
}) => {
  const features: FeatureItem[] = [
    {
      title: "Drag & Drop Interface",
      description: "Intuitive file uploading with visual feedback",
      icon: "📁",
      benefits: [
        "Simply drag images directly into the tool",
        "Visual drag state indicators",
        "Click to browse alternative",
        "Supports multiple image formats",
      ],
    },
    {
      title: "Multiple Format Support",
      description: "Works with all common image formats",
      icon: "🖼️",
      benefits: [
        "JPEG, PNG, GIF, WebP support",
        "Maintains original format on export",
        "Automatic format detection",
        "High-quality processing",
      ],
    },
    {
      title: "Custom Dimensions",
      description: "Precise control over image dimensions",
      icon: "📐",
      benefits: [
        "Set exact width and height in pixels",
        "Real-time dimension updates",
        "Maximum dimension limits",
        "Flexible sizing options",
      ],
    },
    {
      title: "Aspect Ratio Preservation",
      description: "Maintain image proportions automatically",
      icon: "🔒",
      benefits: [
        "Toggle aspect ratio lock on/off",
        "Automatic proportion calculations",
        "Prevents image distortion",
        "Smart dimension adjustments",
      ],
    },
    {
      title: "Quality Control",
      description: "Adjustable compression for optimal file sizes",
      icon: "⚡",
      benefits: [
        "Quality slider from 10% to 100%",
        "Real-time quality preview",
        "Balance between size and quality",
        "5% increment steps",
      ],
    },
    {
      title: "Preset Size Options",
      description: "Quick resizing with common dimensions",
      icon: "🎯",
      benefits: [
        "HD (1280×720) resolution",
        "Full HD (1920×1080) resolution",
        "SD (640×480) for web use",
        "Thumbnail (320×240) for previews",
      ],
    },
    {
      title: "Batch Processing",
      description: "Create multiple sizes from one image",
      icon: "⚙️",
      benefits: [
        "Generate multiple versions simultaneously",
        "Keep history of all resized images",
        "Compare different sizes side-by-side",
        "No limit on number of variations",
      ],
    },
    {
      title: "Smart File Management",
      description: "Organized downloads with descriptive naming",
      icon: "💾",
      benefits: [
        "Auto-generated filenames with dimensions",
        "Quality level included in filename",
        "Original filename preservation",
        "Proper file extensions maintained",
      ],
    },
    {
      title: "Real-time Preview",
      description: "See your changes before downloading",
      icon: "👁️",
      benefits: [
        "Instant preview of resized images",
        "Original image comparison",
        "File size estimation",
        "Visual quality assessment",
      ],
    },
    {
      title: "Error Handling",
      description: "Robust error management and user feedback",
      icon: "🛡️",
      benefits: [
        "Invalid file type detection",
        "Processing error recovery",
        "Clear error messages",
        "Graceful failure handling",
      ],
    },
    {
      title: "Performance Optimized",
      description: "Fast processing with smooth user experience",
      icon: "🚀",
      benefits: [
        "High-quality image smoothing",
        "Efficient canvas rendering",
        "Responsive user interface",
        "Processing state indicators",
      ],
    },
    {
      title: "File Size Information",
      description: "Detailed information about file sizes",
      icon: "📊",
      benefits: [
        "Original file size display",
        "Estimated resized file sizes",
        "Size units (B, KB, MB)",
        "Compression ratio insights",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Max Width", value: "1920px (configurable)" },
    { label: "Quality Range", value: "10% - 100%" },
    { label: "Supported Formats", value: "JPG, PNG, GIF, WebP" },
    { label: "Processing", value: "Client-side (no uploads)" },
    { label: "Canvas Smoothing", value: "High quality enabled" },
    { label: "Aspect Ratios", value: "Automatic preservation" },
  ];

  return (
    <div className={`image-resizer-features ${className}`}>
      <div className="irf-container">
        <header className="irf-header">
          <h2 className="irf-title">Image Resizer Features</h2>
          <p className="irf-subtitle">
            Professional-grade image resizing with advanced features and
            intuitive controls
          </p>
        </header>

        <section className="irf-features-grid">
          {features.map((feature, index) => (
            <div className="irf-feature-card" key={index}>
              <div className="irf-feature-icon">{feature.icon}</div>
              <h3 className="irf-feature-title">{feature.title}</h3>
              <p className="irf-feature-description">{feature.description}</p>
              <ul className="irf-feature-benefits">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="irf-benefit-item">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="irf-technical-specs">
          <h3 className="irf-specs-title">Technical Specifications</h3>
          <div className="irf-specs-grid">
            {technicalSpecs.map((spec, index) => (
              <div className="irf-spec-item" key={index}>
                <span className="irf-spec-label">{spec.label}:</span>
                <span className="irf-spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="irf-usage-flow">
          <h3 className="irf-flow-title">How It Works</h3>
          <div className="irf-steps">
            <div className="irf-step">
              <div className="irf-step-number">1</div>
              <div className="irf-step-content">
                <h4>Upload Image</h4>
                <p>Drag & drop or click to select your image file</p>
              </div>
            </div>
            <div className="irf-step">
              <div className="irf-step-number">2</div>
              <div className="irf-step-content">
                <h4>Choose Dimensions</h4>
                <p>Use preset sizes or set custom width and height</p>
              </div>
            </div>
            <div className="irf-step">
              <div className="irf-step-number">3</div>
              <div className="irf-step-content">
                <h4>Adjust Quality</h4>
                <p>Set compression level for optimal file size</p>
              </div>
            </div>
            <div className="irf-step">
              <div className="irf-step-number">4</div>
              <div className="irf-step-content">
                <h4>Download Results</h4>
                <p>Preview and download your resized images</p>
              </div>
            </div>
          </div>
        </section>

        <section className="irf-benefits">
          <h3 className="irf-benefits-title">Why Choose This Tool?</h3>
          <div className="irf-benefits-list">
            <div className="irf-benefit-highlight">
              <h4>🔒 Privacy First</h4>
              <p>
                All processing happens in your browser - no files uploaded to
                servers
              </p>
            </div>
            <div className="irf-benefit-highlight">
              <h4>⚡ Lightning Fast</h4>
              <p>Instant processing with no waiting for uploads or downloads</p>
            </div>
            <div className="irf-benefit-highlight">
              <h4>🎨 Professional Quality</h4>
              <p>High-quality resampling algorithms for crisp, clear results</p>
            </div>
            <div className="irf-benefit-highlight">
              <h4>📱 Responsive Design</h4>
              <p>Works seamlessly on desktop, tablet, and mobile devices</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageResizeFeatures;
