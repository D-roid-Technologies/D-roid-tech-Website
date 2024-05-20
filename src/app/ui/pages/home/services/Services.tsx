import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import "./Services.css";
import {
  FaVideo,
  FaLaptopCode,
  FaRobot,
  FaPlane,
  FaDesktop,
} from "react-icons/fa";
import Card from "../../../components/card/Card";
import { Assets } from "../../../../utils/constant/Assets";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  prices: string[];
};

const services: Service[] = [
  {
    title: "Software Development - Mobile and Web",
    description:
      "Our software development services cover both mobile and web applications. We specialize in creating responsive, high-performance applications using modern technologies such as React Native, React.js, HTML, CSS, TypeScript, and JavaScript. Whether you need a custom web application or a cross-platform mobile app, we deliver solutions that meet your business requirements.",
    icon: <FaLaptopCode size={48} color={Assets.colors.primary} />,
    prices: [
      "Basic Web Application: £1,000 - £5,000",
      "Complex Web Application: £5,000 - £25,000",
      "Simple Mobile App: £3,000 - £10,000",
      "Advanced Mobile App: £15,000 - £50,000",
    ],
  },
  {
    title: "Animation Creation",
    description:
      "Our animation creation services bring your ideas to life with stunning visuals. We produce high-quality animations for various purposes, including marketing, educational content, and entertainment. Our team works closely with you to understand your vision and deliver animations that captivate your audience.",
    icon: <FaVideo size={48} color={Assets.colors.primary} />,
    prices: [
      "Short Animation (up to 1 minute): £1,000 - £3,000",
      "Medium Animation (1-3 minutes): £3,000 - £7,000",
      "Long Animation (over 3 minutes): £7,000 - £15,000",
    ],
  },
  {
    title: "Tech Trainings",
    description:
      "We offer comprehensive tech training programs designed to enhance your team's skills and keep them up-to-date with the latest technologies. Our training sessions cover various topics such as software development, cybersecurity, data analytics, and more, delivered by industry experts.",
    icon: <FaRobot size={48} color={Assets.colors.primary} />,
    prices: [
      "One-Day Workshop: £500 - £1,500",
      "Week-Long Course: £2,000 - £5,000",
      "Customized Training Program: £5,000 - £15,000",
    ],
  },
  {
    title: "Drone Services",
    description:
      "Our professional drone services include aerial photography, videography, surveying, and inspection. We use state-of-the-art drones and technology to capture high-resolution images and videos, providing valuable insights for various industries such as real estate, construction, and agriculture.",
    icon: <FaPlane size={48} color={Assets.colors.primary} />,
    prices: [
      "Aerial Photography Session: £500 - £2,000",
      "Aerial Videography Session: £1,000 - £3,000",
      "Surveying and Inspection: £2,000 - £5,000",
    ],
  },
  {
    title: "Equipment Set-up",
    description:
      "We provide expert equipment setup services, ensuring your technology infrastructure is installed correctly and efficiently. Our services include setting up computers, networks, servers, and other IT equipment, tailored to meet the specific needs of your business.",
    icon: <FaDesktop size={48} color={Assets.colors.primary} />,
    prices: [
      "Basic Equipment Setup: £500 - £1,500",
      "Advanced Equipment Setup: £2,000 - £5,000",
      "Full Office Setup: £5,000 - £15,000",
    ],
  },
];

const Services: React.FunctionComponent = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const handleReadMore = (index: number) => {
    setExpandedCards((prevExpandedCards) => [...prevExpandedCards, index]);
  };

  const handleReadLess = (index: number) => {
    setExpandedCards((prevExpandedCards) =>
      prevExpandedCards.filter((i) => i !== index)
    );
  };

  return (
    <div>
      <NavBar />
      <div className="service-main">
        <h1
          style={{ color: Assets.colors.primary }}
          className="general-heading"
        >
          Comprehensive Technology Solutions
        </h1>
        <p
          style={{ color: Assets.colors.paragraph, marginTop: "1.5rem" }}
          className="paragraph"
        >
          Your one-stop solution for cutting-edge technology services. From
          developing robust software applications to creating engaging
          animations, delivering top-notch tech training, offering professional
          drone services, and setting up advanced equipment, we are here to
          cater to all your technological needs.
        </p>
        <div className="service-card-container">
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card"
              cardStyle={{
                backgroundColor: Assets.colors.light,
                color: Assets.colors.basic,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p
                style={{ textAlign: "justify", color: Assets.colors.paragraph }}
                className="paragraph"
              >
                {expandedCards.includes(index)
                  ? service.description
                  : `${service.description.slice(0, 150)}...`}
                {service.description.length > 150 && (
                  <span
                    className="read-more-link"
                    onClick={() =>
                      expandedCards.includes(index)
                        ? handleReadLess(index)
                        : handleReadMore(index)
                    }
                  >
                    {expandedCards.includes(index)
                      ? " Read Less"
                      : " Read More"}
                  </span>
                )}
              </p>
              {expandedCards.includes(index) && (
                <ul>
                  {service.prices.map((price, priceIndex) => (
                    <li
                      key={priceIndex}
                      style={{ color: Assets.colors.paragraph }}
                    >
                      {price}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
        <div className="benefits-section">
          <h2 style={{ color: Assets.colors.primary, marginBottom: "1.5rem" }} className="general-heading">
            Benefits of Working with Us
          </h2>
          <ul>
            <li
              style={{ color: Assets.colors.paragraph }}
              className="paragraph"
            >
              <strong>Expert Team:</strong> Our team comprises skilled
              professionals with extensive experience in their respective
              fields, ensuring high-quality service delivery.
            </li>
            <li
              style={{ color: Assets.colors.paragraph }}
              className="paragraph"
            >
              <strong>Tailored Solutions:</strong> We take the time to
              understand your unique needs and provide customized solutions that
              align with your business goals.
            </li>
            <li
              style={{ color: Assets.colors.paragraph }}
              className="paragraph"
            >
              <strong>Latest Technology:</strong> We utilize cutting-edge
              technologies and industry best practices to ensure your projects
              are modern, efficient, and secure.
            </li>
            <li
              style={{ color: Assets.colors.paragraph }}
              className="paragraph"
            >
              <strong>Transparent Communication:</strong> We maintain clear and
              open communication throughout the project, keeping you informed
              and involved at every stage.
            </li>
            <li
              style={{ color: Assets.colors.paragraph }}
              className="paragraph"
            >
              <strong>Customer Satisfaction:</strong> Your satisfaction is our
              top priority. We strive to exceed your expectations and deliver
              solutions that drive success.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
