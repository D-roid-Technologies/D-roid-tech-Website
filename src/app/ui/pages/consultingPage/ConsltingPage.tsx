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

const offer = [
  {
    title: "Tech Stack Evaluation & Recommendation",
    description:
      "We analyze your current technology and recommend optimal solutions aligned with your business goals.",
    icon: FaSearch({ size: 24 }),
  },
  {
    title: "Digital Transformation Roadmapping",
    description:
      "We create a strategic plan to modernize your technology infrastructure and processes.",
    icon: FaRocket({ size: 24 }),
  },
  {
    title: "CTO-as-a-Service for Startups",
    description:
      "We provide on-demand technical leadership to guide your startup's technology decisions.",
    icon: FaBrain({ size: 24 }),
  },
  {
    title: "Security & Infrastructure Review",
    description:
      "We evaluate your systems for vulnerabilities and recommend improvements to strengthen security.",
    icon: FaLock({ size: 24 }),
  },
  {
    title: "Scalability & Performance Optimization",
    description:
      "We identify bottlenecks and implement solutions to improve system performance and scalability.",
    icon: FaChartLine({ size: 24 }),
  },
  {
    title: "Custom Software Strategy & Architecture",
    description:
      "We design tailored software solutions that address your unique business challenges.",
    icon: FaPuzzlePiece({ size: 24 }),
  },
];
const ConsultingPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideTwo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "60px",
          color: "#fff",
        }}
      >
        <div>
          <h1 style={{ fontSize: "4rem", fontWeight: 800 }}>
            Tech Consulting Services
          </h1>
          <p style={{ fontSize: "1.25rem", maxWidth: "600px" }}>
            Drive innovation, solve complex challenges, and build smarter with
            strategic guidance from D’roid Technologies.
          </p>
        </div>
      </div>

      {/* What We Offer */}
      <div className="wrapper soft-wrapper">
        <h2 className="soft-dev-header title_span">
          What We Bring to the Table
        </h2>
        <div className="soft-dev-content">
          {offer.map((phase, index) => (
            <CoreValueCardTwo
              key={index}
              title={phase.title}
              description={phase.description}
              icon={phase.icon}
              className="process-card"
            />
          ))}
          {/* <ul style={{ lineHeight: "2", fontSize: "1.1rem", color: "#333" }}>
            <li>🔍 Tech Stack Evaluation & Recommendation</li>
            <li>🚀 Digital Transformation Roadmapping</li>
            <li>🧠 CTO-as-a-Service for Startups</li>
            <li>🔐 Security & Infrastructure Review</li>
            <li>📈 Scalability & Performance Optimization</li>
            <li>🧩 Custom Software Strategy & Architecture</li>
          </ul> */}
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
          Whether you’re scaling, transforming, or launching — we’ll help you
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
          backgroundColor: "#f5f7fa",
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
