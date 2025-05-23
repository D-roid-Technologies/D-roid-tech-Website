import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogPost.css";
import { Assets } from "../../../../utils/constant/Assets";
import Navbar from "../../../components/navbar/NavBar";
import BlogCards from "../../../components/blogPosts/BlogCards";
import TechBlog from "./tech/TechBlog";

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
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nobis, quis aut pariatur dolorum ex?",
      imageUrl: Assets.images.events,
      category: "Activities",
      author: "D'roid",
    },
    {
      id: "2",
      slug: "tech-news",
      title: "Tech News",
      summary:
        "Empower your Learning Journey with Knowledge City Whether you're a student, educator, or professional, our platform is designed to deliver an engaging and seamless learning experience.",
      imageUrl:
        "https://cdn.prod.website-files.com/60dea2341adbe2c3648a27e6/656804feaf393aa82e16f83a_Tech%20news.png",
      category: "News",
      author: "D'roid",
    },
    {
      id: "3",
      slug: "business-news",
      title: "Business News",
      summary:
        "The revamped and enhanced Ecobank Mobile app makes it super easy to bank on the go 24/7. Manage your everyday banking needs anywhere anytime directly from your mobile device. Manage your account, send money, make payments and get help from the Ecobank mobile app in all 33 African countries where Ecobank is present.",
      imageUrl: Assets.images.business,
      category: "News",
      author: "Eco Bank",
    },
  ];

  // Find post by slug (case insensitive)
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

  return (
    <div>
      <Navbar className="scrolled" />
      <div className="blog-post-container">
        {/* <div className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="meta-info">
            <span className="category">{post.category}</span>
            <span className="author">By {post.author}</span>
          </div>
        </div> */}

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

        <div className="wrapper">
            <TechBlog />
          {/* <img src={post.imageUrl} alt={post.title} className="featured-image" /> */}
          {/* <p className="summary">{post.summary}</p> */}

          {/* Add more content sections as needed */}
          <div className="full-content">
            {/* This would be your full blog content */}
            {/* You might want to add a separate 'content' field in your data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
