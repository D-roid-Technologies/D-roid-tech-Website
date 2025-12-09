import React from "react";
import "./AiBuilderDescription.css";

const AiBuilderDescription: React.FC = () => {
  return (
    <div className="aibuilder-desc-container">
      <div className="aibuilder-desc-header">
        <h2 className="aibuilder-desc-title">What is AI Builder?</h2>
        <p className="aibuilder-desc-subtitle">
          Your intelligent development companion for rapid prototyping and
          automation
        </p>
      </div>

      <div className="aibuilder-desc-content">
        <section className="aibuilder-desc-section">
          <h3 className="aibuilder-desc-section-title">Key Features</h3>
          <div className="aibuilder-desc-features-grid">
            <div className="aibuilder-desc-feature-card">
              <div className="aibuilder-desc-feature-icon">🤖</div>
              <h4 className="aibuilder-desc-feature-title">
                Smart Code Generation
              </h4>
              <p className="aibuilder-desc-feature-text">
                Generate clean, production-ready code with natural language
                prompts. AI Builder understands context and best practices to
                deliver code that works.
              </p>
            </div>

            <div className="aibuilder-desc-feature-card">
              <div className="aibuilder-desc-feature-icon">⚡</div>
              <h4 className="aibuilder-desc-feature-title">
                Rapid Prototyping
              </h4>
              <p className="aibuilder-desc-feature-text">
                Turn ideas into working prototypes in minutes. Perfect for
                testing concepts, building MVPs, or creating proof-of-concept
                applications quickly.
              </p>
            </div>

            <div className="aibuilder-desc-feature-card">
              <div className="aibuilder-desc-feature-icon">🔧</div>
              <h4 className="aibuilder-desc-feature-title">
                Intelligent Automation
              </h4>
              <p className="aibuilder-desc-feature-text">
                Automate repetitive tasks and workflows with AI-powered
                solutions. From data processing to API integrations, let AI
                handle the heavy lifting.
              </p>
            </div>

            <div className="aibuilder-desc-feature-card">
              <div className="aibuilder-desc-feature-icon">🎨</div>
              <h4 className="aibuilder-desc-feature-title">Design to Code</h4>
              <p className="aibuilder-desc-feature-text">
                Describe your UI vision and watch it come to life. AI Builder
                creates responsive, accessible interfaces that look great on any
                device.
              </p>
            </div>

            <div className="aibuilder-desc-feature-card">
              <div className="aibuilder-desc-feature-icon">📚</div>
              <h4 className="aibuilder-desc-feature-title">
                Multi-Framework Support
              </h4>
              <p className="aibuilder-desc-feature-text">
                Work with React, Vue, Angular, vanilla JavaScript, and more. AI
                Builder adapts to your preferred tech stack and coding style.
              </p>
            </div>

            <div className="aibuilder-desc-feature-card">
              <div className="aibuilder-desc-feature-icon">🔍</div>
              <h4 className="aibuilder-desc-feature-title">
                Code Analysis & Debugging
              </h4>
              <p className="aibuilder-desc-feature-text">
                Get instant feedback on your code with intelligent suggestions
                for improvements, bug fixes, and performance optimizations.
              </p>
            </div>
          </div>
        </section>

        <section className="aibuilder-desc-section">
          <h3 className="aibuilder-desc-section-title">
            Who Should Use AI Builder?
          </h3>
          <div className="aibuilder-desc-audience-list">
            <div className="aibuilder-desc-audience-item">
              <strong className="aibuilder-desc-audience-label">
                Developers
              </strong>
              <span className="aibuilder-desc-audience-text">
                Speed up your development workflow and tackle complex problems
                with AI assistance
              </span>
            </div>
            <div className="aibuilder-desc-audience-item">
              <strong className="aibuilder-desc-audience-label">
                Designers
              </strong>
              <span className="aibuilder-desc-audience-text">
                Bring your designs to life without deep coding knowledge
              </span>
            </div>
            <div className="aibuilder-desc-audience-item">
              <strong className="aibuilder-desc-audience-label">
                Product Managers
              </strong>
              <span className="aibuilder-desc-audience-text">
                Quickly prototype features and validate ideas before full
                development
              </span>
            </div>
            <div className="aibuilder-desc-audience-item">
              <strong className="aibuilder-desc-audience-label">
                Entrepreneurs
              </strong>
              <span className="aibuilder-desc-audience-text">
                Build your MVP faster and iterate on your product with minimal
                technical overhead
              </span>
            </div>
            <div className="aibuilder-desc-audience-item">
              <strong className="aibuilder-desc-audience-label">
                Students
              </strong>
              <span className="aibuilder-desc-audience-text">
                Learn by doing with an AI mentor that explains concepts as you
                build
              </span>
            </div>
          </div>
        </section>

        <section className="aibuilder-desc-section">
          <h3 className="aibuilder-desc-section-title">Getting Started</h3>
          <div className="aibuilder-desc-steps">
            <div className="aibuilder-desc-step">
              <div className="aibuilder-desc-step-number">1</div>
              <div className="aibuilder-desc-step-content">
                <h4 className="aibuilder-desc-step-title">
                  Describe Your Project
                </h4>
                <p className="aibuilder-desc-step-text">
                  Tell AI Builder what you want to create using natural language
                </p>
              </div>
            </div>
            <div className="aibuilder-desc-step">
              <div className="aibuilder-desc-step-number">2</div>
              <div className="aibuilder-desc-step-content">
                <h4 className="aibuilder-desc-step-title">Review & Refine</h4>
                <p className="aibuilder-desc-step-text">
                  Get instant code generation and iterate with conversational
                  feedback
                </p>
              </div>
            </div>
            <div className="aibuilder-desc-step">
              <div className="aibuilder-desc-step-number">3</div>
              <div className="aibuilder-desc-step-content">
                <h4 className="aibuilder-desc-step-title">Deploy & Scale</h4>
                <p className="aibuilder-desc-step-text">
                  Export your code and integrate it into your existing projects
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AiBuilderDescription;
