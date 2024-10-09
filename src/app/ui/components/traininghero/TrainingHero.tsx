import React, { useState } from "react";
import { Assets } from "../../../utils/constant/Assets";
import Button from "../../components/button/Button";
import { TrainingPhoto } from "../../../utils/Types";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import "./TrainingHero.css";

const photos: TrainingPhoto[] = [
  {
    image: Assets.images.trainingBannerOne,
    text: "Explore the advent\nof our resounding\nTech training",
  },
  {
    image: Assets.images.trainingBannerTwo,
    text: "Delve into cutting-edge\ntechnology with expert\nguidance",
  },
  {
    image: Assets.images.tarinigBannerThree,
    text: "Advance your career\nwith top-notch\ntechnical skills",
  },
];

const TrainingHero: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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
    <>
      <div className="training-hero">
        <div className="t-hero">
          <div>
            <h1 className="trinig-hero-head">
              {photos[currentPhotoIndex].text}
            </h1>
            <div className="t-hero-btn">
              <Button
                title="Explore Now"
                bgColor="#071d6a"
                color="#ffffff"
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                bRadius={5}
                fWeight={700}
                onClickButton={() => {
                  console.log("Explore Now clicked!");
                }}
              />
            </div>
            <div className="navigation-buttons">
              <Button
                title="<"
                bgColor={"#071D6A"}
                color={getColor("light")}
                onClickButton={handlePreviousPhoto}
                bRadius={30}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                className="t-nav-btn"
              />
              <Button
                title=">"
                bgColor={"#071D6A"}
                color={getColor("light")}
                onClickButton={handleNextPhoto}
                bRadius={30}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
              />
            </div>
          </div>

          <div className="training-hero-image">
            <img
              src={photos[currentPhotoIndex].image}
              alt="Training Banner"
              className="t-hero-bg-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingHero;
