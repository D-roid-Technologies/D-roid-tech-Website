import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../home/Home.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import AboutSection from "./aboutsection/AboutSection";
import CustomerFeedBack from "./customerfeedback/CustomerFeedBack";
import Button from "../../components/button/Button";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import { Assets } from "../../../utils/constant/Assets";
import { FaMobileRetro } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiDesktopTowerFill } from "react-icons/pi";
import { GiSpiderWeb } from "react-icons/gi";
import { FaRegCalendarPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import ButtonAlt from "../../components/button-alt/ButtonAlt";
import ProductSlider from "../../components/productSlider/ProductSlider";
import CompanyCarousel from "../companycarousel/CompanyCarousel";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  // console.log(companyBanner);
  // const modal = appEntry.showModal;
  // const aTitle = appEntry.appTitle;
  // const aBody = appEntry.appBody;

  // const onSuccessTitle = "Our Products";
  // const onFailedTitle = "Failed";
  // const onSuccessBody = (
  //   <>
  //     <p> D'roid Website </p>
  //     <p> Drone Services</p>
  //     <p> Equipment </p>
  //   </>
  // );
  // const onFailedBody = "Your login was unsuccessful, kindly try again or contact your Admin!";

  return (
    <div>
      <NavBar />
      {/* <div className="home_banner">
        <p
          className="home-heading align-center"
          style={{ color: Assets.colors.flat }}
        >
          WE TURN IDEAS INTO REALITY
        </p>
        <div style={{ width: "80%" }}>
          <p
            className="rubik"
            style={{
              color: Assets.colors.flat,
              // textAlign: "left",
              marginTop: 30,
              letterSpacing: 2,
              fontSize: 13,
            }}
          >
            We don’t just dream, we build. From concept to execution, we
            transform ideas into powerful, innovative solutions. Whether it’s a
            mobile app, website, or cutting-edge software, we bring your vision
            to life with precision and creativity.
            <br />
            <br />
            Let’s create something extraordinary together!
          </p>
        </div>
        <ButtonAlt href="https://calendly.com/droidtechint">
          Schedule an Appointment
        </ButtonAlt>
      </div> */}
      <CompanyCarousel />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <ProductSlider />
      <AboutSection />
      <CustomerFeedBack /> */}
    </div>
  );
};

export default Home;
