import React from "react";
import "./CourseDetail.css";
import NavBar from "../../../components/navbar/NavBar";
import { Assets } from "../../../../utils/constant/Assets";
import { useParams } from "react-router-dom";
import { courses } from "../../../../utils/constant/FeaturedTraining";

const CourseDetail: React.FunctionComponent = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === parseInt(courseId || "", 10));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-detail">
      <div
        style={{
          backgroundImage: `url("${Assets.images.tech}")`,
          padding: "2rem",
        }}
        className="bg-image"
      >
        <NavBar />
        <div className="home-main">
          <article className="home-content">
            <p className="home-heading">{course.title}</p>
          </article>
        </div>
      </div>
      <div className="course-detail-content">
        {Object.entries(course.descriptions).map(
          ([trainingTitle, description]) => (
            <div key={trainingTitle}>
              <h2>{trainingTitle}</h2>
              <p className="paragraph">{description.explanation}</p>
              <ol style={{listStyle: "none"}} className="paragraph">
                {description.procedures.map((procedure, index) => (
                  <li key={index}>{procedure}</li>
                ))}
              </ol>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
