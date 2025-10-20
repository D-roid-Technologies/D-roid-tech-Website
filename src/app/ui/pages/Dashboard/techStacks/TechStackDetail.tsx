"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Clock, Users, Award, BookOpen, Target, Zap, MessageCircle } from "lucide-react"
import "./TechStackDetail.css"
type TechDetailProps = {
  icon: React.ReactElement
  title: string
  description: string
  duration?: string
  difficulty?: string
  prerequisites?: string[]
  keyFeatures?: string[]
  learningOutcomes?: string[]
  projects?: string[]
  onContactClick?: () => void
}

const TechDetailPage: React.FC<TechDetailProps> = ({
  icon,
  title,
  description,
  duration = "4-6 weeks",
  difficulty = "Beginner to Intermediate",
  prerequisites = ["Basic computer skills", "Text editor familiarity"],
  keyFeatures = ["Hands-on projects", "Real-world examples", "Industry best practices"],
  learningOutcomes = ["Build responsive layouts", "Understand core concepts", "Create interactive features"],
  projects = ["Portfolio website", "Interactive dashboard", "Mobile-first application"],
  onContactClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onContactClick) {
      onContactClick()
    }
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
        maxWidth: "800px",
        margin: "0 auto",
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
              justifyItems: "center",
              gap: "3rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ color: "#2667cc", width: "24px", height: "24px" }}>{icon}</div>
            <h3 className="responsive-title">
              {title}
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
            Master the fundamentals and advanced concepts
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
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>{duration}</span>
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
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>{difficulty}</span>
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
          <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: "500" }}>Certification</span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          color: "#334155",
          lineHeight: "1.6",
          marginBottom: isExpanded ? "2rem" : "1.5rem",
        }}
      >
        {description}
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
          {/* Prerequisites */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <BookOpen style={{ width: "18px", height: "18px", color: "#2667cc" }} />
              Prerequisites
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {prerequisites.map((prereq, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Zap style={{ width: "18px", height: "18px", color: "#2667cc" }} />
              Key Features
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {keyFeatures.map((feature, index) => (
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
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#071d6a",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Target style={{ width: "18px", height: "18px", color: "#2667cc" }} />
              Learning Outcomes
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {learningOutcomes.map((outcome, index) => (
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
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
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
              Hands-on Projects
            </h4>
            {projects.map((project, index) => (
              <div
                key={index}
                style={{
                  fontSize: "1rem",
                  color: "#334155",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#2667cc",
                    borderRadius: "50%",
                  }}
                ></span>
                {project}
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

export default TechDetailPage
