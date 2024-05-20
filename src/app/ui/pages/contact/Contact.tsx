import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../contact/Contact.css";
import Button from "../../components/button/Button";
import { Assets } from "../../../utils/constant/Assets";
import AppInput from "../../components/textInput/AppInput";
// import contactBgImage from "../../../images/png/contactbg.jpg";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Contact: React.FunctionComponent = () => {
  // Your divs are not aligned properly
  //Your text are too big and using the wrong format
  // There shold be space between contact us and footer
  return (
    <>
      <main>
        <NavBar />

        <div className="message">
          <h2>Contact Us</h2>
          <p>Any Question or remark? Just write us a message!</p>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="contact-containerr">
          <div className="container-raduis">
            <section className="contact-information">
              <div className="contact-info-details">
                <div>
                  <h1 className="info-details-head"> Contact Information</h1>
                  <p className="info-details-p">
                    Say something to start a live chat
                  </p>
                  {/* PHONE NUMBER */}

                  <div className="call-contact">
                    <span>
                      {" "}
                      <LuPhoneCall className="phone-icon" />
                    </span>
                    <a href="tel:+1234567890" className="phone-no">
                      {" "}
                      +1 (234) 567-890
                    </a>
                  </div>
                  {/* EMAIL */}
                  <div className="call-contact">
                    <span>
                      {" "}
                      <MdEmail className="phone-icon" />
                    </span>
                    <span>
                      <a href="mailto:example@example.com" className="phone-no">
                        {" "}
                        droidtechinternational@gmail.com
                      </a>
                    </span>
                  </div>
                  {/* ADDRESS */}
                  <div className="address">
                    <div className="call-contact">
                      <span>
                        {" "}
                        <FaLocationDot className="phone-icon" />
                      </span>
                      <span>
                        <address>
                          <p className="phone-no">
                            {" "}
                            Lincoln, England, United Kingdom
                          </p>
                        </address>
                      </span>
                    </div>
                  </div>
                  <section className="icon-section">
                    <div>
                      <RiTwitterXFill className="form-icon" />
                    </div>
                    <div>
                      <FaInstagram className="form-icon" />
                    </div>
                    <div>
                      <FaLinkedin className="form-icon" />
                    </div>
                  </section>
                </div>
              </div>
            </section>

            {/* MESSAGE  SECTION */}
            <div className="input-section">
              <section className="name-section">
                {/* first name */}
                <div className="input-width">
                  <label style={{ color: Assets.colors.light }}>
                    First Name
                  </label>
                  <br />
                  <div className="input-container">
                    <AppInput w="100%" h={40} pLeft={10} pHolder="First Name" />
                  </div>
                </div>
                {/* last name */}
                <div className="input-width">
                  <label style={{ color: Assets.colors.light }}>
                    Last Name
                  </label>
                  <br />
                  <div className="input-container">
                    <AppInput w="100%" h={40} pLeft={10} pHolder="Last Name" />
                  </div>
                </div>
              </section>
              {/* INPUT SECTION TWO */}
              <section>
                <section className="name-section-two">
                  {/* INPUT SECTION ONE */}
                  {/* first name */}
                  <div className="input-width">
                    <label style={{ color: Assets.colors.light }}>Email</label>
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="mikedeo@gmail.com"
                      />
                    </div>
                  </div>
                  {/* last name */}
                  <div className="input-width">
                    <label style={{ color: Assets.colors.light }}>
                      Phone Number
                    </label>
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="+23400000000"
                      />
                    </div>
                  </div>
                </section>
              </section>
              {/* MESSAGE AREA */}
              <section className="text-area">
                <div>
                  <label style={{ color: Assets.colors.light }}>Message</label>
                  <br />
                  <textarea
                    rows={10}
                    name="comment"
                    placeholder="Write your message here"
                  />
                </div>
              </section>
              <div className="textarea-btn">
                <Button
                  bgColor="white"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  bRadiusColor="#282a94"
                  title="Submit"
                  color="#282a94"
                  onClickButton={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
