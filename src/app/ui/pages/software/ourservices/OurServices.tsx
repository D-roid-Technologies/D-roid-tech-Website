import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import { Assets } from "../../../../utils/constant/Assets";
import "../ourservices/OurServices.css";

const OurServices: React.FunctionComponent = () => {
  return (
    <>
      {" "}
      <NavBar />
      <div
        style={{
          backgroundImage: `url("${Assets.images.companyBanner}")`,
          // backgroundImage: `url("${Assets.images.softwareBg}")`,
        }}
        className="details-bg-image"
      >
        <section className="softservice-main">
          <p className="page-head">Our services</p>
          <p className="page-head-details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            voluptate veritatis laboriosam quasi repellat minus nam blanditiis
            sint quisquam debitis nobis eveniet consequatur harum obcaecati
            soluta, et ullam provident possimus!
          </p>
        </section>
      </div>
    </>
  );
};

export default OurServices;
