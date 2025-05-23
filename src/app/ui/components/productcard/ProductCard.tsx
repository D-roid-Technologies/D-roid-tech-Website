import React from "react";
import { useNavigate } from "react-router-dom"; // Add this
import { Project } from "../../../utils/Types";
import "./ProductCard.css";

interface ProductCardProps {
  imageUrl: string;
  category: string;
  price: string;
  title: string;
  author: string;
  summary: string;
  descriptionUrl: string;
}

const ProductCard: React.FC<Project> = ({
  imageUrl,
  category,
  price,
  title,
  author,
  summary,
  descriptionUrl,
  isBtn = false,
}) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={imageUrl} alt={title} />
        {isBtn === false ? (
          <button
            onClick={() => window.open(`${descriptionUrl}`, "_blank")}
            className="see-product-btn"
          >
            See Product
          </button>
        ) : (
          <button
            onClick={() => navigate(descriptionUrl)} // Use navigate here
            className="see-product-btn"
          >
            Let's dive in...
          </button>
        )}
      </div>
      <div className="card-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="category-badge">{category}</span>
          <h3 className="price">{price}</h3>
        </div>
        <h2 className="product-title">{title}</h2>
        <h2 className="author">{summary}</h2>
        <p className="author">By {author}</p>
      </div>
    </div>
  );
};

export default ProductCard;
