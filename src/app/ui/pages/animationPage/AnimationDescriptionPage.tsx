"use client"

import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './Animation.module.css'
//import { stories } from "./AnimationPage"

const AnimationDescriptionPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const storyData = location.state



  if (!storyData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Story Not Found</h1>
        <p>The requested story could not be found</p>
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
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* Header Section - Using inline styles instead of undefined CSS classes */}
      <div
        style={{
          backgroundColor: "#071d6a",
          color: "white",
          padding: "3rem 0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ margin: "1rem 0" }}>
            <button
              onClick={() => navigate('/animation')}
              style={{
                padding: "10px 16px",
                backgroundColor: "white",
                color: "#071d6a",
                border: "1px solid #071d6a",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              ← Back to Stories
            </button>
          </div>
          <h1 style={{ fontSize: "2.5rem", margin: "1rem 0", fontWeight: "bold" }}>{storyData.title}</h1>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0", opacity: 0.9 }}>
            {storyData.genre} • {storyData.runtime} • {storyData.releaseDate}
          </p>
        </div>
      </div>

      {/* Story Details */}
      <div className={styles.container}>
        <div className={styles.detailsGrid}>
          <div>
            {/* Thumbnail with better error handling */}
            <img
              src={storyData.thumbnail || "/placeholder.svg?height=400&width=300"}
              alt={storyData.title}
              className={styles.thumbnail}
              onError={(e) => {
                console.log("Image failed to load, using placeholder")
                e.currentTarget.src = "/placeholder.svg?height=400&width=300"
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

        {/* Themes Section - Fixed the mapping issue */}
        {storyData.themes && Array.isArray(storyData.themes) && (
          <div className={styles.themeSection}>
            <h3 className={styles.themeTitle}>Themes & Emotional Depth</h3>
            <div className={styles.themeGrid}>
              {storyData.themes.map((theme: string, index: number) => (
                <div className={styles.themeCard} key={index}>
                  <p>{theme}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.visualStyle}>
          <h3 className={styles.sectionTitle}>Visual Style</h3>
          <p>{storyData.visualStyle}</p>
        </div>

        <div className={styles.targetAudience}>
          <h3 className={styles.sectionTitle}>Target Audience</h3>
          <p>{storyData.targetAudience}</p>
        </div>

        {/* Additional Info Section - Fixed object iteration */}
        {storyData.additionalInfo && Object.keys(storyData.additionalInfo).length > 0 && (
          <div className={styles.additionalInfo}>
            <h3 className={styles.additionalInfoTitle}>Additional Details</h3>
            <div className={styles.additionalGrid}>
              {Object.entries(storyData.additionalInfo).map(([key, value]) => (
                <div className={styles.additionalCard} key={key}>
                  <h5>{key.replace(/([A-Z])/g, " $1").trim()}</h5>
                  <p>{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actionBox}>
          <h3>Experience {storyData.title}</h3>
          <div className={styles.actionButtons}>
            <button className={styles.watchBtn} disabled>
              Watch Animation
            </button>
            <button className={styles.readBtn}>Read Story</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimationDescriptionPage
