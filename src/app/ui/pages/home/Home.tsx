import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <a href="/contact">Home</a>
      <Footer />
    </div>
  );
};

export default Home;
