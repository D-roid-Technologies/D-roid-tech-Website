import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../pages/website/Website.css";
import { Assets } from "../../../utils/constant/Assets";

const Website: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <div className="web-company-logo-container">
          <img
            src={Assets.images.companyLogoNoBg}
            alt=""
            className="web-company-logo"
          />
        </div>
        <section className="main-web-hero-container">
          <div className="web-hero-con">
            <div className="web-top-con">
              <button onClick={() => navigate("/")} className="web-btn-hero">
                <IoChevronBackOutline className="web-back-btn-icon" />
              </button>
            </div>
            {/* create a website in 5mins */}
            <p className="create-web-heading">Create a website in 5mins</p>
            <div className="web-head-container">
              <p className="create-web-sub-heading">What you need to know!</p>
              <p className="creat-web-details">
                In today’s digital world, creating a website is faster and
                easier than ever before. Gone are the days when you needed deep
                technical knowledge to build one. With the right tools and
                platforms you can set up a website in just five minutes. Begin a
                step-by-step guide to help you create your website in a flash.
              </p>
              <p className="create-web-sub-heading">
                How can i create my customized websites here?
              </p>
              <p className="creat-web-details">
                "Creating a website involves several key steps, starting with
                planning your site's purpose and audience. Once you've outlined
                your goals, choose a website builder or coding platform that
                suits your technical skill level. If you're using a builder like
                WordPress, Wix, or Squarespace, you can select from a variety of
                templates and customize them with your content. For those coding
                from scratch, HTML, CSS, and JavaScript will be your foundation.
                Focus on designing a user-friendly layout, incorporating
                responsive design for mobile users, and ensuring easy
                navigation. Don't forget to optimize your site for SEO and
                performance, and finally, publish it with a reliable hosting
                service."
              </p>
            </div>
            <div className="web-con-btn-container">
              <button className="web-con-btn">Continue</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Website;
