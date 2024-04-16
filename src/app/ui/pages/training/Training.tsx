import React, { useState } from "react";
import { Link,Routes, Route, useRoutes, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import "../training/Training.css";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";
import { Assets } from "../../../utils/constant/Assets";
import CourseDetail from "./CourseDetail";

const photos: TrainingPhoto[] = [
  { image: Assets.images.companyBanner, text: "Learn new skills with us" },
  { image: Assets.images.companyBanner, text: "Expert trainers available" },
  { image: Assets.images.companyBanner, text: "Learn at your own pace" },
];

const Training: React.FunctionComponent = () => { // use functional component flly rather than fc
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const location = useLocation();

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

  // There is a button component and an input component already built in this project. USE IT!
  // There are colors already there in the  project, use them instead. If have issues ask specific questions.

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.companyBanner}")`,
        }}
        className="bg-image"
      >
        <NavBar />
        <article className="home-content">
          <p className="business">
            {photos[currentPhotoIndex].text}
          </p>
        </article>
        <div className="prev-button">
        <Button
          title="<"
          bgColor="rgba(0, 0, 0, 0.5)"
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
          bgColor="rgba(0, 0, 0, 0.5)"
          color={Assets.colors.light}
          onClickButton={handleNextPhoto}
          mLeft={10}
          mRight={10}
          mTop={0}
          mBottom={0}
          />
          </div>
      </div>
      <div className="container2">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquid dolores in deleniti, autem natus repudiandae nobis voluptates culpa facere libero eum adipisci porro corporis, illo obcaecati minus. Animi, dolores.
        </p>
      </div>
      <div className="Container">
        <Link to={`${location.pathname}/course-detail`} className="Column">
          <div className="Icon" style={{ backgroundColor: Assets.colors.secondary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
        
            </svg>
          </div>
          <h4 className="Heading">Level 1-4</h4>
        </Link>
        <Link to={`${location.pathname}/course-detail`} className="Column">
          <div className="Icon" style={{ backgroundColor: Assets.colors.secondary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
            
            </svg>
          </div>
          <h4 className="Heading">Level 1-4</h4>
        </Link>
        <Link to={`${location.pathname}/course-detail`} className="Column">
          <div className="Icon" style={{ backgroundColor: Assets.colors.secondary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
           
            </svg>
          </div>
          <h4 className="Heading">Level 1-4</h4>
        </Link>
        <Link to={`${location.pathname}/course-detail`} className="Column">
          <div className="Icon" style={{ backgroundColor: Assets.colors.secondary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
              
            </svg>
          </div>
          <h4 className="Heading">Level 1-4</h4>
        </Link>
      </div>
      <Routes>
  <Route path={`${location.pathname}/course-detail`} element={<CourseDetail />} />
</Routes>
    </div>
  );
};

export default Training;
