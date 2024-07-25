import React from "react";
import feedBackImage from "../../../images/png/feedbackpics.png";
import "../customerfeedback/CustomerFeedBack.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import Button from "../../../components/button/Button";
import { Assets } from "../../../../utils/constant/Assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../../redux/slices/AppEntrySlice";
import { DATA } from "../../../../utils/constant/Data";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/constant/Variants";
import { TESTIMONIALS } from "../../../../utils/constant/Testimonial";

const CustomerFeedBack: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const { getColor } = useThemeColor();

  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const onSuccessTitle = "Our Testimonials";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p> Welcome on board </p>
    </>
  );
  const onFailedBody =
    "Your login was unsuccessful, kindly try again or contact your Admin!";

  const firstIndexOfTestimonial = TESTIMONIALS[0];

  // console.log(firstIndexOfTestimonial);

  return (
    <div className="customerfeedback-main">
      <div className="customer-testimonials">
        <div>
          <h2 className="read">READ WHAT OUR CUSTOMERS HAVE TO SAY!</h2>
          <div>
            <div className="testiminial-details">
              <p>{firstIndexOfTestimonial.body}</p>
              <p className="testifier">
                {`- ${firstIndexOfTestimonial.author}, ${firstIndexOfTestimonial.position}, ${firstIndexOfTestimonial.company}`}
              </p>
            </div>
          </div>

          <div className="contact-uss">
            <div className="contactuss-button">
              <Button
                bgColor={getColor("basic")}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="See more testimonials"
                color={getColor("light")}
                fWeight={800}
                bRadius={5}
                icon={<FaBookReader className="style-home-icon" />}
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
                <span className="friday"> 8am - 5pm </span>
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
                  icon={<IoMailUnread className="style-home-icon" />}
                  onClickButton={() => {
                    window.location.href =
                      "mailto:hr@droidtechinternational.com";
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
                  icon={<IoLogoWhatsapp className="icon-styles" />}
                  onClickButton={() => {
                    window.location.href = DATA.socialLinks.whatsapp;
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
