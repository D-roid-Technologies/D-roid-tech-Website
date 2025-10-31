import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";
import "../../pages/softwareDevelopment/SoftwareDevelopmentPage.css";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import {
  FaAccessibleIcon,
  FaCcDiscover,
  FaCode,
  FaPencilRuler,
  FaServer,
  FaWhatsapp,
} from "react-icons/fa";
import { store } from "../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import ContactSoftware from "../contact/ContactSection/ContactSoftware";
import { useNavigate } from "react-router-dom";
import SoftwareService from "./SoftwareService";
import { TbBusinessplan } from "react-icons/tb";
import { SiCssdesignawards, SiProtonvpn, SiTestcafe } from "react-icons/si";
import { GrHostMaintenance } from "react-icons/gr";
import ProductsSmall from "../products/ProductsSmall";
import Testimonial from "../testimonial/Testimonial";
import NoReadMoreCard from "../../components/CoreValueCard/NoReadMore";
import SoftwarePricingCard from "./SoftwarePricingCard";
import { NewwebsiteCard } from "../../components/CoreValueCard/NewwebsiteCard";
import LeadForm from "./SoftwarePages/LeadForm";
import WhatsAppButton from "../../components/WhatsAppButton";

const devPhases = [
  {
    title: "Discovery",
    description:
      "We work with you to understand goals, users, and requirements. Every great product starts with deep discovery.",
    icon: FaCcDiscover({ size: 24 }),
    url: "",
  },
  {
    title: "Planning",
    description:
      "We create a detailed roadmap, defining features, timelines, and resources needed to bring your vision to life.",
    icon: TbBusinessplan({ size: 24 }),
    url: "",
  },
  {
    title: "Design",
    description:
      "Our UI/UX experts create sleek interfaces and clickable prototypes to bring ideas to life—before writing code.",
    icon: SiCssdesignawards({ size: 24 }),
    url: "",
  },
  {
    title: "Prototyping",
    description:
      "We build interactive prototypes to validate concepts and gather feedback, ensuring we’re on the right track.",
    icon: SiProtonvpn({ size: 24 }),
    url: "",
  },
  {
    title: "Development",
    description:
      "We build clean, scalable code using modern frameworks and run extensive testing to ensure quality.",
    icon: FaCode({ size: 24 }),
    url: "",
  },
  {
    title: "Testing",
    description:
      "Thorough QA testing to catch bugs, ensure performance, and validate functionality across devices and platforms.",
    icon: SiTestcafe({ size: 24 }),
    url: "",
  },
  {
    title: "Deployment ",
    description:
      "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
    icon: FaServer({ size: 24 }),
    url: "",
  },
  {
    title: "Maintenance",
    description:
      "Ongoing support to ensure your software remains secure, up-to-date, and optimized for performance.",
    icon: GrHostMaintenance({ size: 24 }),
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
    imageSrc:
      "https://verpex.com/assets/uploads/images/blog/How-to-become-a-Backend-Developer.jpg?v=1665484477",
    url: "/software-development/back-end",
  },
  {
    title: "Database & Cloud",
    description:
      "Robust data solutions with MySQL, MongoDB, Firebase, and scalable cloud architecture.",
    imageSrc:
      "https://img.freepik.com/free-vector/server-room-cloud-storage-icon-datacenter-database-concept-data-exchange-process_39422-556.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
    url: "/software-development/database-and-cloud",
  },
  {
    title: "Cross-Platform Apps",
    description:
      "React Native & hybrid mobile solutions to reach iOS and Android users seamlessly.",
    imageSrc:
      "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
    url: "/software-development/cross-platform-apps",
  },
];

const SoftwareDevelopmentPage: React.FC = () => {
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
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <h1 className="software-header">Software Development</h1>
            <p>
              We build scalable, performant, and user-focused software tailored
              to your business needs from concept to launch.
            </p>
          </div>
        </div>
      </div>

      {/* software service bullet point */}
      <div
        className="soft-ser"
        style={{ marginTop: "60px", marginBottom: "60px" }}
      >
        <SoftwareService />
      </div>

      {/* What We Build */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          What We Build
        </span>
        <div className="soft-dev-content" style={{ cursor: "pointer" }}>
          {technologies.map((tech, index) => (
            <div
              key={index}
              onClick={() => handleTechnologyClick(tech)}
              style={{ cursor: "pointer" }}
            >
              {/* <CoreValueCardTwo */}
              <NoReadMoreCard
                key={index}
                title={tech.title}
                description={tech.description}
                imageSrc={tech.imageSrc}
                url={tech.url}
                className="process-card"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project */}
      <div>
        <ProductsSmall />
      </div>
      {/* Call to Action */}
      {/* <div className="soft-cta">
        <h2 className="cta-header">Ready to build something great?</h2>
        <p>
          From apps to platforms and SaaS products — you provide the vision, we
          deliver the solution.
        </p>
        <button
          className="soft-cta-button"
          onClick={() => {
            store.dispatch(updateModal(true));
            store.dispatch(
              updateModalContent({
                appTitle: "Let's kick start your Idea",
                appBody: (
                  <>
                    <p>
                      Turn your vision into reality with D'roid Technologies.
                      Whether it's a product, platform, or service, we help you
                      design, build, and launch with precision and
                      innovation—every step of the way.
                    </p>
                    <p>Please fill the form below and we'll be in touch.</p>
                    <ContactSoftware />
                  </>
                ),
              })
            );
          }}
        >
          Start a Project
        </button>
      </div> */}

      {/* Approach Section */}
      <div className="bg-color-gradient">
        <div className="wrapper soft-wrapper ">
          <span
            className="soft-dev-header title_span"
            style={{ background: "#e2e8f0" }}
          >
            Our Development Process
          </span>
          <div className="soft-dev-content">
            {devPhases.map((phase, index) => (
              <NewwebsiteCard
                key={index}
                title={phase.title}
                description={phase.description}
                icon={phase.icon}
                className="process-card"
              />
            ))}
          </div>
        </div>
      </div>
      {/* testimonial */}
      <Testimonial />
      <div id="form">
        <LeadForm />
      </div>
      <SoftwarePricingCard />

      <WhatsAppButton />
    </div>
  );
};

export default SoftwareDevelopmentPage;
