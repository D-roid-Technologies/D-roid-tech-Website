// @ts-nocheck

import React, { useState } from "react";
import "../contact/Contact.css";
import Button from "../../components/button/Button";
import { Assets } from "../../../utils/constant/Assets";
import AppInput from "../../components/textInput/AppInput";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Testimonials from "../../components/testimonials/Testimonials";
import { DATA } from "../../../utils/constant/Data";
import {
  updateModal,
  updateToast,
  updateToastTitle,
} from "../../../redux/slices/AppEntrySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import {
  addTestimonial,
} from "../../../redux/slices/TestimonialSlice";
import { IoBagAdd } from "react-icons/io5";
import { ImBoxAdd } from "react-icons/im";
import Captcha from "../../components/captcha/Captcha";
import { useNavigate } from "react-router-dom";
import ContactSection from "./ContactSection/ContactSection";
import FAQSection from "./ContactSection/FAQSection";


const Contact: React.FunctionComponent = () => {

  // NEW TESTIMONIAL
  const [nameCon, setNameCon] = React.useState<string>("");
  const [companyCon, setCompanyCon] = React.useState<string>("");
  const [positionCon, setPositionCon] = React.useState<string>("");
  const [serviceCon, setServiceCon] = React.useState<string>("");
  const [messageCon, setMessageCon] = React.useState<string>("");

  const navigate = useNavigate();

  //TESIMONIAL FORM SECTION
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  //CONTACT FOARM
  const contactDetails = useSelector((state: RootState) => state.contact);
  const dispatch = useDispatch();

  // NEW TESTIMONIAL
  const testimonialDetails = useSelector(
    (state: RootState) => state.testimonial
  );

  //CONTACT FOARM
  const sendContactDataToReduxStore = () => {
    setFullNameData("");
    setEmailData("");
    setPhoneNumberData("");
    setSubjectData("");
    setMessageData("");
  };
  const handleUserEmail = () => {
    sendContactDataToReduxStore();
    showToast("Your message has been sent!");
  };

  const sendTestimonialConToReduxStore = () => {
    const newTestimonial = {
      name: nameCon,
      comapanyName: companyCon,
      position: positionCon,
      serviceType: serviceCon,
      message: messageCon,
    };
    dispatch(addTestimonial(newTestimonial));
    showToast("Your testimonial has been added!");
  };

  const handleNewTestimonial = () => {
    sendTestimonialConToReduxStore();

    setNameCon("");
    setCompanyCon("");
    setPositionCon("");
    setServiceCon("");
    setMessageCon("");
  };

  // TOAST SECTION
  const showToast = (message: string) => {
    dispatch(updateToastTitle(message));
    dispatch(updateToast(true));
    setTimeout(() => {
      dispatch(updateToast(false));
    }, 5000);
  };
  const optionsList = [
    "Subject",
    "Inquiry on Drone Services",
    "Inquiry on Knowledge City",
  ];
  const serviceList = [
    "Service Type",
    "Software Development",
    "Animation Creation",
    "Tech training",
    "Drone Services",
    "Equipment set up",
  ];
  const closeModal = () => {
    dispatch(updateModal(false));
  };

  return (
    <>
      <div className="software-main">
        <div className="software-main-content">
          <div style={{ margin: "1rem 0" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 16px",
                backgroundColor: "blue",
                border: "1px solid #000000",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              ← Back
            </button>
          </div>
          <h1 className="software-header">Contact Us</h1>
          <p>
            Any Question or remark? Just write us a message!
          </p>
        </div>
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
                  {/* <div className="call-contact">
                    <span>
                      <LuPhoneCall className="phone-icon" />
                    </span>
                    <a href="tel:+2347068815984" className="phone-no">
                      NIG: +234 8133992410
                    </a>
                  </div> */}
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
                      {/* hr@droidtechinternational.com */}
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
                          Office: Warri, Delta State, Nigeria.
                        </p>
                      </address>
                    </span>
                  </div>
                </div>
                <section className="icon-section">
                  {/* <a href={DATA.socialLinks.twitter} target="_blank">
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
          <div style={{
            // backgroundColor: "red",
            width: "50%",
            overflow: "scroll"
          }}>
            <ContactSection />
          </div>
        </div>
      </div>
      {/* TESTIMONIALS */}
      {!showForm && (
        <>
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
                fWeight={700}
                bRadiusColor="#282a94"
                title="Add Testimonials"
                color="#ffffff"
                icon={<ImBoxAdd className="icon-style" />}
                onClickButton={() => {
                  handleButtonClick();
                }}
              />
            </div>
          </div>
        </>
      )}
      {/* new testimonial form */}
      {showForm && (
        <form className="testimonial-form">
          <p className="add-testimonial">Write a New Testimonial</p>
          <div className="form-group">
            <AppInput
              w="100%"
              h={40}
              pLeft={10}
              pHolder="Name"
              onchangeText={(e: any) => {
                setNameCon(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <AppInput
              w="100%"
              h={40}
              pLeft={10}
              pHolder="Comapny Name"
              onchangeText={(e: any) => {
                setCompanyCon(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <AppInput
              w="100%"
              h={40}
              pLeft={10}
              pHolder="Position"
              onchangeText={(e: any) => {
                setPositionCon(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <AppInput
              w="100%"
              h={40}
              pLeft={10}
              pHolder="Service Type"
              isDropdown={true}
              options={serviceList}
              onchangeText={(e: any) => {
                setServiceCon(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <textarea
              rows={10}
              name="comment"
              placeholder="Write your testimonial here"
              onChange={(e: any) => {
                setMessageCon(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <Button
              bgColor="#000000"
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              fWeight={700}
              bRadiusColor="#282a94"
              title="Add new testimoial"
              color="#ffffff"
              icon={<IoBagAdd className="icon-style" />}
              onClickButton={() => {
                handleNewTestimonial();
              }}
            />
          </div>

        </form>
      )}
      <FAQSection />
    </>
  );
};

export default Contact;
