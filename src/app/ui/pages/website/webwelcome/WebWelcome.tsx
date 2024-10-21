import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./WebWelcome.css";
// import "../../pages/website/webwelcome/WebWelcome.css";
import { Assets } from "../../../../utils/constant/Assets";

const WebWelcome: React.FunctionComponent = () => {
  const navigate = useNavigate();
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
                <button className="web-welcome-btn-one">Sign in</button>
              </div>
              <div>
                <button className="web-welcome-btn-two">
                  Create an Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default WebWelcome;
