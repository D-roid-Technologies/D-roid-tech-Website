import React from "react";
import { useNavigate } from "react-router-dom";
import ResumeAnalyzer from "./ResumeAnalyzer";

const ResumeAnalyzerPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
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
                    <h1 className="software-header">Resume & CV Analyzer</h1>
                    <p>
                        Upload your resume or CV and get instant feedback on structure,
                        keyword optimization, readability, and formatting. Ideal for job
                        seekers who want to improve their chances with ATS (Applicant
                        Tracking Systems) and recruiters.
                    </p>
                </div>
            </div>
            {/* Resume Analyzer Tool */}
            <ResumeAnalyzer />
        </div>
    );
};

export default ResumeAnalyzerPage;