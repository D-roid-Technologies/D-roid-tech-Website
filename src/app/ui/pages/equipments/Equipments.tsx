import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../equipments/Equipments.css";
import equipmentbg from "../../../images/png/equipmentSetup.jpg";
import { DATA } from "../../../utils/constant/Data";
import TechnologiesAndTools from "../../components/technologies/TechnologiesAndTools";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { courses } from "../../../utils/constant/EquipmentServices";
import { useNavigate } from "react-router-dom";
import { FcCustomerSupport } from "react-icons/fc";
import {
  FaBookReader,
  FaCheckCircle,
  FaHandshake,
  FaThumbsUp,
} from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";

const Equipments: React.FunctionComponent<any> = () => {
  const navigate = useNavigate();
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

      {/* OUR SERVICES SECTION */}
      <div className="equip-main">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <h1 className="equip-header"> Our Services </h1>
        </motion.div>
        <motion.section
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="margin-btm"
        >
          <ul className="service-card-container">
            {courses.map((course) => (
              <Card
                key={course.id}
                title={course.title}
                image="https://via.placeholder.com/300x200"
                content={course.trainings}
                actions={
                  <Button
                    title="See More Details"
                    bgColor="#000000"
                    color="#ffffff"
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    bRadiusColor="#FFFFFF"
                    onClickButton={() => {
                      navigate("/contact");
                    }}
                  />
                }
              />
            ))}
          </ul>
        </motion.section>

        {/* BENEFIT OF WORKING WITH US */}
        <section className="margin-btm">
          <div className="choose-us-product">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <FaHandshake
                className="our-catalog-icon equip-icon"
                // id="equip-icon"
              />
            </motion.div>
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="our-catalog-right"
            >
              <h1 className="our-catalog-header">
                Benefits of Working with Us
              </h1>
              <ol>
                <li className="product-p">
                  Expert Technicians: Our team comprises experienced
                  professionals with extensive knowledge in equipment setup and
                  configuration.
                </li>
                <li className="product-p">
                  Customised Solutions: We tailor our services to meet your
                  specific needs and preferences.
                </li>
                <li className="product-p">
                  Efficiency and Reliability: We ensure that your equipment is
                  set up quickly and works reliably from day one.
                </li>
                <li className="product-p">
                  Ongoing Support: We provide continued support and maintenance
                  to keep your systems running smoothly.
                </li>
                <li className="product-p">
                  Competitive Pricing: Our transparent pricing structure ensures
                  you get the best value for your investment.
                </li>
              </ol>
            </motion.div>
          </div>
        </section>
        <motion.section
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="margin-btm"
        >
          <div>
            <h1 className="contact-header"> Contact Us</h1>
            <p className="equip-contact-details">
              Ready to get started with our equipment setup services? Contact us
              today to schedule an appointment or to learn more about how we can
              assist you.
            </p>
          </div>
          <div className="equipment-btn">
            <div className="equipment-btn-details">
              <Button
                bgColor="#000000"
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="Contact us"
                color="#ffffff"
                fWeight={800}
                bRadius={5}
                icon={<FaArrowRightToBracket className="style-home-icon" />}
                onClickButton={() => {
                  navigate("/contact");
                }}
              />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Equipments;
