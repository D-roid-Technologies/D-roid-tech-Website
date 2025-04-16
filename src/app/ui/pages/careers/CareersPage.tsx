import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";

type Job = {
  title: string;
  type: string;
  location: string;
  description: string;
  url: string;
};

const openings: Job[] = [
  {
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Remote / Lagos",
    description: "We're looking for a skilled React developer with solid UI/UX understanding and passion for clean code.",
    url: "/careers/frontend-developer",
  },
  {
    title: "Backend Developer",
    type: "Full-Time",
    location: "Remote",
    description: "Join our backend team building scalable APIs with Node.js and cloud functions.",
    url: "/careers/backend-developer",
  },
  {
    title: "UI/UX Designer",
    type: "Contract / Full-Time",
    location: "Remote",
    description: "Design intuitive, beautiful experiences using Figma and collaborate closely with engineers.",
    url: "/careers/ui-ux-designer",
  },
];

const CareersPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Hero */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideTwo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "60px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
            Careers at D'roid
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#eee", maxWidth: "500px" }}>
            We’re building the future of digital experiences—and we want you on the team.
          </p>
        </div>
      </div>

      {/* Open Roles */}
      <div className="wrapper" style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "30px" }}>Open Positions</h2>
        {openings.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {openings.map((job, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>{job.title}</h3>
                <p style={{ color: "#555" }}>{job.description}</p>
                <div style={{ display: "flex", gap: "20px", marginTop: "10px", fontSize: "0.95rem" }}>
                  <span>{job.type}</span>
                  <span>{job.location}</span>
                </div>
                <a
                  href={job.url}
                  style={{ color: "#007bff", marginTop: "10px", display: "inline-block" }}
                >
                  View Details →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No open roles at the moment. Check back soon!</p>
        )}
      </div>

      {/* Values Section (Optional) */}
      <div className="wrapper" style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "30px" }}>What We Value</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          <CoreValueCard
            title="Innovation"
            description="We're constantly experimenting and pushing boundaries."
            imageSrc=""
          />
          <CoreValueCard
            title="Remote-First"
            description="Work where you thrive—we support async and flexible schedules."
            imageSrc=""
          />
          <CoreValueCard
            title="Growth"
            description="We invest in continuous learning and personal development."
            imageSrc=""
          />
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: "#071d6a",
          padding: "40px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Don’t see a role that fits?
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          We’re always open to amazing talent. Reach out anyway.
        </p>
        <a
          href="/contact"
          style={{
            marginTop: "20px",
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#071d6a",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default CareersPage;