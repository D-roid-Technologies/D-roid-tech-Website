import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../home/Home.css";
import { useNavigate } from "react-router-dom";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import CompanyCarousel from "../companycarousel/CompanyCarousel";
import Intro from "./intro/Intro";
import ProductsSmall from "../products/ProductsSmall";
import KnowledgeCity from "../knowledgecityApp/KnowledgeCity";
import Partners from "../../components/partners/Partners";
import PromoSection from "../../components/PromoModule/promo-section";
import Testimonial from "../testimonial/Testimonial";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      {/* <div className="home_banner">
        <p className="home-heading" style={{ color: "#fff" }}>
          WE TURN IDEAS INTO REALITY
        </p>

        <div style={{ width: "80%" }}>
          <p className="join-approach-details">
            We don’t just dream, we build. From concept to execution, we
            transform ideas into powerful, innovative solutions. Whether it’s a
            mobile app, website, or cutting-edge software, we bring your vision
            to life with precision and creativity.
            <br />
            <br />
            Let’s create something extraordinary together!
          </p>
        </div>
      </div> */}

      {/* main sections */}
      <CompanyCarousel />
      <Intro />
      <ProductsSmall />

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Company Management Portal</h2>
            <p>
              An all-in-one digital platform designed to help organizations
              efficiently manage their internal operations, staff, and
              resources.
            </p>
          </div>
        </div>
      </section>

      <KnowledgeCity />
      <Partners />

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Digital Workbench</h2>
            <p>
              A centralized, intelligent platform designed to streamline and
              support complex digital workflows across teams and departments.
            </p>
            <button
              className="cta-primary"
              onClick={() => navigate("/toolbox")}
            >
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
              companion, productivity partner, and entertainment powerhouse.
            </p>
            <button className="cta-primary" onClick={() => navigate("/mobile")}>
              See More
            </button>
          </div>
        </div>
      </section>

      <PromoSection />
    </div>
  );
};

export default Home;