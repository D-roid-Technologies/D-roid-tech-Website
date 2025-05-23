import React from "react";

const ResumeAnalyzer: React.FC = () => {
    return (
        <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", marginTop: "2rem" }}>
            <h2>Upload Your Resume</h2>
            <input type="file" accept=".pdf,.doc,.docx" />
            <p style={{ marginTop: "1rem", color: "#555" }}>
                Supported formats: PDF, DOC, DOCX. The analysis will provide tips on formatting,
                keyword usage, and readability.
            </p>
            {/* TODO: Implement actual analysis logic here */}
        </div>
    );
};

export default ResumeAnalyzer;