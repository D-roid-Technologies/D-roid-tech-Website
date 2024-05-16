import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Training.css";
import { Assets } from "../../../utils/constant/Assets";
import { DATA } from "../../../utils/constant/Data";
import { Link, useLocation } from "react-router-dom";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import TrainingApproach from "../../components/trainingApproach/TrainingApproach";
import TechnologiesAndTools from "../../components/technologies/TechnologiesAndTools";

const photos: TrainingPhoto[] = [
  { image: Assets.images.staffBg, text: "Expert trainers available" },
  {
    image: Assets.images.companyBanner,
    text: "At D'roid Technologies, we offer comprehensive tech training programs designed to empower individuals with the knowledge and skills needed to excel in today's rapidly evolving tech landscape.",
  },
  { image: Assets.images.background2, text: "Learn at your own pace" },
];

const Training: React.FunctionComponent = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const location = useLocation();

  // Function to handle the previous button click
  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  // Function to handle the next button click
  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{backgroundColor: Assets.colors.light}}>
      <div
        style={{
          backgroundImage: `url("${photos[currentPhotoIndex].image}")`,
          backgroundColor: Assets.colors.overlay,
        }}
        className="training-full-screen-background-image"
      >
        <NavBar />
        <div
          style={{ color: Assets.colors.light }}
          className="training-home-section"
        >
          <div className="training-home-content">
            <p
              style={{
                color: Assets.colors.light,
                fontFamily: "Rammetto One",
              }}
              className="training-large-centered-heading"
            >
              {photos[currentPhotoIndex].text}
            </p>
            <p
              style={{ color: Assets.colors.light, fontFamily: "Mazzard" }}
              className="training-smaller-centered-heading"
            >
              Our training courses cover a wide range of topics, from
              programming languages and software development methodologies to
              emerging technologies and industry best practices.
            </p>
          </div>
          <div className="prev-button">
            <Button
              title="<"
              bgColor={Assets.colors.overlay}
              color={Assets.colors.light}
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
              bgColor={Assets.colors.overlay}
              color={Assets.colors.light}
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
        {/* Approach Section */}
        <TrainingApproach />

        {/* image */}
        <div className="training-rounded-image">
          <img
            src={Assets.images.statistics}
            alt="training"
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              boxShadow: `0 0.35em 0.35em 0 ${Assets.colors.overlay}`,
              marginBottom: "1rem",
            }}
            className="training-boxed-image"
          />
        </div>

        {/* Featured Training Programs Section */}

        <div className="training-approach-main">
          <h1
            style={{ color: Assets.colors.basic, fontFamily: "Rammetto One" }}
            className="training-approach-head"
          >
            Featured Training Programs
          </h1>
          <ul className="training-programs-list">
            {DATA.courses.map((course) => (
              <Card
                key={course.id}
                className="training-program-item"
                cardStyle={{
                  flexBasis: "calc(23% - 2%)",
                  border: `1px solid ${Assets.colors.borderColor}`,
                  transition: "box-shadow 0.3s ease",
                }}
                headingStyle={{
                  marginBottom: "10px",
                  fontFamily: "Rammetto One",
                  color: Assets.colors.basic,
                }}
                descriptionStyle={{
                  fontFamily: "Mazzard",
                  fontSize: "1rem",
                  color: Assets.colors.basic,
                  marginBottom: "1em",
                }}
              >
                <Link to={`${location.pathname}/course-detail/${course.id}`}>
                  <h3>{course.title}</h3>
                </Link>
              </Card>
            ))}
          </ul>
        </div>
      </div>

      {/* Technologies and Tools Section */}
      <TechnologiesAndTools />
    </div>
  );
};

export default Training;
