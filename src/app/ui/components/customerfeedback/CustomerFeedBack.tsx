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
      {/* DISCOVER */}
      <article className="heading">
        <p className="discover-heading">
          {" "}
          Discover The Power of D'roid Technologies International Software
          Solutions
        </p>
        <div className="discover-section">
          <p className="discover-details">
            {" "}
            At D'roid Technoogies International, we understand that every
            business has unique needs and challenges. <br />
            That's why we offer a wide range of software solutions designed to
            help you streamline your operations, <br />
            increase efficiency, and drive growth. From custom software
            development to cloud-based applications, our <br />
            team of expertise has the expertise and experience to help you
            achieve your goals. Explore our website to learn <br />
            more about our offerings and how we can help your business succed.
          </p>
        </div>
      </article>
    </div>
  );
};

export default CustomerFeedBack;
