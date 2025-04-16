import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";

type Journal = {
  title: string;
  summary: string;
//   image: string;
  url: string;
  date: string;
};

const journals: Journal[] = [
  {
    title: "Why React is Winning the Frontend War",
    summary: "Explore the rise of React and why it continues to dominate modern UI development.",
    // image: Assets.images.reactCover, // replace with actual path
    url: "/journal/react-winning",
    date: "March 10, 2025",
  },
  {
    title: "Design Thinking with Figma",
    summary: "How Figma is changing collaborative design workflows across teams.",
    // image: Assets.images.figmaCover,
    url: "/journal/figma-design-thinking",
    date: "February 24, 2025",
  },
  {
    title: "TypeScript vs JavaScript",
    summary: "Breaking down the strengths of TypeScript and why you should care.",
    // image: Assets.images.tsCover,
    url: "/journal/ts-vs-js",
    date: "January 18, 2025",
  },
];

const DroidJournalPage: React.FC = () => {
  return (
    <div>
      <NavBar />

      {/* Header */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideThree})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "60px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "4rem", color: "white", fontWeight: 800 }}>
            D'roid Journal
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#eee" }}>
            Insights, stories, and tech updates from the team at D'roid Technologies.
          </p>
        </div>
      </div>

      {/* Journal Grid */}
      <div className="wrapper" style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "30px" }}>Latest Entries</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {journals.map((journal, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <img
                // src={journal.image}
                alt={journal.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{journal.title}</h3>
                <p style={{ margin: "10px 0", color: "#555" }}>{journal.summary}</p>
                <span style={{ fontSize: "0.9rem", color: "#999" }}>{journal.date}</span>
                <div style={{ marginTop: "10px" }}>
                  <a href={journal.url} style={{ color: "#007bff" }}>
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: "#071d6a",
          padding: "40px",
          textAlign: "center",
          color: "#fff",
          marginTop: "60px",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Want to stay in the loop?
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          Subscribe to our journal and never miss an update from the D'roid team.
        </p>
        <a
          href="/contact"
          style={{
            marginTop: "20px",
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#071d6a",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default DroidJournalPage;
