"use client"

import { Calendar, Clock, BookOpen, Sword, ChevronLeft, ChevronRight, User, Eye, Heart, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { stories } from "./stories-data"
import "./WarriorsStory.css"

export default function WarriorsStory() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isReading, setIsReading] = useState(false)

  const story = stories.find((s) => s.id === "warriors")!

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
      <div className="warriors-story-reading">
        {/* Reading Progress Bar */}
        <div className="warriors-reading-progress-bar" style={{ width: `${readingProgress}%` }} />

        {/* Reading Header */}
        <div className="warriors-reading-header">
          <button onClick={toggleReadingMode} className="warriors-back-button">
            <ChevronLeft size={16} />
            Back to Overview
          </button>

          <div className="warriors-reading-header-center">
            <div className="warriors-chapter-info">
              Chapter {story.chapters[currentChapter].id} of {story.chapters.length}
            </div>
            <div className="warriors-chapter-title">{story.chapters[currentChapter].title}</div>
          </div>

          <div className="warriors-progress-text">{Math.round(readingProgress)}% complete</div>
        </div>

        {/* Reading Content */}
        <div className="warriors-reading-content">
          <div className="warriors-reading-chapter-header">
            <h1 className="warriors-reading-chapter-title">{story.chapters[currentChapter].title}</h1>
            <div className="warriors-reading-chapter-meta">
              <span>Chapter {story.chapters[currentChapter].id}</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>

          <div className="warriors-reading-text">
            {story.chapters[currentChapter].content.map((paragraph, index) => (
              <p key={index} className="warriors-reading-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Chapter Navigation */}
          <div className="warriors-chapter-navigation">
            <button onClick={prevChapter} disabled={currentChapter === 0} className="warriors-nav-button">
              <ChevronLeft size={16} />
              Previous Chapter
            </button>

            <div className="warriors-chapter-dots">
              {story.chapters.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`warriors-chapter-dot ${index === currentChapter ? "active" : ""}`}
                >
                  <span style={{ display: "none" }}>{index}</span>
                </span>
              ))}
            </div>

            <button
              onClick={nextChapter}
              disabled={currentChapter === story.chapters.length - 1}
              className="warriors-nav-button"
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
    <div className="warriors-story">
      {/* Hero Section */}
      <div className="warriors-hero-section">
        <div className="warriors-hero-container">
          <div className="warriors-genre-tag">
            <Sword size={16} />
            {story.genre}
          </div>

          <h1 className="warriors-hero-title">{story.title}</h1>

          <p className="warriors-hero-subtitle">Forged in Battle, United in Purpose</p>

          <div className="warriors-hero-meta">
            <div className="warriors-meta-item">
              <User size={16} />
              Elder Kemi
            </div>
            <div className="warriors-meta-item">
              <Clock size={16} />
              {story.runtime}
            </div>
            <div className="warriors-meta-item">
              <Calendar size={16} />
              {story.releaseDate}
            </div>
          </div>

          <div className="warriors-hero-stats">
            <div className="warriors-stat-item warriors-rating">⭐ 4.7</div>
            <div className="warriors-stat-item warriors-views">
              <Eye size={16} />
              2.9K views
            </div>
            <div className="warriors-stat-item warriors-likes">
              <Heart size={16} />
              203 likes
            </div>
          </div>

          <p className="warriors-hero-description">{story.description}</p>

          <button onClick={toggleReadingMode} className="warriors-start-reading-btn">
            Start Reading
          </button>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="warriors-content-section">
        <div className="warriors-content-container">
          <div className="warriors-synopsis-card">
            <div className="warriors-synopsis-header">
              <Shield size={24} />
              <h2 className="warriors-synopsis-title">Synopsis</h2>
            </div>
            <p className="warriors-synopsis-text">{story.synopsis}</p>
          </div>
        </div>
      </div>

      {/* Themes Section */}
      <div className="warriors-themes-section">
        <div className="warriors-content-container">
          <h2 className="warriors-themes-title">Key Themes</h2>
          <div className="warriors-themes-grid">
            {story.themes.map((theme, index) => (
              <div key={index} className="warriors-theme-card">
                <h3 className="warriors-theme-card-title">{theme.split(":")[0]}</h3>
                <p className="warriors-theme-card-text">{theme.split(":")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Preview */}
      <div className="warriors-content-section">
        <div className="warriors-content-container">
          <h2 className="warriors-chapters-title">
            <BookOpen size={32} />
            Story Chapters
          </h2>

          <div className="warriors-chapters-list">
            {story.chapters.map((chapter, index) => (
              <div key={chapter.id} className="warriors-chapter-card">
                <div className="warriors-chapter-header">
                  <div>
                    <h3 className="warriors-chapter-title-text">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    <div className="warriors-chapter-reading-time">
                      <Clock size={14} />8 min read
                    </div>
                  </div>
                </div>
                <p className="warriors-chapter-preview">{chapter.content[0].substring(0, 200)}...</p>
              </div>
            ))}
          </div>

          <div className="warriors-begin-journey-section">
            <button onClick={toggleReadingMode} className="warriors-begin-journey-btn">
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
