import React, { useState } from "react";
import { Link, useLocation} from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import "./Training.css";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";
import { Assets } from "../../../utils/constant/Assets";
import { DATA } from "../../../utils/constant/Data";

// Mock data for the photo slides
const photos: TrainingPhoto[] = [
  { image: Assets.images.companyBanner, text: "Learn new skills with us" },
  { image: Assets.images.background1, text: "Expert trainers available" },
  { image: Assets.images.background2, text: "Learn at your own pace" },
];

// The agreed padding left and padding right for the app is 100px.
// You need to change the images to different images on the slider.


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
    <div className="training">
      <div
        style={{
          backgroundImage: `url("${photos[currentPhotoIndex].image}")`,
        }}
        className="bg-image"
      >
        <NavBar />
        <div className="home-content">
          <p className="business">{photos[currentPhotoIndex].text}</p>
        </div>
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
        <h2>Offer The Latest Tech And Solutions To Our Clients!</h2>
        <p>
          Kikora comes out in a new suit, with new uses. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Deserunt aliquid dolores in
          deleniti, autem natus repudiandae nobis voluptates culpa facere libero
          eum adipisci porro corporis, illo obcaecati minus. Animi, dolores.
        </p>
      </div>
      {/* Render the container with course links */}
      <div className="Container">
        {DATA.courses.map((course) => (
          <Link
            to={`${location.pathname}/course-detail/${course.id}`}
            className="Column"
            key={course.id}
          >
            <div
              className="Icon"
              style={{ backgroundColor: Assets.colors.secondary }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="13"
                viewBox="0 0 31 13"
                fill="none"
              ></svg>
            </div>
            <h4 className="Heading">{course.level}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Training;