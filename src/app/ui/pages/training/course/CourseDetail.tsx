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
import Card from "../../../components/card/Card";

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
      <div className="service-main">
        <ul className="service-card-container">
          {Object.entries(course.descriptions).map(
            ([trainingTitle, description]) => (
              <Card
                key={trainingTitle}
                title={trainingTitle}
                content={description.explanation}
                actions={
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
                    bRadiusColor={getColor('light')}
                  />
                }
                actions2={
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
                    bRadiusColor={getColor('light')}
                  />
                }
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;
