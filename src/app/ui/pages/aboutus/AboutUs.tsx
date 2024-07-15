import React from "react";
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

const AboutUs: React.FunctionComponent = () => {
  const { getColor } = useThemeColor();

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: getColor("backgroundColor") }}>
        <div className="about-main">
          <div className="aboutus-marginbutton">
            <div className="section-one">
              <motion.div
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="coding-image"
              >
                <img
                  src={Assets.images.companyLogoNoBg}
                  alt="codingImage"
                  className="image-sized"
                />
              </motion.div>
              <motion.div
                variants={fadeIn("left", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="about-history"
              >
                <p className="about-history-heading"> Our History</p>
                <p className="about-histoy-details">
                  D'roid Technologies traces its roots back to 2018, when
                  visionary entrepreneur <a href="#">Ekenedilichukwu Okoli</a> {" "}
                  embarked on a mission to redefine the digital landscape.
                  Inspired by a passion for innovation and a desire to make a
                  difference, our company was born in a small office space with
                  just a handful of dedicated individuals.
                </p>
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="about-history-details-div"
          >
            <p className="about-histoy-details">
              In the early days, we faced numerous challenges and obstacles, but
              our unwavering determination and commitment to excellence
              propelled us forward. With each hurdle we overcame, we gained
              valuable insights and experience that shaped our journey. As the
              years passed, D'roid Technologies continued to grow and evolve,
              expanding our team and refining our capabilities. We established
              ourselves as pioneers in the software industry, known for our
              innovative solutions and cutting-edge technologies. <br />
              <br /> Throughout our journey, we've remained true to our core
              values of integrity, innovation, and customer focus. We've forged
              strong partnerships with clients and collaborators, earning their
              trust and loyalty through our unwavering commitment to quality and
              excellence. Today, as we reflect on our history, we're proud of
              the milestones we've achieved and the obstacles we've overcome.
              But our journey is far from over. As we look to the future, we're
              excited to continue pushing the boundaries of possibility and
              shaping the digital landscape for years to come."
            </p>
          </motion.div>
          <div
            className="vision-marginbuttom"
            style={{ backgroundColor: getColor("backgroundColor") }}
          >
            <section>
              <motion.div
                variants={fadeIn("left", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="vision-mission-value"
              >
                {/* BOX ONE */}
                <div className="vision-main">
                  <div className="vision-box">
                    <h2 className="vision-header">Vision</h2>
                    <p>
                      Our vision is to be a global leader in technological
                      innovation, known for our exceptional service and
                      transformative solutions. We aspire to create a future
                      where technology seamlessly integrates with everyday life,
                      fostering growth, creativity, and progress. By continually
                      advancing our expertise and embracing new challenges, we
                      aim to shape a world where technology is accessible and
                      beneficial to all.
                    </p>
                  </div>
                </div>
                {/* BOX TWO */}
                <div className="vision-main">
                  <div className="vision-box">
                    <h2 className="vision-header">Mission</h2>
                    <p>
                      Our mission is to empower individuals and businesses
                      through innovative technology solutions. We strive to
                      deliver high-quality, scalable, and user-friendly software
                      applications, cutting-edge animation, comprehensive tech
                      training, and advanced drone services. Our commitment is
                      to enhance our clients' capabilities, enabling them to
                      achieve their goals with efficiency and excellence.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>

          {/* CORE VALUES BOX THREE */}
          <div className="core-value-vision-main">
            <div
              className="core-value-vision-box"
              style={{ backgroundColor: getColor("backgroundColor") }}
            >
              <h2 className="core-value-vision-header">Core Values</h2>
              <div className="core-values">
                <motion.div
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  <GiRosaShield />
                  <h2 className="core-value-vision-header-small">Integtity</h2>
                  <p className="about-histoy-details">
                    At D'roid Technologies, integrity is the cornerstone of our
                    operations. We are committed to conducting our business with
                    the highest ethical standards, ensuring transparency,
                    honesty, and accountability in all our interactions.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeIn("down", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  <FaGears />
                  <h2 className="core-value-vision-header-small">Innovation</h2>
                  <p className="about-histoy-details">
                    At D'roid Technologies, innovation is at the heart of
                    everything we do. We are committed to pushing the boundaries
                    of technology to deliver groundbreaking solutions that drive
                    progress and create new opportunities.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeIn("left", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  <RiCustomerService2Fill />
                  <h2 className="core-value-vision-header-small">
                    Customer Focus
                  </h2>
                  <p className="about-histoy-details">
                    At D'roid Technologies, our customers are at the heart of
                    everything we do. We are dedicated to understanding and
                    anticipating your needs, delivering tailored solutions that
                    drive success and satisfaction.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
          {/* OUT TEAM */}
          <section>
            <p className="team-heading"> Our Team </p>
            <ul className="team-container">
              {DATA.droidStaff.map((item, index) => (
                <li className="team" key={index}>
                  <div>
                    <img src={item.image} alt="" className="team-image" />
                  </div>
                  <div className="team-details">
                    <h2 className="team-name">{item.name}</h2>
                    <p className="team-designation">{item.designation}</p>
                    <div className="team-socials">
                      {item.socials?.linkedin && (
                        <a
                          href={item.socials.linkedin}
                          className="social-link twitter"
                          target="blank"
                        >
                          <FaXTwitter />
                        </a>
                      )}
                      {item.socials?.twitter && (
                        <a
                          href={item.socials.twitter}
                          className="social-link"
                          target="blank"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
