import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/career/Career";
import styles from "./CareersPage.module.css";
import bannerStyles from "../../components/global-styles/Banner.module.css";
import "../../components/liteGrid@v1.0/lite-grid.css";

type Job = {
  title: string;
  type: string;
  location: string;
  description: string;
  url: string;
  subTitle?: string;
  summary: string;
  duration?: string;
  level?: string;
  tools?: string[];
  mode?: string;
  howToApply?: string;
  benefits?: string;
  gallery?: string[];
};

const openings: Job[] = [
  // {
  //   title: "Frontend Developer",
  //   type: "Full-time",
  //   location: "Fully Remote",
  //   description: "Join D'roid Technologies Ltd, a leading SaaS company in Nigeria, as a Frontend Developer and contribute to building modern, scalable, and user-friendly web applications. You’ll work closely with cross-functional teams to create intuitive interfaces, implement design systems, and deliver high-performance products that power businesses across Africa.",
  //   url: "https://droidtechnologies.com/careers/frontend-developer", // Replace with actual URL
  //   subTitle: "Drive SaaS Innovation with Clean, Scalable Frontend Solutions",
  //   summary: "We're seeking a talented Frontend Developer with React expertise to join our growing team and help shape the future of business-focused SaaS platforms across Nigeria and beyond.",
  //   duration: "Permanent",
  //   level: "Mid-level",
  //   tools: ["React.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Redux", "Tailwind CSS", "RESTful APIs", "Git"],
  //   mode: "Hybrid (2–3 days in our Lagos office)",
  //   howToApply: "To apply, visit our careers page and submit your resume and GitHub/portfolio link. Shortlisted candidates will be contacted for a technical interview.",
  //   benefits: "Competitive salary (₦4.5M–₦7.5M annually based on experience), flexible hybrid work structure, paid time off, learning & development budget, performance bonuses, access to top SaaS tools, and a collaborative, innovation-driven team culture.",
  //   gallery: [
  //     "https://droidtechnologies.com/gallery/office1.jpg",
  //     "https://droidtechnologies.com/gallery/team.jpg",
  //     "https://droidtechnologies.com/gallery/workspace.jpg"
  //   ]
  // },
  {
    title: "Story Writer / Content Manager",
    type: "Full-time",
    location: "Fully Remote",
    description: "D'roid Technologies Ltd is seeking a creative and detail-oriented Story Writer / Content Manager to shape and manage engaging written content across our SaaS platforms, blogs, and marketing materials. This role combines storytelling, content strategy, and digital publishing to help position our products and brand effectively in the Nigerian and global tech landscape.",
    url: "https://droidtechnologies.com/careers/story-writer-content-manager", // Replace with actual URL
    subTitle: "Tell Stories That Power Software and Inspire Innovation",
    summary: "We're looking for a talented writer with a knack for storytelling and a strategic mindset to manage content that connects with audiences and elevates our SaaS brand.",
    duration: "Permanent",
    level: "Entry-level",
    tools: ["Grammarly", "WordPress", "Notion", "Google Docs", "SEO Tools (e.g., Ahrefs, SEMrush)", "CMS Platforms", "Basic HTML/CSS (optional)"],
    mode: "Fully Remote",
    howToApply: "Submit your CV, writing portfolio, and a short cover letter via our careers page. Candidates with experience in SaaS or tech storytelling will be prioritized.",
    benefits: "Competitive salary, performance bonuses, professional development allowance, hybrid work flexibility, paid time off, access to premium content tools, and a dynamic, creative environment.",
    gallery: [
      "https://droidtechnologies.com/gallery/content-team.jpg",
      "https://droidtechnologies.com/gallery/brainstorm.jpg",
      "https://droidtechnologies.com/gallery/editorial.jpg"
    ]
  }

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
        className={bannerStyles.bannerWrapper}
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideTwo})`,
        }}
      >
        <div className={bannerStyles.bannerContent}>
          <h1>Careers at D'roid</h1>
          <p>
            We're building the future of digital experiences—and we want you on
            the team.
          </p>
        </div>
      </div>
      {/* Open Roles */}
      <div className="wrapper" style={{ padding: "20px" }}>
        <div style={{ marginBottom: "40px", marginTop: "20px" }}>
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
          <div className={styles.jobListingSection}>
            {openings.map((job, index) => (
              <JobCard
                key={index}
                onClick={() => navigate("/careers/description", { state: job })}
                title={job.title}
                type={job.type}
                location={job.location}
                className="block"
                description={job.summary}
                url={job.url}
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
      <div
        className="wrapper"
        style={{ padding: "10px", marginTop: "40px", marginBottom: "40px" }}
      >
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
        </div>
      </div>
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
