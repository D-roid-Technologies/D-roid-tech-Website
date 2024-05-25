import React from "react";
import NavBar from "../../components/navbar/NavBar";
import companyBanner from "../../../images/png/droid banner.png";
import "../home/Home.css";
import AboutSection from "./aboutsection/AboutSection";
import CustomerFeedBack from "./customerfeedback/CustomerFeedBack";
import Button from "../../components/button/Button";
import { RootState, store } from "../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DATA } from "../../../utils/constant/Data";
import { Assets } from "../../../utils/constant/Assets";
import { FaMobileRetro } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiDesktopTowerFill } from "react-icons/pi";
import { GiSpiderWeb } from "react-icons/gi";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  // console.log(companyBanner);
  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const onSuccessTitle = "Our Products";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p> D'roid Website </p>
      <p> Drone Services</p>
      <p> Equipment </p>
    </>
  );
  const onFailedBody =
    "Your login was unsuccessful, kindly try again or contact your Admin!";

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.homeBg}")`,
        }}
        className="bg-image"
      >
        <NavBar />

        {/* CONTENT */}
        <div className="home-main">
          <div className="home">
            <div>
              <article className="home-content">
                <p className="home-heading">
                  WE TURN YOUR IDEA
                  <br />
                  INTO REALITY
                </p>
              </article>
              <div className="product-button">
                <div className="See-our-product">
                  <Button
                    bgColor={Assets.colors.substitute}
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    title="Schedule an Appointment"
                    color="black"
                    fWeight={800}
                    bRadius={5}
                    bRadiusColor="#ffffff"
                    onClickButton={() => {
                      window.location.href =
                        "https://calendly.com/droidtechint";
                    }}
                    // onClickButton={() => {
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-middle-banner">
        <div className="home-middle-one">
          <FaMobileRetro className="home-middle-one-icon" />
          <p className="home-middle-one-p">Android / IOS App Development</p>
        </div>
        <div className="home-middle-one">
          <FaPeopleRoof className="home-middle-one-icon" />
          <p className="home-middle-one-p">Outsourcing / Consulting</p>
        </div>
        <div className="home-middle-one">
          <PiDesktopTowerFill className="home-middle-one-icon" />
          <p className="home-middle-one-p">Equpiment Set-up</p>
        </div>
        <div className="home-middle-one">
          <GiSpiderWeb className="home-middle-one-icon" />
          <p className="home-middle-one-p">Web App Development</p>
        </div>
      </div>
      <AboutSection />
      <CustomerFeedBack />
    </div>
  );
};

export default Home;
