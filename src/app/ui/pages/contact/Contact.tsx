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

const Contact: React.FunctionComponent = () => {
  // Your divs are not aligned properly
  //Your text are too big and using the wrong format
  // There shold be space between contact us and footer
  return (
    <>
      <main>
        <div
          style={{
            // backgroundImage: `url("${contactBgImage}")`,
          }}
          className="contact-bgimage"
        >
          <NavBar />
          {/* CONTENT */}
          <article className="contact-main">
            <p className="contactheader-details">
              At D'roid Technologies, we value open communication and welcome
              inquiries, feedback, and collaboration opportunities from our
              clients, partners, and stakeholders. Please feel free to reach out
              to us using the contact information provided below.
            </p>
          </article>
        </div>
        {/* SAY HELLO SECTION */}
        {/* <section className="say-hello">
          <article>
            <h1 className="hello-heading">Reach out and say hello </h1>
            <p className="hello-details">
              {" "}
              Get in touch through any of the channels below. We’re eager to
              hear from you!
            </p>
          </article>
          <img
            src="https://avatars.mds.yandex.net/i?id=9b0d958a744f2468fb7ea9c46e5aa47a40142c73-9048286-images-thumbs&n=13"
            alt="customer care img"
            className="hello-image"
          />
        </section> */}
        {/* CONTACT INFORMATION */}
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
            </div>
          </div>
        </section>

        {/* CONTACT US INPUT & MESSAGE  SECTION */}
        <div className="message-section">
          <section>
            <div className="message">
              <h2>Contact Us</h2>
              <p>Any Question or remark? Just write us a message!</p>
            </div>
            {/* FORM INPUT AREA */}
            <div className="input-area">
              <div className="input-section">
                <div className="name-btn">
                  {/* INPUT SECTION ONE */}
                  {/* first name */}
                  <div>
                    <label
                      htmlFor=""
                      style={{
                        color: Assets.colors.light,
                      }}
                    >
                      First Name
                    </label>
                    <br />
                    <div className="input-container">
                      <AppInput w="100%" h={40} pLeft={10} pHolder="" />
                    </div>
                  </div>
                  {/* last name */}
                  <div>
                    <label
                      htmlFor=""
                      style={{
                        color: Assets.colors.light,
                      }}
                    >
                      Last Name
                    </label>
                    <br />
                    <div className="input-container">
                      <AppInput w="100%" h={40} pLeft={10} pHolder="" />
                    </div>
                  </div>
                </div>
                {/* MESSAGE AREA*/}
                <section className="text-area">
                  <div>
                    <label
                      htmlFor=""
                      style={{
                        color: Assets.colors.light,
                      }}
                    >
                      Message
                    </label>
                    <br />
                    <textarea rows={8} cols={60} name="comment" form="usrform">
                      Write your message here...
                    </textarea>
                    <div className="textarea-btn">
                      <Button
                        bgColor={"white"}
                        mTop={0}
                        mBottom={0}
                        mLeft={0}
                        mRight={0}
                        title="Submit"
                        color="#282a94"
                        onClickButton={() => {}}
                      />
                    </div>
                  </div>
                  <div>
                    <img src={Assets.images.contactarealogo} alt="" />
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Contact;
