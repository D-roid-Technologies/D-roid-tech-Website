import React from "react";
import "../sections/Section.css";
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
      <span className="gap-space"></span>
      {/* ARTICLE */}
      <h3 className="discover">
        {" "}
        Discover the Power of D'roid Technologies International Software
        Solutions
      </h3>
      <article className="deliverable">
        <p className="discover-details">
          At D'roid Technologies International, we understand that every
          business has unique needs and challenges <br /> that's why we offer a
          wide range of software solutions designed to help you streamline your
          operations, <br />
          increase efficency, and drive growth. From custom software development
          to cloud-based applications, our <br />
          team of expertise has the expertise and experience to help you achieve
          your goals. Explore our website to learn <br /> more about our
          offerings and how we can help your business succeed.
        </p>
      </article>
    </div>
  );
};

export default Section;
