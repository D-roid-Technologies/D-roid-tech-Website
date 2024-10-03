import React, { useState } from "react";
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
import { FaPlus } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Testimonials from "../../components/testimonials/Testimonials";
import { DATA } from "../../../utils/constant/Data";
import testimonialbackgroundImage from "../../../images/png/customerfeedback2.jpg";
import {
  updateModal,
  updateModalContent,
  updateToast,
  updateToastTitle,
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
import {
  addName,
  addComapanyName,
  addPosition,
  addServiceType,
  addMessage,
  addTestimonial, // Import addTestimonial here
} from "../../../redux/slices/TestimonialSlice";
import { IoBagAdd } from "react-icons/io5";
import { ImBoxAdd } from "react-icons/im";
import Captcha from "../../components/captcha/Captcha";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I request for a service on this platform?",
    answer: "You can request a service by...",
  },
  {
    question: "What is D’roid technologies, and what does it do?",
    answer: "D'roid Technologies is a...",
  },
  {
    question: "What are your hours of operation?",
    answer: "Our operation hours are from...",
  },
  {
    question: "What services do you offer?",
    answer: "We offer a variety of services including...",
  },
  {
    question: "How can I book for a special appointment?",
    answer: "To book a special appointment...",
  },
  {
    question: "Can I develop my business website?",
    answer: "Yes, we offer custom website development...",
  },
  {
    question: "How long does it take for my request to be delivered?",
    answer: "The delivery time depends on...",
  },
  {
    question: "How can I be updated on your services?",
    answer: "You can stay updated by subscribing to...",
  },
  {
    question: "Am I totally guaranteed for the best of your services?",
    answer: "Yes, we guarantee the best quality services...",
  },
  {
    question: "How do I access my website after being created?",
    answer: "Once your website is created, you will receive...",
  },
];

const Contact: React.FunctionComponent = () => {
  //CONTACT FOARM
  const [fullNameData, setFullNameData] = React.useState<string>("");
  const [emailData, setEmailData] = React.useState<string>("");
  const [phoneNumberData, setPhoneNumberData] = React.useState<string>("");
  const [subjectData, setSubjectData] = React.useState<string>("");
  const [messageData, setMessageData] = React.useState<string>("");

  // NEW TESTIMONIAL
  const [nameCon, setNameCon] = React.useState<string>("");
  const [companyCon, setCompanyCon] = React.useState<string>("");
  const [positionCon, setPositionCon] = React.useState<string>("");
  const [serviceCon, setServiceCon] = React.useState<string>("");
  const [messageCon, setMessageCon] = React.useState<string>("");

  //TESIMONIAL FORM SECTION
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  // START OF FAQ
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // END OF FAQ

  //CONTACT FOARM
  const contactDetails = useSelector((state: RootState) => state.contact);
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

  // NEW TESTIMONIAL
  const testimonialDetails = useSelector(
    (state: RootState) => state.testimonial
  );
  const Name = testimonialDetails.name;
  const Company = testimonialDetails.comapanyName;
  const position = testimonialDetails.position;
  const serviceType = testimonialDetails.serviceType;
  const message = testimonialDetails.message;

  //CONTACT FOARM
  const sendContactDataToReduxStore = () => {
    // store.dispatch(addUserFullName(fullNameData));
    // store.dispatch(addUserPhoneNumber(phoneNumberData));
    // store.dispatch(addUserSubject(subjectData));
    // store.dispatch(addUserMessage(messageData));
    // store.dispatch(addUserContactEmail(emailData));
    // Clear input fields after submission
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

  // NEW TESTIMONIAL
  // const sendTestimonialConToReduxStore = () => {
  //   store.dispatch(addName(nameCon));
  //   store.dispatch(addComapanyName(companyCon));
  //   store.dispatch(addPosition(positionCon));
  //   store.dispatch(addServiceType(serviceType));
  //   store.dispatch(addMessage(messageCon));
  // };
  // const handleNewTestimonial = () => {
  //   sendTestimonialConToReduxStore();
  //   showToast("Your testimonial has been added!");
  // };
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
  console.log(
    "Name",
    nameCon,
    "Company Name",
    companyCon,
    "Position",
    positionCon,
    "Service Type",
    serviceCon,
    "Message",
    messageCon
  );

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
                        bRadius={5}
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
                        bRadius={5}
                        pHolder="Email"
                        onchangeText={(e: any) => {
                          setEmailData(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {/* PHONE NUMBER */}
                  {/* <div className="input-width">
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
                  </div> */}
                </section>
                {/* Phone number */}
                <div className="input-width">
                  <br />
                  <div className="input-container">
                    <AppInput
                      w="50%"
                      h={40}
                      pLeft={10}
                      bRadius={5}
                      pHolder="Phone Number"
                      onchangeText={(e: any) => {
                        setPhoneNumberData(e.target.value);
                      }}
                    />
                  </div>
                </div>
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
                        bRadius={5}
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
                  <label style={{ color: Assets.colors.light }}></label>
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
                  bgColor="#FFB100"
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  mRight={0}
                  bRadiusColor="#FFB100"
                  title="Submit"
                  color="#071d69"
                  icon={
                    <FaArrowRightToBracket
                      style={{ color: "#071d69" }}
                      className="icon-style"
                    />
                  }
                  onClickButton={() => {
                    handleUserEmail();
                  }}
                />
              </div>
              <div>
                <Captcha />
              </div>
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
        <div className="faq-container">
          <h1>FAQs</h1>
          <ul className="faq-list">
            {faqData.map((faq, index) => (
              <li key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {index + 1}. {faq.question}
                </button>
                <div
                  className={`faq-answer ${
                    activeIndex === index ? "open" : ""
                  }`}
                >
                  {faq.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Contact;
