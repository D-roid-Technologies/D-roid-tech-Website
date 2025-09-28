// src/pages/training/TrainingDescriptionPage.tsx
import React, { useState } from "react";
import "./TrainingDescriptionPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import TrainingApplicationForm from "./TrainingApplicationform";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import toast from "react-hot-toast";

const TrainingDescriptionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state;

  const [showForm, setShowForm] = useState(false);
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  if (!program) {
    return (
      <div style={{ padding: 40 }}>
        <h2 style={{ color: "#000000" }}>No program data found.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <div style={{ margin: "1rem 0" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "blue",
                  color: "#fff",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ← Back to Training Programs
              </button>
            </div>
            <h1 className="software-header">{program.title}</h1>
            <p className="software-summary">{program.summary}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="wrapper program-details">
        <h2 className="section-heading">Program Overview</h2>
        <p className="section-text">{program.description}</p>

        <h3 className="section-subheading">Details</h3>
        <ul className="program-list">
          <li>
            <strong>Duration:</strong> {program.duration}
          </li>
          <li>
            <strong>Level:</strong> {program.level}
          </li>
          <li>
            <strong>Mode:</strong> {program.mode?.join(", ")}
          </li>
          <li>
            <strong>Tools:</strong> {program.tools?.join(", ")}
          </li>
        </ul>

        <h3 className="section-subheading">How to Apply</h3>
        <ul className="program-list">
          {(
            program.howToApply as (string | { label: string; href: string })[]
          ).map((step, index) =>
            typeof step === "string" ? (
              <li key={index}>{step}</li>
            ) : (
              <li key={index}>
                <a href={step.href} className="link">
                  {step.label}
                </a>
              </li>
            )
          )}
        </ul>

        <h3 className="section-subheading">Benefits</h3>
        <ul className="program-list">
          {(
            program.benefits as (string | { label: string; href: string })[]
          ).map((step, index) =>
            typeof step === "string" ? (
              <li key={index}>{step}</li>
            ) : (
              <li key={index}>
                <a href={step.href} className="link">
                  {step.label}
                </a>
              </li>
            )
          )}
        </ul>

        <h3 className="section-subheading">What you would learn</h3>
        <ul className="program-list">
          {(program.learn as (string | { label: string; href: string })[]).map(
            (step, index) =>
              typeof step === "string" ? (
                <li key={index}>{step}</li>
              ) : (
                <li key={index}>
                  <a href={step.href} className="link">
                    {step.label}
                  </a>
                </li>
              )
          )}
        </ul>

        <h3 className="section-subheading">Price</h3>
        <ul className="program-list">
          {(program.price as (string | { label: string; href: string })[]).map(
            (step, index) =>
              typeof step === "string" ? (
                <li key={index}>{step}</li>
              ) : (
                <li key={index}>
                  <a href={step.href} className="link">
                    {step.label}
                  </a>
                </li>
              )
          )}
        </ul>

        <h3 className="section-subheading">Your Mentor</h3>
        <ul className="program-list">
          {(
            program.trainer as (string | { label: string; href: string })[]
          ).map((step, index) =>
            typeof step === "string" ? (
              <li key={index}>{step}</li>
            ) : (
              <li key={index}>
                <a href={step.href} className="link">
                  {step.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Apply Button */}
        {!showForm && (
          <button
            onClick={() => {
              if (!isUserLoggedIn) {
                toast.error("Please log in or sign up.", {
                  style: {
                    background: "#ff4d4f",
                    color: "#fff",
                  },
                });
                setTimeout(() => {
                  navigate("/auth/join-our-community");
                }, 3000);
              }
            }}
            className="apply-button"
          >
            Apply Now
          </button>
        )}

        {/* Application Form */}
        {showForm && (
          <div className="form-container">
            <TrainingApplicationForm programTitle={program.title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingDescriptionPage;
