// OurTeam.tsx
import React from "react";
import "../aboutdroid/AboutDriod.css";

const AboutDroid: React.FC = () => {
  return (
    <div className="our-team-container">
      <div className="overlay-content">
        <h1 className="team-title">
          <span className="title-white">D'roid</span>
          <span className="title-blue">Technology</span>
        </h1>
        <p className="team-description">
          Driod Technologies is a forward-thinking tech company committed to
          building innovative solutions that address real-world challenges. We
          believe technology should not only advance but also empower, making
          lives easier, businesses smarter, and communities stronger.
        </p>
      </div>
    </div>
  );
};

export default AboutDroid;
