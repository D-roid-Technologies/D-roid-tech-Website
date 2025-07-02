"use client"

import { Calendar, Clock, Film, BookOpen, Building, ChevronLeft, ChevronRight, User, Eye, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { stories } from "./stories-data"
import "./CityBoysStory.css"

export default function CityBoysStory() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isReading, setIsReading] = useState(false)

  const story = stories.find((s) => s.id === "cityBoys")!

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
      <div className="cityboys-story-reading">
        {/* Reading Progress Bar */}
        <div className="cityboys-reading-progress-bar" style={{ width: `${readingProgress}%` }} />

        {/* Reading Header */}
        <div className="cityboys-reading-header">
          <button onClick={toggleReadingMode} className="cityboys-back-button">
            <ChevronLeft size={16} />
            Back to Overview
          </button>

          <div className="cityboys-reading-header-center">
            <div className="cityboys-chapter-info">
              Chapter {story.chapters[currentChapter].id} of {story.chapters.length}
            </div>
            <div className="cityboys-chapter-title">{story.chapters[currentChapter].title}</div>
          </div>

          <div className="cityboys-progress-text">{Math.round(readingProgress)}% complete</div>
        </div>

        {/* Reading Content */}
        <div className="cityboys-reading-content">
          <div className="cityboys-reading-chapter-header">
            <h1 className="cityboys-reading-chapter-title">{story.chapters[currentChapter].title}</h1>
            <div className="cityboys-reading-chapter-meta">
              <span>Chapter {story.chapters[currentChapter].id}</span>
              <span>•</span>
              <span>4 min read</span>
            </div>
          </div>

          <div className="cityboys-reading-text">
            {story.chapters[currentChapter].content.map((paragraph, index) => (
              <p key={index} className="cityboys-reading-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Chapter Navigation */}
          <div className="cityboys-chapter-navigation">
            <button onClick={prevChapter} disabled={currentChapter === 0} className="cityboys-nav-button">
              <ChevronLeft size={16} />
              Previous Chapter
            </button>

            <div className="cityboys-chapter-dots">
              {story.chapters.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`cityboys-chapter-dot ${index === currentChapter ? "active" : ""}`}
                >
                  <span style={{ display: "none" }}>{index}</span>
                </span>
              ))}
            </div>

            <button
              onClick={nextChapter}
              disabled={currentChapter === story.chapters.length - 1}
              className="cityboys-nav-button"
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
    <div className="cityboys-story">
      {/* Hero Section */}
      <div className="cityboys-hero-section">
        <div className="cityboys-hero-container">
          <div className="cityboys-genre-tag">
            <Film size={16} />
            {story.genre}
          </div>

          <h1 className="cityboys-hero-title">{story.title}</h1>

          <p className="cityboys-hero-subtitle">Urban Dreams, Hidden Costs</p>

          <div className="cityboys-hero-meta">
            <div className="cityboys-meta-item">
              <User size={16} />
              Various Authors
            </div>
            <div className="cityboys-meta-item">
              <Clock size={16} />
              {story.runtime}
            </div>
            <div className="cityboys-meta-item">
              <Calendar size={16} />
              {story.releaseDate}
            </div>
          </div>

          <div className="cityboys-hero-stats">
            <div className="cityboys-stat-item cityboys-rating">⭐ 4.6</div>
            <div className="cityboys-stat-item cityboys-views">
              <Eye size={16} />
              1.8K views
            </div>
            <div className="cityboys-stat-item cityboys-likes">
              <Heart size={16} />
              142 likes
            </div>
          </div>

          <p className="cityboys-hero-description">{story.description}</p>

          <button onClick={toggleReadingMode} className="cityboys-start-reading-btn">
            Start Reading
          </button>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="cityboys-content-section">
        <div className="cityboys-content-container">
          <div className="cityboys-synopsis-card">
            <div className="cityboys-synopsis-header">
              <Building size={24} />
              <h2 className="cityboys-synopsis-title">Synopsis</h2>
            </div>
            <p className="cityboys-synopsis-text">{story.synopsis}</p>
          </div>
        </div>
      </div>

      {/* Themes Section */}
      <div className="cityboys-themes-section">
        <div className="cityboys-content-container">
          <h2 className="cityboys-themes-title">Key Themes</h2>
          <div className="cityboys-themes-grid">
            {story.themes.map((theme, index) => (
              <div key={index} className="cityboys-theme-card">
                <h3 className="cityboys-theme-card-title">{theme.split(":")[0]}</h3>
                <p className="cityboys-theme-card-text">{theme.split(":")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Preview */}
      <div className="cityboys-content-section">
        <div className="cityboys-content-container">
          <h2 className="cityboys-chapters-title">
            <BookOpen size={32} />
            Story Chapters
          </h2>

          <div className="cityboys-chapters-list">
            {story.chapters.map((chapter, index) => (
              <div key={chapter.id} className="cityboys-chapter-card">
                <div className="cityboys-chapter-header">
                  <div>
                    <h3 className="cityboys-chapter-title-text">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    <div className="cityboys-chapter-reading-time">
                      <Clock size={14} />4 min read
                    </div>
                  </div>
                </div>
                <p className="cityboys-chapter-preview">{chapter.content[0].substring(0, 200)}...</p>
              </div>
            ))}
          </div>

          <div className="cityboys-begin-journey-section">
            <button onClick={toggleReadingMode} className="cityboys-begin-journey-btn">
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
