import React from "react";
import NavBar from "../../components/navbar/NavBar";
// import Button from "../../components/button/Button";
import "../drone/Drone.css";
import droneImage from "../../../images/png/drone.png";
import { DATA } from "../../../utils/constant/Data";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Drone: React.FunctionComponent<any> = ({ type: boolean }) => {
  const navigate = useNavigate();
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
      <section className="ft-drone-service">
        <div className="videography-main">
          <h1 className="featured-head">FEATURED DRONE SERVICES</h1>
          <ul className="droneapproach-details">
            {DATA.FeaturedDroneServices.map((item, index) => (
              <li className="droneapproach-services" key={index}>
                <div>
                  <video controls src={item.video} type="video/mp4" />
                </div>
                <div className="video-details">
                  <h2 className="video-heading">{item.title}</h2>
                  <p>{item.content}</p>
                  <div className="video-btn">
                    <Button
                      bgColor={"black"}
                      mTop={0}
                      mBottom={0}
                      mLeft={0}
                      mRight={0}
                      title="Get in Touch"
                      color="white"
                      fWeight={800}
                      onClickButton={() => {
                        navigate("/contact");
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* SECTION TWO */}
        <div>
          <ul className="mapping-ul">
            {DATA.MappingSurveying.map((item, index) => (
              <li className="mappping-services" key={index}>
                <div className="mapping-text">
                  <h2 className="mapping-heading">{item.title}</h2>
                  <p>{item.content}</p>
                </div>
                <div>
                  <img src={item.image} alt="survey Image" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Drone;
