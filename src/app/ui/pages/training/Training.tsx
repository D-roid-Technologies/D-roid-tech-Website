import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import companyBanner from "../../../images/png/droid banner.png";
import "../training/Training.css";
import AboutSection from "../../components/aboutsections/AboutSection";

interface Photo {
  image: string;
  text: string;
}

const photos: Photo[] = [
  { image: companyBanner, text: "Learn new skills with us" },
  { image: companyBanner, text: "Expert trainers available" },
  { image: companyBanner, text: "Learn at your own pace" },
];

const Training: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
    <div>
      <div
        style={{
          backgroundImage: `url("${companyBanner}")`,
        }}
        className="bg-image"
      >
        <NavBar />
        <article className="home-content">
          <p className="business">
            {photos[currentPhotoIndex].text}
          </p>
        </article>
        <button className="prev-button" onClick={handlePreviousPhoto}>
          &lt;
        </button>
        <button className="next-button" onClick={handleNextPhoto}>
          &gt;
        </button>
      </div>
      <div className="container2">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquid dolores in deleniti, autem natus repudiandae nobis voluptates culpa facere libero eum adipisci porro corporis, illo obcaecati minus. Animi, dolores.
        </section>
      </div>
      <div className="Container">
        <div className="Column">
          <div className="Icon" style={{ backgroundColor: "#135CFB" }}> {/* Fixed inline style */}
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
              {/* SVG content */}
            </svg>
          </div>
          <h4 className="Heading"><a href="https://kikora.no/barnetrinn-1-4/">Level 1-4</a></h4> {/* Changed 'class' to 'className' */}
        </div>
        <div className="Column">
          <div className="Icon" style={{ backgroundColor: "#135CFB" }}> {/* Fixed inline style */}
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
              {/* SVG content */}
            </svg>
          </div>
          <h4 className="Heading"><a href="https://kikora.no/barnetrinn-1-4/">Level 1-4</a></h4> {/* Changed 'class' to 'className' */}
        </div>
        <div className="Column">
          <div className="Icon" style={{ backgroundColor: "#135CFB" }}> {/* Fixed inline style */}
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
              {/* SVG content */}
            </svg>
          </div>
          <h4 className="Heading"><a href="https://kikora.no/barnetrinn-1-4/">Level 1-4</a></h4> {/* Changed 'class' to 'className' */}
        </div>
        <div className="Column">
          <div className="Icon" style={{ backgroundColor: "#135CFB" }}> {/* Fixed inline style */}
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="13" viewBox="0 0 31 13" fill="none">
              {/* SVG content */}
            </svg>
          </div>
          <h4 className="Heading"><a href="https://kikora.no/barnetrinn-1-4/">Level 1-4</a></h4> {/* Changed 'class' to 'className' */}
        </div>
      </div>
    </div>
  );
};

export default Training;
