import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Software.css";
import { Assets } from "../../../utils/constant/Assets";

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
        {/* Approach Section */}
        <div className="software-approach-main">
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
        </div>

        {/* Featured Training Programs Section */}
        <div className="flex-row-section reverse">
          <div className="rounded-image">
            <img
              src={Assets.images.mobiledev}
              alt="coding-image"
              className="boxed-image"
            />
          </div>
          <div className="centered-text-section">
            <h2 className="section-heading">Featured Training Programs</h2>
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

        {/* Technologies and Tools Section */}
        <div className="flex-row-section">
          <div className="rounded-image">
            <img
              src={Assets.images.statistics}
              alt="coding-image"
              className="boxed-image"
            />
          </div>
          <div className="centered-text-section">
            <h2 className="section-heading">Technologies And Tools</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Software;