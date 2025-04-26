import React from "react";
import "./Products.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import ProductCard from "../../components/productcard/ProductCard";
import { Assets } from "../../../utils/constant/Assets";

interface Product {
  imageUrl: string;
  category: string;
  price: string;
  title: string;
  author: string;
}

const Products: React.FC = () => {
  const products: Product[] = [
    {
      imageUrl: Assets.images.knowledgecity,
      category: "School",
      price: "Free",
      title: "Knowledge City",
      author: "D'roid Tech",
    },
    {
      imageUrl: Assets.images.cashBasket,
      category: "Finance",
      price: "Free",
      title: "Cash Basket",
      author: "D'roid Tech",
    },
    {
      imageUrl: Assets.images.npm,
      category: "Development",
      price: "Free",
      title: "NPM Packages",
      author: "D'roid Tech",
    },
  ];

  return (
    <section className="product_sec">
      <div className="wrapper">
        <div className="product_title">
          <span
            className="title_span"
            style={{ background: "#242627", color: "#efecfe" }}
          >
            OUR PRODUCTS
          </span>
        </div>
        <h1>Lorem ipsum dolor sit.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusantium, aspernatur animi quod blanditiis fuga sunt saepe labore
          molestias fugit inventore?
        </p>
        <div className="group">
          {products.map((product, index) => (
            <div key={index} className="block-12 block-md-4">
              <ProductCard
                imageUrl={product.imageUrl}
                category={product.category}
                price={product.price}
                title={product.title}
                author={product.author}
              />
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
    </section>
  );
};

export default Products;
