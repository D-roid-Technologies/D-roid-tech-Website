"use client"

import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"

// MINIMAL VERSION TO TEST BASIC RENDERING
const SimpleAnimationDescriptionPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const storyData = location.state

  console.log("Simple component rendering")
  console.log("Story data:", storyData)

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
        ← Back
      </button>

      <h1>DEBUG: Simple Version</h1>

      {storyData ? (
        <div>
          <h2>✅ Data Found</h2>
          <p>
            <strong>Title:</strong> {storyData.title}
          </p>
          <p>
            <strong>Genre:</strong> {storyData.genre}
          </p>
          <p>
            <strong>Synopsis:</strong> {storyData.synopsis}
          </p>

          <h3>Raw Data:</h3>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              overflow: "auto",
              fontSize: "12px",
            }}
          >
            {JSON.stringify(storyData, null, 2)}
          </pre>
        </div>
      ) : (
        <div>
          <h2>❌ No Data Found</h2>
          <p>Location state: {JSON.stringify(location.state)}</p>
          <p>Location pathname: {location.pathname}</p>
        </div>
      )}
    </div>
  )
}

export default SimpleAnimationDescriptionPage
