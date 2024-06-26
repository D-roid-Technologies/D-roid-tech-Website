import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Software.css";
import { Assets } from "../../../utils/constant/Assets";
import { FaCode, FaLaptopCode, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import { GiSpiderWeb } from "react-icons/gi";
import { MdOutlinePhoneIphone } from "react-icons/md";
import Button from "../../components/button/Button";

const Software: React.FunctionComponent = () => {
  const [bgColor, setBgColor] = useState<string>(Assets.colors.primary);
  const [notActive, setNotActivev] = useState<string>("#7C7C7C");

  // const setActive = () => {
  //   if (bgColor === notActive) {
  //     setBgColor(bgColor);
  //   } else {
  //     setBgColor(notActive);
  //   }
  // };
  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundImage: `url("${Assets.images.softwareBg}")`,
        }}
        className="bg-image"
      >
        <div className="home-section">
          {/* <p className="large-centered-heading">
              At D'roid Technologies, we specialize in crafting innovative
              software solutions tailored to meet the unique needs of our
              clients. Our team of experienced developers combines cutting-edge
              technologies with industry best practices to deliver robust,
              scalable, and user-friendly software applications.
            </p> */}
        </div>
      </div>

      <div className="home-to-software">
        <h1 className="software-approach-head">
          We are Home to Software Development
        </h1>
        <p className="paragraph">
          <strong>
            Over 47 Software Application built in the last 12 months.
          </strong>{" "}
          We are the right choice to your Software solution.
          <br />
          <br />
          This is the hub of innovative Software Development. At D'roid
          Technologies, we specialize in crafting high-quality software
          solutions that drive business growth and efficiency. Our team of
          expert developers harnesses the power of the latest technologies and
          an IQ rate of over 130 to deliver robust, scalable, and user-friendly
          applications.
          <br />
          <br />
          Whether you're looking to build a custom mobile app, a dynamic web
          platform, or enterprise-grade software, our comprehensive development
          services are designed to meet your unique needs.
        </p>

        <div className="show-list">
          <div
            className="show-list-left"
            style={{
              backgroundColor: bgColor,
            }}
            // onClick={() => {
            //   setActive();
            // }}
          >
            <GiSpiderWeb className="" />
            <p className="">Web Development</p>
          </div>
          <div
            className="show-list-left"
            style={{
              backgroundColor: notActive,
            }}
            // onClick={() => {
            //   setActive();
            // }}
          >
            <MdOutlinePhoneIphone className="" />
            <p className="">Mobile Development</p>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div className="software-approach-main">
        <h1 className="software-approach-head">
          5 Stages of our Software Development Process
        </h1>
        <ul className="software-approach-list">
          <li className="software-approach-item">
            <h2>Understanding Your Needs</h2>
            <p>
              We begin by conducting a comprehensive analysis of your
              requirements, ensuring that we fully understand your objectives
              and challenges.
              <br />
              <br />
              We set up reglar meetings if neccessary until we have a good grasp
              of what you need.
            </p>
          </li>
          <li className="software-approach-item">
            <h2>Design & Planning</h2>
            <p>
              Our team collaborates closely with you to design a solution that
              aligns with your vision and goals. We emphasize usability,
              scalability, and performance in our design process.
              <br />
              <br />
              You can take a look at some of our Projects or Templates on our{" "}
              <a href="/products">Projects Page</a>
            </p>
          </li>
          <li className="software-approach-item">
            <h2>Development & Implementation</h2>
            <p>
              Leveraging the latest tools and technologies, we develop custom
              software solutions that address your specific needs. Our agile
              development methodology using Scrum, ensures flexibility and
              adaptability throughout the process.
              <br />
              <br />
              <p>
                <a href="#">Vist our Apple Store</a>
              </p>
              <p>
                <a href="#">Vist our Google Store</a>
              </p>
            </p>
          </li>
          <li className="software-approach-item">
            <h2>Testing & Quality Assurance</h2>
            <p>
              We rigorously test each software product to ensure functionality,
              reliability, and security. Our goal is to deliver a flawless user
              experience that exceeds your expectations.
              <br />
              <br />
              We use Jest, Selenium, Appium and SoapUI to ensure that your
              Product is well buit and ready for the public market.
            </p>
          </li>
          <li className="software-approach-item">
            <h2>Deployment & Support</h2>
            <p>
              Once the software is ready, we assist with deployment and provide
              ongoing support to ensure smooth operation and user satisfaction.
            </p>
          </li>
        </ul>
        <Button
          bgColor={"#000000"}
          mTop={0}
          mBottom={0}
          mLeft={0}
          mRight={0}
          color="#ffffff"
          title="Want to Know more? Contact Us"
          onClickButton={() => {}}
        />
      </div>

      {/* Technologies and Tools Section */}
      <div className="technologies" style={{ marginTop: "1rem" }}>
        <h1 className="training-approach-head">Technologies and Tools</h1>
        <ul className="training-approach-list">
          <motion.li
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="training-approach-item"
          >
            <div className="icon-container">
              <FaCode
                style={{ fontSize: "3rem", color: Assets.colors.secondary }}
                className="icon"
              />
            </div>
            <h2>Programming Languages</h2>
            <p className="paragraph">
              JavaScript, TypeScript, Python, Java, C#
            </p>
          </motion.li>
          <motion.li
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="training-approach-item"
          >
            <div className="icon-container">
              <FaLaptopCode
                style={{ fontSize: "3rem", color: Assets.colors.secondary }}
                className="icon"
              />
            </div>
            <h2>Frameworks & Libraries</h2>
            <p className="paragraph">
              React.js, Angular, Vue.js, Node.js, Express.js
            </p>
          </motion.li>
          <motion.li
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="training-approach-item"
          >
            <div className="icon-container">
              <FaDatabase
                style={{ fontSize: "3rem", color: Assets.colors.secondary }}
                className="icon"
              />
            </div>
            <h2>Databases</h2>
            <p className="paragraph">Firebase, mySQL, Postgres, MongoDB</p>
          </motion.li>
          <motion.li
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="training-approach-item"
          >
            <div className="icon-container">
              <FaLaptopCode
                style={{ fontSize: "3rem", color: Assets.colors.secondary }}
                className="icon"
              />
            </div>
            <h2>Tools & Platforms</h2>
            <p className="paragraph">
              Git, GitHub, Docker, AWS, Azure, Google Cloud
            </p>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default Software;
