import React from "react";
import "./AboutSection.css";
import { Assets } from "../../../utils/constant/Assets";
import Button from "../button/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  return (
    <div className="section-main">
      {/* SECTION ONE */}
      <div className="section-one">
        <div className="coding-image">
          <img
            src={Assets.images.coding}
            alt="codingImage"
            className="image-size"
          />
        </div>
        <div className="history">
          <p className="our-history"> Our History</p>
          <p className="histoy-details">
            {" "}
            D'roid Technologies International was founded in 2005 by a group of
            software developers with passion for creating innovative solutions.
            Over the years, we have grouwn into a leading software development
            company, serving clients in a wide range of industries.
          </p>{" "}
          <a href="/aboutus">
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
                  onClickButton={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </a>
        </div>
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
        </div>
        <div className="coding-image">
          <img
            src={Assets.images.statistics}
            alt="codingImage"
            className="image-size"
          />
        </div>
      </div>
      {/* SECTION THREE */}
      <div className="section-three">
        <div className="services">
          <p className="our-services"> Our Services</p>
          <p className="services-details">
            {" "}
            We offer a wide range of software development services, including
            web development, mobile app development, and custom software
            development. we use the latest technologies and tools to ensure that
            our clients recieve cutting- edge solutions that drive their
            business forward.
          </p>{" "}
        </div>
      </div>
      {/* CAROUSEL SECTION */}
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="imageone">
            <div>
              <img src={Assets.images.mobiledev} alt="Image 1" />
              <span className="padded">
                {" "}
                <h2>Mobile Application Development </h2>
              </span>
            </div>
          </div>

          <div className="imageone">
            <img src={Assets.images.softwaredesign} alt="Image 2" />
            <span className="padded">
              {" "}
              <h2>Software Design & Development </h2>
              <p>
                We design and develop all the types of software applications for
                any requirement. We are flexible team who is ready to gather
                your requirements and develop the essential solutions according
                to modern trends and standard.
              </p>
            </span>
          </div>
          <div className="imageone">
            <img src={Assets.images.webdesign} alt="Image 3" />
            <span className="padded">
              <h2>Web Design & Development</h2>
            </span>
          </div>
        </Slider>
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
                onClickButton={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Section;
