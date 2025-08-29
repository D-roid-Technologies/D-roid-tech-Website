import type React from "react";
import ToolboxFeatureCard from "../../../components/toolboxfolder/cards/ToolboxFeatureCard";
import ToolboxSpecCard from "../../../components/toolboxfolder/cards/ToolboxSpecCard";
import ToolboxStepCard from "../../../components/toolboxfolder/cards/ToolboxStepCard";
import ToolboxBenefitCard from "../../../components/toolboxfolder/cards/ToolboxBenefitCard";

import "../../../components/toolboxfolder/imageresizing/ImageResizerFeatures.css";



const CurrencyConverterFeatures: React.FC = () => {
  const features = [
    {
      title: "Real-time Conversion",
      description: "Instantly convert between multiple currencies",
      icon: "💱",
      benefits: [
        "Supports over 150 currencies",
        "Automatic live exchange rates",
        "Instant conversion as you type",
        "One-click copy results",
      ],
    },
    {
      title: "Historical Rates",
      description: "View past exchange rates for analysis",
      icon: "📈",
      benefits: [
        "Check rates for any past date",
        "Compare trends over time",
        "Visualize currency changes",
        "Export historical data",
      ],
    },
    {
      title: "Offline Mode",
      description: "Convert currencies without an internet connection",
      icon: "📶",
      benefits: [
        "Cached latest exchange rates",
        "Works offline seamlessly",
        "No need to refresh",
        "Fast local conversions",
      ],
    },
    {
      title: "Multi-format Output",
      description: "Copy or export conversions in different formats",
      icon: "💾",
      benefits: [
        "Copy to clipboard instantly",
        "Export to CSV or Excel",
        "Integrate with financial tools",
        "Save frequent conversions",
      ],
    },
  ];

  const technicalSpecs = [
    { label: "Supported Currencies", value: "150+ global currencies" },
    { label: "Update Frequency", value: "Every minute via API" },
    { label: "Offline Support", value: "Yes, cached rates available" },
    { label: "Conversion Types", value: "Fiat, Crypto, and custom rates" },
    { label: "Accuracy", value: "Real-time official exchange rates" },
    { label: "Privacy", value: "All conversion calculations are local" },
  ];

  const steps = [
    { step: 1, title: "Enter Amount & Currency", description: "Type the amount and select the source currency" },
    { step: 2, title: "Select Target Currency", description: "Choose the currency you want to convert to" },
    { step: 3, title: "View Conversion", description: "See real-time converted amount instantly" },
    { step: 4, title: "Copy or Export", description: "Copy the result or export it in your preferred format" },
  ];

  const benefits = [
    { icon: "⚡", title: "Fast & Accurate", description: "Instant client-side conversions with real-time rates" },
    { icon: "🔒", title: "Privacy First", description: "No data is sent to servers, all processing is local" },
    { icon: "🌐", title: "Global Support", description: "Works with major fiat and cryptocurrency currencies" },
    { icon: "💾", title: "Easy Export", description: "Copy, download, or save frequent conversions" },
  ];

  return (
    <div className="image-resizer-features">
      <div className="irf-container">
        {/* Header */}
        <header className="irf-header">
          <h2 className="irf-title">Currency Converter Features</h2>
          <p className="irf-subtitle">
            Convert currencies instantly with live rates, historical data, and offline support
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

export default CurrencyConverterFeatures;
