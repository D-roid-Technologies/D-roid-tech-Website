import React from "react";
import { useState, useEffect } from "react";
import { Course } from "../../../../utils/Types";
import "./CourseDetail.css";
import NavBar from "../../../components/navbar/NavBar";
import { Assets } from "../../../../utils/constant/Assets";
import Button from "../../../components/button/Button";
import { DATA } from "../../../../utils/constant/Data";
import { useParams } from "react-router-dom";

const CourseDetail: React.FunctionComponent = () => {
  const { courseId } = useParams();
  console.log("courseId", courseId);
  const course = DATA.courses.find((c) => c.id === parseInt(`${courseId}`, 10));

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const [expiryHours, expiryMinutes, expirySeconds] = course?.courseDetails.offerExpiry.split(" : ").map(Number) ?? [0, 0, 0];
      const offerExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), expiryHours, expiryMinutes, expirySeconds);

      const difference = offerExpiryDate.getTime() - now.getTime();

      if (difference > 0) {
        const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const remainingMinutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({
          days: remainingDays,
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        });
      } else {
        // Offer has expired
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        clearInterval(interval);
      }
    };

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [course]);


  return (
    <div className="course-detail">
      <div className="main-content">
        <div
          style={{
            backgroundImage: `url("${Assets.images.companyBanner}")`,
            padding: '2rem',
          }}
          className="bg-image"
        >
          <NavBar />
          <div className="course-detail-content">
            <div className="course-detail-info">
              <h4>{course?.title}</h4>
              <h1>{course?.subtitle}</h1>
              <p>{course?.description}</p>
              <p>Course Starts: {course?.courseDetails.startDate}</p>
              <p>Course Duration: {course?.courseDetails.duration}</p>
              <div className="course-detail-price">
                <div>
                  <h2>N{course?.courseDetails.discountedPrice}</h2>
                  <p>pay in 3 installments</p>
                </div>
                <s>
                  <h4 style={{color: Assets.colors.tertiary}}>N{course?.courseDetails.price}</h4>
                </s>
                <div>
                  <p>Offer expires in</p>
                  <h4 style={{color: Assets.colors.tertiary}}>
            {timeRemaining.days} :  {timeRemaining.hours}  : {timeRemaining.minutes} :  {timeRemaining.seconds}
          </h4>
                  <p>days hrs mins secs</p>
                </div>
              </div>
              <div className="action-btn">
                <Button
                  title="Apply Now"
                  bgColor={Assets.colors.primary}
                  color={Assets.colors.light}
                  onClickButton={() => {}}
                  mLeft={15}
                  mRight={15}
                  mTop={0}
                  mBottom={0}
                />
              </div>
            </div>
            <div
              style={{
                // backgroundImage: `url("${Assets.images.manLearning}")`,
              }}
              className="course-detail-image"
            ></div>
          </div>
        </div>
        <div className="course-detail-description">
          <h2>Course Description</h2>
          <p>{course?.description}</p>
        </div>
      </div>
      <div className="sidebar">
        <div className="benefits">
          <h3>What you will learn</h3>
          <div className="benefits-grid">
            {course?.benefits.map((benefit, index) => (
              <div key={index}>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="projects">
          <h3 className="projects-title">Projects you will be building</h3>
          <p>
            During the course of 8 weeks learning, you'll be able to build the
            following projects.
          </p>
          <div className="projects-list">
            {course?.projects.map((project, index) => (
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
              <p>four easy steps to become a high paid tech bro/sis.</p>
            </div>
            <div className="get-started-btn">
              <Button
                title="Get Started"
                bgColor={Assets.colors.primary}
                color={Assets.colors.light}
                onClickButton={() => {}}
                mLeft={10}
                mRight={10}
                mTop={0}
                mBottom={0}
              />
            </div>
          </div>
          <div className="how-it-works-steps">
            {course?.howItWorks.map((step, index) => (
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