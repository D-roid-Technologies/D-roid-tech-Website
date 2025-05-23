import React, { useState, useEffect } from "react";
import "./Blog.css";
import Navbar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import ProductCard from "../../components/productcard/ProductCard";
import { RoutePaths } from "../../../routes/Index";

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


  const projects = [
    {
      id: "1",
      title: "Events",
      status: "In Communication",
      // descriptionUrl: "/projects/blockchain-logistics",
      descriptionUrl: `${RoutePaths.Blog}/events`,
      summary:
        "At D'roid, we transform ideas into reality through groundbreaking projects that blend technology, creativity, and innovation. From AI-driven solutions to dynamic web platforms and immersive animations, every project reflects our commitment to excellence, forward-thinking design, and real-world impact.",
      startDate: "2025-05-01",
      client: "TransGlobe Shipping",
      team: ["Ngozi Obi", "Liam Chen", "Julia Fernandez"],
      imageUrl: Assets.images.events,
      category: "Activities",
      price: "",
      author: "D'roid",
    },
    {
      id: "2",
      title: "Tech News",
      status: "Ongoing",
      // descriptionUrl: "https://kcity-c8580.web.app/",
      descriptionUrl: `${RoutePaths.Blog}/tech-news`,
      summary:
        "Empower your Learning Journey with Knowledge City Whether you're a student, educator, or professional, our platform is designed to deliver an engaging and seamless learning experience.",
      startDate: "2023-01-10",
      client: "Rectail Education Board.",
      team: ["Alice Johnson", "Daniel Okafor", "Wei Lin"],
      imageUrl:
        "https://cdn.prod.website-files.com/60dea2341adbe2c3648a27e6/656804feaf393aa82e16f83a_Tech%20news.png",
      category: "News",
      price: "",
      author: "D'roid",
    },
    {
      id: "3",
      title: "Business News",
      status: "Completed",
      descriptionUrl: `${RoutePaths.Blog}/business-news`,
      summary:
        "The revamped and enhanced Ecobank Mobile app makes it super easy to bank on the go 24/7. Manage your everyday banking needs anywhere anytime directly from your mobile device. Manage your account, send money, make payments and get help from the Ecobank mobile app in all 33 African countries where Ecobank is present.",
      startDate: "2023-03-03",
      endDate: "2023-11-01",
      client: "Ecobank Nigeria",
      team: ["Sandra Kim", "Mohamed Al-Mansoor", "James Liu"],
      imageUrl: Assets.images.business,
      category: "News",
      price: "",
      author: "Eco Bank",
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
            <span className="hero-line">The D'roid </span>
            {/* <span className="hero-line">Future of</span> */}
            <span className="hero-line highlight">Journal</span>
          </h1>
          <p className="hero-subtitle">
            Your premier source for everything happening in the world of D’roid
            Technologies and beyond. From exclusive behind-the-scenes access to
            our latest events and product launches, to curated insights into the
            fast-evolving tech industry and strategic business trends—this
            journal keeps you informed, inspired, and ahead of the curve.
          </p>
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
      <section className="product_sec">
        <div className="wrapper">
          <div className="product_title">
            <span
              className="title_span"
              style={{ background: "#242627", color: "#efecfe" }}
            >
              CATEGORY
            </span>
          </div>
          <h1>Our Categories</h1>
          <p>
            Whether you're a client, developer, entrepreneur, or simply
            tech-curious, The D’roid Journal delivers thought-provoking content
            designed to connect innovation with impact.
          </p>
          <div className="group">
            {projects.map((product, index) => (
              <div key={index} className="block-12 block-md-4">
                <ProductCard
                  imageUrl={product.imageUrl}
                  category={product.category}
                  price={product.price}
                  title={product.title}
                  author={product.author}
                  descriptionUrl={product.descriptionUrl}
                  summary={product.summary}
                  startDate={""}
                  client={""}
                  team={[]}
                  isBtn={true}
                />
              </div>
            ))}
          </div>
          {/* <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
            <a
              href={RoutePaths.Products}
              style={{ backgroundColor: "#fff", color: "#071d6a" }}
              className="navbar-cta"
            >
              See all Projects
            </a>
          </div> */}
        </div>
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default Blog;
