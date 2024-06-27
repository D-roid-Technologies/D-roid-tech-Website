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
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import {
  addUserFullName,
  addUserPhoneNumber,
  addUserSubject,
  addUserMessage,
  addUserContactEmail,
} from "../../../redux/slices/ContactSlice";

const Contact: React.FunctionComponent = () => {
  // const [emailSubscription, setEmailSubscription] = React.useState<string>("");
  const [fullNameData, setFullNameData] = React.useState<string>("");
  const [emailData, setEmailData] = React.useState<string>("");
  const [phoneNumberData, setPhoneNumberData] = React.useState<string>("");
  const [subjectData, setSubjectData] = React.useState<string>("");
  const [messageData, setMessageData] = React.useState<string>("");

  const contactDetails = useSelector((state: RootState) => state.contact);
  // const userEmail = userState.userEmail;
  const userFullName = contactDetails.userFullName;
  const userEmail = contactDetails.userEmail;
  const userPhoneNumber = contactDetails.userPhoneNumber;
  const userSubject = contactDetails.userSubject;
  const userMessage = contactDetails.userMessage;

  console.log(
    "full name",
    fullNameData,
    "Email",
    emailData,
    "Phone number",
    phoneNumberData,
    "Subject",
    subjectData,
    "message",
    messageData
  );
  const dispatch = useDispatch();

  const sendContactDataToReduxStore = () => {
    store.dispatch(addUserFullName(fullNameData));
    store.dispatch(addUserPhoneNumber(phoneNumberData));
    store.dispatch(addUserSubject(subjectData));
    store.dispatch(addUserMessage(messageData));
    store.dispatch(addUserContactEmail(emailData));
  };

  const handleUserEmail = () => {
    sendContactDataToReduxStore();
  };

  // const appEntry = useSelector((state: RootState) => state.appEntry);

  const optionsList = [
    "Subject",
    "Inquiry on Drone Services",
    "Inquiry on Knowledge City",
  ];
  const closeModal = () => {
    dispatch(updateModal(false));
  };

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
                    {/* <a href={DATA.socialLinks.twitter} target="_blank">
            <FaXTwitter className="logo-size " />
          </a> */}
                    <div>
                      <a href={DATA.socialLinks.twitter} target="_blank">
                        <RiTwitterXFill className="form-icon" />
                      </a>
                    </div>
                    <div>
                      <a href={DATA.socialLinks.instagram} target="_blank">
                        <FaInstagram className="form-icon" />
                      </a>
                    </div>
                    <div>
                      <a href={DATA.socialLinks.linkedin} target="_blank">
                        <FaLinkedin className="form-icon" />
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </section>

            {/* MESSAGE  SECTION */}
            <div className="input-section">
              <section>
                <section className="name-section-two">
                  {/* FULL NAME */}
                  <div className="input-width">
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Full Name"
                        onchangeText={(e: any) => {
                          setFullNameData(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div className="input-width">
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Email"
                        onchangeText={(e: any) => {
                          setEmailData(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {/* PHONE NUMBER */}
                  <div className="input-width">
                    <br />
                    <div className="input-container">
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Phone Number"
                        onchangeText={(e: any) => {
                          setPhoneNumberData(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </section>
                <section className="name-section">
                  {/* SUBJECT */}
                  <div className="input-width">
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
                        onchangeText={(e: any) => {
                          setSubjectData(e.target.value);
                        }}
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
                    onChange={(e: any) => {
                      setMessageData(e.target.value);
                    }}
                  />
                </div>
              </section>
              {/* SUBMIT BUTTON */}
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
                  onClickButton={() => {
                    handleUserEmail();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TESTIMONIALS */}
        <section className="equip-margin-bt">
          <Testimonials />
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
              title="Add Testimonials"
              color="#ffffff"
              icon={<FaArrowRightToBracket className="icon-style" />}
              onClickButton={() => {
                dispatch(
                  updateModalContent({
                    appTitle: "Create New Testimonial",
                    appBody: (
                      <AppInput
                        w="100%"
                        h={40}
                        pLeft={10}
                        pHolder="Full Name"
                      />
                    ),
                  })
                );
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

{
  /* <form className="testimonial-form">
  <div className="form-group">
    <AppInput w="100%" h={40} pLeft={10} pHolder="Full Name" />
  </div>
  <div className="form-group">
    <AppInput w="100%" h={40} pLeft={10} pHolder="Address" />
  </div>
  <div className="form-group">
    <textarea rows={10} name="comment" placeholder="Write your message here" />
  </div>
  <div className="form-group">
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
</form>; */
}
