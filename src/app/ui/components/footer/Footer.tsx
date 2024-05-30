import React from "react";
import "../footer/Footer.css";
import { DATA } from "../../../utils/constant/Data";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";
import { Assets } from "../../../utils/constant/Assets";
import AppInput from "../textInput/AppInput";
import Button from "../button/Button";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";

const Footer: React.FunctionComponent = () => {
  const { getColor } = useThemeColor();

  return (
    <div
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
          <AppInput w="100%" h={40} pLeft={10} pHolder="Email" />
        </div>
        <div className="signup-btn">
          <Button
            title="Sign up"
            bgColor={getColor("basic")}
            mTop={0}
            mBottom={0}
            mLeft={0}
            mRight={0}
            color={getColor("light")}
            fWeight={600}
            onClickButton={() => {}}
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
              {" "}
              D'roid Technolgies International
            </span>
          </a>
        </span>
      </div>
      <a href="/privacy" className="color-change">
        <p className="policy" style={{ color: getColor("primary") }}>
          {" "}
          Privacy Policy
        </p>
      </a>
    </div>
  );
};

export default Footer;
