"use client"

import type React from "react"
import { useState } from "react"
import "./Events.css"

interface eventPost {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  authorAvatar: string
  category: string
  readTime?: string
  image: string
  featured?: boolean
  readMoreLink: string
  content?: string[]
}

interface eventCardProps {
  posts: eventPost[] // Required prop
  onEventSelect?: (event: eventPost) => void
}

const EventPosts: React.FC<eventCardProps> = ({ posts, onEventSelect }) => {
  const [visiblePosts, setVisiblePosts] = useState<number>(4)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [activePost, setActivePost] = useState<eventPost | null>(null)

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))]

  // Filter posts by active category
  const filteredPosts = activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory)

  // Slice posts to show based on visiblePosts count
  const postsToShow = filteredPosts.slice(0, visiblePosts)

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 3)
  }

  function checkEventStatus(sampleDateStr: string): string {
    // Parse the sample date (e.g., "Monday, 15th June 2026")
    const sampleDate = new Date(sampleDateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"))

    // Get today's date (without time)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get difference in days
    const diffInMs = sampleDate.getTime() - today.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays > 1) {
      return "Event Incoming"
    } else if (diffInDays === 1) {
      return "Event Tomorrow"
    } else if (diffInDays < 0) {
      return "Event Passed"
    } else {
      return "Event Today" // extra case: same day
    }
  }

  const showLoadMore = visiblePosts < filteredPosts.length

  return (
    <section className="event-posts-section">
      {activePost && !onEventSelect ? (
        <div className="event-detail-view">
          <button className="back-to-events-btn" onClick={() => setActivePost(null)}>
            ← Back to Events
          </button>
          <div className="event-detail-content">
            <div className="event-detail-header">
              <h1 className="event-detail-title">{activePost.title}</h1>
              <div className="event-detail-meta">
                <span className="event-detail-date">{activePost.date}</span>
                <span className="event-detail-category">{activePost.category}</span>
                <span className="event-detail-status">{checkEventStatus(activePost.date)}</span>
              </div>
            </div>

            <div className="event-detail-image">
              <img src={activePost.image || "/placeholder.svg"} alt={activePost.title} />
            </div>

            <div className="event-detail-body">
              <div className="event-detail-author">
                <img src={activePost.authorAvatar || "/placeholder.svg"} alt={activePost.author} />
                <div>
                  <span className="author-name">{activePost.author}</span>
                  {activePost.readTime && <span className="read-time">{activePost.readTime}</span>}
                </div>
              </div>

              <p className="event-detail-excerpt">{activePost.excerpt}</p>

              {activePost.content && (
                <div className="event-detail-content-body">
                  {activePost.content.map((line, i) => (
                    <p key={i} className="content-paragraph">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="event-posts-grid">
            {postsToShow.map((post) => (
              <div key={post.id} className="event-card">
                <div className="event-card-image">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} />
                  <span className="event-card-category">{post.category}</span>
                </div>
                <div className="event-card-content">
                  <div className="event-card-meta">
                    <span className="event-card-date">{post.date}</span>
                    <span className="event-card-status">{checkEventStatus(post.date)}</span>
                  </div>
                  <h3 className="event-card-title">{post.title}</h3>
                  <p className="event-card-excerpt">{post.excerpt}</p>
                  <div className="event-card-footer">
                    <div className="event-card-author">
                      <img src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                      <span className="event-card-author-name">{post.author}</span>
                    </div>
                    <div className="read-more-event-link" onClick={() => setActivePost(post)}>
                      Read More →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showLoadMore && (
            <div className="load-more-container">
              <button className="navbar-cta load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default EventPosts
