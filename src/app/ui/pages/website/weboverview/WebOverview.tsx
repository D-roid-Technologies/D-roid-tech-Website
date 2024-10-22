import React from "react";
import { Assets } from "../../../../utils/constant/Assets";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../weboverview/WebOverview.css";
import Button from "../../../components/button/Button";
import { FaClipboardCheck } from "react-icons/fa";
import { LuListRestart } from "react-icons/lu";

const WebOverview: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="overview-company-logo-container">
        <img
          src={Assets.images.companyLogoNoBg}
          alt=""
          className="overview-company-logo"
        />
      </div>
      <section className="overview-web-hero-container">
        <div className="overview-hero-con">
          <div className="overview-top-con">
            <button onClick={() => navigate("/")} className="overview-btn-hero">
              <IoChevronBackOutline className="overview-back-btn-icon" />
            </button>
          </div>

          {/* SECTION TWO */}
          <section className="web-overview-banner">
            <div>
              <h2 className="overview-heading">
                Overview of your previous website projects
              </h2>
              <p className="overview-heading-details">
                Start a new website, or continue editing existing projects.
              </p>
              <div className="over-btn-container">
                <div className="overview-div-btn">
                  <Button
                    bgColor={Assets.colors.substitute}
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    title="Check all Projects"
                    color="black"
                    fWeight={800}
                    bRadius={5}
                    bRadiusColor={Assets.colors.substitute}
                    icon={<FaClipboardCheck className="icon-styles" />}
                    onClickButton={() => {
                      navigate("/");
                    }}
                  />
                </div>
                <div className="overview-div-btn">
                  <Button
                    bgColor={"#071D6A"}
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    title="Start a new Website"
                    color="#ffffff"
                    fWeight={800}
                    bRadius={5}
                    bRadiusColor={"#071D6A"}
                    icon={
                      <LuListRestart
                        style={{ color: "#ffffff" }}
                        className="icon-styles"
                      />
                    }
                    onClickButton={() => {
                      navigate("/");
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <img
                src={Assets.images.webOverviewBanner}
                alt="banner"
                className="overview-img"
              />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default WebOverview;
