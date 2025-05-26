import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/career/Career";

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
    description:
      "We're looking for a skilled React developer with solid UI/UX understanding and passion for clean code.",
    url: "/careers/frontend-developer",
  },
  {
    title: "Backend Developer",
    type: "Full-Time",
    location: "Remote",
    description:
      "Join our backend team building scalable APIs with Node.js and cloud functions.",
    url: "/careers/backend-developer",
  },
  {
    title: "UI/UX Designer",
    type: "Contract / Full-Time",
    location: "Remote",
    description:
      "Design intuitive, beautiful experiences using Figma and collaborate closely with engineers.",
    url: "/careers/ui-ux-designer",
  },
];

const coreValues = [
  {
    title: "Innovation",
    description: "We're constantly experimenting and pushing boundaries.",
    imageSrc: "",
  },
  {
    title: "Remote-First",
    description:
      "Work where you thrive—we support async and flexible schedules.",
    imageSrc: "",
  },
  {
    title: "Growth",
    description: "We invest in continuous learning and personal development.",
    imageSrc: "",
  },
];

const CareersPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTechnologyClick = (tech: {
    title?: string;
    description?: string;
    imageSrc?: any;
    url: any;
  }) => {
    navigate(tech.url);
  };

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
            We're building the future of digital experiences—and we want you on
            the team.
          </p>
        </div>
      </div>
      {/* Open Roles */}
      <div className="wrapper" style={{ padding: "40px 60px" }}>
        <div style={{ marginBottom: "40px" }}>
          <span
            className="soft-dev-header title_span"
            style={{ background: "#e2e8f0" }}
          >
            Open Positions
          </span>
          {/* <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#1f2937",
              marginBottom: "8px",
            }}
          >
            Open Positions
          </h2> */}
          <p
            style={{ color: "#6b7280", fontSize: "1.1rem", marginTop: "1rem" }}
          >
            Join our team and help us build the future of digital experiences
          </p>
        </div>

        {openings.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "24px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {openings.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                type={job.type}
                location={job.location}
                description={job.description}
                url={job.url}
                onClick={() => handleTechnologyClick(job)}
                className="job-opening-card"
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚀</div>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#1f2937",
                marginBottom: "8px",
              }}
            >
              No open roles at the moment
            </h3>
            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
              But we're always growing! Check back soon or reach out to us
              directly.
            </p>
          </div>
        )}
      </div>
      {/* Values Section (Optional) */}
      <div className="wrapper" style={{ padding: "40px" }}>
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          What We Value
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
            marginTop: "1rem",
          }}
        >
          {coreValues.map((value, index) => (
            <CoreValueCardTwo
              key={index}
              title={value.title}
              description={value.description}
              imageSrc={value.imageSrc}
            />
          ))}
          {/* <CoreValueCard
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
          /> */}
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
      </div>{" "}
      mm
    </div>
  );
};

export default CareersPage;
