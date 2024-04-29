import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../contact/Contact.css";
import Button from "../../components/button/Button";
import { Assets } from "../../../utils/constant/Assets";
import AppInput from "../../components/textInput/AppInput";

const Contact: React.FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <div className="contact-main">
        {/* CONTACT HEADING */}
        <div className="contactpage-container">
          <div className="contact-page">
            <h1>Got an Idea?</h1>
            <h2>
              Reach to us, <br /> Let us implement your success.
            </h2>
            {/* BUTTON */}
            <div className="contactpage-button">
              <div>
                <Button
                  bgColor={"aqua"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="Contact us"
                  color="black"
                  fWeight={800}
                  onClickButton={() => {}}
                />
              </div>
            </div>
          </div>
          {/* IMAGE */}
          <div className="customer-care">
            <img
              src="https://avatars.mds.yandex.net/i?id=91dabd6801c1c25cbf286348a6ad0c5272dccfeb-12585680-images-thumbs&n=13"
              alt="codingImage"
              className="image-s"
            />
          </div>
        </div>
      </div>
      {/* SPEAK WITH OUR TEAM */}
      <div className="speak-main">
        <div className="speak-container">
          <div className="speak-page">
            <h3>
              Speak with our team. Find out <br /> what we can do for you.
            </h3>
            <p>
              Contact us now. We are active 24/7 and ready to answer <br /> your
              questions and provide a free consultation.
            </p>
            {/* BUTTON */}
            {/* <div className="speakwith-buttons">
              <div>
                <Button
                  bgColor={"black"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  title="Speak with a customer care"
                  color="white"
                  fWeight={500}
                  onClickButton={() => {}}
                />
              </div>
            </div> */}
          </div>
          {/* IMAGE */}
          <div className="customer-care">
            <img
              src="https://avatars.mds.yandex.net/i?id=93dd981b169f061b1a74d3942988eb00-5676887-images-thumbs&ref=rim&n=33&w=350&h=250"
              alt="codingImage"
              className="speak-image"
            />
          </div>
        </div>
      </div>
      {/* MESSAGE SECTION */}
      <section>
        <div className="message">
          <h2>Contact Us</h2>
          <p>Any Question or remark? Just write us a message!</p>
        </div>
        {/* input section */}
        <div className="input-area">
          <div className="input-section">
            <div className="input-section-child">
              <div className="name-cta">
                {/* INPUT SECTION ONE */}
                {/* first name */}
                <div>
                  <label
                    htmlFor=""
                    style={{
                      color: Assets.colors.light,
                    }}
                  >
                    {" "}
                    First Name
                  </label>{" "}
                  <br />
                  <div className="input-cta">
                    <AppInput w="200%" h={40} pLeft={10} pHolder="" />
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
                    {" "}
                    Last Name
                  </label>{" "}
                  <br />
                  <div className="input-cta">
                    <AppInput w="200%" h={40} pLeft={10} pHolder="" />
                  </div>
                </div>
              </div>
              {/* section two */}

              <section className="text-area">
                <div>
                  <textarea rows="8" cols="60" name="comment" form="usrform">
                    Write your message here...
                  </textarea>
                  <div className="textarea-cta">
                    <Button
                      bgColor={"white"}
                      mTop={0}
                      mBottom={0}
                      mLeft={0}
                      mRight={0}
                      title="Submit"
                      color="#282a94"
                      onClickButton={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </div>
                </div>

                <div>
                  <img
                    src="https://avatars.mds.yandex.net/i?id=8d16e36a37486fd11212f7800b4a4932a70a0acb-8496986-images-thumbs&n=13"
                    alt=""
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
