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
import { FaMapMarkerAlt, FaSeedling } from "react-icons/fa";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { GiDeliveryDrone } from "react-icons/gi";
import { MdPhotoCameraFront } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
import { MdOndemandVideo } from "react-icons/md";
import { MdAgriculture } from "react-icons/md";
import { GiArchBridge } from "react-icons/gi";
import { FaPhotoVideo } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { VscInspect } from "react-icons/vsc";
import Slider from "react-slick";
import { RiSurveyLine } from "react-icons/ri";
import { LuInspect } from "react-icons/lu";
import { RiPlantLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";

const Drone: React.FunctionComponent<any> = ({ type: boolean }) => {
  //hidden text
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleContent = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  //End of hidden text
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
            Our fleet of advanced drones and experienced pilots enable us to
            deliver high-quality aerial imaging, mapping, inspection, and
            surveillance solutions tailored to meet the unique needs of our
            clients.
          </p>
        </article>
      </div>
      {/* OUR APPROACH SECTION */}
      <div className="bg-color">
        <motion.section
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="drone-approach-main"
        >
          <h1 className="droneapproach-head">OUR APPROACH</h1>
          <ul className="droneapproach-item">
            {DATA.droneApproach.map((item, index) => {
              const isExpanded = expandedIndex === index;
              const content = isExpanded
                ? item.content
                : item.content.substring(0, 100) + "...";
              return (
                <li className="droneapproach-list" key={index}>
                  <h2>{item.title}</h2>
                  <p>{content}</p>
                  <button
                    className="list-button"
                    onClick={() => toggleContent(index)}
                  >
                    {isExpanded ? "Show less" : "Learn more"}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.section>
        {/* <section className="drone-approach-main">
          <h1 className="droneapproach-head">OUR APPROACH</h1>
          <ul className="droneapproach-item">
            {DATA.droneApproach.map((item, index) => {
              const isExpanded = expandedIndex === index;
          const content = isExpanded ? item.content : item.content.substring(0, 100) + '...';
           return (
             <li className="droneapproach-list" key={index}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <button className="list-button" onClick={() => toggleContent(index)}>
                {isExpanded ? 'SHOW LESS' : 'LEARN MORE'}
              </button>
              </li>
            ))}
          </ul>
        </section> */}
        {/*  Featured Drone Service section*/}
        <section className="ft-drone-service">
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="featured-head"
          >
            FEATURED DRONE SERVICES
          </motion.h1>
          {/* AERIAL PHOTOGRAPHY AND VIDEOGRAPHY */}
          <section className="videography-main">
            <ul className="droneapproach-details">
              {DATA.FeaturedDroneServices.map((item, index) => (
                <li className="droneapproach-services" key={index}>
                  <motion.figure
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                  >
                    <video controls src={item.video} className="video-size" />
                    {/* <MdOndemandVideo className="map" /> */}
                  </motion.figure>
                  <motion.div
                    variants={fadeIn("left", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                    className="video-details"
                  >
                    <h2 className="video-heading">{item.title}</h2>
                    <p className="drone-text">{item.content}</p>
                    <div className="drone-video-btn">
                      <Button
                        bgColor={"black"}
                        mTop={0}
                        mBottom={0}
                        mLeft={0}
                        mRight={0}
                        title="Learn more"
                        color="white"
                        fWeight={800}
                        icon={<FaPhotoVideo className="style-home-icon" />}
                        onClickButton={() => {
                          navigate("/contact");
                        }}
                      />
                    </div>
                  </motion.div>
                </li>
              ))}
            </ul>
          </section>
          {/* MAPPING & SURVEYING */}
          <section className="mapping">
            <ul className="mapping-ul">
              {DATA.MappingSurveying.map((item, index) => (
                <li className="mappping-services" key={index}>
                  <motion.div
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                    className="mapping-text"
                  >
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
                        icon={<RiSurveyLine className="style-home-icon" />}
                        onClickButton={() => {
                          navigate("/contact");
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    variants={fadeIn("left", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                    className="maping-container"
                  >
                    <FaMapMarkerAlt className="map" />
                  </motion.div>
                </li>
              ))}
            </ul>
          </section>
          {/* Infrastructure Inspection */}
          <motion.section
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="infrastructure"
          >
            <ul className="infrastructure-ul">
              {DATA.InfrastructureInspection.map((item, index) => (
                <li className="infrastructure-services" key={index}>
                  <div className="map-container">
                    <GiArchBridge className="map" />
                    {/* <GiJapaneseBridge className="map" /> */}
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
                        icon={<LuInspect className="style-home-icon" />}
                        onClickButton={() => {
                          navigate("/contact");
                        }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Crop Monitoring & Agricultur */}
          <motion.section
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="cropmonitoring"
          >
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
                        icon={<FaSeedling className="style-home-icon" />}
                        onClickButton={() => {
                          navigate("/contact");
                        }}
                      />
                    </div>
                  </div>
                  <div className="monitoring-container">
                    <RiPlantLine className="map" />
                  </div>
                </li>
              ))}
            </ul>
            {/* </div> */}
          </motion.section>
        </section>
        {/* TECHNOLOGIES AND EQUIPMENT */}
        <section className="techandequipment">
          <h1 className="tech-heading">Technologies and Equipment </h1>
          {/* drone-model */}
          <div className="drone-camera-software">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="tools"
            >
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
            </motion.div>
            {/* Camera & Sensors */}
            <motion.div
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="tools"
            >
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
            </motion.div>
            {/* Software Tools */}
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="tools"
            >
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
            </motion.div>
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
                      exceeded our expectations.
                    </p>
                    <p className="drone-testifier">
                      — Sarah Smith, Project Manager
                    </p>
                  </div>
                  <div className="drone-testimonial-details">
                    <p>
                      "D'roid Technologies' drone services helped us streamlinee
                      our construction projects by providing accurate aerial
                      mapping and surveying data. Their team's professionalism
                      and attention to detail were commendable, and the results
                      exceeded our expectations.
                    </p>
                    <p className="drone-testifier">
                      — Sarah Smith, Project Manager
                    </p>
                  </div>
                </Slider>
                {/* End of carousel section */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Drone;
