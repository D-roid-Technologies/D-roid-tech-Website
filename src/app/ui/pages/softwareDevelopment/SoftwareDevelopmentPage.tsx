import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";
import "../../pages/softwareDevelopment/SoftwareDevelopmentPage.css";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import {
  FaAccessibleIcon,
  FaCode,
  FaPencilRuler,
  FaServer,
} from "react-icons/fa";
import { store } from "../../../redux/Store";
import { updateModal, updateModalContent } from "../../../redux/slices/AppEntrySlice";
import ContactSoftware from "../contact/ContactSection/ContactSoftware";

const devPhases = [
  {
    title: "Discovery & Planning",
    description:
      "We work with you to understand goals, users, and requirements. Every great product starts with deep discovery.",
    icon: FaAccessibleIcon({ size: 24 }),
  },
  {
    title: "Design & Prototyping",
    description:
      "Our UI/UX experts create sleek interfaces and clickable prototypes to bring ideas to life—before writing code.",
    icon: FaPencilRuler({ size: 24 }),
    url: "",
  },
  {
    title: "Development & Testing",
    description:
      "We build clean, scalable code using modern frameworks and run extensive testing to ensure quality.",
    icon: FaCode({ size: 24 }),
    url: "",
  },
  {
    title: "Deployment & Maintenance",
    description:
      "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
    icon: FaServer({ size: 24 }),
    url: "",
  },
];


// This website stores cookies on your computer. These cookies are used to improve your website experience and provide more personalized services to you, both on this website and through other media. Find our full Cookie Policy: Here. To find out more about the cookies we use, see our Privacy Policy.
// We won't track your information when you visit our site. But in order to comply with your preferences, we'll have to use just one tiny cookie so that you're not asked to make this choice again.

const technologies = [
  {
    title: "Frontend Development",
    description:
      "Modern, responsive UIs using React, TypeScript, and Tailwind CSS.",
    imageSrc: Assets.images.fed,
    url: "/software-development/front-end",
  },
  {
    title: "Backend Development",
    description:
      "Powerful APIs and logic using Node.js, Express, Python, and more.",
    imageSrc: "",
    url: "",
  },
  {
    title: "Database & Cloud",
    description:
      "Robust data solutions with MySQL, MongoDB, Firebase, and scalable cloud architecture.",
    imageSrc: "",
    url: "",
  },
  {
    title: "Cross-Platform Apps",
    description:
      "React Native & hybrid mobile solutions to reach iOS and Android users seamlessly.",
    imageSrc: "",
    url: "",
  },
];

const SoftwareDevelopmentPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">Software Development</h1>
          <p>
            We build scalable, performant, and user-focused software tailored to
            your business needs—from concept to launch.
          </p>
        </div>
      </div>

      {/* What We Build */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          What We Build
        </span>
        <div className="soft-dev-content">
          {technologies.map((tech, index) => (
            <CoreValueCardTwo
              key={index}
              title={tech.title}
              description={tech.description}
              imageSrc={tech.imageSrc}
              url={tech.url}
              className="process-card"
            />
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="soft-cta" style={{ marginBottom: "60px" }}>
        <h2 className="cta-header">Ready to build something great?</h2>
        <p>
          Whether it’s an app, platform, or SaaS—you bring the idea, we’ll build
          the solution.
        </p>
        <button className="soft-cta-button"
          onClick={() => {
            store.dispatch(updateModal(true))
            store.dispatch(updateModalContent({
              appTitle: "Let's kick start your Idea",
              appBody: (
                <>
                  <p>Turn your vision into reality with D'roid Technologies. Whether it's a product, platform, or service, we help you design, build, and launch with precision and innovation—every step of the way.</p>
                  <p>Please fill the form below and we'll be in touch.</p>
                  <ContactSoftware />
                </>
              )
            }));
          }}>
          Start a Project →
        </button>
      </div>

      {/* Approach Section */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Our Development Process
        </span>
        <div className="soft-dev-content">
          {devPhases.map((phase, index) => (
            <CoreValueCardTwo
              key={index}
              title={phase.title}
              description={phase.description}
              icon={phase.icon}
              url="{tech.url}"
              className="process-card"
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default SoftwareDevelopmentPage;
