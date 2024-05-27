import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Training.css";
import { Assets } from "../../../utils/constant/Assets";
import { Link, useLocation } from "react-router-dom";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import TrainingApproach from "../../components/trainingApproach/TrainingApproach";
import TechnologiesAndTools from "../../components/technologies/TechnologiesAndTools";
import { FaLaptop } from "react-icons/fa";
import { courses } from "../../../utils/constant/FeaturedTraining";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";

const photos: TrainingPhoto[] = [
  { image: Assets.images.staffBg, text: "Expert trainers available" },
  {
    image: Assets.images.tech,
    text: "At D'roid Technologies, we offer comprehensive tech training programs designed to empower individuals with the knowledge and skills needed to excel in today's rapidly evolving tech landscape.",
  },
  { image: Assets.images.tech3, text: "Learn at your own pace" },
];

const Training: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const location = useLocation();
  const { getColor } = useThemeColor();

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
      <div
        style={{
          backgroundImage: `url("${photos[currentPhotoIndex].image}")`,
          backgroundColor: getColor("overlay"),
        }}
        className="bg-image"
      >
        <NavBar />
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
      </div>

      <div className="training-main-content-section">
        <TrainingApproach />

        <div style={{ textAlign: "center" }}>
          <FaLaptop
            style={{ fontSize: "10rem", color: getColor("secondary") }}
            className="icon"
          />
        </div>

        <div className="training-approach-main">
          <h1
            style={{ color: getColor("basic"), fontFamily: "Rammetto One" }}
            className="training-approach-head"
          >
            Featured Training Programs
          </h1>
          <ul className="training-programs-list">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="training-program-item"
                cardStyle={{
                  flexBasis: "calc(23% - 2%)",
                  border: `1px solid ${getColor("borderColor")}`,
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <Link to={`${location.pathname}/course-detail/${course.id}`}>
                  <h3>{course.title}</h3>
                  <p style={{ color: getColor("paragraph") }}>
                    {course.description}
                  </p>
                </Link>
              </Card>
            ))}
          </ul>
        </div>
      </div>

      <TechnologiesAndTools />
    </div>
  );
};

export default Training;
