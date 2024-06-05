import React from "react";
import "./AboutSection.css";
import { Assets } from "../../../../utils/constant/Assets";
import Button from "../../../components/button/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiCuckooClock } from "react-icons/gi";
import { GiPathDistance } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { GiRobotGolem } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { FaBookReader } from "react-icons/fa";
import { SiNintendogamecube } from "react-icons/si";
import { MdHomeRepairService } from "react-icons/md";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/constant/Variants";

const Section: React.FunctionComponent = () => {
  const { getColor } = useThemeColor();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const navigate = useNavigate();

  return (
    <div className="section-main">
      {/* SECTION ONE */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="section-one"
      >
        <div className="coding-image">
          <GiCuckooClock
            className="image-size"
            style={{ color: getColor("basic") }}
          />
        </div>
        <section className="history">
          <p className="our-history"> Our History</p>
          <p className="histoy-details">
            D'roid Technologies traces its roots back to 2015, when visionary
            entrepreneur Ekenedilichukwu Okoli embarked on a mission to redefine
            the digital landscape. Inspired by a passion for innovation and a
            desire to make a difference, our company was born in a small office
            space with just a handful of dedicated individuals.
          </p>
          {/* CONTACT US BUTTON */}
          <div className="history-btn">
            <div className="readmore-btn">
              <Button
                bgColor={getColor("basic")}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="Read more about us"
                color={getColor("light")}
                fWeight={800}
                bRadius={5}
                icon={<FaBookReader className="style-home-icon" />}
                onClickButton={() => {
                  navigate("/aboutus");
                }}
              />
            </div>
          </div>
        </section>
      </motion.div>
      {/* SECTION TWO */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="section-two"
      >
        <div className="approach">
          <p className="our-approach"> Our Approach</p>
          <p className="approach-details">
            {" "}
            At D'roid Technologies International, we take a collaborative
            approach to software development. We work closely with our clients
            to gain a deep understanding of the business needs and goals, and we
            use that knowledge to develope tailored solutions that meet their
            unique requirements.
          </p>{" "}
          <div className="our-approach-btn">
            <div className="approach-btn">
              <Button
                bgColor={getColor("basic")}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="Our Approach"
                color={getColor("light")}
                fWeight={800}
                bRadius={5}
                icon={<SiNintendogamecube className="style-home-icon" />}
                onClickButton={() => {
                  navigate("/aboutus");
                }}
              />
            </div>
          </div>
        </div>
        <div className="coding-image">
          <GiPathDistance
            className="image-size"
            style={{ color: getColor("basic") }}
          />
        </div>
      </motion.div>

      {/* SECTION THREE */}
      <div className="our-service-main">
        <div className="section-three">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="services"
          >
            <p className="our-services"> Our Services</p>
            <p className="services-details">
              {" "}
              We offer a wide range of software development services, including
              web development, mobile app development, and custom software
              development. we use the latest technologies and tools to ensure
              that our clients recieve cutting- edge solutions that drive their
              business forward.
            </p>{" "}
          </motion.div>
        </div>
        {/* CAROUSEL SECTION */}
        <div className="carousel-container">
          <Slider {...settings}>
            <div className="imageone">
              <div>
                <FaLaptopCode
                  className="image-size"
                  style={{ color: getColor("basic") }}
                />
                <span className="padded">
                  <h2 className="carousel-heading">
                    Software Design & Development
                  </h2>
                  <p className="carousel-details">
                    We design and develop all the types of software applications
                    for any requirement. We are flexible team who is ready to
                    gather your requirements and develop the essential solutions
                    according to modern trends and standard.
                  </p>
                </span>
              </div>
            </div>
            {/* TWO */}
            <div className="imageone">
              <GiRobotGolem
                className="image-size"
                style={{ color: getColor("basic") }}
              />
              <span className="padded">
                {" "}
                <h2 className="carousel-heading">Animation Creation</h2>
                <p className="carousel-details">
                  Our Animation Creation services bring ideas to life through
                  captivating visual storytelling. We specialize in creating
                  high-quality 2D and 3D animations for various industries,
                  including education, entertainment, advertising, and corporate
                  training.
                </p>
              </span>
            </div>
            <div className="imageone">
              <GiTeacher
                className="image-size"
                style={{ color: getColor("basic") }}
              />
              <span className="padded">
                <h2 className="carousel-heading">Tech Training </h2>
                {/* waiting for tech content */}
                <p className="carousel-details">
                  we offer comprehensive tech training programs designed to
                  equip you and your team with the skills needed to excel in
                  today's fast-paced technological landscape. Our expert-led
                  training sessions cover a wide range of topics, from software
                  development and cybersecurity to data analytics and more.
                </p>
              </span>
            </div>
          </Slider>
          {/* OUR SERVICES BUTTON SECTION */}
          <a href="">
            <div className="our-services-btn">
              <div className="services-btn">
                <Button
                  bgColor={getColor("basic")}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="See all our services"
                  color={getColor("light")}
                  fWeight={700}
                  bRadius={5}
                  icon={<MdHomeRepairService className="style-home-icon" />}
                  onClickButton={() => {
                    navigate("/services");
                  }}
                />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Section;
