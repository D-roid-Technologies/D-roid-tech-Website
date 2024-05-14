import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { FaLaptopCode, FaVideo, FaChalkboardTeacher } from "react-icons/fa";
import "./Training.css";
import { Assets } from "../../../utils/constant/Assets";
import { DATA } from "../../../utils/constant/Data";
import { Link, useLocation } from "react-router-dom";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";

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
    <div>
      <div
        style={{
          backgroundImage: `url("${photos[currentPhotoIndex].image}")`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="training-full-screen-background-image"
      >
        <NavBar />
        <div className="training-home-section">
          <div className="training-home-content">
            <p className="training-large-centered-heading">
              {photos[currentPhotoIndex].text}
            </p>
            <p className="training-smaller-centered-heading">
              Our training courses cover a wide range of topics, from
              programming languages and software development methodologies to
              emerging technologies and industry best practices.
            </p>
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
      </div>

      <div className="training-main-content-section">
        {/* Approach Section */}
        <div className="training-approach-main">
          <h1 className="training-approach-head">Our Approach</h1>
          <ul className="training-approach-list">
            <li className="training-approach-item">
              <h2>Customized Curriculum</h2>
              <p>
                We understand that every learner is unique, which is why we
                tailor our training programs to meet the specific needs and
                goals of each participant. Our experienced instructors work
                closely with learners to develop personalized learning plans
                that align with their interests and career aspirations.
              </p>
            </li>
            <li className="training-approach-item">
              <h2>Hands-on Learning</h2>
              <p>
                We believe in learning by doing, which is why our training
                courses emphasize practical, hands-on experience. Participants
                have the opportunity to apply their knowledge in real-world
                projects and exercises, gaining valuable skills that are
                immediately applicable in the workplace.
              </p>
            </li>
            <li className="training-approach-item">
              <h2>Expert Instructors</h2>
              <p>
                Our instructors are industry experts with years of experience in
                their respective fields. They bring a wealth of knowledge and
                practical insights to the classroom, providing learners with
                valuable guidance and mentorship throughout their training
                journey.
              </p>
            </li>
            <li className="training-approach-item">
              <h2>Flexible Learning Options</h2>
              <p>
                Whether you prefer in-person instruction, online classes, or
                self-paced learning modules, we offer flexible learning options
                to accommodate your schedule and learning preferences. Our goal
                is to make quality tech training accessible to everyone, no
                matter where they are located.
              </p>
            </li>
          </ul>
        </div>

        {/* Relocated image */}
        <div className="training-rounded-image">
          <img
            src={Assets.images.statistics}
            alt="training"
            className="training-boxed-image"
          />
        </div>

        {/* Featured Training Programs Section */}

        <div className="training-approach-main">
          <h1 className="training-approach-head">Featured Training Programs</h1>
          <ul className="training-approach-list">
            {DATA.courses.map((course) => (
              <li
                className="training-approach-item"
                style={{ border: "1px solid #ccc" }}
                key={course.id}
              >
                <Link
                  to={`${location.pathname}/course-detail/${course.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3 style={{ marginBottom: "1rem" }}>{course.title}</h3>
                  <h5 style={{ marginBottom: "1rem" }}>{course.subtitle}</h5>
                  <p>
                    {course.description.slice(0, 100)}
                    {course.description.length > 100 && "..."}
                    {course.description.length > 100 && (
                      <span
                        style={{
                          color: `${Assets.colors.secondary}`,
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        Read More
                      </span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies and Tools Section */}
      </div>
      <div className="training-approach-main">
        <h1 className="training-approach-head">Technologies and Tools</h1>
        <ul className="training-approach-list">
          <li className="training-approach-item">
            <div className="icon-container">
              <FaChalkboardTeacher className="icon" />
            </div>
            <h2>Learning Management Systems</h2>
            <p>Moodle, Canvas, Blackboard</p>
          </li>
          <li className="training-approach-item">
            <div className="icon-container">
              <FaVideo className="icon" />
            </div>
            <h2>Video Conferencing Platforms</h2>
            <p>Zoom, Microsoft Teams, Google Meet</p>
          </li>
          <li className="training-approach-item">
            <div className="icon-container">
              <FaLaptopCode className="icon" />
            </div>
            <h2>Code Editors</h2>
            <p>Visual Studio Code, Atom, Sublime Text</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Training;
