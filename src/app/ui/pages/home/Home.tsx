import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../home/Home.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import CompanyCarousel from "../companycarousel/CompanyCarousel";
import Intro from "./intro/Intro";
import Products from "../products/Products";
import Testimonial from "../testimonial/Testimonial";
import ProductsSmall from "../products/ProductsSmall";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);

  return (
    <div>
      <NavBar />
      <CompanyCarousel />
      <Intro />
      <ProductsSmall />
      <Testimonial />
    </div>
  );
};

export default Home;
