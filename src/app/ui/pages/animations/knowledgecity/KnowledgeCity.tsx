import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

const KnowledgeCity: React.FunctionComponent = () => {
  // const { courseId } = useParams();
  // const course = courses.find((c) => c.id === parseInt(courseId || "", 10));
  const navigate = useNavigate();
  return (
    <>
      <div className="test-top-con">
        <button onClick={() => navigate("/")} className="test-btn-hero">
          <IoChevronBackOutline className="back-btn-icon" />
        </button>
      </div>
    </>
  );
};

export default KnowledgeCity;
