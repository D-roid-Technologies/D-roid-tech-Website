// OurTeam.tsx
import React from "react";
import "../aboutdroid/AboutDriod.css";

const AboutDroid: React.FC = () => {
  return (
    <div className="software-main">
      <div className="software-main-content">
        <h1 className="software-header">About D'roid</h1>
        <p>
          We believe technology should not only advance but also empower, making
          lives easier, businesses smarter, and communities stronger.
        </p>
      </div>
    </div>
    // <div className="our-team-container">
    //   <div className="overlay-content">
    //     <h1 className="team-title">
    //       <span className="title-white">D'roid</span>
    //       <span className="title-blue">Technologies</span>
    //     </h1>
    //     <p className="team-description">
    //       D'riod Technologies is a forward-thinking tech company committed to
    //       building innovative solutions that address real-world challenges. We
    //       believe technology should not only advance but also empower, making
    //       lives easier, businesses smarter, and communities stronger.
    //     </p>
    //   </div>
    // </div>
  );
};

export default AboutDroid;
