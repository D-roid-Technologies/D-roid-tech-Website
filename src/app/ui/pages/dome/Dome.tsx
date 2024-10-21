import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../dome/Dome.css";
import { Assets } from "../../../utils/constant/Assets";

const Dome: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="kn-top-con">
        <button onClick={() => navigate("/products")} className="kn-btn-hero">
          <IoChevronBackOutline className="kn-back-btn-icon" />
        </button>
      </div>
      <div className="kn-container">
        <p className="about-kn">About Dome</p>
        <p className="about-kn-details">
          Dome is a comprehensive platform aimed at simplifying domestic tasks
          for users by providing seamless purposes such as food delivery,
          cleaning, driving, laundry, culinary services and grocery shopping.
        </p>
        <section>
          <div className="knw-banner-one">
            <img
              src={Assets.images.domeImage}
              alt="banner"
              className="kn-banner"
            />
          </div>
          <div className="knw-banner-one">
            <img
              src={Assets.images.domeBannerTwo}
              alt="banner"
              className="kn-banner"
            />
          </div>
          <div className="knw-banner-one">
            <img
              src={Assets.images.domeBannerThree}
              alt="banner"
              className="kn-banner"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Dome;
