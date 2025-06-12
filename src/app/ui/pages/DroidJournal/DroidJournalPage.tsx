import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Blog from "./Blog";
import "../../components/liteGrid@v1.0/lite-grid.css";
import { useNavigate } from "react-router-dom";

// type Journal = {
//   title: string;
//   summary: string;
//   //   image: string;
//   url: string;
//   date: string;
// };

// const journals: Journal[] = [
//   {
//     title: "Why React is Winning the Frontend War",
//     summary:
//       "Explore the rise of React and why it continues to dominate modern UI development.",
//     // image: Assets.images.reactCover, // replace with actual path
//     url: "/journal/react-winning",
//     date: "March 10, 2025",
//   },
//   {
//     title: "Design Thinking with Figma",
//     summary:
//       "How Figma is changing collaborative design workflows across teams.",
//     // image: Assets.images.figmaCover,
//     url: "/journal/figma-design-thinking",
//     date: "February 24, 2025",
//   },
//   {
//     title: "TypeScript vs JavaScript",
//     summary:
//       "Breaking down the strengths of TypeScript and why you should care.",
//     // image: Assets.images.tsCover,
//     url: "/journal/ts-vs-js",
//     date: "January 18, 2025",
//   },
// ];

const DroidJournalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <NavBar className="scrolled no-shadow" /> */}
    
      <Blog />
    </>
  );
};

export default DroidJournalPage;
