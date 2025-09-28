import React, { useEffect, useState } from "react";
import "./Events.css";
import { Link } from "react-router-dom";

interface eventPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime?: string;
  image: string;
  featured?: boolean;
  readMoreLink: string;
}

interface eventCardProps {
  posts: eventPost[]; // Required prop
}

const EventPosts: React.FC<eventCardProps> = ({ posts }) => {
  const [visiblePosts, setVisiblePosts] = useState<number>(4);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];


  // Filter posts by active category
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  // Slice posts to show based on visiblePosts count
  const postsToShow = filteredPosts.slice(0, visiblePosts);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  function checkEventStatus(sampleDateStr: string): string {
    // Parse the sample date (e.g., "Monday, 15th June 2026")
    const sampleDate = new Date(sampleDateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"));

    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get difference in days
    const diffInMs = sampleDate.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 1) {
      return "Event Incoming";
    } else if (diffInDays === 1) {
      return "Event Tomorrow";
    } else if (diffInDays < 0) {
      return "Event Passed";
    } else {
      return "Event Today"; // extra case: same day
    }
  }

  const showLoadMore = visiblePosts < filteredPosts.length;

  return (
    <section className="event-posts-section">

      <div className="event-posts-grid">
        {postsToShow.map((post) => (
          <div key={post.id} className="event-card">
            <div className="event-card-image">
              <img src={post.image} alt={post.title} />
              <span className="event-card-category">{post.category}</span>
            </div>
            <div className="event-card-content">
              <div className="event-card-meta">
                <span className="event-card-date">{post.date}</span>
                <span className="event-card-date">{checkEventStatus(post.date)}</span>
              </div>
              <h3 className="event-card-title">{post.title}</h3>
              <p className="event-card-excerpt">{post.excerpt}</p>
              <div className="event-card-footer">
                <div className="event-card-author">
                  <img src={post.authorAvatar} alt={post.author} />
                  <span className="event-card-date">{post.author}</span>
                </div>
                <Link to={post.readMoreLink} className="read-more-link">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLoadMore && (
        <div className="load-more-container">
          <button className="navbar-cta" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default EventPosts;
