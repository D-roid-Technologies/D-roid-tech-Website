import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import {
  FaChartLine,
  FaLock,
  FaPuzzlePiece,
  FaRocket,
  FaSearch,
} from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { store } from "../../../redux/Store";

const offer = [
  {
    title: "Tech Stack Evaluation & Recommendation",
    description:
      "We conduct deep-dive audits of your existing technology landscape, analyzing performance metrics, cost efficiency, and future scalability. Our experts provide actionable recommendations with ROI projections, migration timelines, and risk assessments.",
    icon: FaSearch({ size: 24 }),
    url: "",
    duration: "2-4 weeks",
    deliverables: [
      "Comprehensive tech audit report",
      "Stack comparison matrix",
      "Migration roadmap",
      "Cost-benefit analysis",
    ],
    businessImpact:
      "Reduce technical debt by 60% and improve system performance by 40%",
  },
  {
    title: "Digital Transformation Roadmapping",
    description:
      "We craft comprehensive digital transformation strategies that align cutting-edge technology with your business objectives. From legacy system modernization to cloud migration and process automation.",
    icon: FaRocket({ size: 24 }),
    url: "",
    duration: "3-6 weeks",
    deliverables: [
      "Digital maturity assessment",
      "Transformation roadmap",
      "Technology blueprint",
      "Change management plan",
    ],
    businessImpact:
      "Accelerate time-to-market by 50% and reduce operational costs by 30%",
  },
  {
    title: "CTO-as-a-Service for Startups",
    description:
      "Access seasoned technical leadership without the full-time commitment. Our fractional CTOs bring 15+ years of experience scaling startups from MVP to IPO.",
    icon: FaBrain({ size: 24 }),
    url: "",
    duration: "Ongoing engagement",
    deliverables: [
      "Technical strategy documentation",
      "Team hiring roadmap",
      "Architecture decisions",
      "Investor pitch support",
    ],
    businessImpact:
      "Save $200K+ annually vs. full-time CTO hire while gaining enterprise-level expertise",
  },
  {
    title: "Security & Infrastructure Review",
    description:
      "Our cybersecurity experts perform comprehensive penetration testing, vulnerability assessments, and compliance audits across your entire digital infrastructure.",
    icon: FaLock({ size: 24 }),
    url: "",
    duration: "1-3 weeks",
    deliverables: [
      "Security assessment report",
      "Penetration test results",
      "Compliance gap analysis",
      "Remediation action plan",
    ],
    businessImpact:
      "Prevent potential data breaches that cost companies $4.45M on average",
  },
  {
    title: "Scalability & Performance Optimization",
    description:
      "We identify performance bottlenecks through advanced monitoring and load testing, then implement targeted optimizations that can handle 10x traffic growth. ",
    icon: FaChartLine({ size: 24 }),
    url: "",
    duration: "2-8 weeks",
    deliverables: [
      "Performance audit report",
      "Load testing results",
      "Optimization implementation",
      "Monitoring dashboard setup",
    ],
    businessImpact:
      "Improve application response time by 70% and support 10x user growth without infrastructure overhaul",
  },
  {
    title: "Custom Software Strategy & Architecture",
    description:
      "We design enterprise-grade software architectures tailored to your unique business processes and growth projections. From microservices and API-first designs to event-driven architectures.",
    icon: FaPuzzlePiece({ size: 24 }),
    url: "",
    duration: "4-12 weeks",
    deliverables: [
      "System architecture blueprint",
      "API design specifications",
      "Database schema design",
      "Integration strategy",
    ],
    businessImpact:
      "Reduce development time by 40% and maintenance costs by 50% through optimal architecture",
  },
];
const ConsultingPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <h1 className="software-header"> Tech Consulting Services</h1>
            <p>
              Drive innovation, solve complex challenges, and build smarter with
              strategic guidance from D'roid Technologies.
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#fff" }}
        >
          What We Bring to the Table
        </span>
        <div className="soft-dev-content">
          {offer.map((phase, index) => (
            <CoreValueCardTwo
              key={index}
              title={phase.title}
              description={phase.description}
              icon={phase.icon}
              // url="{phase.url}"
              onClick={() => {
                store.dispatch(updateModal(true));
                store.dispatch(
                  updateModalContent({
                    appTitle: phase.title,
                    appBody: (
                      <div style={{ padding: "20px" }}>
                        <div style={{ marginBottom: "24px" }}>
                          <h3
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              color: "#374151",
                              marginBottom: "12px",
                            }}
                          >
                            Overview
                          </h3>
                          <p
                            style={{
                              color: "#4B5563",
                              lineHeight: "1.6",
                              fontSize: "0.95rem",
                            }}
                          >
                            {phase.description}
                          </p>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                          <h3
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              color: "#374151",
                              marginBottom: "12px",
                            }}
                          >
                            Deliverables
                          </h3>
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            {phase.deliverables.map((item, idx) => (
                              <li
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                  color: "#4B5563",
                                  fontSize: "0.95rem",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#071d6a",
                                    marginRight: "8px",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  •
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div
                          style={{
                            backgroundColor: "#F3F4F6",
                            padding: "16px",
                            borderRadius: "8px",
                            borderLeft: "4px solid #071d6a",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              color: "#374151",
                              marginBottom: "8px",
                            }}
                          >
                            Business Impact
                          </h3>
                          <p
                            style={{
                              color: "#4B5563",
                              fontSize: "0.95rem",
                              margin: 0,
                            }}
                          >
                            {phase.businessImpact}
                          </p>
                        </div>
                        {/* cta */}
                        <div
                          style={{
                            marginTop: "20px",
                          }}
                          className="cta-container"
                        >
                          <h3>Ready to transform your tech strategy?</h3>
                          <p>Contact us to schedule a free consultation.</p>
                          <div
                            style={{
                              marginTop: "30px",
                            }}
                          >
                            <button>Schedule a Free Consultation</button>
                          </div>
                        </div>
                      </div>
                    ),
                  })
                );
              }}
              className="process-card"
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: "#071d6a",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.2rem", marginBottom: "15px" }}>
          Need expert guidance for your tech journey?
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          Whether you're scaling, transforming, or launching — we'll help you
          make the right moves.
        </p>
        <a
          href="/start-a-project"
          style={{
            backgroundColor: "#fff",
            color: "#071d6a",
            padding: "12px 28px",
            fontWeight: "600",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Schedule a Free Consultation
        </a>
      </div>

      {/* Testimonials or Case Study */}
      <div
        style={{
          // backgroundColor: "#f5f7fa",
          padding: "50px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Success Stories
        </h2>
        <div
          style={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              Logistics Startup Transformation
            </h3>
            <p style={{ color: "#555" }}>
              Helped a logistics startup restructure its backend to handle 5x
              user growth using Node.js and cloud optimization.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              Legacy App Modernization
            </h3>
            <p style={{ color: "#555" }}>
              Worked with an education platform to migrate from legacy PHP to
              modern React/TypeScript with improved UX and performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingPage;
