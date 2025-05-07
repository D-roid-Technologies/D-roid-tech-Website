import React, { useState, useEffect } from "react";
import "./Blog.css";
import Navbar from "../../components/navbar/NavBar";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way we build modern web applications.",
      date: "June 10, 2023",
      author: "Alex Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      category: "Technology",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Mastering React Performance Optimization",
      excerpt:
        "Advanced techniques to make your React applications lightning fast and efficient.",
      date: "June 5, 2023",
      author: "Sam Wilson",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      category: "Programming",
      readTime: "12 min read",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "Design Systems for Developers",
      excerpt:
        "How to implement and maintain design systems that scale with your product.",
      date: "May 28, 2023",
      author: "Emma Davis",
      authorAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
      category: "Design",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "TypeScript Best Practices in 2023",
      excerpt:
        "The definitive guide to writing clean, maintainable TypeScript code.",
      date: "May 20, 2023",
      author: "Michael Chen",
      authorAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
      category: "Programming",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "The Psychology of Color in UI Design",
      excerpt:
        "How color choices impact user behavior and perception of your product.",
      date: "May 15, 2023",
      author: "Lisa Rodriguez",
      authorAvatar: "https://randomuser.me/api/portraits/women/82.jpg",
      category: "Design",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Building Scalable Microservices",
      excerpt:
        "Architecture patterns for creating resilient and scalable microservices.",
      date: "May 10, 2023",
      author: "David Kim",
      authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      category: "Architecture",
      readTime: "14 min read",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="blog-container">
      {/* Hero Section */}
      {/* <center style={{ marginBottom: "-100px", marginTop: "80px" }}>
          <span style={{ background: "#fff" }} className="title_span">
            D'ROID BLOG
          </span>
        </center> */}
      <section className="blog-hero">
        <div className="hero-content">
          <h1
            style={{
              color: "rgb(17, 23, 36)",
              fontSize: "5rem",
              fontWeight: "900",
            }}
          >
            <span className="hero-line">Explore the</span>
            <span className="hero-line">Future of</span>
            <span className="hero-line highlight">Technology</span>
          </h1>
          <p className="hero-subtitle">
            Insights, tutorials and cutting-edge trends from industry experts
          </p>
          <div>
            {/* <input type="text" placeholder="Search articles..." />
              <button className="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button> */}
            <a href="StartProjectPage" className="navbar-cta">
              Read More...
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Tech"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
