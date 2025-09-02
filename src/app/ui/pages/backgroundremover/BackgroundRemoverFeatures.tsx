import React from "react";
import "../backgroundremover/BackgroundRemoverFeatures.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface BackgroundRemoverFeaturesProps {
  className?: string;
}

const BackgroundRemoverFeatures: React.FC<BackgroundRemoverFeaturesProps> = ({
  className = "",
}) => {
  const features: Feature[] = [
    {
      icon: "🏆",
      title: "Industry Leading",
      description:
        "Remove.bg is the most trusted background removal service used by millions",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Professional results in seconds with cloud-powered AI processing",
    },
    {
      icon: "🎯",
      title: "Perfect Quality",
      description:
        "Precise edge detection and subject preservation for flawless results",
    },
    {
      icon: "🤖",
      title: "AI Powered",
      description:
        "Advanced machine learning algorithms trained on millions of images",
    },
    {
      icon: "📱",
      title: "Multiple Formats",
      description:
        "Export in PNG, WEBP, or JPEG formats with customizable quality settings",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description:
        "Your images are processed securely and never stored permanently",
    },
  ];

  return (
    <div className={`bgremover-features-container ${className}`.trim()}>
      <div className="bgremover-features-header">
        <h2 className="bgremover-features-title">
          Why Choose Our Background Remover?
        </h2>
        <p className="bgremover-features-subtitle">
          Experience the power of professional-grade AI background removal
        </p>
      </div>

      <div className="bgremover-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="bgremover-feature-card">
            <div className="bgremover-feature-icon">{feature.icon}</div>
            <h3 className="bgremover-feature-title">{feature.title}</h3>
            <p className="bgremover-feature-description">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundRemoverFeatures;
