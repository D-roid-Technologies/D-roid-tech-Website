import React from "react";
import "./CourseDetail.css";
import NavBar from "../../../components/navbar/NavBar";
import { Assets } from "../../../../utils/constant/Assets";
import Button from "../../../components/button/Button";

const CourseDetail: React.FunctionComponent = () => {
  return (
    <div className="course-detail">
      <div className="main-content">
        <div
          style={{
            backgroundImage: `url("${Assets.images.companyBanner}")`,
          }}
          className="bg-image"
        >
          <NavBar />
          <div className="course-detail-content">
            <div className="course-detail-info">
              <h4>Front-End Development (React)</h4>
              <h1>Master Front-End Development with React.</h1>
              <p>
                Elevate your web development skills with our Front-End
                Development (React) Mastery course. Dive into the world of React
                and unleash your creativity to build stunning, interactive user
                interfaces.
              </p>
              <p>Course Starts: 1st August, 2023</p>
              <p>Course Duration: 10 weeks</p>
              <div className="course-detail-price">
                <div>
                  <h2>N60,000</h2>
                  <p>pay in 3 installments</p>
                </div>
                <s>
                  <h4>N250,000</h4>
                </s>
                <div>
                  <p>Offer expires in</p>
                  <h4>21 : 10 : 05</h4>
                  <p>days hrs mins</p>
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
          <p>
            Welcome to the world of Frontend Development with React Js, where
            you'll learn to create stunning and dynamic user interfaces for web
            applications. React Js is a powerful JavaScript library that enables
            you to build reusable UI components, making the development process
            efficient and enjoyable. Imagine having the ability to bring
            websites to life with captivating animations, seamless transitions,
            and interactive elements that engage users. With React Js, you can
            create highly responsive and feature-rich web applications that
            deliver exceptional user experience across devices.
          </p>
          <p>
            Welcome to the world of Frontend Development with React Js, where
            you'll learn to create stunning and dynamic user interfaces for web
            applications. React Js is a powerful JavaScript library that enables
            you to build reusable UI components, making the development process
            efficient and enjoyable. Imagine having the ability to bring
            websites to life with captivating animations, seamless transitions,
            and interactive elements that engage users. With React Js, you can
            create highly responsive and feature-rich web applications that
            deliver exceptional user experience across devices.
          </p>
        </div>
      </div>
      <div className="sidebar">
        <div className="benefits">
          <h3>What you will learn</h3>
          <div className="benefits-grid">
            <div>
              <h4>Html & css</h4>
              <p>
                Master the foundational languages of the web – HTML and CSS.
                Learn how to structure web pages using HTML, style them using
                CSS, and create visually appealing layouts and designs.
              </p>
            </div>
            <div>
              <h4>Javascript</h4>
              <p>
                Deepen your understanding of Javascript, the programming
                language that powers interactivity on the web. Learn essential
                JavaScript concepts and techniques to enhance the functionality
                of your React applications.{" "}
              </p>
            </div>
            <div>
              <h4>React Fundamentals</h4>
              <p>
                Understand the core principles of React, including
                component-based architecture, JSX syntax, and virtual DOM. Learn
                how to build reusable UI components and effectively manage state
                in React applications.
              </p>
            </div>
            <div>
              <h4>State Management with Redux</h4>
              <p>
                Dive into Redux, a powerful state management library for React
                applications. Learn how to centralize and manage application
                state, handle complex data flows, and implement actions and
                reducers for predictable state updates.
              </p>
            </div>
            <div>
              <h4>React Router</h4>
              <p>
                explore react router, a popular routing library for building
                single-page application. Learn how to implement navigation,
                handle routing, and create dynamic routes to create a smooth and
                seamless user experience.
              </p>
            </div>
            <div>
              <h4>API integration</h4>
              <p>
                Learn how to integrate external APIs into your react
                applications to fetch and display dynamic data. Understand
                conscepts like asynchronous programming, handling API responses
                and managing data flow between components.
              </p>
            </div>
          </div>
        </div>
        <div className="projects">
          <h3 className="projects-title">Projects you will be building</h3>
          <p>
            During the course of 8 weeks learning, you'll be able to build the
            following projects.
          </p>
          <div className="projects-list">
            <div>
              <h4>Calculator App</h4>
              <p>
                Get ready to crunch numbers with style! In just two weeks,
                you'll build your very own Calculator App using Flutter
              </p>
            </div>
            <div>
              <h4>Event App</h4>
              <p>
                It's time to unleash your inner event planner! In just five
                weeks, you'll create an Event App that takes event management to
                the next level.
              </p>
            </div>
            <div>
              <h4>Fintech App</h4>
              <p>
                Get ready to dive into the world of finance and technology! As
                the final project of the course, you 'll develop a dynamic and
                secure Fintech App that empowers users to manage their finances
                with ease.
              </p>
            </div>
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
            <div className="step">
              <div className="step-number">1</div>
              <h2 className="step-title">Register</h2>
              <p className="step-content">
                Sign up and select the tech skill you want to learn. The system
                matches you with a group of three to four other users who are
                also interested in learning the same skill
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h2 className="step-title">Assign</h2>
              <p className="step-content">
                The group is assigned to dedicated mentor who is an expert in
                the chosen skill. The mentor leads the group through a
                structured learning program that includes video lectures,
                interactive exercises and quizzes.{" "}
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h2 className="step-title">Interact</h2>
              <p className="step-content">
                The group meets weekly via video conference to discuss their
                progress, ask questions, and receive feedback from the mentor
                and each other.
              </p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h2 className="step-title">Get Certified</h2>
              <p className="step-content">
                Upon completion of the program, users receive a certificate of
                achievement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
