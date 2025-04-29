// @ts-nocheck

import React, { useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import "../aboutus/AboutUs.css";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaGears, FaLinkedin } from "react-icons/fa6";
import { GiRosaShield } from "react-icons/gi";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import { DATA } from "../../../utils/constant/Data";
import { FaXTwitter } from "react-icons/fa6";
import Button from "../../components/button/Button";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import Management from "../../components/staffandmanagement/Management";
import AboutDroid from "../../components/aboutdroid/AboutDriod";
import OurHistory from "../../components/ourhistory/OurHistory";
import OurJourney from "../../components/ourjourney/OurJourney";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { FaBullseye } from "react-icons/fa";
import { GiNightVision } from "react-icons/gi";

export const companyValues = [
  {
    title: "Vision",
    description:
      "Our vision is to be a global leader in technological innovation, known for our exceptional service and transformative solutions. We aspire to create a future where technology seamlessly integrates with everyday life, fostering growth, creativity, and progress. By continually advancing our expertise and embracing new challenges, we aim to shape a world where technology is accessible and beneficial to all.",
    icon: GiNightVision({ size: 24 }),
  },
  {
    title: "Mission",
    description:
      "Our mission is to empower individuals and businesses through innovative technology solutions. We strive to deliver high-quality, scalable, and user-friendly software applications, cutting-edge animation, comprehensive tech training, and advanced drone services. Our commitment is to enhance our clients' capabilities, enabling them to achieve their goals with efficiency and excellence.",
    icon: FaBullseye({ size: 24 }),
  },
];

const AboutUs: React.FunctionComponent = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  // const { getColor } = useThemeColor();

  return (
    <>
      <NavBar />
      <AboutDroid />
      <div className="our-historyy">
        <OurHistory />
      </div>
      <div className="our-historyy">
        <OurJourney />
      </div>

      <div>
        <div className="about-main">
          <div className="vision-marginbuttom">
            <section>
              <div className="vision-mission-value">
                <div className="soft-dev-content">
                  {companyValues.map((tech, index) => (
                    <CoreValueCardTwo
                      key={index}
                      title={tech.title}
                      description={tech.description}
                      imageSrc={tech.imageSrc}
                      icon={tech.icon}
                      className="process-card"
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* CORE VALUES BOX THREE */}
        <div className="core-value-vision-main">
          <div className="core-value-vision-box">
            <h2 className="core-value-vision-header">Core Values</h2>
            <div className="core-values">
              <div data-aos="flip-left">
                <GiRosaShield className="core-value-icons" />
                <h2 className="core-value-vision-header-small">Integrity</h2>
                <p
                  className="about-histoy-details"
                  style={{ color: Assets.colors.flat }}
                >
                  At D'roid Technologies, integrity is the cornerstone of our
                  operations. We are committed to conducting our business with
                  the highest ethical standards, ensuring transparency, honesty,
                  and accountability in all our interactions.
                </p>
              </div>
              <div data-aos="zoom-in-up">
                <FaGears className="core-value-icons" />
                <h2 className="core-value-vision-header-small">Innovation</h2>
                <p
                  className="about-histoy-details"
                  style={{ color: Assets.colors.flat }}
                >
                  At D'roid Technologies, innovation is at the heart of
                  everything we do. We are committed to pushing the boundaries
                  of technology to deliver groundbreaking solutions that drive
                  progress and create new opportunities.
                </p>
              </div>
              <div data-aos="flip-right">
                <RiCustomerService2Fill className="core-value-icons" />
                <h2 className="core-value-vision-header-small">
                  Customer Focus
                </h2>
                <p
                  className="about-histoy-details"
                  style={{ color: Assets.colors.flat }}
                >
                  At D'roid Technologies, our customers are at the heart of
                  everything we do. We are dedicated to understanding and
                  anticipating your needs, delivering tailored solutions that
                  drive success and satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* OUT TEAM */}
        <section>
          <Management />
          <div className="wrapper-fluid">
            <div className="group mb-5">
              {DATA.droidStaff.map((item, index) => (
                <div className="block-12 block-lg-3">
                  <div key={index} className="team-card">
                    <div className="imgbox">
                      <img src={item.image} />
                    </div>
                    <div className="content">
                      <div className="contentBox">
                        <h3>
                          {item.name} <br />
                          <span>{item.designation}</span>
                        </h3>
                      </div>
                      <ul className="social">
                        <li>
                          {item.socials?.linkedin && (
                            <a href={item.socials.linkedin}>
                              <FaLinkedin className="icon-s" />
                            </a>
                          )}
                        </li>
                        <li>
                          {item.socials?.twitter && (
                            <a href={item.socials.twitter}>
                              <FaXTwitter className="icon-s" />
                            </a>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
