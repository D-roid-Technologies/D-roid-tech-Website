import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Software.css";
import { Assets } from "../../../utils/constant/Assets";
import { FaCode, FaLaptopCode, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";

const Software: React.FunctionComponent = () => {
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
          {/* <article className="home-content">
            <p className="home-heading">INCREDIBLE SOFTWARE DEVELOPMENT</p>
          </article> */}

          {/* <p className="large-centered-heading">
              At D'roid Technologies, we specialize in crafting innovative
              software solutions tailored to meet the unique needs of our
              clients. Our team of experienced developers combines cutting-edge
              technologies with industry best practices to deliver robust,
              scalable, and user-friendly software applications.
            </p> */}
        </div>
      </div>

      {/* Approach Section */}
      {/* <div className="software-approach-main">
          <h1 className="software-approach-head">Our Approach</h1>
          <ul className="software-approach-list">
            <li className="software-approach-item">
              <h2>Understanding Your Needs</h2>
              <p>
                We begin by conducting a comprehensive analysis of your
                requirements, ensuring that we fully understand your objectives
                and challenges.
              </p>
            </li>
            <li className="software-approach-item">
              <h2>Design & Planning</h2>
              <p>
                Our team collaborates closely with you to design a solution that
                aligns with your vision and goals. We emphasize usability,
                scalability, and performance in our design process.
              </p>
            </li>
            <li className="software-approach-item">
              <h2>Development & Implementation</h2>
              <p>
                Leveraging the latest tools and technologies, we develop custom
                software solutions that address your specific needs. Our agile
                development methodology ensures flexibility and adaptability
                throughout the process.
              </p>
            </li>
            <li className="software-approach-item">
              <h2>Testing & Quality Assurance</h2>
              <p>
                We rigorously test each software product to ensure
                functionality, reliability, and security. Our goal is to deliver
                a flawless user experience that exceeds your expectations.
              </p>
            </li>
            <li className="software-approach-item">
              <h2>Deployment & Support</h2>
              <p>
                Once the software is ready, we assist with deployment and
                provide ongoing support to ensure smooth operation and user
                satisfaction.
              </p>
            </li>
          </ul>
        </div> */}

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
