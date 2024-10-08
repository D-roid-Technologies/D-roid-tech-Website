import React, { useState } from "react";
import { Assets } from "../../../utils/constant/Assets";
import Button from "../../components/button/Button";
import { TrainingPhoto } from "../../../utils/Types";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import "./TrainingHero.css";

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
      <div
        className="training-hero"
        //   style={{ backgroundColor: getColor("light") }}
      >
        <h1 className="trinig-hero-head">
          Explore the advent <br /> of our resounding <br /> Tech training
        </h1>
      </div>
      {/* <div
        className="training-hero-content"
        style={{ backgroundImage: `url("${photos[currentPhotoIndex].image}")` }}
      ></div>
      <div className="training-hero-text" style={{ color: getColor("light") }}>
        <h1>{photos[currentPhotoIndex].text}</h1>
      </div>
      <Button
        title="Explore Now"
        bgColor={getColor("overlay")}
        color={getColor("light")}
        mTop={0}
        mBottom={0}
        mLeft={0}
        mRight={0}
        onClickButton={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className="training-hero-image">
        <img src={photos[currentPhotoIndex].image} alt="Training Banner" />
      </div>
      <div className="navigation-buttons">
        <Button
          title="<"
          bgColor={"#071D6A"}
          color={getColor("light")}
          onClickButton={handlePreviousPhoto}
          bRadius={40}
          mTop={0}
          mBottom={0}
          mLeft={0}
          mRight={0}
        />
        <Button
          title=">"
          bgColor={"#071D6A"}
          color={getColor("light")}
          onClickButton={handleNextPhoto}
          bRadius={40}
          mTop={0}
          mBottom={0}
          mLeft={0}
          mRight={0}
        />
      </div> */}
    </>
  );
};

export default TrainingHero;
