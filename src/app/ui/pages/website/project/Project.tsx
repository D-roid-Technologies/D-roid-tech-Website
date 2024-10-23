import React from "react";
import { Assets } from "../../../../utils/constant/Assets";
import "../project/Project.css";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import Button from "../../../components/button/Button";
import { FaDownload } from "react-icons/fa";

const websites = [
  {
    title: "Website One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: Assets.images.projectImageOne, // Replace with actual image URL
  },
  {
    title: "Website Two",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: Assets.images.projectImageTwo, // Replace with actual image URL
  },
  {
    title: "Website Three",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: Assets.images.projectImageThree, // Replace with actual image URL
  },
];

const Project = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="project-company-logo-container">
        <img
          src={Assets.images.companyLogoNoBg}
          alt=""
          className="project-company-logo"
        />
      </div>
      <section className="project-web-hero-container">
        <div className="project-hero-con">
          <div className="project-top-con">
            <button onClick={() => navigate("/")} className="project-btn-hero">
              <IoChevronBackOutline className="project-back-btn-icon" />
            </button>
          </div>
          <div className="web-project-container">
            <h2 className="web-project-heading">Your Projects</h2>
            <button className="web-project-btn">See all</button>
          </div>

          <p className="web-project-details">
            We understand that every project is unique. Whether you’re a
            start-up looking to make a bold entrance or an established business
            seeking a fresh digital experience, we tailor our approach to your
            specific needs.
          </p>
          <div className="project-container">
            {websites.map((site, index) => (
              <div className="project-card" key={index}>
                <img
                  src={site.image}
                  alt={site.title}
                  className="project-card-image"
                />
                <h3>{site.title}</h3>
                <p>{site.description}</p>
                <div className="project-div-btn-cont">
                  <div className="project-div-btn">
                    <Button
                      bgColor={"#ffb703"}
                      mTop={0}
                      mBottom={0}
                      mLeft={0}
                      mRight={0}
                      title="Download"
                      color="#071d6a"
                      fWeight={800}
                      bRadius={5}
                      bRadiusColor={Assets.colors.substitute}
                      icon={<FaDownload className="icon-styles" />}
                      onClickButton={() => {
                        navigate("");
                      }}
                    />
                  </div>
                </div>
                {/* <button className="project-download-btn">Download</button> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
