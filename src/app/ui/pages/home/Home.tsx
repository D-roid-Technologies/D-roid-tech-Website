import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../home/Home.css";
import { useNavigate } from "react-router-dom";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import CompanyCarousel from "../companycarousel/CompanyCarousel";
import Intro from "./intro/Intro";
import Products from "../products/Products";
import Testimonial from "../testimonial/Testimonial";
import ProductsSmall from "../products/ProductsSmall";
import KnowledgeCity from "../knowledgecityApp/KnowledgeCity";
import Partners from "../../components/partners/Partners";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <NavBar />
      <CompanyCarousel />
      <Intro />
      <ProductsSmall />
      <KnowledgeCity />
      <Partners />
      <Testimonial />
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 style={{ fontSize: "4rem", fontWeight: "900" }}>
              D'roid Companion
            </h2>
            <p>
              Experience technology that adapts to your lifestyle. The D'roid
              Companion is more than just a phone — it's your creative
              companion, productivity partner, and entertainment powerhouse, all
              in one sleek, powerful device.
            </p>
            <button className="cta-primary" onClick={() => navigate("/mobile")}>
              See More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
