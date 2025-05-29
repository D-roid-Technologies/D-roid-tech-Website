import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// interface Story {
//   id: string;
//   title: string;
//   genre: string;
//   runtime: string;
//   releaseDate: string;
//   category: string;
//   thumbnail: string;
//   synopsis: string;
//   storyArc: string;
//   themes: Array<string>;
//   visualStyle: string;
//   targetAudience: string;
//   url: string;
//   description: string;
//   additionalInfo?: {
//     characterDynamics?: string;
//     socialCommentary?: string;
//     visualInnovation?: string;
//     culturalRelevance?: string;
//     medicalAccuracy?: string;
//     characterDevelopment?: string;
//     culturalContext?: string;
//     visualMetaphors?: string;
//     impactAdvocacy?: string;
//     worldBuilding?: string;
//     trainingSequences?: string;
//     philosophyOfStrength?: string;
//     battleChoreography?: string;
//     leadershipSacrifice?: string;
//     visualSpectacle?: string;
//   };
// }

const AnimationDescriptionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storyData = location.state;

  if (!storyData) {
    return (
      <div>
        <div
          className="wrapper"
          style={{ padding: "2rem 0", textAlign: "center" }}
        >
          <h1>Story Not Found</h1>
          <p>The requested story could not be found.</p>
          <button
            onClick={() => navigate("/animation")}
            style={{
              padding: "10px 16px",
              backgroundColor: "#071d6a",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ← Back to Stories
          </button>
        </div>
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
                ← Back to Stories
              </button>
            </div>
            <h1 className="software-header">{storyData.title}</h1>
            <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
              {storyData.genre} • {storyData.runtime} • {storyData.releaseDate}
            </p>
          </div>
        </div>
      </div>

      {/* Story Details */}
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <img
              src={storyData.thumbnail}
              alt={storyData.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                backgroundColor: "#f0f0f0",
              }}
              onError={(e) => {
                // Handle broken image
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              style={{
                marginTop: "1rem",
                padding: "1.5rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
              }}
            >
              <h4
                style={{
                  color: "#071d6a",
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                }}
              >
                Quick Info
              </h4>
              <p style={{ marginBottom: "0.5rem", color: "#333333" }}>
                <strong>Genre:</strong> {storyData.genre}
              </p>
              <p style={{ marginBottom: "0.5rem", color: "#333333" }}>
                <strong>Runtime:</strong> {storyData.runtime}
              </p>
              <p style={{ marginBottom: "0.5rem", color: "#333333" }}>
                <strong>Category:</strong> {storyData.category}
              </p>
              <p style={{ marginBottom: 0, color: "#333333" }}>
                <strong>Release:</strong> {storyData.releaseDate}
              </p>
            </div>
          </div>

          <div>
            <h2
              style={{
                color: "#071d6a",
                marginBottom: "1rem",
                fontSize: "2rem",
              }}
            >
              Synopsis
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "2rem",
                color: "#333333",
              }}
            >
              {storyData.synopsis}
            </p>

            <h3
              style={{
                color: "#071d6a",
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Story Arc
            </h3>
            <p
              style={{
                lineHeight: "1.6",
                marginBottom: "2rem",
                color: "#333333",
              }}
            >
              {storyData.storyArc}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#071d6a",
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
            }}
          >
            Themes & Emotional Depth
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {storyData.themes.map((theme: string, index: number) => (
              <div
                key={index}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  borderLeft: "4px solid #071d6a",
                  border: "1px solid #e9ecef",
                }}
              >
                <p style={{ margin: 0, fontWeight: "500", color: "#333333" }}>
                  {theme}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#071d6a",
              marginBottom: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Visual Style
          </h3>
          <p
            style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#333333" }}
          >
            {storyData.visualStyle}
          </p>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#071d6a",
              marginBottom: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Target Audience
          </h3>
          <p
            style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#333333" }}
          >
            {storyData.targetAudience}
          </p>
        </div>

        {/* Additional Info Section (if available) */}
        {storyData.additionalInfo && (
          <div style={{ marginBottom: "3rem" }}>
            <h3
              style={{
                color: "#071d6a",
                marginBottom: "1.5rem",
                fontSize: "1.5rem",
              }}
            >
              Additional Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              {Object.entries(storyData.additionalInfo).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <h5
                    style={{
                      color: "#071d6a",
                      marginBottom: "0.5rem",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                    }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h5>
                  <p style={{ margin: 0, fontSize: "1rem", color: "#333333" }}>
                    {value as React.ReactNode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Watch/Read Buttons */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #e9ecef",
          }}
        >
          <h3
            style={{
              marginBottom: "1.5rem",
              color: "#071d6a",
              fontSize: "1.5rem",
            }}
          >
            Experience {storyData.title}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#071d6a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Watch Animation
            </button>
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#fff",
                color: "#071d6a",
                border: "2px solid #071d6a",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Read Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDescriptionPage;
