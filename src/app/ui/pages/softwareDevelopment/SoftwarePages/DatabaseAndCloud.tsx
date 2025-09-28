import React, { useState } from "react";
import {
  FaAccessibleIcon,
  FaCode,
  FaPencilRuler,
  FaServer,
} from "react-icons/fa";
import { TbApiApp } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { GrDocumentPerformance } from "react-icons/gr";
import {
  MdOutlineDeveloperMode,
  MdOutlineSupportAgent,
  MdPersonSearch,
} from "react-icons/md";

import { MdFactCheck } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";
import { FcSupport } from "react-icons/fc";
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

const DatabaseAndCloud: React.FC = () => {
  const navigate = useNavigate();

  const devPhases = [
    {
      title: "Database Design & Architecture",
      description:
        "At D'roid Technologies, we specialize in designing and implementing robust database architectures that form the foundation of your data infrastructure. Our team works with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases to create efficient, scalable, and secure data storage solutions. We focus on proper schema design, normalization, indexing strategies, and data modeling to ensure optimal performance and data integrity. Our database solutions are built to handle growing data volumes while maintaining fast query response times and ensuring data consistency across your applications.",
      icon: FaServer({ size: 40 }),
      summary:
        "We design and implement scalable database architectures that ensure efficient data storage, retrieval, and management for your applications.",
    },
    {
      title: "Cloud Infrastructure & Migration",
      description:
        "Our cloud infrastructure and migration services help businesses transition to and optimize their cloud presence. We work with leading cloud providers like AWS, Azure, and Google Cloud to design scalable, secure, and cost-effective cloud architectures. Our team handles everything from initial cloud strategy and migration planning to implementation and ongoing optimization. We implement best practices in cloud security, resource management, and cost optimization while ensuring high availability and disaster recovery capabilities for your critical systems.",
      icon: BiCloudUpload({ size: 40 }),
      url: "",
      summary:
        "We help businesses migrate to and optimize their cloud infrastructure, ensuring scalability, security, and cost-effectiveness.",
    },
    {
      title: "Database Performance Optimization",
      description:
        "Database performance optimization is crucial for maintaining fast and efficient data operations. Our team specializes in identifying and resolving performance bottlenecks through query optimization, index tuning, and caching strategies. We implement advanced techniques like query optimization, connection pooling, and database sharding to ensure your database performs optimally under any load. Regular performance monitoring and tuning help maintain optimal database performance as your data grows.",
      icon: GrDocumentPerformance({ size: 40 }),
      url: "",
      summary:
        "We optimize database performance through advanced tuning techniques, ensuring fast and efficient data operations at any scale.",
    },
    {
      title: "Cloud Security & Compliance",
      description:
        "Security and compliance are paramount in cloud environments. Our team implements comprehensive security measures including encryption, access control, and threat detection systems. We ensure compliance with industry standards and regulations like GDPR, HIPAA, and SOC 2. Our security approach includes regular security audits, vulnerability assessments, and implementation of security best practices to protect your cloud infrastructure and data from potential threats.",
      icon: MdFactCheck({ size: 40 }),
      url: "",
      summary:
        "We implement robust security measures and ensure compliance with industry standards to protect your cloud infrastructure and data.",
    },
    {
      title: "Database Backup & Recovery",
      description:
        "Reliable backup and recovery solutions are essential for business continuity. We design and implement comprehensive backup strategies that ensure your data is protected against loss or corruption. Our solutions include automated backup scheduling, point-in-time recovery capabilities, and disaster recovery planning. We test recovery procedures regularly to ensure your data can be restored quickly and accurately when needed, minimizing potential downtime and data loss.",
      icon: FaCode({ size: 40 }),
      url: "",
      summary:
        "We implement reliable backup and recovery solutions to ensure your data is protected and can be restored quickly when needed.",
    },
    {
      title: "Cloud Cost Optimization",
      description:
        "Cloud cost optimization is crucial for maintaining an efficient and cost-effective cloud infrastructure. Our team analyzes your cloud usage patterns and implements strategies to optimize costs without compromising performance. We focus on resource right-sizing, reserved instance planning, and implementing auto-scaling solutions. Regular cost monitoring and optimization recommendations help ensure you're getting the best value from your cloud investment while maintaining the performance and reliability your business needs.",
      icon: TbApiApp({ size: 40 }),
      url: "",
      summary:
        "We help optimize cloud costs through strategic resource management and implementation of cost-effective solutions.",
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
      price: "$19/month",
      offers: ["Up to 5 Projects", "Basic Support", "Standard Components"],
    },
    {
      title: "Pro Plan",
      price: "$49/month",
      offers: [
        "Unlimited Projects",
        "Priority Support",
        "Custom Dashboards",
        "Access to Beta Features",
      ],
    },
    {
      title: "Enterprise Plan",
      price: "$99/month",
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
            <h1 className="software-header">Database And Cloud Services</h1>
            <p>
              Robust data solutions with MySQL, MongoDB, Firebase, and scalable
              cloud architecture.
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
              //   pressable={true}
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
    </div>
  );
};

export default DatabaseAndCloud;
