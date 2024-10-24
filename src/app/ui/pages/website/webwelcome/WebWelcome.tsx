import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./WebWelcome.css";
// import "../../pages/website/webwelcome/WebWelcome.css";
import { Assets } from "../../../../utils/constant/Assets";
import Button from "../../../components/button/Button";

const WebWelcome: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    window.location.href = "https://kcity-c8580.web.app/login";
  };

  const handleCreateAccountClick = () => {
    window.location.href = "https://kcity-c8580.web.app/register";
  };

  return (
    <>
      <main>
        <div className="web-company-logo-container">
          <img
            src={Assets.images.companyLogoNoBg}
            alt=""
            className="web-company-logo"
          />
        </div>
        <section className="main-web-hero-container">
          <div className="web-hero-con">
            <div className="web-top-con">
              <button onClick={() => navigate("/")} className="web-btn-hero">
                <IoChevronBackOutline className="web-back-btn-icon" />
              </button>
            </div>
            {/* Welcome to D’roid Technologies */}
            <p className="welcome-web-heading">
              Welcome to D’roid Technologies’ Website Builder
            </p>
            <p className="welcome-web-details">
              Here you can create stunning, customized websites with ease.
            </p>
            <p className="welcome-web-sub-heading">Let’s get started!</p>
            <div className="welcome-page-illustrator">
              <img
                src={Assets.images.welcompageheroImage}
                alt="welcome-illustrator"
                className="welcome-illustrator"
              />
            </div>
            <div className="web-welcome-btn-container">
              <div>
                <button
                  className="web-welcome-btn-one"
                  onClick={handleSignInClick}
                >
                  Sign in
                </button>
              </div>
              <div>
                <button
                  className="web-welcome-btn-two"
                  onClick={handleCreateAccountClick}
                >
                  Create an Account
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* TEST SECTION */}
        <div>
          <Button
            bgColor={"#fbcc34"}
            mTop={0}
            mBottom={0}
            mLeft={0}
            mRight={0}
            fWeight={800}
            bRadiusColor="#fbcc34"
            title="Overview of your previous"
            color={"#071d69"}
            onClickButton={() => {
              navigate("/weboverview");
            }}
          />
          <Button
            bgColor={"#fbcc34"}
            mTop={0}
            mBottom={0}
            mLeft={0}
            mRight={0}
            fWeight={800}
            bRadiusColor="#fbcc34"
            title="View Your Projects"
            color={"#071d69"}
            onClickButton={() => {
              navigate("/project");
            }}
          />
          <Button
            bgColor={"#fbcc34"}
            mTop={0}
            mBottom={0}
            mLeft={0}
            mRight={0}
            fWeight={800}
            bRadiusColor="#fbcc34"
            title="View selection"
            color={"#071d69"}
            onClickButton={() => {
              navigate("/webfoarm");
            }}
          />
        </div>
      </main>
    </>
  );
};

export default WebWelcome;
