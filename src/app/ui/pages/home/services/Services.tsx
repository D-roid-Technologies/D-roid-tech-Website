import React from "react";
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
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { convertToCurrency } from "../../../../utils/currencyUtils";
import { useNavigate } from "react-router-dom";

type Service = {
  title: string;
  description: string;
  icon: string;
  prices: { name: string; price: number }[];
  path: string;
};

const services: Service[] = [
  {
    title: "Software Development - Mobile and Web",
    description:
      "Our software development services cover both mobile and web applications. We specialize in creating responsive, high-performance applications using modern technologies such as React Native, React.js, HTML, CSS, TypeScript, and JavaScript. Whether you need a custom web application or a cross-platform mobile app, we deliver solutions that meet your business requirements.",
    icon: Assets.images.softwareWhatWeDo,
    prices: [
      { name: "Basic Web Application", price: 1000 },
      { name: "Complex Web Application", price: 5000 },
      { name: "Simple Mobile App", price: 3000 },
      { name: "Advanced Mobile App", price: 15000 },
    ],
    path: "/software",
  },
  // {
  //   title: "Developers Tools",
  //   description:
  //     "Our animation creation services bring your ideas to life with stunning visuals. We produce high-quality animations for various purposes, including marketing, educational content, and entertainment. Our team works closely with you to understand your vision and deliver animations that captivate your audience.",
  //   icon: Assets.images.animationWhatWeDo,
  //   prices: [
  //     { name: "Short Animation (up to 1 minute)", price: 1000 },
  //     { name: "Medium Animation (1-3 minutes)", price: 3000 },
  //     { name: "Long Animation (over 3 minutes)", price: 7000 },
  //   ],
  //   path: "",
  // },
  {
    title: "Tech Trainings",
    description:
      "We offer comprehensive tech training programs designed to enhance your team's skills and keep them up-to-date with the latest technologies. Our training sessions cover various topics such as software development, cybersecurity, data analytics, and more, delivered by industry experts.",
    icon: Assets.images.techTrainingWhatWeDo,
    prices: [
      { name: "One-Day Workshop", price: 500 },
      { name: "Week-Long Course", price: 2000 },
      { name: "Customized Training Program", price: 5000 },
    ],
    path: "/training",
  },
  {
    title: "Developers Tools",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At reiciendisdoloremque sequi, voluptatem laboriosam minima hic dicta in tempora.",
    icon: Assets.images.droneWhatwedo,
    prices: [
      { name: "Aerial Photography Session", price: 500 },
      { name: "Aerial Videography Session", price: 1000 },
      { name: "Surveying and Inspection", price: 2000 },
    ],
    path: "/drone",
  },
  {
    // title: "Equipment Set-up",
    title: "D'roid Icons",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. At reiciendoloremque sequi, voluptatem laboriosam minima hic dicta in tempora",
    icon: Assets.images.equipmentwhatwedo,
    prices: [
      { name: "Basic Equipment Setup", price: 500 },
      { name: "Advanced Equipment Setup", price: 2000 },
      { name: "Full Office Setup", price: 5000 },
    ],
    path: "/offices",
  },
];

const Services: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getColor } = useThemeColor();
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <section className="service-hero-section">
        <div>
          <img src={Assets.images.whatwedoBanner} height={650} alt="" />
        </div>

        <div className="service-text-area">
          <h2>WHAT WE DO?</h2>
        </div>
      </section>
      <div className="service-main">
        <h1
          style={{ color: Assets.colors.primary }}
          className="general-heading-two"
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
              icon={
                <img
                  src={service.icon}
                  alt={service.title}
                  style={{
                    width: "300px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
              }
              // icon={service.icon}
              title={service.title}
              content={service.description}
              actions={
                <Button
                  title="Read More"
                  bgColor="#fbcc34"
                  color="#000"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  fWeight={700}
                  bRadiusColor={"#fbcc34"}
                  onClickButton={() => {
                    navigate(service.path);
                  }}
                  // onClickButton={async () => {
                  //   const convertedPrices = await Promise.all(
                  //     service.prices.map(async (price) => {
                  //       const convertedAmount = await convertToCurrency(
                  //         price.price
                  //       );
                  //       return `${price.name}: ${convertedAmount}`;
                  //     })
                  //   );

                  //   dispatch(
                  //     updateModalContent({
                  //       appTitle: service.title,
                  //       appBody: `
                  //         <div class="modal-content">
                  //           <p>${service.description}</p>
                  //           <ul style="list-style: none;">
                  //             ${convertedPrices
                  //               .map((price) => `<li>${price}</li>`)
                  //               .join("")}
                  //           </ul>
                  //         </div>
                  //       `,
                  //     })
                  //   );
                  //   dispatch(updateModal(true));
                  // }}
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
