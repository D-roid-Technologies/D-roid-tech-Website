import React from "react";
import "./ProductCard.css";

interface ProductCardProps {
  imageUrl: string;
  category: string;
  price: string;
  title: string;
  author: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  category,
  price,
  title,
  author,
}) => {
  return (
    <div className="product-card">
      <div className="card-image">
        <img src={imageUrl} alt={title} />
        <button className="see-product-btn">See Product</button>
      </div>
      <div className="card-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="category-badge">{category}</span>
          <h3 className="price">{price}</h3>
        </div>
        <h2 className="product-title">{title}</h2>
        <p className="author">By {author}</p>
      </div>
    </div>
  );
};

export default ProductCard;
