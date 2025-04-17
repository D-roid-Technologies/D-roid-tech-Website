import React from "react";
import "./Products.css";
// import { IoIosArrowForward } from "react-icons/io";
import "../../components/liteGrid@v1.0/lite-grid.css";
import ButtonAlt from "../../components/button-alt/ButtonAlt";
import ProductCard from "../../components/productcard/ProductCard";
import { Assets } from "../../../utils/constant/Assets";

const Products: React.FC = () => {
  return (
    <>
      <section className="product_sec">
        <div className="wrapper">
          <div className="product_title">
            <span
              className="title_span"
              style={{ background: "#242627", color: "#efecfe" }}
            >
              OUR PRODUCTS
            </span>

            {/* <ButtonAlt>See All</ButtonAlt>   */}
          </div>
          <h1>Lorem ipsum dolor sit.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium, aspernatur animi quod blanditiis fuga sunt saepe labore
            molestias fugit inventore?
          </p>
          <div className="group">
            <div className="block-12 block-md-4">
              <ProductCard
                imageUrl={Assets.images.knowledgecity}
                category="School"
                price="Free"
                title="Knowledge City"
                author="D'roid Tech"
              />
            </div>
            {/* -------  */}
            <div className="block-12 block-md-4">
              <ProductCard
                imageUrl={Assets.images.cashBasket}
                category="Finance"
                price="Free"
                title="Cash Basket"
                author="D'roid Tech"
              />
            </div>
            {/* -------------  */}
            <div className="block-12 block-md-4">
              <ProductCard
                imageUrl={Assets.images.npm}
                category="Development"
                price="Free"
                title="NPM Packages"
                author="D'roid Tech"
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
    </>
  );
};

export default Products;
