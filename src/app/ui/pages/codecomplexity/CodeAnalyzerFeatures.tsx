import React, { useState } from "react";
import {
  FaCode,
  FaChartLine,
  FaLightbulb,
  FaEye,
  FaBug,
  FaRocket,
  FaPlay,
  FaCopy,
  FaCheck,
  FaArrowRight,
  FaGraduationCap,
  FaTools,
  FaShieldAlt,
  FaUsers,
  FaClock,
  FaSearch,
} from "react-icons/fa";
import "../codecomplexity/CodeAnalyzerFeatures.css";

const CodeAnalyzerFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [copiedExample, setCopiedExample] = useState(false);

  const features = [
    {
      icon: <FaChartLine className="caf-feature-icon" />,
      title: "Cyclomatic Complexity Analysis",
      description:
        "Measures the number of linearly independent paths through your code",
      details:
        "Identifies decision points like if-statements, loops, and switch cases to help you understand code branching complexity.",
    },
    {
      icon: <FaBug className="caf-feature-icon" />,
      title: "Cognitive Complexity Detection",
      description:
        "Evaluates how difficult your code is to understand mentally",
      details:
        "Analyzes nested structures and control flow to measure the mental effort required to comprehend your code.",
    },
    {
      icon: <FaTools className="caf-feature-icon" />,
      title: "Maintainability Index",
      description: "Calculates an overall health score for your codebase",
      details:
        "Combines multiple metrics to provide a single score indicating how maintainable and modifiable your code is.",
    },
    {
      icon: <FaSearch className="caf-feature-icon" />,
      title: "Code Hotspot Detection",
      description: "Identifies problematic areas that need immediate attention",
      details:
        "Pinpoints specific lines and sections with high complexity, deep nesting, or other quality issues.",
    },
    {
      icon: <FaLightbulb className="caf-feature-icon" />,
      title: "Intelligent Suggestions",
      description: "Provides actionable recommendations for code improvement",
      details:
        "Offers specific, practical advice on how to refactor and improve your code quality based on detected issues.",
    },
    {
      icon: <FaShieldAlt className="caf-feature-icon" />,
      title: "Code Smell Detection",
      description: "Automatically identifies common code quality issues",
      details:
        "Detects patterns that indicate potential problems like long functions, high complexity, and poor structure.",
    },
  ];

  const usageSteps = [
    {
      step: 1,
      title: "Paste Your Code",
      description: "Copy and paste your code into the analyzer input area",
      icon: <FaCopy className="caf-step-icon" />,
    },
    {
      step: 2,
      title: "Automatic Analysis",
      description: "The tool automatically analyzes your code as you type",
      icon: <FaPlay className="caf-step-icon" />,
    },
    {
      step: 3,
      title: "Review Metrics",
      description: "Check the complexity overview and key metrics",
      icon: <FaEye className="caf-step-icon" />,
    },
    {
      step: 4,
      title: "Explore Insights",
      description: "Navigate through tabs to see hotspots and suggestions",
      icon: <FaSearch className="caf-step-icon" />,
    },
    {
      step: 5,
      title: "Implement Improvements",
      description: "Apply the suggested improvements to enhance your code",
      icon: <FaRocket className="caf-step-icon" />,
    },
  ];

  const benefits = [
    {
      icon: <FaUsers className="caf-benefit-icon" />,
      title: "Better Collaboration",
      description:
        "Write code that's easier for your team to understand and maintain",
    },
    {
      icon: <FaClock className="caf-benefit-icon" />,
      title: "Faster Development",
      description: "Reduce debugging time with cleaner, more maintainable code",
    },
    {
      icon: <FaGraduationCap className="caf-benefit-icon" />,
      title: "Learn Best Practices",
      description:
        "Improve your coding skills with educational insights and explanations",
    },
    {
      icon: <FaShieldAlt className="caf-benefit-icon" />,
      title: "Prevent Bugs",
      description:
        "Identify potential issues before they become problems in production",
    },
  ];

  const exampleCode = `function calculateUserScore(user) {
  if (user && user.activities) {
    let score = 0;
    for (let activity of user.activities) {
      if (activity.type === 'login') {
        score += 10;
      } else if (activity.type === 'purchase') {
        score += 50;
      } else if (activity.type === 'review') {
        score += 20;
      }
    }
    return score;
  }
  return 0;
}`;

  const handleCopyExample = () => {
    navigator.clipboard.writeText(exampleCode);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  };

  return (
    <div className="caf-container">
      {/* Hero Section */}
      <div className="caf-hero">
        <div className="caf-hero-content">
          <h1 className="caf-hero-title">
            <FaCode className="caf-hero-icon" />
            Code Complexity Analyzer
          </h1>
          <p className="caf-hero-subtitle">
            Transform your code quality with intelligent analysis and actionable
            insights
          </p>
          <div className="caf-hero-stats">
            <div className="caf-stat">
              <span className="caf-stat-number">6+</span>
              <span className="caf-stat-label">Metrics Analyzed</span>
            </div>
            <div className="caf-stat">
              <span className="caf-stat-number">Real-time</span>
              <span className="caf-stat-label">Analysis</span>
            </div>
            <div className="caf-stat">
              <span className="caf-stat-number">Multi-language</span>
              <span className="caf-stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="caf-section">
        <h2 className="caf-section-title">Powerful Features</h2>
        <div className="caf-features-container">
          <div className="caf-features-list">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`caf-feature-item ${
                  activeFeature === index ? "caf-active" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                {feature.icon}
                <div className="caf-feature-content">
                  <h3 className="caf-feature-title">{feature.title}</h3>
                  <p className="caf-feature-description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="caf-feature-details">
            <div className="caf-feature-detail-card">
              <h3>{features[activeFeature].title}</h3>
              <p>{features[activeFeature].details}</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="caf-section caf-usage-section">
        <h2 className="caf-section-title">How to Use</h2>
        <div className="caf-usage-steps">
          {usageSteps.map((step, index) => (
            <div key={index} className="caf-usage-step">
              <div className="caf-step-number">{step.step}</div>
              <div className="caf-step-content">
                {step.icon}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < usageSteps.length - 1 && (
                <FaArrowRight className="caf-arrow-icon" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Try It Section */}
      <div className="caf-section caf-try-section">
        <h2 className="caf-section-title">Try It Now</h2>
        <div className="caf-example-container">
          <div className="caf-example-header">
            <h3>Example Code to Analyze</h3>
            <button
              className={`caf-copy-button ${copiedExample ? "caf-copied" : ""}`}
              onClick={handleCopyExample}
            >
              {copiedExample ? <FaCheck /> : <FaCopy />}
              {copiedExample ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="caf-code-example">
            <code>{exampleCode}</code>
          </pre>
          <p className="caf-example-note">
            Copy this code and paste it into the analyzer to see how it
            identifies complexity issues and suggests improvements.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="caf-section">
        <h2 className="caf-section-title">Why Use This Tool?</h2>
        <div className="caf-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="caf-benefit-card">
              {benefit.icon}
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Languages */}
      <div className="caf-section">
        <h2 className="caf-section-title">Supported Languages</h2>
        <div className="caf-languages">
          <div className="caf-language-tag">JavaScript</div>
          <div className="caf-language-tag">TypeScript</div>
          <div className="caf-language-tag">Python</div>
          <div className="caf-language-tag">Java</div>
          <div className="caf-language-tag">C++</div>
          <div className="caf-language-tag">C#</div>
          <div className="caf-language-tag">Go</div>
          <div className="caf-language-tag">Rust</div>
        </div>
      </div>

      {/* Metrics Explanation */}
      <div className="caf-section caf-metrics-section">
        <h2 className="caf-section-title">Understanding the Metrics</h2>
        <div className="caf-metrics-grid">
          <div className="caf-metric-explanation">
            <h3>🔄 Cyclomatic Complexity</h3>
            <div className="caf-metric-ranges">
              <div className="caf-range caf-good">1-5: Excellent</div>
              <div className="caf-range caf-moderate">6-10: Moderate</div>
              <div className="caf-range caf-high">11-15: High</div>
              <div className="caf-range caf-critical">16+: Critical</div>
            </div>
          </div>
          <div className="caf-metric-explanation">
            <h3>🧠 Cognitive Complexity</h3>
            <div className="caf-metric-ranges">
              <div className="caf-range caf-good">1-7: Simple</div>
              <div className="caf-range caf-moderate">8-15: Moderate</div>
              <div className="caf-range caf-high">16-25: Complex</div>
              <div className="caf-range caf-critical">25+: Very Complex</div>
            </div>
          </div>
          <div className="caf-metric-explanation">
            <h3>🔧 Maintainability Index</h3>
            <div className="caf-metric-ranges">
              <div className="caf-range caf-good">80-100: Excellent</div>
              <div className="caf-range caf-moderate">60-79: Good</div>
              <div className="caf-range caf-high">40-59: Moderate</div>
              <div className="caf-range caf-critical">0-39: Poor</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzerFeatures;
