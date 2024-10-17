import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Software.css";
import { Assets } from "../../../utils/constant/Assets";
import { FaCode, FaLaptopCode, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import { softwareDevMain } from "../../../utils/constant/Data";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/Store";
import { updateToast } from "../../../redux/slices/AppEntrySlice";

const Software: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { getColor } = useThemeColor();

  // store.dispatch(updateToast(true))
  // const [bgColor, setBgColor] = useState<string>(Assets.colors.primary);
  // const [notActive, setNotActivev] = useState<string>("#7C7C7C");

  return (
    <div>
      <NavBar />

      {/* Home to software section */}
      <div className="home-to-software">
        <div className="software-banner">
          <section className="soft-banner">
            <h1 className="software-approach-heads">
              We are Home to Software Development
            </h1>
            <p className="over">
              Over 47 Software Application built in the last 12 months. We are
              the right choice to your Software solution.
            </p>
            <br />
            <p className="soft-paragraph">
              This is the hub of innovative Software Development. At D'roid
              Technologies, we specialize in crafting high-quality software
              solutions that drive business growth and efficiency. Our team of
              expert developers harnesses the power of the latest technologies
              and an IQ rate of over 130 to deliver robust, scalable, and
              user-friendly applications.
              <br /> <br />
              Whether you're looking to build a custom mobile app, a dynamic web
              platform, or enterprise-grade software, our comprehensive
              development services are designed to meet your unique needs.
            </p>
          </section>
        </div>
        <div className="banner-image">
          <img
            src={Assets.images.softwareBannerImage}
            className="soft-hero-image"
            alt=""
          />
        </div>

        <div className="training-approach-main">
          <h1
            style={{
              fontFamily: "Rubik",
              color: "#071D6A",
              textShadow: "0px 4px 4px rgba(255, 177, 0, 0.25)",
            }}
            className="training-approach-head"
          >
            Our Software Services
          </h1>
          <ul className="service-card-container">
            {softwareDevMain.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image}
                content={item.desc}
                actions={
                  <Button
                    title="Apply Now"
                    bgColor="#fbcc34"
                    color="#071d6a"
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    fWeight={600}
                    bRadiusColor="#fbcc34"
                    onClickButton={() => {
                      navigate("/details", {
                        state: {
                          title: item.title,
                          image: item.image,
                          desc: item.desc,
                          procedure: item.procedure,
                          category: item.category,
                          tools: item.tools,
                          price: item.price,
                          currency: item.currency,
                          path: "/software",
                        },
                      });
                    }}
                  />
                }
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Technologies and Tools Section */}
      <div className="technologiess" style={{ marginTop: "1rem" }}>
        <h1 className="training-approach-head" style={{ marginTop: "2em" }}>
          Technologies and Tools
        </h1>
        <div className="tech-contain">
          <ul className="training-approach-list">
            <li className="training-approach-item">
              <div className="icon-container">
                <FaCode
                  style={{ fontSize: "2rem", color: "#071d6a" }}
                  className="icon"
                />
              </div>
              <h2>Programming Languages</h2>
              <p className="tools-paragraph">
                JavaScript, TypeScript, Python, Java, C#
              </p>
            </li>
            <li className="training-approach-item">
              <div className="icon-container">
                <FaLaptopCode
                  style={{ fontSize: "2rem", color: "#071d6a" }}
                  className="icon"
                />
              </div>
              <h2>Frameworks & Libraries</h2>
              <p className="tools-paragraph">
                React.js, Angular, Vue.js, Node.js, Express.js
              </p>
            </li>
            <li className="training-approach-item">
              <div className="icon-container">
                <FaDatabase
                  style={{ fontSize: "2rem", color: "#071d6a" }}
                  className="icon"
                />
              </div>
              <h2>Databases</h2>
              <p className="tools-paragraph">
                Firebase, mySQL, Postgres, MongoDB
              </p>
            </li>
            <li className="training-approach-item">
              <div className="icon-container">
                <FaLaptopCode
                  style={{ fontSize: "2rem", color: "#071d6a" }}
                  className="icon"
                />
              </div>
              <h2>Tools & Platforms</h2>
              <p className="tools-paragraph">
                Git, GitHub, Docker, AWS, Azure, Google Cloud
              </p>
            </li>
          </ul>
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
        <div className="wantto-know">
          <div className="wantto-know-btn">
            <Button
              bgColor={"#ffb100"}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              fWeight={700}
              color="#071d6a"
              bRadiusColor="#ffb100"
              title="Want to Know more? Click to Contact Us"
              onClickButton={() => {
                navigate("/contact", {});
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Software;
