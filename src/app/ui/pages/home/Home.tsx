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
import PromoSection from "../../components/PromoModule/promo-section";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <NavBar />
      <CompanyCarousel />
      <Intro />
      <ProductsSmall />
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Company Management Portal</h2>
            <p>
              An all-in-one digital platform designed to help organizations efficiently manage their internal operations, staff, and resources. It provides a centralized dashboard for administrators and managers to oversee key business functions such as employee management, project tracking, performance monitoring, compliance, and document control.
            </p>
            <button className="cta-primary" onClick={() => navigate("/auth/join-our-community")}>
              Get Started
            </button>
          </div>
        </div>
      </section>
      <KnowledgeCity />

      <Partners />
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Digital Workbench</h2>
            <p>A centralized, intelligent platform designed to streamline and support complex digital workflows across teams and departments. It serves as a collaborative environment where users can access tools, data, and resources needed to design, test, and manage digital solutions efficiently.</p>
            <button className="cta-primary" onClick={() => navigate("/toolbox")}>
              Launch ToolBox
            </button>
          </div>
        </div>
      </section>
      <Testimonial />
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>D'roid Companion</h2>
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
      <PromoSection/>
    </div>
  );
};

export default Home;
