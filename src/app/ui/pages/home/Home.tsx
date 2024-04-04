import React from "react";
import NavBar from "../../components/navbar/NavBar";

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <a href="/contact">Home</a>
    </div>
  );
};

export default Home;
