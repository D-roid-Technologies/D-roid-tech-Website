import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/Store";
import TrainingApplicationForm from "../trainingPrograms/TrainingApplicationform";

const CareerDescriptionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const openings = location.state;

  const [showForm, setShowForm] = useState(false);
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  if (!openings) {
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
                ← Back to Careers
              </button>
            </div>
            <h1 className="software-header">{openings.title}</h1>
            <p>{openings.summary}</p>
          </div>
        </div>
      </div>
      {/* Details Section */}
      <div className="wrapper" style={{ padding: "2rem" }}>
        <h2 style={{ color: "#000000" }}>Program Overview</h2>
        <p style={{ color: "#000000", marginBottom: 20 }}>{openings.description}</p>

        <h3 style={{ color: "#000000" }}>Details</h3>
        <ul style={{ color: "#000000", marginBottom: 20 }}>
          <li>
            <strong>Duration:</strong> {openings.duration}
          </li>
          <li>
            <strong>Level:</strong> {openings.level}
          </li>
          <li>
            <strong>Mode:</strong> {openings.mode}
          </li>
          <li>
            <strong>Tools:</strong> {openings.tools?.join(", ")}
          </li>
        </ul>

        <h3 style={{ color: "#000000" }}>How to Apply</h3>
        <p style={{ color: "#000000", marginBottom: 20 }}>{openings.howToApply}</p>

        <h3 style={{ color: "#000000" }}>Your Benefits</h3>
        <p style={{ color: "#000000", marginBottom: 20 }}>{openings.benefits}</p>

        {/* Apply Now Button */}
        {!showForm && (
          <button onClick={() => {
            if (!isUserLoggedIn) {
              toast.error('No user details found, redirecting you to sign up.', {
                style: {
                  background: '#ff4d4f',
                  color: '#fff',
                },
              });
              setTimeout(() => {
                navigate("/auth/join-our-community")
              }, 3000)
            }
          }} className="apply-button">
            Apply Now
          </button>
        )}

        {showForm && (
          <div style={{ marginTop: "2rem" }}>
            <TrainingApplicationForm programTitle={openings.title} />
          </div>
        )}
      </div>
    </div>
    //   </div>
    // </div>
  );
};
export default CareerDescriptionPage;
