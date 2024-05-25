import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../equipments/Equipments.css";
import equipmentbg from "../../../images/png/equipmentSetup.jpg";
import { DATA } from "../../../utils/constant/Data";
import TechnologiesAndTools from "../../components/technologies/TechnologiesAndTools";

const Equipments: React.FunctionComponent<any> = () => {
  return (
    <main>
      <div
        style={{
          backgroundImage: `url("${equipmentbg}")`,
        }}
        className="e-image"
      >
        <NavBar />

        {/* CONTENT */}
        <article className="equipment-main">
          <article className="equipment-content">
            <p className="equipment-heading">
              EQUIPMENT SETUP
              <br />
              SERVICES
            </p>
          </article>
          <p className="equipment-heading-details">
            At D'roid Technologies, we offer comprehensive equipment setup
            services to ensure that our clients have the tools they need to
            succeed. From hardware installation to network configuration, our
            experienced technicians handle every aspect of the setup process,
            allowing our clients to focus on their core business activities..
          </p>
        </article>
      </div>
      {/* OUR APPROACH SECTION */}
      {/* <div className="bg-color">
        <section className="drone-approach-main">
          <h1 className="droneapproach-head">OUR APPROACH</h1>
          <ul className="droneapproach-item">
            {DATA.equipmentApproach.map((item, index) => (
              <li className="droneapproach-list" key={index}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <span className="list-button">{item.Button}</span>
              </li>
            ))}
          </ul>
        </section>
      </div> */}
      {/* TECHNOLOGIES AND EQUIPMENT */}
      {/* <TechnologiesAndTools /> */}
    </main>
  );
};

export default Equipments;
