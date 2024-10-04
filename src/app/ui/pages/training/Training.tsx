import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Training.css";
import { Assets } from "../../../utils/constant/Assets";
import { useLocation, useNavigate } from "react-router-dom";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import TrainingApproach from "../../components/trainingApproach/TrainingApproach";
import TechnologiesAndTools from "../../components/technologies/TechnologiesAndTools";
import { FaLaptop } from "react-icons/fa";
import { courses } from "../../../utils/constant/FeaturedTraining";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import { TechTraining } from "../../../utils/constant/Data";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import TrainingHero from "../../components/traininghero/TrainingHero";

const photos: TrainingPhoto[] = [
  {
    image: Assets.images.trainingBannerOne,
    text: "Explore the advent of our resounding Tech training",
  },
  {
    image: Assets.images.trainingBannerTwo,
    text: "Explore the advent of our resounding Tech training",
  },
  {
    image: Assets.images.tarinigBannerThree,
    text: "Explore the advent of our resounding Tech training",
  },
];

const Training: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { getColor } = useThemeColor();
  const navigateToCourseDetail = (courseId: string) => {
    navigate(`${location.pathname}/course-detail/${courseId}`);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ backgroundColor: getColor("light") }}>
      <NavBar />
      <TrainingHero />
      {/* <div
        style={{
          backgroundImage: `url("${photos[currentPhotoIndex].image}")`,
        }}
        className="training-bg-image"
      >
        <div
          style={{ color: getColor("light") }}
          className="training-home-section"
        >
          <div className="home-main">
            <article className="home-content">
              <p className="home-heading" style={{ color: getColor("light") }}>
                {photos[currentPhotoIndex].text}
              </p>
            </article>
          </div>
          <div className="prev-button">
            <Button
              title="<"
              bgColor={getColor("overlay")}
              color={getColor("light")}
              onClickButton={handlePreviousPhoto}
              mLeft={10}
              mRight={10}
              mTop={0}
              mBottom={0}
            />
          </div>
          <div className="next-button">
            <Button
              title=">"
              bgColor={getColor("overlay")}
              color={getColor("light")}
              onClickButton={handleNextPhoto}
              mLeft={10}
              mRight={10}
              mTop={0}
              mBottom={0}
            />
          </div>
        </div>
      </div> */}
      {/* Approach Section */}

      <div className="training-main-content-section">
        <div style={{ textAlign: "center" }}>
          <img
            src={Assets.images.trainingIconImage}
            alt=""
            style={{ fontSize: "15rem" }}
            className="icon"
          />
        </div>

        <div className="training-approach-main-one">
          <h1
            style={{ color: getColor("basic"), fontFamily: "Rubik One" }}
            className="training-approach-heads"
          >
            Training Programs
          </h1>
          <ul className="service-card-containers">
            {TechTraining.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image}
                content={item.description}
                actions={
                  <Button
                    title="See More Details"
                    bgColor={"#fbcc34"}
                    color={"#071d6a"}
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    mRight={0}
                    fWeight={700}
                    bRadiusColor={"#fbcc34"}
                    onClickButton={() => {
                      navigate("/details", {
                        state: {
                          title: item.title,
                          image: item.image,
                          content: item.content,
                          desc: item.description,
                          procedure: item.applicationProcedure,
                          path: "/training",
                        },
                      });
                    }}
                  />
                }
              />
            ))}
          </ul>
        </div>
        <TrainingApproach />
      </div>
      <span className="tech-tools">
        <TechnologiesAndTools />
      </span>
    </div>
  );
};

export default Training;
