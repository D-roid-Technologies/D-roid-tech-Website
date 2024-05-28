import React, { useEffect, useState } from "react";
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
import BenefitsSection from "./benefits/BenefitsSection";
import Button from "../../../components/button/Button";
import {
  updateModal,
  updateModalContent,
} from "../../../../redux/slices/AppEntrySlice";
import { useDispatch } from "react-redux";
import { getUserLocation } from "../../../../utils/locationUtils";

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
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        console.log("User location:", latitude, longitude);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.service}")`,
        }}
        className="bg-image"
      >
        <NavBar />
        <div className="home-section">
          <article className="home-content">
            <p className="home-heading">OUR SERVICES</p>
          </article>
        </div>
      </div>
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
              icon={service.icon}
              title={service.title}
              content={service.description}
              actions={
                <Button
                  title="Read More"
                  bgColor="#007bff"
                  color="#fff"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  onClickButton={() => {
                    dispatch(
                      updateModalContent({
                        appTitle: service.title,
                        appBody: `
                          <div class="modal-content">
                            <p>${service.description}</p>
                            <ul>
                              ${service.prices
                                .map((price) => `<li>${price}</li>`)
                                .join("")}
                            </ul>
                          </div>
                        `,
                      })
                    );
                    dispatch(updateModal(true));
                  }}
                />
              }
            />
          ))}
        </div>
        <BenefitsSection />
      </div>
    </div>
  );
};

export default Services;
