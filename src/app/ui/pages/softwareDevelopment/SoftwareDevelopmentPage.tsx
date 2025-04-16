import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";

const devPhases = [
  {
    title: "Discovery & Planning",
    description: "We work with you to understand goals, users, and requirements. Every great product starts with deep discovery.",
  },
  {
    title: "Design & Prototyping",
    description: "Our UI/UX experts create sleek interfaces and clickable prototypes to bring ideas to life—before writing code.",
  },
  {
    title: "Development & Testing",
    description: "We build clean, scalable code using modern frameworks and run extensive testing to ensure quality.",
  },
  {
    title: "Deployment & Maintenance",
    description: "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
  },
];

const technologies = [
  {
    title: "Frontend Development",
    description: "Modern, responsive UIs using React, TypeScript, and Tailwind CSS.",
    imageSrc: "", // optional icon/image
  },
  {
    title: "Backend Development",
    description: "Powerful APIs and logic using Node.js, Express, Python, and more.",
    imageSrc: "",
  },
  {
    title: "Database & Cloud",
    description: "Robust data solutions with MySQL, MongoDB, Firebase, and scalable cloud architecture.",
    imageSrc: "",
  },
  {
    title: "Cross-Platform Apps",
    description: "React Native & hybrid mobile solutions to reach iOS and Android users seamlessly.",
    imageSrc: "",
  },
];

const SoftwareDevelopmentPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Hero */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideOne})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "60px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
            Software Development
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#eee", maxWidth: "550px" }}>
            We build scalable, performant, and user-focused software tailored to your business needs—from concept to launch.
          </p>
        </div>
      </div>

      {/* Approach Section */}
      <div className="wrapper" style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Our Development Process</h2>
        <div style={{ display: "grid", gap: "30px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {devPhases.map((phase, index) => (
            <CoreValueCard
              key={index}
              title={phase.title}
              description={phase.description}
              imageSrc="" // optional icons
            />
          ))}
        </div>
      </div>

      {/* What We Build */}
      <div className="wrapper" style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ marginBottom: "20px" }}>What We Build</h2>
        <div style={{ display: "grid", gap: "30px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {technologies.map((tech, index) => (
            <CoreValueCard
              key={index}
              title={tech.title}
              description={tech.description}
              imageSrc={tech.imageSrc}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: "#071d6a",
          padding: "50px",
          textAlign: "center",
          color: "#fff",
          marginTop: "60px",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Ready to build something great?
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          Whether it’s an app, platform, or SaaS—you bring the idea, we’ll build the solution.
        </p>
        <a
          href="/start-a-project"
          style={{
            marginTop: "20px",
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#071d6a",
            padding: "10px 25px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Start a Project
        </a>
      </div>
    </div>
  );
};

export default SoftwareDevelopmentPage;