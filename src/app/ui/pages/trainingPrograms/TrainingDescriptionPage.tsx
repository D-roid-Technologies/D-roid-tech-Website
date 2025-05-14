// src/pages/training/TrainingDescriptionPage.tsx
import React, { useState } from "react";
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
                                ← Back
                            </button>
                        </div>
                        <h1 className="software-header">{program.title}</h1>
                        <p>{program.summary}</p>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="wrapper" style={{ padding: "2rem 0" }}>
                <h2 style={{ color: "#000000" }}>Program Overview</h2>
                <p style={{ color: "#000000" }}>{program.description}</p>

                <h3 style={{ color: "#000000" }}>Details</h3>
                <ul style={{ color: "#000000" }}>
                    <li><strong>Duration:</strong> {program.duration}</li>
                    <li><strong>Level:</strong> {program.level}</li>
                    <li><strong>Mode:</strong> {program.mode}</li>
                    <li><strong>Tools:</strong> {program.tools?.join(", ")}</li>
                </ul>

                <h3 style={{ color: "#000000" }}>How to Apply</h3>
                <p style={{ color: "#000000" }}>{program.howToApply}</p>

                <h3 style={{ color: "#000000" }}>Your Benefits</h3>
                <p style={{ color: "#000000" }}>{program.benefits}</p>

                {/* {program.gallery && program.gallery.length > 0 && (
                    <>
                        <h3 style={{ color: "#000000" }}>Gallery</h3>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            {program.gallery.map((img: string, index: number) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    style={{
                                        width: "250px",
                                        height: "160px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )} */}
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            marginTop: "1rem",
                            padding: "10px 20px",
                            background: "#071d6a",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                        }}
                    >
                        Apply Now
                    </button>
                )}

                {/* Show form when button is clicked */}
                {showForm && (
                    <div style={{ marginTop: "2rem" }}>
                        <TrainingApplicationForm programTitle={program.title} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainingDescriptionPage;
