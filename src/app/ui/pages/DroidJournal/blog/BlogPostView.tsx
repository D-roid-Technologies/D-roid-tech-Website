import React from "react";
import { useParams } from "react-router-dom";
import "./BlogPostView.css";
import { allPosts } from "../../../../utils/blogpost"; 

const BlogPostView: React.FC = () => {
  const { title } = useParams<{ title: string }>();

  const decodedTitle = title?.replace(/-/g, " ");
  const post = allPosts.find(
    (p) => p.title.toLowerCase() === decodedTitle?.toLowerCase()
  );

  if (!post) {
    return (
      <div className="not-found-container">
        <h2>Post Not Found</h2>
        <p>
          The article you're looking for doesn't exist or may have been moved.
        </p>
        <a href="/more/blog" className="back-link">
          ← Back to Blog
        </a>
      </div>
    );
  }

  return (
    <div className="blog-post-view">
      <div className="post-header">
        {/* <img src={post.image} alt={post.title} className="post-hero-image" /> */}
        <div className="post-header-content">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <div className="author-info">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="author-avatar"
              />
              <span className="author-name">{post.author}</span>
            </div>
            <div className="post-details">
              <span className="blog-post-date">{post.date}</span>
              <span className="blog-post-category">{post.category}</span>
              <span className="blog-post-readtime">{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p className="blog-post-excerpt">{post.excerpt}</p>
        {/* Add your content here when you expand the BlogPost interface */}
      </div>
    </div>
  );
};

export default BlogPostView;
