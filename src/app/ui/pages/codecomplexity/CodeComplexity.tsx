import React from "react";
import { useNavigate } from "react-router-dom";

const CodeComplexity: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    // Navigate back functionality
    window.history.back();
  };

  const handleJoinCommunity = () => {
    // Navigate to join community page
    console.log("Redirecting to join community page...");
    // In a real app, this would navigate to the join community page
    // alert("Redirecting to join community page...");
    navigate("/auth/join-our-community");
  };

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
                cursor: "pointer",
              }}
            >
              ← Back to ToolBox
            </button>
          </div>
          <h1 className="software-header">Code Complexity Analyzer</h1>
          <p>
            Upload your source code and receive instant insights into its
            complexity, maintainability, and potential bottlenecks. Ideal for
            developers and teams aiming to improve code quality, reduce
            technical debt, and ensure more efficient performance.
          </p>
        </div>
      </div>

      {/* Access Restriction Notice */}
      <div
        style={{
          maxWidth: "600px",
          margin: "2rem auto",
          padding: "3rem 2rem",
          backgroundColor: "#ffffff",
          border: "2px solid #f1f3f4",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* Lock Icon */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            backgroundColor: "#bdbdbd",
            borderRadius: "50%",
            marginBottom: "2rem",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: "#fff" }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "1.5rem",
            letterSpacing: "-0.025em",
          }}
        >
          Premium Tool Access Required
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#5a6c7d",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            maxWidth: "480px",
            margin: "0 auto 2.5rem auto",
          }}
        >
          You do not have access to this tool. You need to create an account to
          unlock our premium features. Click on <strong>Toolbox</strong> after
          registration to see the list of all restricted tools.
        </p>

        <button
          onClick={handleJoinCommunity}
          style={{
            padding: "14px 36px",
            fontSize: "1.1rem",
            fontWeight: "600",
            backgroundColor: "#bdbdbd",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(255,107,53,0.3)",
            textTransform: "none",
            letterSpacing: "0.025em",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "grey";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 16px rgba(241, 235, 235, 0.82)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#bdbdbd";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0)";
          }}
        >
          Create Account Now
        </button>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fc",
            borderRadius: "6px",
            border: "1px solid #e9ecf3",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "#7c8b9a",
              margin: "0",
              fontStyle: "italic",
            }}
          >
            💡 Join our community to unlock all premium tools, advanced
            analytics, and exclusive features
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeComplexity;
