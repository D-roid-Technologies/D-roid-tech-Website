import React from "react";
import feedBackImage from "../../../images/png/feedbackpics.png";
import "../customerfeedback/CustomerFeedBack.css";
import { FaFacebookF } from "react-icons/fa6";
import Button from "../button/Button";
import { Assets } from "../../../utils/constant/Assets";

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
      {/* CONTACT US BUTTON */}
      <div className="contact-us">
        <div className="contactus-button">
          <Button
            bgColor={"black"}
            mTop={0}
            mBottom={0}
            mLeft={0}
            mRight={0}
            title="Contact us"
            color="white"
            onClickButton={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      {/* SECTION FOUR */}
      <div className="section-four">
        <div className="section-four-container">
          <div className="coding-image">
            <img
              src={Assets.images.tour}
              alt="codingImage"
              className="image-sizes"
            />
          </div>
          <div className="city-walking-tour">
            <h2 className="walking-tour"> City Walking Tour </h2>
            <p className="pounds"> &#163;20.00</p>
            <p className="walking-tour-details">
              {" "}
              A unique walking tour of the city with time to enjoy lunch and
              shoppinng too! <br />
              Maximize your sightseeing with this exceptional tour.
            </p>{" "}
          </div>
        </div>
        {/* CONTACT US SECTION */}
        <div className="">
          <h1 className="heading"> CONTACT US </h1>
          <hr className="rule" />
          <article>
            <h3 className="questions">Questions or Comments? </h3>
            <p className="clients">
              We know that our clients have unique needs. Send us a message, and
              we will get back to you. <br />
            </p>
            <h2 className="droid"> D'roid Technologies International</h2>
            <p className="hours"> Hours</p>
            <p>
              {" "}
              Open today{" "}
              <form action="">
                <input type="text" />
              </form>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedBack;
