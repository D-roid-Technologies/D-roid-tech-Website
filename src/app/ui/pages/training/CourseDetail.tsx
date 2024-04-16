import React from 'react';
import './CourseDetail.css';

const CourseDetail: React.FC = () => {
  return (
    <div className="course-detail">
      <div className="main-content">
        left section
      </div>
      <div className="sidebar">
        <div className="benefits">
          <h2>What you will learn</h2>
          <div className="benefits-grid">
            <div>
                <h4>Html & css</h4>
                <p>Master the foundational languages of the web – HTML and CSS. Learn how to structure web pages using HTML, style them using CSS, and create visually appealing layouts and designs.</p>
            </div>
            <div>
                <h4>Javascript</h4>
                <p>Deepen your understanding of Javascript, the programming language that powers interactivity on the web. Learn essential JavaScript concepts and techniques to enhance the functionality of your React applications. </p>
            </div>
            <div>
                <h4>React Fundamentals</h4>
                <p>Understand the core principles of React, including component-based architecture, JSX syntax, and virtual DOM. Learn how to build reusable UI components and effectively manage state in React applications.</p>
            </div>
            <div>
                <h4>State Management with Redux</h4>
                <p>Dive into Redux, a powerful state management library for React applications. Learn how to centralize and manage application state, handle complex data flows, and implement actions and reducers for predictable state updates.</p>
            </div>
            <div>
                <h4>React Router</h4>
                <p>explore react router, a popular routing library for building single-page application. Learn how to implement navigation, handle routing, and create dynamic routes to create a smooth and seamless user experience.</p>
            </div>
            <div>
                <h4>API integration</h4>
                <p>Learn how to integrate external APIs into your react applications to fetch and display dynamic data. Understand conscepts like asynchronous programming, handling API responses and managing data flow between components.</p>
            </div>
          </div>
        </div>
        <div className="projects">
          <h2 className="projects-title">Projects you will be building</h2>
          <p>During the course of 8 weeks learning, you'll be able to build the following projects.</p>
          <div className="projects-list">
            <div>
                <h4>Calculator App</h4>
                <p>Get ready to crunch numbers with style! In just two weeks, you’ll build your very own Calculator App using Flutter</p>
            </div>
            <div>
                <h4>Event App</h4>
                <p>It’s time to unleash your inner event planner! In just five weeks, you’ll create an Event App that takes event management to the next level.</p>
            </div>
            <div>
                <h4>Fintech App</h4>
                <p>Get ready to dive into the world of finance and technology! As the final project of the course, you ‘ll develop a dynamic and secure Fintech App that empowers users to manage their finances with ease.</p>
            </div>
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
            <div className="step">
              <div className="step-number">1</div>
              <h2 className="step-title">Title 1</h2>
              <p className="step-content">Content 1</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h2 className="step-title">Title 2</h2>
              <p className="step-content">Content 2</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h2 className="step-title">Title 3</h2>
              <p className="step-content">Content 3</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h2 className="step-title">Title 4</h2>
              <p className="step-content">Content 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;