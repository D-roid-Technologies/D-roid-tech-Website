import React, { useState } from "react";
import {
  FaAccessibleIcon,
  FaCode,
  FaPencilRuler,
  FaServer,
} from "react-icons/fa";
import { TbApiApp } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { MdFactCheck } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdPersonSearch } from "react-icons/md";

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

const CrossplatformApp: React.FC = () => {
  const navigate = useNavigate();

  const devPhases = [
    {
      title: "React Native Development",
      description:
        "At D'roid Technologies, we specialize in building high-performance cross-platform mobile applications using React Native. Our team leverages the power of JavaScript and React to create native-like experiences for both iOS and Android platforms. We implement best practices in component architecture, state management, and performance optimization to ensure your app delivers a smooth, responsive experience across all devices. From complex animations to native module integration, we create mobile solutions that feel truly native while maintaining the efficiency of cross-platform development.",
      icon: FaCode({ size: 40 }),
      summary:
        "We build high-performance mobile applications using React Native, delivering native-like experiences across iOS and Android platforms.",
    },
    {
      title: "Flutter Development",
      description:
        "Our Flutter development services harness the power of Dart to create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. We leverage Flutter's rich widget library and hot reload feature to rapidly develop and iterate on your application. Our team ensures your app maintains consistent design language and performance across all platforms while taking advantage of platform-specific features when needed. We focus on creating smooth animations, responsive layouts, and efficient state management to deliver an exceptional user experience.",
      icon: FaPencilRuler({ size: 40 }),
      url: "",
      summary:
        "We create beautiful, high-performance applications using Flutter that work seamlessly across multiple platforms from a single codebase.",
    },
    {
      title: "Hybrid App Development",
      description:
        "Our hybrid app development approach combines the best of web and native technologies to create efficient, cost-effective mobile solutions. Using frameworks like Ionic or Capacitor, we build applications that can be deployed across multiple platforms while maintaining access to native device features. We focus on optimizing performance, implementing responsive design patterns, and ensuring smooth integration with device hardware. Our hybrid solutions provide a balance between development efficiency and native-like user experience.",
      icon: BiWorld({ size: 40 }),
      url: "",
      summary:
        "We develop efficient hybrid applications that combine web technologies with native features for optimal cross-platform performance.",
    },
    {
      title: "Cross-Platform UI/UX Design",
      description:
        "Cross-platform UI/UX design is crucial for delivering consistent, engaging user experiences across different devices and platforms. Our team creates adaptive design systems that maintain visual consistency while respecting platform-specific design guidelines. We implement responsive layouts, platform-specific navigation patterns, and touch-friendly interfaces that work seamlessly across iOS, Android, and web platforms. Our design approach ensures your app feels native on each platform while maintaining a cohesive brand identity.",
      icon: FaAccessibleIcon({ size: 40 }),
      url: "",
      summary:
        "We design adaptive, platform-aware interfaces that deliver consistent, engaging experiences across all devices and platforms.",
    },
    {
      title: "Native Module Integration",
      description:
        "Native module integration is essential for accessing platform-specific features and optimizing performance. Our team specializes in bridging the gap between cross-platform code and native functionality. We develop custom native modules for features like camera access, push notifications, biometric authentication, and hardware-specific optimizations. Our integration approach ensures your app can leverage the full power of each platform while maintaining the efficiency of cross-platform development.",
      icon: TbApiApp({ size: 40 }),
      url: "",
      summary:
        "We seamlessly integrate native modules and platform-specific features to enhance your cross-platform application's capabilities.",
    },
    {
      title: "Performance Optimization",
      description:
        "Performance optimization is critical for delivering smooth, responsive cross-platform applications. Our team implements advanced optimization techniques including lazy loading, memory management, and efficient state handling. We focus on reducing bundle size, optimizing asset loading, and implementing efficient caching strategies. Regular performance profiling and optimization ensure your app maintains high performance across all target platforms and devices, providing users with a seamless experience regardless of their device capabilities.",
      icon: GrDocumentPerformance({ size: 40 }),
      url: "",
      summary:
        "We optimize application performance to ensure smooth, responsive experiences across all platforms and devices.",
    },
  ];

  const ourProcess = [
    {
      title: "1. Consultation",
      description:
        "We work with you to understand goals, users, and requirements. Every great product starts with deep discovery.",
      icon: MdPersonSearch({ size: 40 }),
    },
    {
      title: "2. Wireframing & UI Design",
      description:
        "Our UI/UX experts create sleek interfaces and clickable prototypes to bring ideas to life—before writing code.",
      icon: FaPencilRuler({ size: 40 }),
      url: "",
    },
    {
      title: "3. Development",
      description:
        "We build clean, scalable code using modern frameworks and run extensive testing to ensure quality.",
      icon: FaCode({ size: 40 }),
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
      icon: FcSupport({ size: 40 }),
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
            <h1 className="software-header">Cross-Platform Apps Services</h1>
            <p>
              React Native & hybrid mobile solutions to reach iOS and Android
              users seamlessly.
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
        <div className="soft-dev-content">
          {devPhases.map((phase, index) => (
            <CoreValueCardTwo
              pressable={true}
              key={index}
              title={phase.title}
              description={phase.summary}
              icon={phase.icon}
              url="{tech.url}"
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
        <div className="soft-dev-content">
          {ourProcess.map((phase, index) => (
            <CoreValueCardTwo
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

      <div className="wrapper soft-wrapper">
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
      </div>

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

export default CrossplatformApp;
