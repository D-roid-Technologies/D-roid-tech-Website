import React from "react";
import NavBar from "../../components/navbar/NavBar";
// import Button from "../../components/button/Button";
import "../drone/Drone.css";
import droneImage from "../../../images/png/drone.png";
import { DATA } from "../../../utils/constant/Data";

const Drone: React.FunctionComponent<any> = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${droneImage}")`,
        }}
        className="bg-image"
      >
        <NavBar />

        {/* CONTENT */}
        <div className="drone">
          <article className="drone-content">
            <p className="drone-heading">
              DRONES ARE CHANGING
              <br />
              THE WORLD
            </p>
          </article>
          <p className="drone-heading-details">
            At D'roid Technologies, we offer cutting-edge drone services
            designed to revolutionize various industries and applications. Our
            fleet of advanced drones and experienced pilots enable us to deliver
            high-quality aerial imaging, mapping, inspection, and surveillance
            solutions tailored to meet the unique needs of our clients.
          </p>
        </div>
      </div>
      {/* OUR APPROACH SECTION */}
      <div className="drone-approach-main">
        <h1 className="droneapproach-head">OUR APPROACH</h1>
        <ul className="droneapproach-item">
          {DATA.droneApproach.map((item, index) => (
            <li className="droneapproach-list" key={index}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <span className="list-button">{item.Button}</span>
            </li>
          ))}
        </ul>
      </div>
      {/*  Featured Drone Service */}
      <section>
        <div>
          <h1 className="droneapproach-head">FEATURED DRONE SERVICES</h1>
          <ul className="droneapproach-item">
            {DATA.FeaturedDroneServices.map((item, index) => (
              <li className="droneapproach-list" key={index}>
                <img src={item.image} alt="" />
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Drone;
