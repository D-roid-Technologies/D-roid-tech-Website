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
  subTitle?: string;
  summary?: string;
  duration?: string;
  // description?: string;
  level?: string;
  tools?: string[];
  mode?: string;
  howToApply?: string;
  benefits?: string;
  gallery?: string[];
};

const openings: Job[] = [
  {
    title: "Frontend Developer",
    subTitle:
      "Build exceptional user experiences with modern web technologies.",
    summary:
      "Join our dynamic team as a React developer where you'll craft intuitive interfaces and collaborate on cutting-edge web applications. Perfect for developers who value clean code and user-centered design.",
    duration: "Permanent",
    description:
      "We're looking for a skilled React developer with solid UI/UX understanding and passion for clean code.",
    // description:
    //   "We're seeking a passionate Frontend Developer to join our growing team. You'll be responsible for developing responsive web applications using React, collaborating with our design team to implement pixel-perfect UI components, and ensuring optimal user experiences across all devices. The role involves working with modern JavaScript frameworks, state management libraries, and integrating with RESTful APIs. You'll participate in code reviews, contribute to our design system, and help maintain high code quality standards. Experience with testing frameworks and version control is essential.",
    level: "Mid-Level",
    tools: ["React", "JavaScript", "CSS", "HTML", "Git", "Figma", "Redux"],
    mode: "Remote / Lagos",
    type: "Full-Time",
    location: "Remote / Lagos",
    url: "/careers/frontend-developer",
    howToApply:
      "1. Review the job requirements and responsibilities.\n2. Navigate to our [Careers] page.\n3. Click on 'Apply Now' for the Frontend Developer position.\n4. Upload your resume and portfolio.\n5. Complete the application form with your details.\n6. Submit your application and we'll be in touch within 5 business days.",
    benefits:
      "Competitive salary with performance bonuses. Flexible working hours and remote work options. Professional development budget for courses and conferences. Health insurance and wellness programs. MacBook Pro and home office setup allowance. Collaborative team environment with opportunities for career growth.",
    gallery: [
      "/images/careers/frontend-dev-1.jpg",
      "/images/careers/frontend-dev-2.jpg",
      "/images/careers/team-collaboration.jpg",
    ],
  },
  {
    title: "Backend Developer",
    subTitle:
      "Architect scalable systems and robust APIs for modern applications.",
    summary:
      "Build the backbone of our applications with Node.js and cloud technologies. Ideal for developers passionate about performance, scalability, and clean architecture patterns.",
    duration: "Permanent",
    description:
      "Join our backend team building scalable APIs with Node.js and cloud functions.",
    // description:
    //   "We're looking for a skilled Backend Developer to design and implement scalable server-side applications. You'll work with Node.js, Express, and cloud platforms to build robust APIs that power our frontend applications. Your responsibilities include database design and optimization, implementing authentication and authorization systems, and ensuring application security best practices. You'll collaborate closely with frontend developers and DevOps teams to deliver high-performance solutions. Experience with microservices architecture, containerization, and CI/CD pipelines is highly valued.",
    level: "Mid to Senior Level",
    tools: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Git",
    ],
    mode: "Remote",
    type: "Full-Time",
    location: "Remote",
    url: "/careers/backend-developer",
    howToApply:
      "1. Review the technical requirements and job scope.\n2. Visit our [Careers] section.\n3. Select the Backend Developer position.\n4. Submit your resume along with links to your GitHub profile.\n5. Complete our technical assessment.\n6. Successful candidates will be contacted for technical interviews.",
    benefits:
      "Competitive compensation package with equity options. Fully remote work environment with flexible schedules. Annual learning and development budget. Top-tier equipment and home office stipend. Comprehensive health, dental, and vision insurance. Team retreats and professional networking opportunities.",
    gallery: [
      "/images/careers/backend-dev-1.jpg",
      "/images/careers/server-architecture.jpg",
      "/images/careers/remote-workspace.jpg",
    ],
  },
  {
    title: "UI/UX Designer",
    subTitle:
      "Shape digital experiences through thoughtful design and user research.",
    summary:
      "Create beautiful, intuitive interfaces that delight users and drive business goals. Perfect for designers who combine creativity with analytical thinking and user empathy.",
    duration: "Contract / Permanent",
    description:
      "Design intuitive, beautiful experiences using Figma and collaborate closely with engineers.",
    // description:
    //   "We're seeking a talented UI/UX Designer to lead the design of our digital products. You'll conduct user research, create wireframes and prototypes, and design polished user interfaces that balance aesthetics with usability. Working closely with product managers and engineers, you'll translate complex requirements into simple, elegant solutions. Your role includes maintaining our design system, conducting usability testing, and ensuring consistency across all touchpoints. You should be proficient in design tools like Figma and have experience with design thinking methodologies.",
    level: "Mid-Level",
    tools: [
      "Figma",
      "Adobe Creative Suite",
      "Sketch",
      "InVision",
      "Miro",
      "HTML/CSS",
    ],
    mode: "Remote",
    type: "Contract / Full-Time",
    location: "Remote",
    url: "/careers/ui-ux-designer",
    howToApply:
      "1. Study our current product design and user experience.\n2. Go to our [Careers] page.\n3. Click on the UI/UX Designer opening.\n4. Upload your resume and portfolio showcasing your best work.\n5. Include a brief cover letter explaining your design philosophy.\n6. Complete the application form and submit for review.",
    benefits:
      "Competitive rates for contract work or full-time salary. Creative freedom and autonomy in design decisions. Access to premium design tools and resources. Collaborative environment with cross-functional teams. Opportunities to work on diverse projects and industries. Mentorship from senior designers and design leaders.",
    gallery: [
      "/images/careers/ux-designer-1.jpg",
      "/images/careers/design-process.jpg",
      "/images/careers/user-research.jpg",
    ],
  },
];

//   {
//     title: "Frontend Developer",
//     type: "Full-Time",
//     location: "Remote / Lagos",
//     description:
//       "We're looking for a skilled React developer with solid UI/UX understanding and passion for clean code.",
//     url: "/careers/frontend-developer",
//   },
//   {
//     title: "Backend Developer",
//     type: "Full-Time",
//     location: "Remote",
//     description:
//       "Join our backend team building scalable APIs with Node.js and cloud functions.",
//     url: "/careers/backend-developer",
//   },
//   {
//     title: "UI/UX Designer",
//     type: "Contract / Full-Time",
//     location: "Remote",
//     description:
//       "Design intuitive, beautiful experiences using Figma and collaborate closely with engineers.",
//     url: "/careers/ui-ux-designer",
//   },
// ];

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
              <div
                key={index}
                onClick={() => navigate("/careers/description", { state: job })}
              >
                <JobCard
                  key={index}
                  title={job.title}
                  type={job.type}
                  location={job.location}
                  description={job.description}
                  url={job.url}
                  // onClick={() => handleTechnologyClick(job)}
                  className="job-opening-card"
                />
              </div>
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
