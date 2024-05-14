import React from "react";
import NavBar from "../../components/navbar/NavBar";
// import Button from "../../components/button/Button";
import "../drone/Drone.css";
import droneImage from "../../../images/png/drone.png";
import { DATA } from "../../../utils/constant/Data";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import cropMonitoring from "../../../images/png/cropmonitoring3.png";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";

const Drone: React.FunctionComponent<any> = ({ type: boolean }) => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  // console.log(companyBanner);
  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const onSuccessTitle = "Our Testimonies";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p>
        {" "}
        "D'roid Technologies drone services helped us streamline our
        construction projects by providing accurate aerial mapping and surveying
        data. Their team's professionalism and attention to detail were
        commendable, and the results exceeded our expectations." - Sarah Smith,
        Project Manager.{" "}
      </p>
    </>
  );
  const navigate = useNavigate();
  return (
    <main>
      <div
        style={{
          backgroundImage: `url("${droneImage}")`,
        }}
        className="bg-image"
      >
        <NavBar />

        {/* CONTENT */}
        <article className="drone">
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
        </article>
      </div>
      {/* OUR APPROACH SECTION */}
      <section className="drone-approach-main">
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
      </section>
      {/*  Featured Drone Service */}
      <section className="ft-drone-service">
        <section className="videography-main">
          <h1 className="featured-head">FEATURED DRONE SERVICES</h1>
          {/* AERIAL PHOTOGRAPHY AND VIDEOGRAPHY */}
          <ul className="droneapproach-details">
            {DATA.FeaturedDroneServices.map((item, index) => (
              <li className="droneapproach-services" key={index}>
                <figure>
                  <video controls src={item.video} type="video/mp4" />
                </figure>
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
        </section>
        {/* MAPPING & SURVEYING */}
        <section className="mapping">
          <ul className="mapping-ul">
            {DATA.MappingSurveying.map((item, index) => (
              <li className="mappping-services" key={index}>
                <div className="mapping-text">
                  <h2 className="mapping-heading">{item.title}</h2>
                  <p>{item.content}</p>
                </div>
                <div>
                  <FaMapMarkerAlt className="map" />
                  {/* <img src={item.image} alt="survey Image" /> */}
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Infrastructure Inspection */}
        <section className="infrastructure">
          <ul className="mapping-ul">
            {DATA.InfrastructureInspection.map((item, index) => (
              <li className="mappping-services" key={index}>
                <picture>
                  <img src={item.image} alt="survey Image" />
                </picture>
                <div className="mapping-text">
                  <h2 className="mapping-heading">{item.title}</h2>
                  <p>{item.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Crop Monitoring & Agricultur */}
        <section className="cropmonitoring">
          {/* <div
          style={{
            backgroundImage: `url("${cropMonitoring}")`,
          }}
          className="bg-image"
        > */}
          <ul className="mapping-ul">
            {DATA.CropMonitoringAgriculture.map((item, index) => (
              <li className="mappping-services" key={index}>
                <div className="mapping-text">
                  <h2 className="mapping-heading">{item.title}</h2>
                  <p>{item.content}</p>
                </div>
                <picture>
                  <img src={item.image} alt="survey Image" />
                </picture>
              </li>
            ))}
          </ul>
          {/* </div> */}
        </section>
      </section>
      {/* Technologies & Equipment */}
      <section className="techandequipment">
        <h1 className="tech-heading">TECHNOLOGIES AND EQUIPMENT </h1>
        {/* drone-model */}
        <div className="drone-camera-software">
          <div>
            <ul>
              {DATA.DroneModels.map((item, index) => (
                <li className="mappping-services" key={index}>
                  <div className="">
                    <img src={item.image} alt="" className="imagesize" />
                    <h2 className="title">{item.title}</h2>
                    <p className="content">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Camera & Sensors */}
          <div>
            <ul>
              {DATA.CamerasSensors.map((item, index) => (
                <li className="mappping-services" key={index}>
                  <div className="">
                    <img src={item.image} alt="" className="imagesize" />
                    <h2 className="title">{item.title}</h2>
                    <p className="content">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Software Tools */}
          <div>
            <ul>
              {DATA.SoftwareTools.map((item, index) => (
                <li className="mappping-services" key={index}>
                  <div>
                    <img src={item.image} alt="" className="imagesize" />
                    <h2 className="title">{item.title}</h2>
                    <p className="content">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="product-button">
          <div className="See-our-product">
            <Button
              bgColor={"black"}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              title="See our Testimonials"
              color="white"
              fWeight={800}
              onClickButton={() => {
                store.dispatch(updateModal(true));
                store.dispatch(
                  updateModalContent({
                    appTitle: onSuccessTitle,
                    appBody: onSuccessBody,
                  })
                );
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Drone;
