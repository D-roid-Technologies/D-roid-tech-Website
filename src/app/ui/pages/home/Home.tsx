import React from "react";
import NavBar from "../../components/navbar/NavBar";
import companyBanner from "../../../images/png/droid banner.png";
import "../home/Home.css";
import AboutSection from "../../components/aboutsections/AboutSection";
import CustomerFeedBack from "../../components/customerfeedback/CustomerFeedBack";

const Home: React.FunctionComponent = () => {
  console.log(companyBanner);
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${companyBanner}")`,
        }}
        className="bg-image"
      >
        <NavBar />

        {/* CONTENT */}
        <article className="home-content">
          <p className="business">
            TRANSFORM YOUR <br />
            BUSINESS TODAY
          </p>
        </article>
        <p className="empower">
          Empower your team with cutting-edge software solutions.
        </p>
        <div className="button">
          <button className="product-button">See Our Products</button>
        </div>
        {/* END OF CONTENT */}
      </div>
      <AboutSection />
      <CustomerFeedBack />
    </div>
  );
};

export default Home;
