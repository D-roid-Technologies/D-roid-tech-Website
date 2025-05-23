import React, { useState } from "react";
import "./BlogCards.css";
import { Link } from "react-router-dom";

interface BlogPost {
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

interface BlogCardProps {
  posts: BlogPost[]; // Required prop
}

const BlogCards: React.FC<BlogCardProps> = ({ posts }) => {
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

  const showLoadMore = visiblePosts < filteredPosts.length;

  return (
    <section className="blog-posts-section">
      {/* <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setActiveCategory(category);
              setVisiblePosts(3);
            }}
          >
            {category}
          </button>
        ))}
      </div> */}

      <div className="blog-posts-grid">
        {postsToShow.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <span className="blog-card-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span className="blog-card-date">{post.date}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <div className="blog-card-author">
                  <img src={post.authorAvatar} alt={post.author} />
                  <span>{post.author}</span>
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

export default BlogCards;
