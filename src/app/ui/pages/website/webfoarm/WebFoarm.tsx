import React, { useState } from "react";
import { Assets } from "../../../../utils/constant/Assets";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../webfoarm/WebFoarm.css";

const WebFoarm = () => {
  const navigate = useNavigate();
  // State for website types
  const [websiteTypes] = useState<string[]>([
    "Personal Blog",
    "E-Commerce Store",
    "Business Website",
    "Portfolio",
    "Event Website",
    "Educational Website",
    "Other",
  ]);

  // State for font options
  const [fontTypes] = useState<string[]>([
    "Inter",
    "Montserrat",
    "Calibri",
    "Arial",
    "Bahnschrift",
    "Gill Sans Nova",
  ]);

  // state for goals
  const [goalsTypes] = useState<string[]>([
    "Showcase products and sell online",
    "Promote services",
    "Share Information",
    "Display Creative Work",
    "Host event details",
  ]);

  // state for styles
  const [styleTypes] = useState<string[]>([
    "Modern and Minimalist",
    "Bold and Colorful",
    "Classic and Professional",
    "Playful and Creative",
  ]);

  // State to manage the current step
  const [currentStep, setCurrentStep] = useState<number>(0);

  // State to track the selected item
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Function to handle continue button click
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    setSelectedIndex(null); // Reset selection when moving to the next step
  };

  // Function to handle list item click
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="form-company-logo-container">
        <img
          src={Assets.images.companyLogoNoBg}
          alt=""
          className="form-company-logo"
        />
      </div>
      <section className="form-web-hero-container">
        <div className="form-hero-con">
          <div className="form-project-container">
            {/* <div className="form-top-con"> */}
            <button onClick={() => navigate("/")} className="form-btn-hero">
              <IoChevronBackOutline className="form-back-btn-icon" />
            </button>
            {/* </div> */}
            <div>
              <button className="form-project-btn">Skip</button>
            </div>
          </div>
          {/* item selection section */}
          <div className="form-container">
            {currentStep === 0 && (
              <>
                <h1 className="form-heading">Start a new website</h1>
                <p className="form-heading-details">
                  What kind of website do you want to create?
                </p>
                <ol className="form-list">
                  {websiteTypes.map((type, index) => (
                    <li
                      key={index}
                      className={`form-list-details ${
                        selectedIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleSelect(index)}
                    >
                      {type}
                    </li>
                  ))}
                </ol>
              </>
            )}

            {currentStep === 1 && (
              <>
                <p className="form-heading-details">
                  Select the kind of text to include on your website
                </p>
                <ol className="form-list">
                  {fontTypes.map((font, index) => (
                    <li
                      key={index}
                      className={`form-list-details ${
                        selectedIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleSelect(index)}
                    >
                      {font}
                    </li>
                  ))}
                </ol>
              </>
            )}
            {currentStep === 2 && (
              <>
                <p className="form-heading-details">
                  What is the primary goal of this website?
                </p>
                <ol className="form-list">
                  {goalsTypes.map((goals, index) => (
                    <li
                      key={index}
                      className={`form-list-details ${
                        selectedIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleSelect(index)}
                    >
                      {goals}
                    </li>
                  ))}
                </ol>
              </>
            )}
            {currentStep === 3 && (
              <>
                <p className="form-heading-details">
                  What kind of style would you like for your website?
                </p>
                <ol className="form-list">
                  {styleTypes.map((goals, index) => (
                    <li
                      key={index}
                      className={`form-list-details ${
                        selectedIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleSelect(index)}
                    >
                      {goals}
                    </li>
                  ))}
                </ol>
              </>
            )}
            <div className="form-btn-container">
              <button className="form-continue-btn" onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebFoarm;
