import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";

const programs = [
  {
    title: "Frontend Development Bootcamp",
    description:
      "Learn HTML, CSS, JavaScript, React, and responsive design from the ground up. Perfect for beginners and those looking to switch careers.",
  },
  {
    title: "Backend Engineering with Node.js",
    description:
      "Master server-side development with Node.js, Express, RESTful APIs, databases, and authentication.",
  },
  {
    title: "UI/UX Design Essentials",
    description:
      "Understand the principles of great design, prototyping with Figma, user research, and design systems.",
  },
  {
    title: "Fullstack Engineering",
    description:
      "Become a job-ready developer by learning both frontend and backend technologies, including React, Node, and databases.",
  },
  {
    title: "Data & Python for Beginners",
    description:
      "Get introduced to programming and data analysis using Python—perfect for those curious about tech, AI, or automation.",
  },
];

const TrainingProgramsPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Hero */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideTwo})`,
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
            Training Programs
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#eee", maxWidth: "600px" }}>
            Empowering the next generation of tech talent. Our hands-on training
            programs are built to make you industry-ready.
          </p>
        </div>
      </div>

      {/* Programs List */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#fff" }}
        >
          Explore Our Programs
        </span>
        <div className="soft-dev-content">
          {programs.map((prog, index) => (
            <CoreValueCardTwo
              key={index}
              title={prog.title}
              description={prog.description}
              imageSrc=""
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
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Ready to Learn & Level Up?
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          Whether you're just starting out or upskilling, our programs are built
          for growth.
        </p>
        <a
          href="/contact"
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
          Contact for Enrollment
        </a>
      </div>
    </div>
  );
};

export default TrainingProgramsPage;
