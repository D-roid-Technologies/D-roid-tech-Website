import React from "react";
import "../footer/Footer.css";
import { DATA } from "../../../utils/constant/Data";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";
import { Assets } from "../../../utils/constant/Assets";

const Footer: React.FunctionComponent = () => {
  return (
    <div className="footer-main">
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
          <a href="" target="_blank">
            <FiInstagram className="logo-size" />
          </a>
        </div>
        <div className="youtube-icon ">
          <a href="" target="_blank">
            {" "}
            <IoLogoYoutube className="logo-size" />
          </a>
        </div>
      </div>
      {/* END OF LOGO */}
      <article>
        <h1 className="subscribe"> SUBSCRIBE </h1>
        <p className="connect">
          {" "}
          Sign up to hear from us about specials, sales, and events.{" "}
        </p>
      </article>
      {/* FORM */}
      <form className="newsletter-form">
        {/* onSubmit={handleSubmit} */}
        <input
          className="newsletter-email-input"
          type="email"
          placeholder="Email"
          //   value={email}
          //   onChange={handleChange}
          required
        />
        <button type="submit" className="newsletter-button">
          Sign up
        </button>
      </form>
      {/* END OF FORM */}
      <hr className="rule" />
      {/* LAST FOOTER SECTION */}
      <div className=" footer-buttom">
        <p className="text-center md:text-left ">
          Copyright &copy; 2024 D'roid Technologies International - All Right
          Reserved
        </p>
        <span className="powered">
          Powered by{" "}
          <span
            className="color-change"
            style={{ color: Assets.colors.primary }}
          >
            {" "}
            D'roid Technolgies International
          </span>
        </span>
      </div>
      <p className="policy"> Privacy Policy</p>
    </div>
  );
};

export default Footer;
