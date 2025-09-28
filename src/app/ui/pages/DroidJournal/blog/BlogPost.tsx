import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogPost.css";
import { Assets } from "../../../../utils/constant/Assets";
import Navbar from "../../../components/navbar/NavBar";
import TechBlog from "./tech/TechBlog";
import BusinessBlog from "./business/BusinessBlog";
import EventBlog from "./events-/EventBlog";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const blogPosts: BlogPostData[] = [
    {
      id: "1",
      slug: "events",
      title: "Events",
      summary: "Latest events and conferences",
      imageUrl: Assets.images.events,
      category: "Activities",
      author: "D'roid",
    },
    {
      id: "2",
      slug: "tech",
      title: "Tech News",
      summary: "Latest technology news and updates",
      imageUrl: Assets.images.tech,
      category: "Technology",
      author: "D'roid",
    },
    {
      id: "3",
      slug: "business",
      title: "Business News",
      summary: "Business trends and financial news",
      imageUrl: Assets.images.business,
      category: "Business",
      author: "D'roid",
    },
  ];

  const post = blogPosts.find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase()
  );

  if (!post) {
    return (
      <div className="not-found">
        <h2>Post not found</h2>
        <button onClick={() => navigate(-1)}>Back to Blog</button>
      </div>
    );
  }

  const renderComponent = () => {
    switch (post.slug.toLowerCase()) {
      case "tech":
        return <TechBlog />;
      case "business":
        return <BusinessBlog />;
      case "events":
        return <EventBlog />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar className="scrolled" logo="logoTwo" />
      <div className="blog-post-container">
        <div className="wrapper">
          <div className="group justify-content-center">
            <div
              className="block-8 blog-info"
              style={{
                marginTop: "180px",
                marginBottom: "60px",
                textAlign: "center",
              }}
            >
              <span className="title_span">D'ROID BLOG</span>
              <h1>{post.title}</h1>
              <div className="meta-info">
                <p className="summary">{post.summary}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default BlogPost;
