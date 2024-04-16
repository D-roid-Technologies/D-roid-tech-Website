import React from "react";
import "./AboutSection.css";
import { Assets } from "../../../utils/constant/Assets";

const Section: React.FunctionComponent = () => {
  return (
    <div className="section-main">
      <h1 className="head"> ABOUT D'ROID TECHNOLOGIES INTERNATIONAL </h1>
      <hr className="rule" />
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
            software <br /> developers with passion for creating innovative
            solutions. Over the years, we <br /> have grouwn into a leading
            software development company, serving clients in a <br /> wide range
            of industries.
          </p>{" "}
        </div>
      </div>
      {/* SECTION TWO */}
      <div className="section-one">
        <div className="history">
          <p className="our-history"> Our Approach</p>
          <p className="histoy-details">
            {" "}
            At D'roid Technologies International, we take a collaborative
            approach to <br /> software development. We work closely with our
            clients to gain a deep <br /> understanding of the business needs
            and goals, and we use that knowledge to <br /> develope tailored
            solutions that meet their unique requirements.
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
      <div className="section-one">
        <div className="coding-image">
          <img
            src={Assets.images.ourServices}
            alt="codingImage"
            className="image-size"
          />
        </div>
        <div className="history">
          <p className="our-history"> Our Services</p>
          <p className="histoy-details">
            {" "}
            We offer a wide range of software development services, including
            web <br /> development, mobile app development, and custom software
            development. we <br /> use the latest technologies and tools to
            ensure that our clients recieve cutting-
            <br /> edge solutions that drive their business forward.
          </p>{" "}
        </div>
      </div>
      <span className="gap"></span>
    </div>
  );
};

export default Section;
