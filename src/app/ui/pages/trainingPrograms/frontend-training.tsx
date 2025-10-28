"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Code, Clock, Users, Award, MessageCircle } from "lucide-react"

type FrontendTrainingProps = {
  onContactClick?: () => void
}

export const FrontendTraining: React.FC<FrontendTrainingProps> = ({ onContactClick }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onContactClick) {
      onContactClick()
    }
  }

  const frontendData = {
    title: "The Frontend Developer Training",
    subTitle: "Master the art of building stunning, responsive web interfaces from scratch",
    summary:
      "A practical, project-based training program designed to equip you with the core skills and tools needed for modern frontend development using HTML, CSS, JavaScript, and popular frameworks like React.",
    duration: "24 weeks",
    level: "Beginner to Intermediate",
    price: ["Self Paced Track: ₦689,599.00", "Instructor-led track: ₦1,370,299.00"],
    tools: [
      "HTML5 / CSS3 / JavaScript (ES6+)",
      "Git & GitHub",
      "Visual Studio Code",
      "Chrome DevTools",
      "React.js",
      "Tailwind CSS",
    ],
    benefits: [
      "Learn in-demand frontend skills from industry professionals",
      "Build a job-ready portfolio with real projects",
      "Flexible learning: study at your own pace",
      "Access to community support and mentorship",
      "Certificate of completion to showcase your skills",
    ],
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 10px 30px rgba(7, 29, 106, 0.1)",
        border: `2px solid ${isExpanded ? "#2667cc" : "transparent"}`,
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Code style={{ color: "#2667cc", width: "24px", height: "24px" }} />
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#071d6a",
                margin: 0,
              }}
            >
              {frontendData.title}
            </h3>
          </div>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              margin: "0 0 1rem 0",
              lineHeight: "1.5",
            }}
          >
            {frontendData.subTitle}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "0.5rem",
            borderRadius: "8px",
            marginLeft: "1rem",
          }}
        >
          {isExpanded ? (
            <ChevronUp style={{ color: "#2667cc", width: "20px", height: "20px" }} />
          ) : (
            <ChevronDown style={{ color: "#2667cc", width: "20px", height: "20px" }} />
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
          }}
        >
          <Clock style={{ color: "#2667cc", width: "16px", height: "16px" }} />
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>{frontendData.duration}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
          }}
        >
          <Users style={{ color: "#2667cc", width: "16px", height: "16px" }} />
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>{frontendData.level}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
          }}
        >
          <Award style={{ color: "#2667cc", width: "16px", height: "16px" }} />
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>Certificate</span>
        </div>
      </div>

      {/* Summary */}
      <p
        style={{
          color: "#334155",
          lineHeight: "1.6",
          marginBottom: isExpanded ? "2rem" : "1.5rem",
        }}
      >
        {frontendData.summary}
      </p>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "2rem",
            animation: "fadeIn 0.3s ease",
          }}
        >
          {/* Tools & Technologies */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
              }}
            >
              Tools & Technologies
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {frontendData.tools.map((tool, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#2667cc",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
              }}
            >
              What You'll Gain
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {frontendData.benefits.map((benefit, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    color: "#475569",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#2667cc",
                      borderRadius: "50%",
                      marginTop: "0.5rem",
                      flexShrink: 0,
                    }}
                  ></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
              }}
            >
              Investment Options
            </h4>
            {frontendData.price.map((price, index) => (
              <div
                key={index}
                style={{
                  fontSize: "1rem",
                  color: "#334155",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                {price}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleContactClick}
        style={{
          marginTop: "1.5rem",
          padding: "0.875rem 1.5rem",
          backgroundColor: "#2667cc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(38, 103, 204, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#071d6a"
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(38, 103, 204, 0.3)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#2667cc"
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(38, 103, 204, 0.2)"
        }}
      >
        <MessageCircle size={18} />
        Contact Us
      </button>
    </div>
  )
}
