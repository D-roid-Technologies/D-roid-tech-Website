import React from "react";
import "./SoftwareService.css";

interface ServiceItem {
  text: string;
}

const SoftwareService: React.FC = () => {
  const services: ServiceItem[] = [
    { text: "Develop custom software from scratch" },
    { text: "Build at the intersection of business goals & user needs" },
    { text: "Optimize performance, scalability, and ROI" },
    { text: "Create in-house tools or market-ready products" },
  ];

  return (
    <div className="sds__container">
      <div className="sds__content">
        <div className="sds__text-section">
          <h1 className="sds__title">
            Software Development Services
            <br />
            that launch ventures, not apps.
          </h1>

          <p className="sds__subtitle">
            You're not building software for fun. You're investing in software
            to drive results. And we're in the business of getting you there.
          </p>

          <ul className="sds__services-list">
            {services.map((service, index) => (
              <li key={index} className="sds__service-item">
                <span className="sds__bullet">•</span>
                {service.text}
              </li>
            ))}
          </ul>

          {/* <button className="sds__cta-button">Contact Us</button> */}
        </div>

        <div className="sds__image-section">
          <div className="sds__code-window">
            <div className="sds__window-header">
              <div className="sds__window-controls">
                <span className="sds__control sds__control--red"></span>
                <span className="sds__control sds__control--yellow"></span>
                <span className="sds__control sds__control--green"></span>
              </div>
              <span className="sds__window-title">main.tsx</span>
            </div>
            <div className="sds__code-content">
              <div className="sds__code-line">
                <span className="sds__line-number">1</span>
                <span className="sds__code-text">
                  <span className="sds__keyword">import</span>
                  <span className="sds__string"> React </span>
                  <span className="sds__keyword">from</span>
                  <span className="sds__string"> 'react'</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">2</span>
                <span className="sds__code-text">
                  <span className="sds__keyword">import</span>
                  <span className="sds__string"> './App.css'</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">3</span>
                <span className="sds__code-text"></span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">4</span>
                <span className="sds__code-text">
                  <span className="sds__keyword">const</span>
                  <span className="sds__function"> VentureApp</span>
                  <span className="sds__operator"> = () =&gt; &#123;</span>
                  {/* <span className="sds__operator"> = () => {`{`}</span> */}
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">5</span>
                <span className="sds__code-text">
                  <span className="sds__indent"> </span>
                  <span className="sds__keyword">return</span>
                  <span className="sds__operator"> (</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">6</span>
                <span className="sds__code-text">
                  <span className="sds__indent"> </span>
                  <span className="sds__tag">&lt;div</span>
                  <span className="sds__attribute"> className</span>
                  <span className="sds__operator">=</span>
                  <span className="sds__string">"venture"</span>
                  <span className="sds__tag">&gt;</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">7</span>
                <span className="sds__code-text">
                  <span className="sds__indent"> </span>
                  <span className="sds__tag">&lt;Success</span>
                  <span className="sds__attribute"> driven</span>
                  <span className="sds__operator">=</span>
                  <span className="sds__string">{`{true}`}</span>
                  <span className="sds__tag"> /&gt;</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">8</span>
                <span className="sds__code-text">
                  <span className="sds__indent"> </span>
                  <span className="sds__tag">&lt;/div&gt;</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">9</span>
                <span className="sds__code-text">
                  <span className="sds__indent"> </span>
                  <span className="sds__operator">)</span>
                </span>
              </div>
              <div className="sds__code-line">
                <span className="sds__line-number">10</span>
                <span className="sds__code-text">
                  <span className="sds__operator">{`}`}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="sds__dashboard-window">
            <div className="sds__dashboard-header">
              <h3>Maximizing Your Financial Power</h3>
            </div>
            <div className="sds__dashboard-content">
              <div className="sds__metrics">
                <div className="sds__metric">
                  <div className="sds__metric-value">$2.4M</div>
                  <div className="sds__metric-label">Revenue Growth</div>
                </div>
                <div className="sds__metric">
                  <div className="sds__metric-value">340%</div>
                  <div className="sds__metric-label">ROI Increase</div>
                </div>
              </div>
              <div className="sds__chart-placeholder">
                <div className="sds__chart-bar sds__chart-bar--1"></div>
                <div className="sds__chart-bar sds__chart-bar--2"></div>
                <div className="sds__chart-bar sds__chart-bar--3"></div>
                <div className="sds__chart-bar sds__chart-bar--4"></div>
              </div>
              <div className="sds__activate-section">
                <span className="sds__activate-text">Activate Windows</span>
                <button className="sds__activate-btn">Go to Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareService;
