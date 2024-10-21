import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./KnowledgeCityDetails.css";
import { Assets } from "../../../utils/constant/Assets";

const KnowledgeCityDetails: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="kn-top-con">
        <button onClick={() => navigate("/products")} className="kn-btn-hero">
          <IoChevronBackOutline className="kn-back-btn-icon" />
        </button>
      </div>
      <div className="kn-container">
        <p className="about-kn">About Knowledge City</p>
        <p className="about-kn-details">
          Knowledge city product is a platform that empowers the learning
          journey of individuals whether for education or professional purposes.
          The platform is designed to deliver an engaging and seamless learning
          experience.
        </p>
        <section>
          <div className="knw-banner-one">
            <img
              src={Assets.images.knowledgeBannerImage}
              alt="banner"
              className="kn-banner"
            />
          </div>
          <div className="knw-banner-one">
            <img
              src={Assets.images.knowledgeBannerTwo}
              alt="banner"
              className="kn-banner"
            />
          </div>
          <div className="knw-banner-one">
            <img
              src={Assets.images.knwledgeMentorImage}
              alt="banner"
              className="kn-banner"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default KnowledgeCityDetails;
