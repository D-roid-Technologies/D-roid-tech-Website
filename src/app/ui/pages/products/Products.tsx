import React from "react";
import "./Products.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import ProductCard from "../../components/productcard/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <div>
      {/* Hero */}
      <div className="software-main">
        <div className="wrapper">
          <div className="software-main-content">
            <div style={{ margin: "1rem 0" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#071D6A",
                  color: "#fff",
                  border: "1px solid #000000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </div>
            <h1 className="software-header">D'roid Products</h1>
            <p>
              We build scalable, performant, and user-focused software tailored
              to your business needs—from concept to launch.
            </p>
          </div>
        </div>
      </div>

      <section className="product_sec" style={{ marginTop: "-10px" }}>
        <div className="wrapper">
          <div className="product_title">
            <span
              className="title_span"
              style={{ background: "#242627", color: "#efecfe" }}
            >
              OUR PRODUCTS
            </span>
          </div>
          <h1>Our Innovations and Projects</h1>
          <p>
            We transform ideas into reality through groundbreaking projects that
            blend technology, creativity, and innovation. From AI-driven
            solutions to dynamic web platforms and immersive animations, every
            project reflects our commitment to excellence, forward-thinking
            design, and real-world impact.
          </p>
          <div className="group">
            {/* {projects.slice(0, 3).map((product, index) => ( */}
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
                  startDate=""
                  client=""
                  team={[]}
                />
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default Products;
