// CourseDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Course } from '../../../utils/Types';
import './CourseDetail.css';

//I'll move it
type CourseDetailProps = {
  courses?: Course[];
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courses }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses?.find((c) => c.id.toString() === courseId);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-detail">
      <div className="main-content">
        <div>
          <h2>{course.title}</h2>
          <p className="course-detail-description">{course.description}</p>
        </div>
      </div>
      <div className="sidebar">
        <div className="benefits">
          <h2>What you will learn</h2>
          <div className="benefits-grid">
            {course.benefits.map((benefit, index) => (
              <div key={index}>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="projects">
          <h2 className="projects-title">Projects you will be building</h2>
          <div className="projects-list">
            {course.projects.map((project, index) => (
              <div key={index}>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="how-it-works">
          <div className="how-it-works-header">
            <div>
              <h2>How it works</h2>
              <p>Lorem ipsum</p>
            </div>
            <div className="get-started-btn">Get Started</div>
          </div>
          <div className="how-it-works-steps">
            {course.howItWorks.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-number">{index + 1}</div>
                <h2 className="step-title">{step.title}</h2>
                <p className="step-content">{step.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;