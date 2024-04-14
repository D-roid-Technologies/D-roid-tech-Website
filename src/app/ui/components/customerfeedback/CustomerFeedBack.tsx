import React from "react";
import feedBackImage from "../../../images/png/feedbackpics.png";
import "../customerfeedback/CustomerFeedBack.css";
import { FaFacebookF } from "react-icons/fa6";

const CustomerFeedBack: React.FunctionComponent = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${feedBackImage}")`,
        }}
        className="feedback-bg-image"
      >
        {/* CONTENT */}
        <h2 className="read">READ WHAT OUR CUSTOMERS HAVE TO SAY!</h2>
        <div className="read-content">
          <div className="read-details">
            <div className="facebook">
              <a href="" target="_blank" className="facebook-icon">
                <FaFacebookF className="logo-size " />
              </a>
            </div>
            <p className="show">
              To show reviews on your site, connect your account to Facebook
            </p>
            <div className="connect-to">
              <button className="connect-to-facebook">
                Connect to Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedBack;
