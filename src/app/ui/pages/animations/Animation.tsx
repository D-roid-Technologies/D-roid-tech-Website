import React from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  FaDesktop,
  FaPalette,
  FaMicrophoneAlt,
  FaCodeBranch,
  FaRocket,
  FaGalacticRepublic,
  FaStarOfLife,
  FaSpaceShuttle,
} from "react-icons/fa";
import "./Animation.css";
import { Assets } from "../../../utils/constant/Assets";

const Animation: React.FunctionComponent = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.background1}")`,
        }}
        className="bg-image"
      >
        <NavBar />
        <div className="home-section">
        <div className="home-main">
          <article className="home-content">
            <p className="home-heading">ANIMATION</p>
          </article>
        </div>
            {/* <p className="large-centered-heading">
              At D'roid Technologies, we excel in producing captivating and
              immersive animations that bring your ideas to life. Our team of
              skilled animators and designers leverage state-of-the-art tools
              and techniques to create stunning visuals that captivate audiences
              and elevate your brand.
            </p> */}
        </div>
      </div>

      <div className="main-content-section">
        {/* Approach Section */}
        {/* <div className="animation-approach-main">
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
        </div> */}

        {/* Featured Projects Section */}
        <div className="animation-approach-main">
          <h1 className="animation-approach-head">Featured Projects</h1>
          <ul className="animation-approach-list">
            <li className="animation-approach-item">
              <div className="icon-container">
                <FaRocket style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Space Odyssey: A Journey Beyond</h2>
              <p className="paragraph">
                An exhilarating animation project that takes viewers on an
                unforgettable voyage through the cosmos. Set in a distant future
                where humanity explores the depths of outer space, this
                animation combines stunning visuals with a gripping narrative to
                inspire wonder and awe.
              </p>
            </li>
            <li className="animation-approach-item">
              <div className="icon-container">
                <FaGalacticRepublic style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Galactic Chronicles: Exploring Infinity</h2>
              <p className="paragraph">
                A captivating animation endeavor that propels audiences on a
                mesmerizing expedition across the vast expanse of the universe.
                Set in a distant era where humanity's curiosity knows no bounds,
                this project melds breathtaking imagery with an enthralling
                storyline, inviting viewers to embark on an odyssey of cosmic
                proportions.
              </p>
            </li>
            <li className="animation-approach-item">
              <div className="icon-container">
                <FaStarOfLife style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Starbound Odyssey: Voyage to the Unknown</h2>
              <p className="paragraph">
                A thrilling animation venture that invites audiences to embark
                on an epic journey through the uncharted depths of space. Set in
                a future where humanity's insatiable thirst for discovery
                propels them beyond the confines of Earth, this project
                seamlessly blends awe-inspiring visuals with a compelling
                narrative, igniting the imagination and stirring the soul.
              </p>
            </li>
            <li className="animation-approach-item">
              <div className="icon-container">
                <FaSpaceShuttle style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Cosmic Odyssey: Beyond the Stars</h2>
              <p className="paragraph">
                An electrifying animation project that catapults viewers into a
                breathtaking journey through the boundless expanse of the
                cosmos. Set in a distant epoch where humanity's thirst for
                knowledge drives them to explore the furthest reaches of outer
                space, this animation seamlessly weaves together stunning
                visuals with an enthralling narrative, evoking a sense of wonder
                and awe.
              </p>
            </li>
          </ul>
        </div>

        {/* Technologies and Tools Section */}
        <div className="training-approach-main">
          <h1 className="training-approach-head">Technologies and Tools</h1>
          <ul className="training-approach-list">
            <li className="training-approach-item">
              <div className="icon-container">
                <FaDesktop style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Animation Software</h2>
              <p className="paragraph">Adobe After Effects, Blender, Autodesk Maya</p>
            </li>
            <li className="training-approach-item">
              <div className="icon-container">
                <FaPalette style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Graphic Design Tools</h2>
              <p className="paragraph">Adobe Illustrator, Photoshop</p>
            </li>
            <li className="training-approach-item">
              <div className="icon-container">
                <FaMicrophoneAlt style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Sound Editing Software</h2>
              <p className="paragraph">Adobe Audition, Audacity</p>
            </li>
            <li className="training-approach-item">
              <div className="icon-container">
                <FaCodeBranch style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />
              </div>
              <h2>Version Control</h2>
              <p className="paragraph">Git, GitHub</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Animation;
