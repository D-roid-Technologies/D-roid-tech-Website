import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Software.css";
import { Assets } from "../../../utils/constant/Assets";
import { DATA } from "../../../utils/constant/Data";

const Software: React.FunctionComponent = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.software}")`,
        }}
        className="full-screen-background-image"
      >
        <NavBar />
        <div className="home-section">
          <div className="home-content">
            <p className="large-centered-heading">
              At D'roid Technologies, we specialize in crafting innovative
              software solutions tailored to meet the unique needs of our
              clients. Our team of experienced developers combines cutting-edge
              technologies with industry best practices to deliver robust,
              scalable, and user-friendly software applications.
            </p>
          </div>
        </div>
      </div>
      <div className="main-content-section">
        <div className="flex-row-section">
          <div className="centered-text-section">
            <p className="section-heading">Our Approach</p>
            <div className="section-details">
              <ul>
                <li>
                  <strong>Understanding Your Needs:</strong> We begin by
                  conducting a comprehensive analysis of your requirements,
                  ensuring that we fully understand your objectives and
                  challenges.
                </li>
                <li>
                  <strong>Design & Planning:</strong> Our team collaborates
                  closely with you to design a solution that aligns with your
                  vision and goals. We emphasize usability, scalability, and
                  performance in our design process.
                </li>
                <li>
                  <strong>Development & Implementation:</strong> Leveraging the
                  latest tools and technologies, we develop custom software
                  solutions that address your specific needs. Our agile
                  development methodology ensures flexibility and adaptability
                  throughout the process.
                </li>
                <li>
                  <strong>Testing & Quality Assurance:</strong> We rigorously
                  test each software product to ensure functionality,
                  reliability, and security. Our goal is to deliver a flawless
                  user experience that exceeds your expectations.
                </li>
                <li>
                  <strong>Deployment & Support:</strong> Once the software is
                  ready, we assist with deployment and provide ongoing support
                  to ensure smooth operation and user satisfaction.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-image">
            <img
              src={Assets.images.softwaredesign}
              alt="coding-image"
              className="boxed-image"
            />
          </div>
        </div>
        <div className="flex-row-section reverse">
          <div className="rounded-image">
            <img
              src={Assets.images.mobiledev}
              alt="coding-image"
              className="boxed-image"
            />
          </div>
          <div className="centered-text-section">
            <p className="section-heading">Featured Training Programs</p>
            <div className="section-details">
              <ul>
                <li>
                  <strong>Full Stack Web Development:</strong> Learn the
                  fundamentals of front-end and back-end web development,
                  including HTML, CSS, JavaScript, React.js, Node.js, and more.
                </li>
                <li>
                  <strong>Mobile App Development:</strong> Master the skills
                  needed to design and develop mobile applications for iOS and
                  Android platforms using React Native, Swift, and Kotlin.
                </li>
                <li>
                  <strong>Data Science & Machine Learning:</strong> Dive into
                  the exciting world of data science and machine learning,
                  exploring topics such as data analysis, statistical modeling,
                  and predictive analytics.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-row-section">
          <div className="centered-text-section">
            <p className="section-heading">Technologies And Tools</p>
            <div className="section-details">
              <ul>
                <li>
                  <strong>Learning Management Systems:</strong> Moodle, Canvas,
                  Blackboard
                </li>
                <li>
                  <strong>Video Conferencing Platforms:</strong> Zoom, Microsoft
                  Teams, Google Meet
                </li>
                <li>
                  <strong>Code Editors:</strong> Visual Studio Code, Atom,
                  Sublime Text
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-image">
            <img
              src={Assets.images.statistics}
              alt="coding-image"
              className="boxed-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Software;