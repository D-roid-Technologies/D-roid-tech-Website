import React from "react";
import feedBackImage from "../../../images/png/feedbackpics.png";
import "../customerfeedback/CustomerFeedBack.css";
import { FaFacebookF } from "react-icons/fa6";
import Button from "../button/Button";
import { Assets } from "../../../utils/constant/Assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";

const CustomerFeedBack: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const appEntry = useSelector((state: RootState) => state.appEntry);

  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const onSuccessTitle = "Our Testimonials";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p> Welcome to on board </p>
    </>
  );
  const onFailedBody =
    "Your login was unsuccessful, kindly try again or contact your Admin!";

  return (
    <div className="customerfeedback-main">
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
            <p className="show">See all our testimonials</p>
            <div className="connect-to">
              {/* This is how to navigate to another page, always se react router navigation */}
              <div className="connect-to-facebook">
                <Button
                  bgColor={"aqua"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="See More Testimonials"
                  color="black"
                  fWeight={800}
                  onClickButton={() => {
                    store.dispatch(updateModal(true));
                    store.dispatch(
                      updateModalContent({
                        appTitle: onSuccessTitle,
                        appBody: onSuccessBody,
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DISCOVER */}
      <div className="heading-container">
        <div className="heading">
          <p className="discover-heading">
            Discover The Power of D'roid Technologies International Software
            Solutions
          </p>
          <div className="discover-section">
            <p className="discover-details">
              At D'roid Technoogies International, we understand that every
              business has unique needs and challenges. That's why we offer a
              wide range of software solutions designed to help you streamline
              your operations, increase efficiency, and drive growth. From
              custom software development to cloud-based applications, our team
              of expertise has the expertise and experience to help you achieve
              your goals. Explore our website to learn more about our offerings
              and how we can help your business succed.
            </p>
          </div>
        </div>
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
              fWeight={800}
              onClickButton={() => {
                navigate("/contact");
              }}
            />
          </div>
        </div>
      </div>
      {/* SECTION FOUR */}
      <div className="section-four">
        {/* <div className="section-four-container">
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
        </div> */}
        {/* CONTACT US SECTION */}
        <div className="cont-main">
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
              <p className="time">
                Open Mondays - Fridays &nbsp;
                <span className="friday"> 8am - 9pm </span>
              </p>
            </p>
            <div className="contact-button">
              <div className="contactus-button-style">
                <Button
                  bgColor={"black"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="Get in Touch"
                  color="white"
                  fWeight={800}
                  onClickButton={() => {
                    navigate("/contact");
                  }}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedBack;
