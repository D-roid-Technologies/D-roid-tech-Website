import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";

const AboutUs: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <div className="about-main">
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
              D'roid Technologies International was founded in 2005 by a group
              of software developers with passion for creating innovative
              solutions. Over the years, we have grouwn into a leading software
              development company, serving clients in a wide range of
              industries.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
