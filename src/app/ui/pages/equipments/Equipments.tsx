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
              PROFESSIONAL EQUIPMENT SET-UP
              <br />
              SERVICES
            </p>
          </article>
          <p className="equipment-heading-details">
            Expert equipment setup services designed to ensure your technology
            infrastructure is installed correctly and efficiently.
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
      {/* OUR SERVICES SECTION */}
      <div className="equip-main">
        <div>
          <h1 className="equip-header"> Our Services </h1>
        </div>
        <section className="equipmentss">
          <div className="equip">
            <ul className="equip-services">
              {DATA.EquipmentServices.map((item, index) => (
                <li className="equip-list" key={index}>
                  <div className="equip-container">
                    <img src={item.image} alt="" className="equip-image" />
                    <p className="equip-title">{item.title}</p>
                    <p className="equip-content">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* BENEFIT OF WORKING WITH US */}
        <section className="equip-benefit">
          <div>
            <h1 className="equip-header"> Benefits of Working with Us </h1>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Equipments;
