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

const Section: React.FunctionComponent = () => {
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
      <div className="section-one">
        <div className="coding-image">
          <GiCuckooClock className="image-size" />
        </div>
        <section className="history">
          <p className="our-history"> Our History</p>
          <p className="histoy-details">
            {" "}
            D'roid Technologies International was founded in 2005 by a group of
            software developers with passion for creating innovative solutions.
            Over the years, we have grouwn into a leading software development
            company, serving clients in a wide range of industries.
          </p>
          {/* CONTACT US BUTTON */}
          <div className="history-btn">
            <div className="readmore-btn">
              <Button
                bgColor={"black"}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="Read more about us"
                color="white"
                fWeight={800}
                bRadius={5}
                onClickButton={() => {
                  navigate("/aboutus");
                }}
              />
            </div>
          </div>
        </section>
      </div>
      {/* SECTION TWO */}
      <div className="section-two">
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
                bgColor={"black"}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="Our Approach"
                color="white"
                fWeight={800}
                bRadius={5}
                onClickButton={() => {
                  navigate("/aboutus");
                }}
              />
            </div>
          </div>
        </div>
        <div className="coding-image">
          <GiPathDistance className="image-size" />
        </div>
      </div>
      {/* SECTION THREE */}
      <div className="our-service-main">
        <div className="section-three">
          <div className="services">
            <p className="our-services"> Our Services</p>
            <p className="services-details">
              {" "}
              We offer a wide range of software development services, including
              web development, mobile app development, and custom software
              development. we use the latest technologies and tools to ensure
              that our clients recieve cutting- edge solutions that drive their
              business forward.
            </p>{" "}
          </div>
        </div>
        {/* CAROUSEL SECTION */}
        <div className="carousel-container">
          <Slider {...settings}>
            <div className="imageone">
              <div>
                <FaLaptopCode className="image-size" />
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
              <GiRobotGolem className="image-size" />
              <span className="padded">
                {" "}
                <h2 className="carousel-heading">Animation Creation</h2>
                <p className="carousel-details"></p>
              </span>
            </div>
            <div className="imageone">
              <GiTeacher className="image-size" />
              <span className="padded">
                <h2 className="carousel-heading">Tech Training </h2>
                <p className="carousel-details"> </p>
              </span>
            </div>
          </Slider>
          {/* OUR SERVICES BUTTON */}
          <a href="">
            <div className="our-services-btn">
              <div className="services-btn">
                <Button
                  bgColor={"black"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="See all our services"
                  color="white"
                  fWeight={700}
                  bRadius={5}
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
