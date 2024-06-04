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
import { FaArrowRightToBracket } from "react-icons/fa6";
import Testimonials from "../../components/testimonials/Testimonials";
import { DATA } from "../../../utils/constant/Data";
import testimonialbackgroundImage from "../../../images/png/customerfeedback2.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { updateModal } from "../../../redux/slices/AppEntrySlice";

const Contact: React.FunctionComponent = () => {
  // const dispatch = useDispatch();
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const onSuccessTitle = "Our Products";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p> D'roid Website </p>
      <p> Drone Services</p>
      <p> Equipment </p>
    </>
  );
  const onFailedBody =
    "Your login was unsuccessful, kindly try again or contact your Admin!";
  const optionsList = [
    "Subject",
    "Inquiry on Drone Services",
    "Inquiry on Knowledge City",
  ];
  function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
  }

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
                  <div className="flex-contact">
                    {/* PHONE NUMBER */}
                    <div className="call-contact">
                      <span>
                        <LuPhoneCall className="phone-icon" />
                      </span>
                      <a href="tel:+447886386437" className="phone-no">
                        UK: +447886386437
                      </a>
                    </div>
                    {/* Nigeria line */}
                    <div className="call-contact">
                      <span>
                        {/* <LuPhoneCall className="phone-icon" /> */}
                      </span>
                      <a href="tel:+2347068815984" className="phone-no">
                        NIG: +2347068815984
                      </a>
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div className="call-contact">
                    <span>
                      <MdEmail className="phone-icon" />
                    </span>
                    <span>
                      <a
                        href="mailto:hr@droidtechinternational.com"
                        className="phone-no"
                      >
                        hr@droidtechinternational.com
                      </a>
                    </span>
                  </div>
                  {/* ADDRESS */}
                  <div className="address">
                    <div className="call-contact">
                      <span>
                        <FaLocationDot className="phone-icon" />
                      </span>
                      <span>
                        <address>
                          <p className="phone-no">
                            Head Office: Lincoln, England, United Kingdom
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
              {/* INPUT SECTION TWO */}
              <section>
                <section className="name-section-two">
                  {/* INPUT SECTION ONE */}
                  {/* first name */}
                  <div className="input-width">
                    {/* <label style={{ color: Assets.colors.light }}>
                      Fullname
                    </label> */}
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Full Name"
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
                      <AppInput w="100%" h={40} pLeft={10} pHolder="Email" />
                    </div>
                  </div>
                  {/* last name */}
                  <div className="input-width">
                    <label style={{ color: Assets.colors.light }}>
                      Subject
                    </label>
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Phone Number"
                      />
                    </div>
                  </div>
                </section>
                <section className="name-section">
                  {/* Subject */}
                  <div className="input-width">
                    <label style={{ color: Assets.colors.light }}>
                      Subject
                    </label>
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Subject"
                        bagColor="#ffffff"
                        isDropdown={true}
                        options={optionsList}
                        className="subject-feild"
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
                  bgColor="#000000"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  bRadiusColor="#282a94"
                  title="Submit"
                  color="#ffffff"
                  icon={<FaArrowRightToBracket className="icon-style" />}
                  onClickButton={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TESTIMONIALS */}
        <section className="equip-margin-bt">
          <Testimonials
            testbackgroundImage={testimonialbackgroundImage}
            testimonials={DATA.testimonials}
          />
        </section>
        <div className="contact-testimonial">
          <div className="contact-testimonial-btn">
            <Button
              bgColor="#000000"
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              bRadiusColor="#282a94"
              title="Send Testimonials"
              color="#ffffff"
              icon={<FaArrowRightToBracket className="icon-style" />}
              onClickButton={() => {
                dispatch(updateModal(true));
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
