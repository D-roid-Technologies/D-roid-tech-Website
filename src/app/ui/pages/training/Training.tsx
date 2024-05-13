import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Training.css";
import { Assets } from "../../../utils/constant/Assets";
import { DATA } from "../../../utils/constant/Data";
import { Link, useLocation } from "react-router-dom";

const Training: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.background1}")`,
        }}
        className="training-full-screen-background-image"
      >
        <NavBar />
        <div className="training-home-section">
          <div className="training-home-content">
            <p className="training-large-centered-heading">
              At D'roid Technologies, we offer comprehensive tech training
              programs designed to empower individuals with the knowledge and
              skills needed to excel in today's rapidly evolving tech landscape.
            </p>
            <p className="training-smaller-centered-heading">
              Our training courses cover a wide range of topics, from
              programming languages and software development methodologies to
              emerging technologies and industry best practices.
            </p>
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
              <li className="training-approach-item" style={{border: "1px solid #ccc"}} key={course.id}>
                <Link
                  to={`${location.pathname}/course-detail/${course.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3 style={{marginBottom: "1rem"}}>{course.title}</h3>
                  <h4 style={{marginBottom: "1rem"}}>{course.subtitle}</h4>
                  <p>{course.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies and Tools Section */}
        <div className="training-flex-row-section reverse">
          <div className="training-rounded-image">
            <img
              src={Assets.images.statistics}
              alt="tools"
              className="training-boxed-image"
            />
          </div>
          <div className="training-centered-text-section">
            <h2 className="training-section-heading">Technologies And Tools</h2>
            <div className="training-section-details">
              <ul>
                <li>
                  <strong>Learning Management Systems:</strong> Moodle, Canvas,
                  Blackboard
                </li>
                <li>
                  <strong>Video Conferencing Platforms:</strong> Zoom, Microsoft
                  Teams, Google Meet
                </li>
                <li>
                  <strong>Code Editors:</strong> Visual Studio Code, Atom,
                  Sublime Text
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
