import React, { useState } from "react";
import {
  FaAccessibleIcon,
  FaCode,
  FaPencilRuler,
  FaServer,
} from "react-icons/fa";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
import PricingCard from "../../../components/pricingCard/PricingCard";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../../redux/slices/AppEntrySlice";
import ContactSection from "../../contact/ContactSection/ContactSection";

const FrontendDevelopmentPage: React.FC = () => {
  const navigate = useNavigate();

  const devPhases = [
    {
      title: "Responsive Web Design (Mobile-first)",
      description:
        "Responsive Web Design (Mobile-first) is a strategic approach to front-end development that prioritizes the design and functionality of digital interfaces for mobile devices before scaling up to tablets and desktops. At D’roid Technologies, we begin by crafting intuitive, performance-optimized layouts tailored for smaller screens, ensuring that essential content and interactions are both accessible and visually engaging on mobile devices. This methodology not only aligns with modern user behavior—where mobile browsing dominates—but also adheres to search engine best practices like Google's mobile-first indexing. As screen size increases, the design is progressively enhanced to take advantage of additional space and features, resulting in a seamless and consistent user experience across all devices.",
      icon: FaAccessibleIcon({ size: 40 }),
      summary:
        "Mobile-first responsive design ensures your website delivers a fast, accessible, and visually polished experience on every screen size, starting from smartphones upward.",
    },
    {
      title: "React, Vue, Angular Development",
      description:
        "Our team excels in crafting robust, high-performance front-end solutions using modern JavaScript frameworks such as React, Vue, and Angular. Each framework serves a unique purpose—React offers unparalleled component reusability and flexibility for dynamic UIs, Vue provides a lightweight yet powerful approach to progressive enhancement, and Angular delivers enterprise-grade tooling and structure ideal for complex applications. We help clients choose the right framework based on their project needs, scalability requirements, and long-term maintainability goals. Our developers adhere to best practices such as component-based architecture, efficient state management, and modular code organization to ensure your frontend is fast, responsive, and future-ready.",
      icon: FaPencilRuler({ size: 40 }),
      url: "",
      summary:
        "We build scalable, high-performing front-end interfaces using React, Vue, or Angular—tailored to your business goals and user experience expectations.",
    },
    {
      title: "Custom UI/UX Implementation",
      description:
        "Custom UI/UX Implementation at D’roid Technologies focuses on translating unique brand identities and user needs into immersive, intuitive interfaces. Our team meticulously crafts visual and interactive elements that not only align with your business goals but also ensure fluid, user-centric experiences across all platforms. We integrate design systems, motion patterns, accessibility best practices, and performance optimizations into a seamless front-end build. Every pixel and interaction is tailored—from custom component libraries to dynamic theming—to reflect your brand’s personality while enhancing usability and engagement. The result is a digital experience that feels both elegant and effortless for every user.",
      icon: FaCode({ size: 40 }),
      url: "",
      summary:
        "We design and build tailored user interfaces that blend innovation with usability to deliver exceptional user experiences.",
    },
    {
      title: "Performance Optimization",
      description:
        "Performance Optimization in front-end development is the strategic enhancement of a website or application’s speed, responsiveness, and overall efficiency to deliver a seamless user experience across all devices and networks. At D’roid Technologies, we focus on minimizing load times, reducing render-blocking resources, optimizing assets (such as images and scripts), leveraging caching, and implementing lazy loading. We utilize modern performance auditing tools like Google Lighthouse and Core Web Vitals to identify bottlenecks and continuously fine-tune the front-end architecture. By optimizing how data is fetched and rendered, and ensuring efficient use of client-side resources, we help clients retain users, improve SEO rankings, and increase overall engagement.",
      icon: FaServer({ size: 40 }),
      url: "",
      summary:
        "We enhance your digital product’s speed and responsiveness to deliver fast, smooth, and reliable experiences for every user.",
    },
    {
      title: "API Integration & State Management",
      description:
        "At D'roid Technologies, API integration and state management are pivotal components of our front-end architecture. We seamlessly connect your front-end interfaces with powerful back-end services, third-party platforms, or internal APIs to ensure real-time data flow and interactivity. Using robust libraries like Redux, Zustand, or React Query, we manage application state with precision—delivering a smooth, responsive, and consistent user experience across all views. Our focus is on efficiency, scalability, and clean architecture, so your application not only looks great but performs reliably as it grows.",
      icon: FaServer({ size: 40 }),
      url: "",
      summary:
        "We expertly integrate APIs and manage application state to deliver fast, dynamic, and scalable user experiences.",
    },
    {
      title: "Cross-Browser Compatibility",
      description:
        "Cross-Browser Compatibility ensures that your website or web application delivers a consistent, seamless experience across all major web browsers—such as Chrome, Firefox, Safari, Edge, and Opera—regardless of their rendering engines or version differences. At D’roid Technologies, we rigorously test our front-end code using real devices and modern automation tools to identify and fix inconsistencies in layout, functionality, and performance. We implement standardized best practices and polyfills where necessary to maintain visual integrity and interactivity across platforms. This attention to detail ensures that all users, regardless of browser preference, enjoy a high-quality and reliable interface.",
      icon: FaServer({ size: 40 }),
      url: "",
      summary:
        "We ensure your website looks and functions flawlessly across all modern browsers, delivering a uniform experience to every user.",
    },
  ];

  const ourProcess = [
    {
      title: "1. Consultation",
      description:
        "We work with you to understand goals, users, and requirements. Every great product starts with deep discovery.",
      icon: FaAccessibleIcon({ size: 40 }),
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
      icon: FaServer({ size: 40 }),
      url: "",
    },
    {
      title: "5. Deployment",
      description:
        "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
      icon: FaServer({ size: 40 }),
      url: "",
    },
    {
      title: "6. Support",
      description:
        "From launch to future upgrades, we handle hosting, monitoring, and long-term support.",
      icon: FaServer({ size: 40 }),
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
            <h1 className="software-header">Front-End Development Services</h1>
            <p>
              We design and develop modern, responsive, and scalable front-end
              interfaces tailored to your users' needs.
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

export default FrontendDevelopmentPage;
