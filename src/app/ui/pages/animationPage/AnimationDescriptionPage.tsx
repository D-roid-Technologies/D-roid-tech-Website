import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Animations.module.css";

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
      <div className={styles.container}>
        <div className={styles.detailsGrid}>
          <div>
            <img
              src={storyData.thumbnail}
              alt={storyData.title}
              className={styles.thumbnail}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className={styles.quickInfo}>
              <h4>Quick Info</h4>
              <p>
                <strong>Genre:</strong> {storyData.genre}
              </p>
              <p>
                <strong>Runtime:</strong> {storyData.runtime}
              </p>
              <p>
                <strong>Category:</strong> {storyData.category}
              </p>
              <p>
                <strong>Release:</strong> {storyData.releaseDate}
              </p>
            </div>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Synopsis</h2>
            <p className={styles.synopsis}>{storyData.synopsis}</p>

            <h3 className={styles.sectionTitle}>Story Arc</h3>
            <p className={styles.storyArc}>{storyData.storyArc}</p>
          </div>
        </div>

        <div className={styles.themeSection}>
          <h3 className={styles.themeTitle}>Themes & Emotional Depth</h3>
          <div className={styles.themeGrid}>
            {storyData.themes.map((theme: any, index: any) => (
              <div className={styles.themeCard} key={index}>
                <p>{theme}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visualStyle}>
          <h3 className={styles.sectionTitle}>Visual Style</h3>
          <p>{storyData.visualStyle}</p>
        </div>

        <div className={styles.targetAudience}>
          <h3 className={styles.sectionTitle}>Target Audience</h3>
          <p>{storyData.targetAudience}</p>
        </div>

        {storyData.additionalInfo && (
          <div className={styles.additionalInfo}>
            <h3 className={styles.additionalInfoTitle}>Additional Details</h3>
            <div className={styles.additionalGrid}>
              {Object.entries(storyData.additionalInfo).map(([key, value]) => (
                <div className={styles.additionalCard} key={key}>
                  <h5>{key.replace(/([A-Z])/g, " $1").trim()}</h5>
                  <p>{value as React.ReactNode}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actionBox}>
          <h3>Experience {storyData.title}</h3>
          <div className={styles.actionButtons}>
            <button className={styles.watchBtn}>Watch Animation</button>
            <button className={styles.readBtn}>Read Story</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDescriptionPage;
