"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Wrench, Clock, Users, Award, MessageCircle } from "lucide-react"

type SkillAcquisitionTrainingProps = {
  onContactClick?: () => void
}

export const SkillAcquisitionTraining: React.FC<SkillAcquisitionTrainingProps> = ({ onContactClick }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onContactClick) {
      onContactClick()
    }
  }

  const skillData = {
    title: "Skill Acquisition Training",
    subTitle: "Empowering Individuals with Practical, Job-Ready Skills for a Competitive World",
    summary:
      "A hands-on training program designed to equip learners with in-demand practical skills across various industries, helping them become self-reliant, employable, and future-ready.",
    duration: "4 weeks",
    level: "Beginner to Intermediate",
    price: ["Starting from ₦210,835.07 – ₦1,054,175.34", "(depending on skill track and materials required)"],
    skills: [
      "Digital Skills",
      "Creative Skills",
      "Technical Skills",
      "Artisan Skills",
      "Entrepreneurship",
      "Business Setup",
    ],
    benefits: [
      "Learn job-ready and income-generating skills",
      "Certification upon completion",
      "Access to mentorship and career support",
      "Tools and starter kits may be provided for some tracks",
      "Opportunity to join a growing alumni network",
      "Boost confidence and self-sufficiency",
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
            <Wrench style={{ color: "#2667cc", width: "24px", height: "24px" }} />
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#071d6a",
                margin: 0,
              }}
            >
              {skillData.title}
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
            {skillData.subTitle}
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
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>{skillData.duration}</span>
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
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>{skillData.level}</span>
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
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>Multi-Track</span>
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
        {skillData.summary}
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
          {/* Skill Categories */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
              }}
            >
              Skill Categories
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {skillData.skills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#071d6a",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    boxShadow: "0 4px 12px rgba(7, 29, 106, 0.2)",
                  }}
                >
                  {skill}
                </div>
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
              Program Benefits
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {skillData.benefits.map((benefit, index) => (
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
              Investment Range
            </h4>
            {skillData.price.map((price, index) => (
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
