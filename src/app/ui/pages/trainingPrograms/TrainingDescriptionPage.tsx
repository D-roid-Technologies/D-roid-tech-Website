// src/pages/training/TrainingDescriptionPage.tsx
import React, { useState } from "react";
import './TrainingDescriptionPage.css'
import { useLocation, useNavigate } from "react-router-dom";
import TrainingApplicationForm from "./TrainingApplicationform";

const TrainingDescriptionPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const program = location.state;

    const [showForm, setShowForm] = useState(false);

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
        <div className="back-button-container">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
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
      <li><strong>Duration:</strong> {program.duration}</li>
      <li><strong>Level:</strong> {program.level}</li>
      <li><strong>Mode:</strong> {program.mode}</li>
      <li><strong>Tools:</strong> {program.tools?.join(", ")}</li>
    </ul>

    <h3 className="section-subheading">How to Apply</h3>
  <ul className="program-list">
  {(program.howToApply as (string | { label: string; href: string })[]).map((step, index) =>
    typeof step === "string" ? (
      <li key={index}>{step}</li>
    ) : (
      <li key={index}>
        <a href={step.href} className="link">{step.label}</a>
      </li>
    )
  )}
</ul>





    <h3 className="section-subheading">Your Benefits</h3>
    <p className="section-text">{program.benefits}</p>

    {/* Apply Button */}
    {!showForm && (
      <button onClick={() => setShowForm(true)} className="apply-button">
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
