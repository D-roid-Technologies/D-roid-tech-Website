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
import { FaLaptopCode, FaRegCalendarPlus } from "react-icons/fa";
import { GiRobotGolem } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { FaBookReader } from "react-icons/fa";
import { SiNintendogamecube } from "react-icons/si";
import { MdHomeRepairService } from "react-icons/md";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/constant/Variants";
import { TbWriting } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineTemplate } from "react-icons/hi";
import { FcTemplate } from "react-icons/fc";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";

const Section: React.FunctionComponent = () => {
  const { getColor } = useThemeColor();
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // background: "#12d6d6",
          right: "-15px",
          zIndex: 10,
        }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          left: "-1px",
          zIndex: 10,
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="section-main">
        <div className="hero-container">
          <div>
            <img src={Assets.images.aboutImage} alt="" className="hero-image" />
          </div>
          <div className="about-container-one">
            <section className="history">
              <p className="our-history"> Our History</p>
              <p className="histoy-details">
                D'roid Technologies traces its roots back to 2015, when
                visionary Entrepreneur Ekenedilichukwu Okoli embarked on a
                mission to redefine the digital landscape. Inspired by a passion
                for innovation and a desire to make a difference, our company
                was born in a small office space with just a handful of
                dedicated individuals.
              </p>
              {/* CONTACT US BUTTON */}
              <div className="history-btn">
                <div className="readmore-btn">
                  <Button
                    bgColor="#091d6a"
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    title="Read more about us"
                    color="#fff"
                    fWeight={800}
                    bRadius={5}
                    bRadiusColor="#091d6a"
                    icon={<FaBookReader className="style-home-icon" />}
                    onClickButton={() => {
                      navigate("/aboutus");
                    }}
                  />
                </div>
              </div>
            </section>
            {/* </div> */}
            {/* SECTION TWO */}
            {/* <div className="section-two"> */}
            <div className="approach">
              <p className="our-approach"> Our Approach</p>
              <p className="approach-details">
                At D'roid Technologies International, we take a collaborative
                approach to software development. We work closely with our
                clients to gain a deep understanding of the business needs and
                goals, and we use that knowledge to develope tailored solutions
                that meet their unique requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* JOIN TECH TEAM  */}
      <div className="join-us" style={{ backgroundColor: "#091d6a" }}>
        {/* <section className="join-container"> */}
        <div>
          {/* <FaUserGraduate
            className="icon-test"
            style={{ color: Assets.colors.substitute }}
          /> */}
          <p
            className="our-approach-blue-bg"
            style={{ color: Assets.colors.substitute }}
          >
            Want to Join our Tech Team?
          </p>
          <p className="join-approach-details">
            Are you passionate about Technology and Innovation? Join us now on a
            6 Months Sofware Development Training and become a full time Staff
            with D'roid Technologies. Work on exciting projects, grow your
            career, and be part of a team that values creativity, excellence,
            and customer focus.
            <br />
            <br />
            The Fastest way to become a Techie - Only by D'roid Technologies.
          </p>
          <div className="div-button">
            <Button
              bgColor={Assets.colors.substitute}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              title="Take our Test"
              color="black"
              fWeight={800}
              bRadius={5}
              bRadiusColor={Assets.colors.substitute}
              icon={<TbWriting className="icon-styles" />}
              onClickButton={() => {
                navigate("/taketest");
              }}
            />
          </div>
        </div>
        <div className="join-images">
          <span>
            <img
              src={Assets.images.joinImageOne}
              alt=""
              height="450"
              width="270"
            />
          </span>
          <span>
            <img
              src={Assets.images.joinImageTwo}
              alt=""
              height="400"
              width="270"
              className="join-images-two"
            />
          </span>
        </div>
        {/* </section> */}
      </div>

      {/* OUR SECTION */}
      <div className="our-service-main-two">
        <div className="section-three">
          <div className="services">
            <p className="our-services-s"> Why We Are Known</p>
            <p className="services-detailss">
              We offer a wide range of software development services, including
              web development, mobile app development, and custom software
              development. we use the latest technologies and tools to ensure
              that our clients recieve cutting- edge solutions that drive their
              business forward.
            </p>
          </div>
        </div>
        {/* CAROUSEL SECTION */}
        <div className="carousel-container">
          <Slider {...settings}>
            <div className="imageone">
              <div className="content-wrapper">
                <img
                  src={Assets.images.serviceImage}
                  alt=""
                  className="image-sizessd"
                  style={{ color: getColor("basic") }}
                />

                <span className="padded">
                  <h2 className="carousel-heading">
                    Software Design & Development
                  </h2>
                  <p className="carousel-details">
                    We design and develop all the types of Software Applications
                    for any requirement. We are flexible team who is ready to
                    gather your requirements and develop the essential solutions
                    according to modern trends and standard.
                  </p>
                </span>
              </div>
            </div>
            {/* TWO */}
            <div className="imageone">
              <div className="content-wrapper">
                <img
                  src={Assets.images.serviceImageTwo}
                  alt=""
                  className="image-sizessd"
                  style={{ color: getColor("basic") }}
                />

                <span className="padded">
                  <h2 className="carousel-heading">Animation Creation</h2>
                  <p className="carousel-details">
                    Our Animation Creation services bring ideas to life through
                    captivating visual storytelling. We specialize in creating
                    high-quality 2D and 3D animations for various industries,
                    including education, entertainment, advertising, and
                    corporate training.
                  </p>
                </span>
              </div>
            </div>
            <div className="imageone">
              <div className="content-wrapper">
                <img
                  src={Assets.images.serviceImageThree}
                  alt=""
                  className="image-sizessd"
                  style={{ color: getColor("basic") }}
                />

                <span className="padded">
                  <h2 className="carousel-heading">Tech Training </h2>
                  {/* waiting for tech content */}
                  <p className="carousel-details">
                    Our Tech training programs are designed to equip you and/or
                    your team with the skills needed to excel in today's
                    fast-paced technological landscape. Our expert-led training
                    sessions cover a wide range of topics, from software
                    development and cybersecurity to data analytics and more.
                  </p>
                </span>
              </div>
            </div>
          </Slider>
          {/* OUR SERVICES BUTTON SECTION */}
          {/* <a href=""> */}
          <div className="our-services-btn">
            <div className="services-btn">
              <Button
                bgColor="#fbcc34"
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="See all our services"
                color="#000"
                fWeight={700}
                bRadius={5}
                bRadiusColor="#fbcc34"
                icon={<MdHomeRepairService className="style-home-icons" />}
                onClickButton={() => {
                  navigate("/services");
                }}
              />
            </div>
          </div>
          {/* </a> */}
        </div>
        {/* Create website section */}
        <div className="web-container">
          <div>
            <img
              src={Assets.images.websiteImage}
              alt=""
              className="home-web-image"
            />
          </div>
          <div>
            <p className="website-header">Create a website in 5mins</p>
            <p className="website-details">
              In today’s digital world, creating a website is faster and easier
              than ever before. Gone are the days when you needed deep technical
              knowledge to build one. With the right tools and platforms you can
              set up a website in just five minutes. Begin a step-by-step guide
              to help you create your website in a flash.
            </p>
            <div className="our-servicess-btns">
              <div className="servicess-btns">
                <Button
                  bgColor="#071d6a"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="Start now"
                  color="#ffffff"
                  fWeight={700}
                  bRadius={5}
                  bRadiusColor="#071d6a"
                  icon={
                    <MdHomeRepairService
                      style={{ color: "#ffffff" }}
                      className="style-home-icons"
                    />
                  }
                  onClickButton={() => {
                    navigate("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* download App */}
        <section className="app-section">
          <div>
            {/* <p className="download ">
              Download Our CashBasket <br />
              Mobile App & Experience the <br />
              best of our Services.
            </p> */}
            <p className="download ">
              Get Our <br />
              Knowledge City <br />
              Mobile App On.
            </p>
            <div className="app-btn-container">
              <span className="Apple-store">
                <Button
                  bgColor={"#ffffff"}
                  title="Apple Store"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  fWeight={700}
                  color="#071d69"
                  bRadius={5}
                  bRadiusColor="#071d69"
                  icon={
                    <FaApple
                      style={{ color: "#071d69" }}
                      className="icon-styles"
                    />
                  }
                  onClickButton={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </span>
              <span className="google-play">
                <Button
                  className="google-play"
                  bgColor={"#ffffff"}
                  title="Google play"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  bRadius={5}
                  fWeight={700}
                  color="#071d69"
                  bRadiusColor="#071d69"
                  icon={
                    <IoLogoGooglePlaystore
                      style={{ color: "#071d69" }}
                      className="icon-styles"
                    />
                  }
                  onClickButton={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </span>
            </div>
          </div>
          <div>
            <img
              src={Assets.images.knowledgeCityMobileApp}
              alt="knowledge city img"
              className="m-app-image"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Section;
