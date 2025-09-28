import React, { useState } from "react";
import {
  FaAccessibleIcon,
  FaCode,
  FaDatabase,
  FaNode,
  FaPencilRuler,
  FaPython,
  FaServer,
} from "react-icons/fa";
import { TbApiApp } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { GrDocumentPerformance } from "react-icons/gr";
import {
  MdFactCheck,
  MdOutlineDeveloperMode,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";
import { FcSupport } from "react-icons/fc";
import { MdPersonSearch } from "react-icons/md";

import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
import PricingCard from "../../../components/pricingCard/PricingCard";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../../redux/slices/AppEntrySlice";
import ContactSection from "../../contact/ContactSection/ContactSection";
import { NewwebsiteCard } from "../../../components/CoreValueCard/NewwebsiteCard";
import { SiConsul } from "react-icons/si";
import { LiaNetworkWiredSolid } from "react-icons/lia";

const BackendDevelopment: React.FC = () => {
  const navigate = useNavigate();

  const devPhases = [
    {
      title: "Node.js & Express Development",
      description:
        "At D'roid Technologies, we specialize in building robust and scalable backend applications using Node.js and Express. Our team leverages the power of JavaScript on the server-side to create high-performance APIs, real-time applications, and microservices. We implement best practices in asynchronous programming, error handling, and middleware integration to ensure your backend is both powerful and maintainable. From RESTful APIs to WebSocket implementations, we create backend solutions that can handle high traffic loads while maintaining optimal performance.",
      icon: FaNode({ size: 40 }),
      summary:
        "We build scalable and efficient backend applications using Node.js and Express, delivering high-performance APIs and real-time solutions.",
    },
    {
      title: "Python Backend Development",
      description:
        "Our Python backend development services harness the versatility and power of Python frameworks like Django and Flask to create sophisticated backend systems. We develop secure, scalable, and maintainable applications that can handle complex business logic, data processing, and API integrations. Whether you need a full-featured web application with Django's built-in admin interface or a lightweight API with Flask, our team ensures your Python backend is optimized for performance and security.",
      icon: FaPython({ size: 40 }),
      url: "",
      summary:
        "We create powerful and secure backend systems using Python frameworks, tailored to your specific business requirements.",
    },
    {
      title: "Database Design & Optimization",
      description:
        "Database design and optimization is a critical component of our backend development services. We work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases to create efficient data storage solutions. Our team focuses on proper schema design, query optimization, indexing strategies, and caching mechanisms to ensure your database performs optimally under any load. We implement best practices in data modeling, normalization, and security to protect your valuable information while maintaining fast access times.",
      icon: FaDatabase({ size: 40 }),
      url: "",
      summary:
        "We design and optimize database architectures that ensure fast, secure, and scalable data management for your applications.",
    },
    {
      title: "API Development & Integration",
      description:
        "Our API development and integration services focus on creating robust, well-documented, and secure APIs that serve as the backbone of your application. We design RESTful and GraphQL APIs that follow industry best practices and standards. Our team ensures proper authentication, rate limiting, error handling, and versioning while maintaining comprehensive API documentation. We also specialize in integrating third-party APIs and services, ensuring seamless communication between different systems and platforms.",
      icon: TbApiApp({ size: 40 }),
      url: "",
      summary:
        "We develop secure, scalable, and well-documented APIs that enable seamless integration between different systems and services.",
    },
    {
      title: "Cloud Infrastructure & Deployment",
      description:
        "We provide comprehensive cloud infrastructure and deployment services using leading cloud providers like AWS, Azure, and Google Cloud. Our team designs scalable and resilient cloud architectures, implements containerization with Docker and Kubernetes, and sets up CI/CD pipelines for automated deployment. We ensure your backend services are properly configured for high availability, load balancing, and auto-scaling while maintaining security best practices and cost optimization.",
      icon: BiCloudUpload({ size: 40 }),
      url: "",
      summary:
        "We design and implement cloud infrastructure that ensures your backend services are scalable, secure, and highly available.",
    },
    {
      title: "Security & Performance Optimization",
      description:
        "Security and performance optimization are fundamental to our backend development approach. We implement robust security measures including authentication, authorization, data encryption, and protection against common vulnerabilities. Our performance optimization strategies include code profiling, caching implementation, load balancing, and database query optimization. We conduct regular security audits and performance testing to ensure your backend remains secure and efficient as it scales.",
      icon: MdFactCheck({ size: 40 }),
      url: "",
      summary:
        "We implement comprehensive security measures and performance optimizations to ensure your backend is both secure and efficient.",
    },
  ];

  const ourProcess = [
    {
      title: "1. Consultation",
      description:
        "We work with you to understand goals, users, and requirements. Every great product starts with deep discovery.",
      icon: SiConsul({ size: 40 }),
    },
    {
      title: "2. Wireframing & UI Design",
      description:
        "Our UI/UX experts create sleek interfaces and clickable prototypes to bring ideas to life—before writing code.",
      icon: LiaNetworkWiredSolid({ size: 40 }),
      url: "",
    },
    {
      title: "3. Development",
      description:
        "We build clean, scalable code using modern frameworks and run extensive testing to ensure quality.",
      icon: MdOutlineDeveloperMode({ size: 40 }),
      url: "",
    },
    {
      title: "4. Testing",
      description:
        "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
      icon: MdFactCheck({ size: 40 }),
      url: "",
    },
    {
      title: "5. Deployment",
      description:
        "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
      icon: BiCloudUpload({ size: 40 }),
      url: "",
    },
    {
      title: "6. Support",
      description:
        "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
      icon: MdOutlineSupportAgent({ size: 40 }),
      url: "",
    },
  ];

  const pricingPlans = [
    {
      title: "Starter Plan",
      price: "₦19/month",
      offers: ["Up to 5 Projects", "Basic Support", "Standard Components"],
    },
    {
      title: "Pro Plan",
      price: "₦49/month",
      offers: [
        "Unlimited Projects",
        "Priority Support",
        "Custom Dashboards",
        "Access to Beta Features",
      ],
    },
    {
      title: "Enterprise Plan",
      price: "₦99/month",
      offers: [
        "Dedicated Manager",
        "Custom Development",
        "24/7 Support",
        "Full Integration Services",
      ],
    },
  ];

  return (
    <div>
      {/* back arrow */}

      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <div style={{ margin: "1rem 0" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "blue",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </div>
            <h1 className="software-header">Back-End Development Services</h1>
            <p>
              Powerful APIs and logic using Node.js, Express, Python, and more.
            </p>
          </div>
        </div>
      </div>
      {/* <h1 style={{ fontSize: "2.2rem", fontWeight: 700 }}>Front-End Development Services</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "0.8rem" }}>
                At D'roid Technologies, 
            </p> */}

      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          What We Offer
        </span>
        <div className="soft-dev-content" style={{ cursor: "pointer" }}>
          {devPhases.map((phase, index) => (
            // <CoreValueCardTwo
            <NewwebsiteCard
              // pressable={true}
              key={index}
              title={phase.title}
              description={phase.summary}
              icon={phase.icon}
              // url="{tech.url}"
              className="process-card"
              onClick={() => {
                store.dispatch(updateModal(true));
                store.dispatch(
                  updateModalContent({
                    appTitle: phase.title,
                    appBody: (
                      <>
                        <span>{phase.description}</span>
                        <ContactSection />
                      </>
                    ),
                  })
                );
              }}
            />
          ))}
        </div>
      </div>

      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Our Process
        </span>
        <div className="soft-dev-content" style={{ cursor: "pointer" }}>
          {ourProcess.map((phase, index) => (
            // <CoreValueCardTwo
            <NewwebsiteCard
              // pressable={true}
              key={index}
              title={phase.title}
              description={phase.description}
              icon={phase.icon}
              //   url="{tech.url}"
              className="process-card"
              onClick={() => {
                store.dispatch(updateModal(true));
                store.dispatch(
                  updateModalContent({
                    appTitle: phase.title,
                    appBody: (
                      <>
                        <span>{phase.description}</span>
                        {/* <ContactSection /> */}
                      </>
                    ),
                  })
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Pricing
        </span>
        <div className="group">
          {pricingPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              title={plan.title}
              price={plan.price}
              offers={plan.offers}
            />
          ))}
        </div>
      </div> */}

      {/* <section style={{ marginTop: "3rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Contact Us</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <textarea
                        name="projectDetails"
                        placeholder="Tell us about your project..."
                        rows={5}
                        required
                        value={formData.projectDetails}
                        onChange={handleChange}
                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <button type="submit" style={{ padding: "12px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                        Send Request
                    </button>
                </form>
            </section> */}
    </div>
  );
};

export default BackendDevelopment;
