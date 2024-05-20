import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
// import Button from "../../components/button/Button";
import "../drone/Drone.css";
import droneImage from "../../../images/png/drone.png";
import customerFeedbackimg from "../../../images/png/customerfeedback2.jpg";
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
import { GiDeliveryDrone } from "react-icons/gi";
import { MdPhotoCameraFront } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
import { MdOndemandVideo } from "react-icons/md";
import { MdAgriculture } from "react-icons/md";
import { GiJapaneseBridge } from "react-icons/gi";
import Slider from "react-slick";

const Drone: React.FunctionComponent<any> = ({ type: boolean }) => {
  const [isTextHidden, setIsTextHidden] = useState(false);
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
        "D'roid Technologies drone services helped us streamline our
        construction projects by providing accurate aerial mapping and surveying
        data. Their team's professionalism and attention to detail were
        commendable, and the results exceeded our expectations." - Sarah Smith,
        Project Manager.
      </p>
    </>
  );
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
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
      <div className="bg-color">
        <section className="drone-approach-main">
          <h1 className="droneapproach-head">OUR APPROACH</h1>
          <ul className="droneapproach-item">
            {DATA.droneApproach.map((item, index) => (
              <li className="droneapproach-list" key={index}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <span className="list-button">{item.Button}</span>
                {/* <button onClick={() => setIsTextHidden(!isTextHidden)}>
                  Toggle Text
                </button> */}
              </li>
            ))}
          </ul>
        </section>
        {/*  Featured Drone Service */}
        <section className="ft-drone-service">
          <h1 className="featured-head">FEATURED DRONE SERVICES</h1>
          {/* AERIAL PHOTOGRAPHY AND VIDEOGRAPHY */}
          <section className="videography-main">
            <ul className="droneapproach-details">
              {DATA.FeaturedDroneServices.map((item, index) => (
                <li className="droneapproach-services" key={index}>
                  <figure>
                    <video controls src={item.video} />
                    {/* <MdOndemandVideo className="map" /> */}
                  </figure>
                  <div className="video-details">
                    <h2 className="video-heading">{item.title}</h2>
                    <p className="drone-text">{item.content}</p>
                    <div className="video-btn">
                      <Button
                        bgColor={"black"}
                        mTop={0}
                        mBottom={0}
                        mLeft={0}
                        mRight={0}
                        title="Learn more"
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
                    <p className="drone-text">{item.content}</p>
                    <div className="video-btn">
                      <Button
                        bgColor={"black"}
                        mTop={0}
                        mBottom={0}
                        mLeft={0}
                        mRight={0}
                        title="Learn more"
                        color="white"
                        fWeight={800}
                        onClickButton={() => {
                          navigate("/contact");
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <FaMapMarkerAlt className="map" />
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {/* Infrastructure Inspection */}
          <section className="infrastructure">
            <ul className="infrastructure-ul">
              {DATA.InfrastructureInspection.map((item, index) => (
                <li className="infrastructure-services" key={index}>
                  <div>
                    <GiJapaneseBridge className="map" />
                  </div>
                  <div className="infrastructure-text">
                    <h2 className="infrastructure-heading">{item.title}</h2>
                    <p className="drone-text">{item.content}</p>
                    <div className="video-btn">
                      <Button
                        bgColor={"black"}
                        mTop={0}
                        mBottom={0}
                        mLeft={0}
                        mRight={0}
                        title="Learn more"
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

          {/* Crop Monitoring & Agricultur */}
          <section className="cropmonitoring">
            <ul className="cropmonitoring-ul">
              {DATA.CropMonitoringAgriculture.map((item, index) => (
                <li className="cropmonitoring-services" key={index}>
                  <div className="cropmonitoring-text">
                    <h2 className="cropmonitoring-heading">{item.title}</h2>
                    <p className="drone-text">{item.content}</p>
                    <div className="video-btn">
                      <Button
                        bgColor={"black"}
                        mTop={0}
                        mBottom={0}
                        mLeft={0}
                        mRight={0}
                        title="Learn more"
                        color="white"
                        fWeight={800}
                        onClickButton={() => {
                          navigate("/contact");
                        }}
                      />
                    </div>
                  </div>
                  <picture>
                    {/* <img src={item.image} alt="survey Image" className="map" /> */}
                    <MdAgriculture className="map" />
                  </picture>
                </li>
              ))}
            </ul>
            {/* </div> */}
          </section>
        </section>
        {/* TECHNOLOGIES AND EQUIPMENT */}
        <section className="techandequipment">
          <h1 className="tech-heading">Technologies and Equipment </h1>
          {/* drone-model */}
          <div className="drone-camera-software">
            <div className="tools">
              <ul>
                {DATA.DroneModels.map((item, index) => (
                  <li className="mappping-services" key={index}>
                    <div className="tools-container">
                      <GiDeliveryDrone className="image-icon" />
                      <h2 className="title">{item.title}</h2>
                      <p className="content">{item.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Camera & Sensors */}
            <div className="tools">
              <ul>
                {DATA.CamerasSensors.map((item, index) => (
                  <li className="mappping-services" key={index}>
                    <div className="tools-container">
                      <MdPhotoCameraFront className="image-icon" />
                      <h2 className="title">{item.title}</h2>
                      <p className="content">{item.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Software Tools */}
            <div className="tools">
              <ul>
                {DATA.SoftwareTools.map((item, index) => (
                  <li className="mappping-services" key={index}>
                    <div className="tools-container">
                      <LiaToolsSolid className="image-icon" />
                      <h2 className="title">{item.title}</h2>
                      <p className="content">{item.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* CUSTOMER FEED BACK */}
        <section className="feedback">
          <div
            style={{
              backgroundImage: `url("${customerFeedbackimg}")`,
            }}
            className="droneBg-image"
          >
            <div className="drone-customer-testimonials">
              <div>
                <h2 className="drone-read">
                  READ WHAT OUR CUSTOMERS HAVE TO SAY!
                </h2>
                {/* carousel section */}
                <Slider {...settings}>
                  <div className="drone-testimonial-details">
                    <p>
                      "D'roid Technologies' drone services helped us streamline
                      our construction projects by providing accurate aerial
                      mapping and surveying data. Their team's professionalism
                      and attention to detail were commendable, and the results
                      exceeded our expectations." - Sarah Smith, Project Manager
                    </p>
                    <p className="drone-testifier">
                      — Sarah Smith, Project Manager
                    </p>
                  </div>
                  <div className="drone-testimonial-details">
                    <p>
                      "D'roid Technologies' drone services helped us streamline
                      our construction projects by providing accurate aerial
                      mapping and surveying data. Their team's professionalism
                      and attention to detail were commendable, and the results
                      exceeded our expectations." - Sarah Smith, Project Manager
                    </p>
                    <p className="drone-testifier">
                      — Sarah Smith, Project Manager
                    </p>
                  </div>
                </Slider>
                {/* End of carousel section */}
                {/* <div className="drone-contact-uss">
                  <div className="drone-contactuss-button">
                    <Button
                      bgColor={"black"}
                      mTop={0}
                      mBottom={0}
                      mLeft={0}
                      mRight={0}
                      title="See more testimonials"
                      color="white"
                      fWeight={800}
                      bRadius={5}
                      onClickButton={() => {
                        navigate("/contact");
                      }}
                    />
                  </div>
                </div> */}
              </div>
            </div>
            {/* ff
        <div className="product-buttons">
          <div className="See-our-products">
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
        </div> */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Drone;
