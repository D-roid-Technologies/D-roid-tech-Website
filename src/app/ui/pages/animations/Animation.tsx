import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Animation.css";
import { Assets } from "../../../utils/constant/Assets";

const Animation: React.FunctionComponent = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.background1}")`,
        }}
        className="full-screen-background-image"
      >
        <NavBar />
        <div className="home-section">
          <div className="home-content">
            <p className="large-centered-heading">
              At D'roid Technologies, we excel in producing captivating and
              immersive animations that bring your ideas to life. Our team of
              skilled animators and designers leverage state-of-the-art tools
              and techniques to create stunning visuals that captivate audiences
              and elevate your brand.
            </p>
          </div>
        </div>
      </div>

      <div className="main-content-section">
        {/* Approach Section */}
        <div className="animation-approach-main">
          <h1 className="animation-approach-head">Our Approach</h1>
          <ul className="animation-approach-list">
            <li className="animation-approach-item">
              <h2>Conceptualization & Storyboarding</h2>
              <p>
                We work closely with you to understand your vision and
                objectives. Our team then creates detailed storyboards to
                outline the flow and narrative of the animation.
              </p>
            </li>
            <li className="animation-approach-item">
              <h2>Design & Art Direction</h2>
              <p>
                Our talented designers craft visually striking characters,
                environments, and assets that resonate with your target
                audience. We prioritize creativity, originality, and attention
                to detail in our design process.
              </p>
            </li>
            <li className="animation-approach-item">
              <h2>Animation & Motion Graphics</h2>
              <p>
                Using industry-leading animation software, we breathe life into
                our designs, incorporating smooth transitions, dynamic
                movements, and engaging effects to enhance the storytelling
                experience.
              </p>
            </li>
            <li className="animation-approach-item">
              <h2>Sound Design & Voiceover</h2>
              <p>
                To further enhance the immersive experience, we collaborate with
                experienced sound designers and voiceover artists to create
                compelling audio elements that complement the visuals and evoke
                emotion.
              </p>
            </li>
            <li className="animation-approach-item">
              <h2>Review & Feedback</h2>
              <p>
                We value your input throughout the production process and
                encourage open communication. We provide regular updates and
                seek your feedback to ensure that the final product meets your
                expectations.
              </p>
            </li>
          </ul>
        </div>

        {/* Featured Projects Section */}
        <div className="flex-row-section reverse">
          <div className="rounded-image">
            <img
              src={Assets.images.webdesign}
              alt="character-design-image"
              className="boxed-image"
            />
          </div>
          <div className="centered-text-section">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="section-details">
              <p>
                <strong>Space Odyssey: A Journey Beyond</strong>, an exhilarating animation project that
                takes viewers on an unforgettable voyage through the cosmos. Set
                in a distant future where humanity explores the depths of outer
                space, this animation combines stunning visuals with a gripping
                narrative to inspire wonder and awe.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies and Tools Section */}
        <div className="flex-row-section">
          <div className="rounded-image">
            <img
              src={Assets.images.statistics}
              alt="motion-design-image"
              className="boxed-image"
            />
          </div>
          <div className="centered-text-section">
            <h2 className="section-heading">Technologies And Tools</h2>
            <div className="section-details">
              <ul>
                <li>
                  <strong>Animation Software:</strong> Adobe After Effects,
                  Blender, Autodesk Maya
                </li>
                <li>
                  <strong>Graphic Design Tools:</strong> Adobe Illustrator,
                  Photoshop
                </li>
                <li>
                  <strong>Sound Editing Software:</strong> Adobe Audition,
                  Audacity
                </li>
                <li>
                  <strong>Version Control:</strong> Git, GitHub
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;