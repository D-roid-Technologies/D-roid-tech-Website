import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Assets } from "../../../utils/constant/Assets";
import { Course } from "../../../utils/Types";

type TrainingProgramCardProps = {
  program: Course;
//   location: Location;
}

const TrainingProgramCard: React.FunctionComponent<TrainingProgramCardProps> = ({ program}) => {

    const location = useLocation();

  return (
    <li
      className="training-approach-item"
      style={{ border: "1px solid #ccc" }}
      key={program.id}
    >
      <Link
        to={`${location.pathname}/course-detail/${program.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3 style={{ marginBottom: "1rem" }}>{program.title}</h3>
        {/* <h5 style={{ marginBottom: "1rem" }}>{program.subtitle}</h5>
        <p>
          {program.description.slice(0, 100)}
          {program.description.length > 100 && "..."}
          {program.description.length > 100 && (
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
        </p> */}
      </Link>
    </li>
  );
};

export default TrainingProgramCard;