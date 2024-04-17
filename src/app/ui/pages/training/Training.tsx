import React, { useState } from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import "./Training.css";
import { TrainingPhoto } from "../../../utils/Types";
import Button from "../../components/button/Button";
import { Assets } from "../../../utils/constant/Assets";
import CourseDetail from "./CourseDetail";

//I'll move it
const photos: TrainingPhoto[] = [
  { image: Assets.images.companyBanner, text: "Learn new skills with us" },
  { image: Assets.images.companyBanner, text: "Expert trainers available" },
  { image: Assets.images.companyBanner, text: "Learn at your own pace" },
];

//I'll move it to utils/Data
const courses = [
  {
    id: 1,
    title: "Level 1-4",
    description:
      "Welcome to the world of Frontend Development with React Js, where you'll learn to create stunning and dynamic user interfaces for web applications. React Js is a powerful JavaScript library that enables you to build reusable UI components, making the development process efficient and enjoyable.",
    benefits: [
      {
        title: "Html & css",
        description:
          "Master the foundational languages of the web – HTML and CSS. Learn how to structure web pages using HTML, style them using CSS, and create visually appealing layouts and designs.",
      },
      {
        title: "Javascript",
        description:
          "Deepen your understanding of Javascript, the programming language that powers interactivity on the web. Learn essential JavaScript concepts and techniques to enhance the functionality of your React applications.",
      },
      {
        title: "React Fundamentals",
        description:
          "Understand the core principles of React, including component-based architecture, JSX syntax, and virtual DOM. Learn how to build reusable UI components and effectively manage state in React applications.",
      },
      {
        title: "State Management with Redux",
        description:
          "Dive into Redux, a powerful state management library for React applications. Learn how to centralize and manage application state, handle complex data flows, and implement actions and reducers for predictable state updates.",
      },
      {
        title: "React Router",
        description:
          "Explore react router, a popular routing library for building single-page application. Learn how to implement navigation, handle routing, and create dynamic routes to create a smooth and seamless user experience.",
      },
      {
        title: "API integration",
        description:
          "Learn how to integrate external APIs into your react applications to fetch and display dynamic data. Understand concepts like asynchronous programming, handling API responses and managing data flow between components.",
      },
    ],
    projects: [
      {
        title: "Calculator App",
        description:
          "Get ready to crunch numbers with style! In just two weeks, you'll build your very own Calculator App using Flutter",
      },
      {
        title: "Event App",
        description:
          "It's time to unleash your inner event planner! In just five weeks, you'll create an Event App that takes event management to the next level.",
      },
      {
        title: "Fintech App",
        description:
          "Get ready to dive into the world of finance and technology! As the final project of the course, you'll develop a dynamic and secure Fintech App that empowers users to manage their finances with ease.",
      },
    ],
    howItWorks: [
      {
        title: "Title 1",
        content: "Content 1",
      },
      {
        title: "Title 2",
        content: "Content 2",
      },
      {
        title: "Title 3",
        content: "Content 3",
      },
      {
        title: "Title 4",
        content: "Content 4",
      },
    ],
  },
];

const Training: React.FunctionComponent = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const location = useLocation();

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${Assets.images.companyBanner}")`,
        }}
        className="bg-image"
      >
        <NavBar />
        <article className="home-content">
          <p className="business">{photos[currentPhotoIndex].text}</p>
        </article>
        <div className="prev-button">
          <Button
            title="<"
            bgColor="rgba(0, 0, 0, 0.5)"
            color={Assets.colors.light}
            onClickButton={handlePreviousPhoto}
            mLeft={10}
            mRight={10}
            mTop={0}
            mBottom={0}
          />
        </div>
        <div className="next-button">
          <Button
            title=">"
            bgColor="rgba(0, 0, 0, 0.5)"
            color={Assets.colors.light}
            onClickButton={handleNextPhoto}
            mLeft={10}
            mRight={10}
            mTop={0}
            mBottom={0}
          />
        </div>
      </div>
      <div className="container2">
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          aliquid dolores in deleniti, autem natus repudiandae nobis voluptates
          culpa facere libero eum adipisci porro corporis, illo obcaecati minus.
          Animi, dolores.
        </p>
      </div>
      <div className="Container">
        {courses.map((course) => (
          <Link
            to={`${location.pathname}/course-detail/${course.id}`}
            className="Column"
            key={course.id}
          >
            <div
              className="Icon"
              style={{ backgroundColor: Assets.colors.secondary }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="13"
                viewBox="0 0 31 13"
                fill="none"
              ></svg>
            </div>
            <h4 className="Heading">{course.title}</h4>
          </Link>
        ))}
      </div>
      <Routes>
        <Route
          path={`${location.pathname}/course-detail/:courseId`}
          element={<CourseDetail />}
        />
      </Routes>
    </div>
  );
};

export default Training;
