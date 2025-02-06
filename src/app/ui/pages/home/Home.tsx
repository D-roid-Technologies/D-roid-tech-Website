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
    <div style={{ backgroundColor: "#040711" }}>
      <NavBar />
      <div className="wrapper" style={{ marginBottom: 80 }}
      // style={{ backgroundImage: `url("${Assets.images.homeBannertwo}")`, backgroundPosition: "center", backfaceVisibility: "visible", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <div className="group pt-5">
          <br />
          <br />
          <div className="block-12 ">
            <div
              className="home-content"
            >
              <p className="home-heading align-center align-lg-start" style={{ color: Assets.colors.flat }}>
                WE TURN IDEAS INTO REALITY
              </p>
              <p className="playpen" style={{ color: Assets.colors.flat, textAlign: "left", marginTop: 30, letterSpacing: 2, fontSize: 18 }}>
                We don’t just dream, we build. From concept to execution, we transform ideas into powerful, innovative solutions. Whether it’s a mobile app, website, or cutting-edge software, we bring your vision to life with precision and creativity.
                <br /><br/>
                Let’s create something extraordinary together!
              </p>
            </div>
            <div
              className="product-button aignn-end ms-4"
            >
              <div className="See-our-product">
                <Button
                  bgColor={"#111724"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="Schedule an Appointment"
                  color={Assets.colors.flat}
                  fWeight={900}
                  bRadius={0}
                  bRadiusColor={"#111724"}
                  icon={
                    <FaRegCalendarPlus
                      style={{ color: Assets.colors.flat }}
                      className="icon-styles"
                    />
                  }
                  onClickButton={() => {
                    window.location.href = "https://calendly.com/droidtechint";
                    // window.location.href = "";
                  }}
                />
              </div>
            </div>
          </div>
          {/* <div className="block-12 block-lg-5 mt-3">
            <div>
              <img
                src={Assets.images.homeBannertwo}
                alt="banner"
                // className="banner-size       banner-two"
                className="align-center image-fluid"
              />
            </div>
          </div> */}
        </div>
      </div>

      <div className="home-middle-banner p-5">
        <div className="home-middle-one">
          <FaMobileRetro className="home-middle-one-icon" />
          <p className="home-middle-one-p playpen letterspacing">Android / IOS App Development</p>
        </div>
        <div className="home-middle-one">
          <FaPeopleRoof className="home-middle-one-icon" />
          <p className="home-middle-one-p playpen letterspacing">Outsourcing / Consulting</p>
        </div>
        <div className="home-middle-one">
          <PiDesktopTowerFill className="home-middle-one-icon" />
          <p className="home-middle-one-p playpen letterspacing">Equpiment Set-up</p>
        </div>
        <div className="home-middle-one">
          <GiSpiderWeb className="home-middle-one-icon" />
          <p className="home-middle-one-p playpen letterspacing">Web App Development</p>
        </div>
      </div>
      <AboutSection />
      <CustomerFeedBack />
    </div>
  );
};

export default Home;
