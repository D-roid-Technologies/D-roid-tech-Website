import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import { Assets } from "../../../../utils/constant/Assets";
import "../trainingprograms/TrainingPrograms.css";

const TrainingPrograms: React.FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <div
        style={{
          // backgroundImage: `url("${Assets.images.companyBanner}")`,
          backgroundImage: `url("${Assets.images.staffBg}")`,
        }}
        className="bg-image"
      >
        <section className="tprogramservice-main">
          <p className="page-header">Our Programs</p>
          <p className="page-header-details">
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

export default TrainingPrograms;
