import React from "react";
import feedBackImage from "../../../images/png/feedbackpics.png";
import "../customerfeedback/CustomerFeedBack.css";
import { FaFacebookF } from "react-icons/fa6";
import Button from "../../../components/button/Button";
import { Assets } from "../../../../utils/constant/Assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../../redux/slices/AppEntrySlice";

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
      <div className="customer-testimonials">
        <div>
          {/* CONTENT */}

          <h2 className="read">READ WHAT OUR CUSTOMERS HAVE TO SAY!</h2>
          <div className="testiminial-details">
            <p>
              "I have had the pleasure of working with D'roid Technologies on
              several projects, and I can confidently say that their expertise
              and dedication are unmatched. From the initial consultation to the
              final delivery, their team demonstrated a deep understanding of
              our needs and provided innovative solutions that exceeded our
              expectations. The software they developed for us is robust,
              user-friendly, and has significantly improved our operational
              efficiency. Their commitment to quality and customer satisfaction
              is evident in every interaction. I highly recommend D'roid
              Technologies to any organization looking for top-tier technology
              solutions."
            </p>
            <p className="testifier">
              — Mark Ettan, Founder, LEADPAC Foundation
            </p>
          </div>
          <div className="contact-uss">
            <div className="contactuss-button">
              <Button
                bgColor={"black"}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="See more testimonials"
                color="white"
                fWeight={800}
                bRadius={5}
                onClickButton={() => {
                  navigate("/contact");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* SECTION FOUR */}
      <div className="section-four">
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
            <div className="contact-buttons">
              <div className="contactus-button-style">
                <Button
                  bgColor={"black"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="Send us an Email"
                  color="white"
                  fWeight={800}
                  bRadius={5}
                  onClickButton={() => {
                    // trigger an email action
                    // navigate("/contact");
                  }}
                />
              </div>
              <div className="contactus-button-styles">
                <Button
                  bgColor={"#ffffff"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="WhatsApp Chat"
                  color="#000000"
                  fWeight={800}
                  bRadius={5}
                  bRadiusColor="#000000"
                  onClickButton={() => {
                    // trigger a whatsapp chat action
                    // navigate("/contact");
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