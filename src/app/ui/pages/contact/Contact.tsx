//@ts-nocheck

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../contact/Contact.css";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { DATA } from "../../../utils/constant/Data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Testimonial from "../testimonial/Testimonial";
import Navbar from "../../components/navbar/NavBar";
import ContactForm from "../../components/contact/ContactForm";

const Contact: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#faq") {
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const navigate = useNavigate();

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  // Form states

  const [testimonialData, setTestimonialData] = useState({
    name: "",
    company: "",
    position: "",
    service: "",
    message: "",
  });

  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form handlers

  const handleTestimonialChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTestimonialData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Testimonial Form Submitted:>>>>>>>>>>>>", testimonialData);
    toast.success("Thank you for your testimonial!");
    setTestimonialData({
      name: "",
      company: "",
      position: "",
      service: "",
      message: "",
    });
    setShowTestimonialForm(false);
  };

  // FAQ data
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer Software Development, Tech Training, Animation Creation, and Consultancy.",
    },
    {
      question: "How can I get a quote for my project?",
      answer:
        "Please fill out our contact form with details about your project, and we'll get back to you within 24 hours with a quote.",
    },
    {
      question: "Do you offer support after project completion?",
      answer:
        "Yes, we provide 1 months of free support for all our projects, with optional extended support packages available.",
    },
    {
      question: "What are your working hours?",
      answer:
        "Our office is open Monday to Friday from 9am to 5pm WAT. We respond to emails and messages during these times.",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <div style={{ margin: "1rem 0" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#071D6A",
                  color: "#fff",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </div>
            <h1 className="software-header">Get in touch</h1>
            <p>
              Have questions or want to discuss a project? We'd love to hear
              from you
            </p>
          </div>
        </div>
      </div>
      <div className="contact-container">
        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info-card">
            {/* <h2>Contact Information</h2> */}
            {/* <p>
              Fill out the form or reach out directly through these channels:
            </p> */}

            <div className="contact-method">
              <MdEmail className="contact-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:team@droidtechhq.com">team@droidtechhq.com</a>
              </div>
            </div>

            <div className="contact-method">
              <MdPhone className="contact-icon" />
              <div>
                <h4>Phone</h4>
                <a href="tel:+2349165275635">+234 916 527 5635</a>
              </div>
            </div>

            <div className="contact-method">
              <MdLocationOn className="contact-icon" />
              <div>
                <h4>Head Office</h4>
                <p>Warri, Delta State, Nigeria</p>
              </div>
            </div>

            <div className="social-links ">
              <a
                href={DATA.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon"
              >
                <FaTwitter />
              </a>
              <a
                href={DATA.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                 className="contact-icon"
              >
                <FaInstagram />
              </a>
              <a
                href={DATA.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                 className="contact-icon"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm
            serviceId={SERVICE_ID}
            templateId={TEMPLATE_ID}
            publicKey={PUBLIC_KEY}
          />
          {/*end of contact form*/}
        </div>
      </div>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Testimonial />
        {!showTestimonialForm && (
          <button
            className="add-testimonial-button"
            onClick={() => setShowTestimonialForm(true)}
          >
            <IoAddCircleOutline /> Share Your Experience
          </button>
        )}
      </section>

      {/* Testimonial Form */}
      {showTestimonialForm && (
        <form className="testimonial-form" onSubmit={handleTestimonialSubmit}>
          <h2>Share Your Experience</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="testimonial-name">Your Name</label>
              <input
                type="text"
                id="testimonial-name"
                name="name"
                value={testimonialData.name}
                onChange={handleTestimonialChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={testimonialData.company}
                onChange={handleTestimonialChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={testimonialData.position}
                onChange={handleTestimonialChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Used</label>
              <select
                id="service"
                name="service"
                value={testimonialData.service}
                onChange={handleTestimonialChange}
                required
              >
                <option value="">Select a service</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Animation Creation">Animation Creation</option>
                <option value="Tech Training">Tech Training</option>
                <option value="Drone Services">Drone Services</option>
                <option value="Equipment Setup">Equipment Setup</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="testimonial-message">Your Testimonial</label>
            <textarea
              id="testimonial-message"
              name="message"
              rows={6}
              value={testimonialData.message}
              onChange={handleTestimonialChange}
              required
              placeholder="Tell us about your experience working with us..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit Testimonial
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowTestimonialForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="contact-container">
        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="testimonial-header">
            <span
              className="title_span"
              style={{ textTransform: "uppercase", backgroundColor: "#fff" }}
            >
              FAQ'S
            </span>
            <br />
            <br />
            <br />
            <h2 className="section-title">Frequently Asked Question's</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? "active" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">
                    {activeFaq === index ? "−" : "+"}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 style={{ fontSize: "3rem", fontWeight: "900" }}>
              D'roid Companion
            </h2>
            <p>
              Experience technology that adapts to your lifestyle. The D'roid
              Companion is more than just a phone — it's your creative
              companion, productivity partner, and entertainment powerhouse, all
              in one sleek, powerful device.
            </p>
            <button className="cta-primary" onClick={() => navigate("/mobile")}>
              See More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
