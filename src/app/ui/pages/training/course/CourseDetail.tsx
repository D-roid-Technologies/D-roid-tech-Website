import React from "react";
import "./CourseDetail.css";
import NavBar from "../../../components/navbar/NavBar";
import { Assets } from "../../../../utils/constant/Assets";
import { useParams } from "react-router-dom";
import { courses } from "../../../../utils/constant/FeaturedTraining";
import Button from "../../../components/button/Button";
import {
  updateModal,
  updateModalContent,
} from "../../../../redux/slices/AppEntrySlice";
import { useDispatch } from "react-redux";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";

const CourseDetail: React.FunctionComponent = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === parseInt(courseId || "", 10));
  const dispatch = useDispatch();
  const { getColor } = useThemeColor();

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
        <div className="home-section">
          <div className="home-main">
            <article className="home-content">
              <p className="home-heading">{course.title}</p>
            </article>
          </div>
        </div>
      </div>
      <div className="course-detail-content">
        {Object.entries(course.descriptions).map(
          ([trainingTitle, description]) => (
            <div key={trainingTitle} style={{border: "1px solid" + getColor("borderColor")}}>
              <h2 style={{color: getColor("basic")}}>{trainingTitle}</h2>
              <p className="paragraph">
                {description.explanation.length > 150
                  ? `${description.explanation.slice(0, 150)}...`
                  : description.explanation}
              </p>
              <div className="buttons-container">
                <div className="get-started-btn">
                  <Button
                    title="Learn More"
                    bgColor={Assets.colors.secondary}
                    color={Assets.colors.light}
                    onClickButton={() => {
                      dispatch(
                        updateModalContent({
                          appTitle: `${trainingTitle}`,
                          appBody: `<div class="modal-content">
                        <p>${description.explanation}</p>
                        <ol>
                          ${description.procedures
                            .map((procedure) => `<li>${procedure}</li>`)
                            .join("")}
                        </ol>
                        <button>Apply</button>
                        </div>
                      `,
                        })
                      );
                      dispatch(updateModal(true));
                    }}
                    mLeft={10}
                    mRight={10}
                    mTop={10}
                    mBottom={0}
                    bRadius={10}
                    bRadiusColor={Assets.colors.light}
                  />
                </div>
                <div className="get-started-btn">
                  <Button
                    title="Apply"
                    bgColor={Assets.colors.secondary}
                    color={Assets.colors.light}
                    onClickButton={() => {}}
                    mLeft={10}
                    mRight={10}
                    mTop={20}
                    mBottom={0}
                    bRadius={10}
                    bRadiusColor={Assets.colors.light}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
