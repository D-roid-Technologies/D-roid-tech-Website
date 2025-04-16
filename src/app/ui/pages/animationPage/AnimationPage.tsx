import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";

type Story = {
    title: string;
    description: string;
    videoUrl?: string; // If you embed videos or animations
    thumbnail?: string; // Optional image preview
    releaseDate: string;
    url: string;
};

const stories: Story[] = [
    {
        title: "The Bug That Learned to Code",
        description:
            "A quirky animated tale about a tiny bug’s journey from chaos to clean code.",
        releaseDate: "March 5, 2025",
        url: "/stories/bug-learns-to-code",
    },
    {
        title: "Designers in the Metaverse",
        description:
            "A futuristic short about designers creating experiences in fully immersive digital worlds.",
        releaseDate: "February 10, 2025",
        url: "/stories/designers-in-metaverse",
    },
    {
        title: "When AI Found a Soul",
        description:
            "A poetic story exploring what happens when artificial intelligence develops empathy.",
        releaseDate: "January 20, 2025",
        url: "/stories/ai-finds-soul",
    },
];

const AnimationPage: React.FC = () => {
    return (
        <div>
            <NavBar />

            {/* Hero Section */}
            <div
                style={{
                    backgroundImage: `url(${Assets.images.homeBannerSlideThree})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "60vh",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "60px",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
                        Animation & Short Stories
                    </h1>
                    <p style={{ fontSize: "1.25rem", color: "#eee", maxWidth: "600px" }}>
                        Original stories told through motion, creativity, and a dash of code. Brought to you by the storytellers at D'roid.
                    </p>
                </div>
            </div>

            {/* Stories Section */}
            <div className="wrapper" style={{ padding: "40px" }}>
                <h2 style={{ marginBottom: "30px" }}>Featured Shorts</h2>
                <div
                    style={{
                        display: "grid",
                        gap: "30px",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    }}
                >
                    {stories.map((story, idx) => (
                        <div
                            key={idx}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                            }}
                        >
                            <div style={{ height: "200px", backgroundColor: "#f3f3f3" }}>
                                {/* Optional: Thumbnail or embed */}
                                {/* <img src={story.thumbnail} alt={story.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                                    {story.title}
                                </h3>
                                <p style={{ margin: "10px 0", color: "#555" }}>{story.description}</p>
                                <span style={{ fontSize: "0.9rem", color: "#999" }}>
                                    {story.releaseDate}
                                </span>
                                <div style={{ marginTop: "10px" }}>
                                    <a href={story.url} style={{ color: "#007bff" }}>
                                        Watch Now →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div
                style={{
                    backgroundColor: "#071d6a",
                    padding: "50px",
                    textAlign: "center",
                    color: "#fff",
                }}
            >
                <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                    Let's Amnimate your Story!
                </h2>
                <p style={{ fontSize: "1.1rem" }}>
                    We collaborate with creatives to turn scripts into immersive visual experiences.
                </p>
                <a
                    href="/contact"
                    style={{
                        marginTop: "20px",
                        display: "inline-block",
                        backgroundColor: "#fff",
                        color: "#071d6a",
                        padding: "10px 25px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: "600",
                    }}
                >
                    Collaborate With Us
                </a>
            </div>
        </div>
    );
};

export default AnimationPage;
