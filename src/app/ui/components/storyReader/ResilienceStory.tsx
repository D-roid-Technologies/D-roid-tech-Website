"use client"

import { Calendar, Clock, BookOpen, Heart, ChevronLeft, ChevronRight, User, Eye, HeartHandshake } from "lucide-react"
import { useState, useEffect } from "react"
import { stories } from "./stories-data"
import "./ResilienceStory.css"

export default function ResilienceStory() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isReading, setIsReading] = useState(false)

  const story = stories.find((s) => s.id === "resilience")!

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxScroll) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextChapter = () => {
    if (currentChapter < story.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const toggleReadingMode = () => {
    setIsReading(!isReading)
  }

  if (isReading) {
    return (
      <div className="resilience-story-reading">
        {/* Reading Progress Bar */}
        <div className="resilience-reading-progress-bar" style={{ width: `${readingProgress}%` }} />

        {/* Reading Header */}
        <div className="resilience-reading-header">
          <button onClick={toggleReadingMode} className="resilience-back-button">
            <ChevronLeft size={16} />
            Back to Overview
          </button>

          <div className="resilience-reading-header-center">
            <div className="resilience-chapter-info">
              Chapter {story.chapters[currentChapter].id} of {story.chapters.length}
            </div>
            <div className="resilience-chapter-title">{story.chapters[currentChapter].title}</div>
          </div>

          <div className="resilience-progress-text">{Math.round(readingProgress)}% complete</div>
        </div>

        {/* Reading Content */}
        <div className="resilience-reading-content">
          <div className="resilience-reading-chapter-header">
            <h1 className="resilience-reading-chapter-title">{story.chapters[currentChapter].title}</h1>
            <div className="resilience-reading-chapter-meta">
              <span>Chapter {story.chapters[currentChapter].id}</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>

          <div className="resilience-reading-text">
            {story.chapters[currentChapter].content.map((paragraph, index) => (
              <p key={index} className="resilience-reading-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Chapter Navigation */}
          <div className="resilience-chapter-navigation">
            <button onClick={prevChapter} disabled={currentChapter === 0} className="resilience-nav-button">
              <ChevronLeft size={16} />
              Previous Chapter
            </button>

            <div className="resilience-chapter-dots">
              {story.chapters.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`resilience-chapter-dot ${index === currentChapter ? "active" : ""}`}
                >
                  <span style={{ display: "none" }}>{index}</span>
                </span>
              ))}
            </div>

            <button
              onClick={nextChapter}
              disabled={currentChapter === story.chapters.length - 1}
              className="resilience-nav-button"
            >
              Next Chapter
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="resilience-story">
      {/* Hero Section */}
      <div className="resilience-hero-section">
        <div className="resilience-hero-container">
          <div className="resilience-genre-tag">
            <HeartHandshake size={16} />
            {story.genre}
          </div>

          <h1 className="resilience-hero-title">{story.title}</h1>

          <p className="resilience-hero-subtitle">Strength Through Struggle</p>

          <div className="resilience-hero-meta">
            <div className="resilience-meta-item">
              <User size={16} />
              Dr. Amara Okonkwo
            </div>
            <div className="resilience-meta-item">
              <Clock size={16} />
              {story.runtime}
            </div>
            <div className="resilience-meta-item">
              <Calendar size={16} />
              {story.releaseDate}
            </div>
          </div>

          <div className="resilience-hero-stats">
            <div className="resilience-stat-item resilience-rating">⭐ 4.9</div>
            <div className="resilience-stat-item resilience-views">
              <Eye size={16} />
              3.2K views
            </div>
            <div className="resilience-stat-item resilience-likes">
              <Heart size={16} />
              267 likes
            </div>
          </div>

          <p className="resilience-hero-description">{story.description}</p>

          <button onClick={toggleReadingMode} className="resilience-start-reading-btn">
            Start Reading
          </button>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="resilience-content-section">
        <div className="resilience-content-container">
          <div className="resilience-synopsis-card">
            <div className="resilience-synopsis-header">
              <HeartHandshake size={24} />
              <h2 className="resilience-synopsis-title">Synopsis</h2>
            </div>
            <p className="resilience-synopsis-text">{story.synopsis}</p>
          </div>
        </div>
      </div>

      {/* Themes Section */}
      <div className="resilience-themes-section">
        <div className="resilience-content-container">
          <h2 className="resilience-themes-title">Key Themes</h2>
          <div className="resilience-themes-grid">
            {story.themes.map((theme, index) => (
              <div key={index} className="resilience-theme-card">
                <h3 className="resilience-theme-card-title">{theme.split(":")[0]}</h3>
                <p className="resilience-theme-card-text">{theme.split(":")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Preview */}
      <div className="resilience-content-section">
        <div className="resilience-content-container">
          <h2 className="resilience-chapters-title">
            <BookOpen size={32} />
            Story Chapters
          </h2>

          <div className="resilience-chapters-list">
            {story.chapters.map((chapter, index) => (
              <div key={chapter.id} className="resilience-chapter-card">
                <div className="resilience-chapter-header">
                  <div>
                    <h3 className="resilience-chapter-title-text">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    <div className="resilience-chapter-reading-time">
                      <Clock size={14} />6 min read
                    </div>
                  </div>
                </div>
                <p className="resilience-chapter-preview">{chapter.content[0].substring(0, 200)}...</p>
              </div>
            ))}
          </div>

          <div className="resilience-begin-journey-section">
            <button onClick={toggleReadingMode} className="resilience-begin-journey-btn">
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
