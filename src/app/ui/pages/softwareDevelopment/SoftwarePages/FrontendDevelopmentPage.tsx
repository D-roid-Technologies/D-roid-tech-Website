import React, { ReactNode, useState } from "react";
import {
  FaAccessibleIcon,
  FaCode,
  FaPencilRuler,
  FaServer,
} from "react-icons/fa";
import { TbApiApp } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import {
  MdFactCheck,
  MdOutlineDeveloperMode,
  MdOutlineScreenRotation,
  MdOutlineSupportAgent,
} from "react-icons/md";
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
import { NewwebsiteCard } from "../../../components/CoreValueCard/NewwebsiteCard";
import { IoLogoReact } from "react-icons/io5";
import { DiResponsive } from "react-icons/di";
import { SiAntdesign, SiConsul } from "react-icons/si";
import { LiaNetworkWiredSolid } from "react-icons/lia";

interface PricingItem {
  label: string;
  range: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: ReactNode;
  url?: string;
  pricing?: PricingItem[]; // optional
}

const FrontendDevelopmentPage: React.FC = () => {
  const navigate = useNavigate();

  const devPhases = [
    {
      title: "Responsive Web Design (Mobile-first)",
      description:
        "Responsive Web Design (Mobile-First) is a strategic front-end development methodology that places mobile usability at the core of the design process. At D’roid Technologies, we start by creating streamlined, performance-optimized layouts specifically for smaller screens—smartphones and other handheld devices—where clarity, speed, and intuitive interaction matter most. By focusing first on the mobile experience, we ensure that essential content, navigation, and functionality are easily accessible and visually engaging, even on the most constrained displays. This approach is rooted in modern digital behavior, where mobile browsing has overtaken desktop usage, and it aligns seamlessly with search engine standards, particularly Google’s mobile-first indexing, which prioritizes mobile-optimized sites in search rankings. As the user’s screen size increases—from mobile to tablet to desktop—the interface is progressively enhanced. This means additional features, layout refinements, and interactive elements are layered in to take advantage of the extra real estate, without compromising performance or usability. The result is a seamless, device-agnostic user experience—whether someone is accessing your site from a smartphone on the go or a large desktop monitor at the office. With mobile-first responsive design, D’roid Technologies delivers solutions that are not only future-ready but also aligned with user expectations, business goals, and the evolving standards of the web.",
      icon: MdOutlineScreenRotation({ size: 40 }),
      summary:
        "Mobile-first responsive design ensures your website delivers a fast, accessible, and visually polished experience on every screen size, starting from smartphones upward.",
    },
    {
      title: "React, Vue, Angular Development",
      description:
        "Our team excels in crafting robust, high-performance front-end solutions using modern JavaScript frameworks such as React, Vue, and Angular. Each framework serves a unique purpose—React offers unparalleled component reusability and flexibility for dynamic UIs, Vue provides a lightweight yet powerful approach to progressive enhancement, and Angular delivers enterprise-grade tooling and structure ideal for complex applications. We help clients choose the right framework based on their project needs, scalability requirements, and long-term maintainability goals. Our developers adhere to best practices such as component-based architecture, efficient state management, and modular code organization to ensure your frontend is fast, responsive, and future-ready.",
      icon: IoLogoReact({ size: 40 }),
      // url: "",
      summary:
        "We build scalable, high-performing front-end interfaces using React, Vue, or Angular—tailored to your business goals and user experience expectations.",
    },
    {
      title: "Custom UI/UX Implementation",
      description:
        "Custom UI/UX Implementation at D’roid Technologies focuses on translating unique brand identities and user needs into immersive, intuitive interfaces. Our team meticulously crafts visual and interactive elements that not only align with your business goals but also ensure fluid, user-centric experiences across all platforms. We integrate design systems, motion patterns, accessibility best practices, and performance optimizations into a seamless front-end build. Every pixel and interaction is tailored—from custom component libraries to dynamic theming—to reflect your brand’s personality while enhancing usability and engagement. The result is a digital experience that feels both elegant and effortless for every user.",
      icon: SiAntdesign({ size: 40 }),
      // url: "",
      summary:
        "We design and build tailored user interfaces that blend innovation with usability to deliver exceptional user experiences.",
    },
    {
      title: "Performance Optimization",
      description:
        "Performance Optimization in front-end development is the strategic enhancement of a website or application’s speed, responsiveness, and overall efficiency to deliver a seamless user experience across all devices and networks. At D’roid Technologies, we focus on minimizing load times, reducing render-blocking resources, optimizing assets (such as images and scripts), leveraging caching, and implementing lazy loading. We utilize modern performance auditing tools like Google Lighthouse and Core Web Vitals to identify bottlenecks and continuously fine-tune the front-end architecture. By optimizing how data is fetched and rendered, and ensuring efficient use of client-side resources, we help clients retain users, improve SEO rankings, and increase overall engagement.",
      icon: GrDocumentPerformance({ size: 40 }),
      // url: "",
      summary:
        "We enhance your digital product’s speed and responsiveness to deliver fast, smooth, and reliable experiences for every user.",
    },
    {
      title: "API Integration & State Management",
      description:
        "At D'roid Technologies, API integration and state management are pivotal components of our front-end architecture. We seamlessly connect your front-end interfaces with powerful back-end services, third-party platforms, or internal APIs to ensure real-time data flow and interactivity. Using robust libraries like Redux, Zustand, or React Query, we manage application state with precision—delivering a smooth, responsive, and consistent user experience across all views. Our focus is on efficiency, scalability, and clean architecture, so your application not only looks great but performs reliably as it grows.",
      icon: TbApiApp({ size: 50 }),
      // url: "",
      summary:
        "We expertly integrate APIs and manage application state to deliver fast, dynamic, and scalable user experiences.",
    },
    {
      title: "Cross-Browser Compatibility",
      description:
        "Cross-Browser Compatibility ensures that your website or web application delivers a consistent, seamless experience across all major web browsers—such as Chrome, Firefox, Safari, Edge, and Opera—regardless of their rendering engines or version differences. At D’roid Technologies, we rigorously test our front-end code using real devices and modern automation tools to identify and fix inconsistencies in layout, functionality, and performance. We implement standardized best practices and polyfills where necessary to maintain visual integrity and interactivity across platforms. This attention to detail ensures that all users, regardless of browser preference, enjoy a high-quality and reliable interface.",
      icon: BiWorld({ size: 40 }),
      // url: "",
      summary:
        "We ensure your website looks and functions flawlessly across all modern browsers, delivering a uniform experience to every user.",
    },
  ];

  const ourProcess = [
    {
      title: "1. Consultation",
      description:
        "We work closely with you to deeply understand your goals, target users, and specific requirements—because every great product begins with intentional discovery. Through collaborative workshops, stakeholder interviews, and user research, we uncover insights that shape the foundation of your product strategy. This discovery phase allows us to identify opportunities, clarify challenges, and align on a shared vision before a single line of code is written. By investing time upfront to define the “why” behind the project, we ensure that every decision—from design to development—is purposeful, user-centered, and aligned with your business objectives. The result? A product that’s not only technically sound, but also meaningful, intuitive, and built to create real impact.",
      icon: SiConsul({ size: 40 }),
      pricing: [
        { label: "Hourly Consultation", range: "₦20,000 – ₦50,000" },
        { label: "Half-Day Session (4 hrs)", range: "₦70,000 – ₦150,000" },
        { label: "Full-Day Session (8 hrs)", range: "₦150,000 – ₦300,000" },
        { label: "Project-Based Advisory", range: "₦300,000 – ₦2,000,000+" },
        {
          label: "Monthly Retainer – Lite",
          range: "₦200,000 – ₦400,000/month",
        },
        {
          label: "Monthly Retainer – Standard",
          range: "₦500,000 – ₦1,000,000/month",
        },
        {
          label: "Monthly Retainer – Enterprise",
          range: "₦1,200,000 – ₦2,500,000+/month",
        },
      ],
      url: "",
      summary:
        "We collaborate closely with you to understand your goals, users, and requirements through workshops, interviews, and research.",
    },
    {
      title: "2. Wireframing & UI Design",
      description:
        "Our UI/UX experts craft intuitive, elegant, and user-centered interfaces that bridge your business goals and the needs of your users. We begin with low-fidelity wireframes to map out structure and user flow, followed by high-fidelity UI designs and interactive prototypes that demonstrate exactly how your product will look and feel. This phase helps validate ideas early, gather stakeholder feedback, and reduce development waste by clarifying design intent before any code is written. Every design decision is backed by usability principles, ensuring a seamless, accessible, and conversion-friendly experience across all screen sizes.",
      icon: LiaNetworkWiredSolid({ size: 40 }),
      pricing: [
        { label: "Low-Fidelity Wireframes", range: "₦150,000 – ₦300,000" },
        {
          label: "High-Fidelity UI Design (Web App)",
          range: "₦300,000 – ₦800,000",
        },
        {
          label: "High-Fidelity UI Design (Mobile App)",
          range: "₦350,000 – ₦900,000",
        },
        {
          label: "Clickable Prototype (Figma/InVision)",
          range: "₦150,000 – ₦400,000",
        },
        { label: "Design System / UI Kit", range: "₦250,000 – ₦700,000" },
      ],
      url: "",
      summary:
        "We create intuitive, elegant interfaces starting with low-fidelity wireframes to map user flow, then progress to high-fidelity UI designs and interactive prototypes.",
    },
    {
      title: "3. Development",
      summary:
        "We transform designs into scalable, maintainable software using clean code and agile practices.",
      description:
        "Our skilled developers turn designs and plans into fully functional, scalable, and maintainable software. Using agile methodologies, we write clean, efficient code while integrating necessary backend and frontend technologies. Throughout development, we conduct regular code reviews, implement best practices, and ensure robust testing to deliver a high-quality product on time. We focus on performance, security, and seamless integration with third-party services to meet your business needs.",
      icon: MdOutlineDeveloperMode({ size: 40 }),
      pricing: [
        { label: "Frontend Development", range: "₦500,000 – ₦1,200,000" },
        { label: "Backend Development", range: "₦600,000 – ₦1,500,000" },
        { label: "Fullstack Development", range: "₦1,000,000 – ₦2,500,000" },
        {
          label: "API Integration & Development",
          range: "₦300,000 – ₦800,000",
        },
      ],
      url: "",
    },
    {
      title: "4. Deployment",
      description:
        "We manage end-to-end deployment to ensure your product launches smoothly and reliably. From configuring servers and setting up CI/CD pipelines to managing domains, SSL, and hosting environments—we handle all technical steps for a production-ready launch. We also ensure scalability, uptime monitoring, and rollback strategies are in place to support future growth and changes.",
      icon: BiCloudUpload({ size: 40 }),
      pricing: [
        { label: "Basic Web App Deployment", range: "₦100,000 – ₦250,000" },
        { label: "CI/CD Pipeline Setup", range: "₦250,000 – ₦600,000" },
        {
          label: "Cloud Deployment (AWS, Vercel, etc.)",
          range: "₦300,000 – ₦750,000",
        },
        {
          label: "Custom Domain & SSL Configuration",
          range: "₦50,000 – ₦150,000",
        },
      ],
      url: "",
      summary:
        "We ensure a smooth, secure, and reliable product launch by managing all technical deployment steps, including server setup, CI/CD pipelines, domain configuration, and ongoing scalability.",
    },
    {
      title: "5. Support",
      description:
        "After launch, we continue to provide technical support, feature enhancements, bug fixes, and performance optimization. Our support packages are designed to ensure your product remains secure, up-to-date, and fully functional as your needs evolve. We offer flexible monthly retainers tailored to your support level—ranging from basic maintenance to full-scale technical partnership.",
      icon: MdOutlineSupportAgent({ size: 40 }),
      pricing: [
        {
          label: "Basic Maintenance (Bug Fixes & Monitoring)",
          range: "₦100,000 – ₦250,000/month",
        },
        {
          label: "Standard Support (Includes Minor Features)",
          range: "₦300,000 – ₦600,000/month",
        },
        {
          label: "Full Support + Dev Retainer",
          range: "₦700,000 – ₦1,500,000+/month",
        },
      ],
      url: "",
      summary:
        "We handle the entire deployment process to ensure a smooth, reliable product launch. This includes server configuration, setting up CI/CD pipelines, managing domains and SSL certificates, and optimizing hosting environments.",
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
  const selectedPhaseIndex = 0;

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
        <div className="soft-dev-content" style={{ cursor: "pointer" }}>
          {devPhases.map((phase, index) => (
            // <CoreValueCardTwo
            <NewwebsiteCard
              key={index}
              title={phase.title}
              description={phase.summary}
              icon={phase.icon}
              // url={phase.url}
              className="process-card"
              onClick={() => {
                store.dispatch(updateModal(true));
                store.dispatch(
                  updateModalContent({
                    appTitle: phase.title,
                    appBody: (
                      <>
                        <p className="mb-4">{phase.description}</p>
                        <div className="space-y-2">
                          {/* {ourProcess.pricing.map((item: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; range: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                            <div key={index} className="flex justify-between border-b pb-1">
                              <span className="font-medium">{item.label}</span>
                              <span className="text-gray-600">{item.range}</span>
                            </div>
                          ))} */}
                        </div>
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
              key={index}
              title={phase.title}
              description={phase.summary}
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
                        {/* <h3 className="text-xl font-semibold mb-2">{ourProcess[selectedPhaseIndex].title}</h3> */}
                        <p className="mb-4">
                          {ourProcess[selectedPhaseIndex].summary}
                        </p>

                        {ourProcess[selectedPhaseIndex].pricing && (
                          <div className="space-y-2">
                            {ourProcess[selectedPhaseIndex].pricing.map(
                              (item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between border-b pb-1"
                                >
                                  <span className="font-medium">
                                    {item.label}
                                  </span>
                                  <span className="text-gray-600">
                                    {item.range}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        )}
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

export default FrontendDevelopmentPage;
