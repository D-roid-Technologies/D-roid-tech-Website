import React, { useEffect } from "react";
import "../footer/Footer.css";
import { DATA } from "../../../utils/constant/Data";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import AppInput from "../textInput/AppInput";
import Button from "../button/Button";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import { addUserEmail } from "../../../redux/slices/User";
import {
  updateToast,
  updateToastTitle,
} from "../../../redux/slices/AppEntrySlice";

const Footer: React.FunctionComponent = () => {
  const [emailSubscription, setEmailSubscription] = React.useState<string>("");
  const userState = useSelector((state: RootState) => state.user);
  const userEmail = userState.userEmail;

  console.log("email from user input", emailSubscription);
  console.log("email from email state", userEmail);

  const { getColor } = useThemeColor();

  const sendEmailToReduxStore = () => {
    store.dispatch(addUserEmail(emailSubscription));
  };

  const sendEmailToBackEnd = () => {
    // Use user email to send email to firebase for storage.
  };

  const fetchEmailFromBackEnd = () => {
    // For fetching email from firebase for storage.
  };

  const handleUserEmail = () => {
    sendEmailToReduxStore();
    store.dispatch(updateToastTitle("Thank you for your Subscription!"));
    store.dispatch(updateToast(true));
    setTimeout(() => {
      store.dispatch(updateToast(false));
    }, 5000);
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="footer-main"
      style={{
        backgroundColor: getColor("backgroundColor"),
        border: "1px solid transparent",
      }}
    >
      <div className="">
        <h1 className="heading"> SOCIAL </h1>
        <hr className="rule" />
      </div>
      {/* LOGO */}
      <div className="footer-logo-container">
        <div className="twitter-icon">
          <a href={DATA.socialLinks.twitter} target="_blank">
            <FaXTwitter className="logo-size " />
          </a>
        </div>
        <div className="linkedin-icon">
          <a href={DATA.socialLinks.linkedin} target="_blank">
            <FaLinkedin className="logo-size " />
          </a>
        </div>
        <div className="instagram-icon ">
          <a href={DATA.socialLinks.instagram} target="_blank">
            <FiInstagram className="logo-size" />
          </a>
        </div>
        <div className="whatsapp-icon ">
          <a href={DATA.socialLinks.whatsapp} target="_blank">
            {" "}
            <FaWhatsapp className="logo-size" />
          </a>
        </div>
        <div className="email-icon ">
          <a href={`mailto:${DATA.socialLinks.email}`} target="_blank">
            {" "}
            <MdOutlineEmail className="logo-size" />
          </a>
        </div>
      </div>
      {/* END OF LOGO */}
      <article>
        <h1 className="subscribe"> SUBSCRIBE </h1>
        <p className="connect-subscribe">
          {" "}
          Sign up to hear from us about specials, sales, and events.{" "}
        </p>
      </article>
      {/* FORM SECTION */}
      <div className="footer-form">
        <div className="form-input">
          <AppInput
            w="100%"
            h={40}
            pLeft={10}
            pHolder="Email"
            onchangeText={(e: any) => {
              setEmailSubscription(e.target.value);
            }}
            bRadius={5}
            type="email"
          />
        </div>
        <div className="signup-btn">
          <Button
            title="Subscribe"
            bgColor={getColor("basic")}
            mTop={0}
            mBottom={0}
            mLeft={0}
            mRight={0}
            color={getColor("light")}
            fWeight={600}
            icon={<FaBell className="style-home-icon" />}
            onClickButton={() => {
              handleUserEmail();
            }}
          />
        </div>
      </div>

      {/* END OF FORM */}
      <hr className="rule" />
      {/* LAST FOOTER SECTION */}
      <div className=" footer-buttom">
        <p className="text-center md:text-left ">
          Copyright &copy; 2024 D'roid Technologies International - All Right
          Reserved
        </p>
        <span className="powered">
          Powered by
          <a href="/" className="color-change">
            <span style={{ color: getColor("primary") }}>
              D'roid Technolgies International
            </span>
          </a>
        </span>
      </div>
      <a href="/privacy" className="color-change">
        <p className="policy" style={{ color: getColor("primary") }}>
          Privacy Policy
        </p>
      </a>
    </motion.div>
  );
};

export default Footer;
