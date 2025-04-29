import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";

type Phone = {
    name: string;
    description: string;
    price: string;
    url: string;
    image: string;
};

const phones: Phone[] = [
    {
        name: "D’roid Zero",
        description: "Flagship power, stunning OLED display, and long-lasting battery.",
        price: "$699",
        url: "/phones/droid-x1",
        image: "",
    },
    {
        name: "D’roid Pixel",
        description: "Compact, affordable, and powerful enough for everyday use.",
        price: "$399",
        url: "/phones/droid-lite",
        image: "",
    },
    {
        name: "D’roid Angle",
        description: "Next-gen foldable display with multi-tasking at its core.",
        price: "$1199",
        url: "/phones/droid-fold",
        image: "",
    },
];

const DroidPhonesPage: React.FC = () => {
    return (
        <div>
            <NavBar />

            {/* Hero */}
            <div
                style={{
                    backgroundImage: `url(${Assets.images.homeBannerSlideOne || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "60px",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
                        D’roid Phones
                    </h1>
                    <p style={{ fontSize: "1.25rem", color: "#eee", maxWidth: "500px" }}>
                        Powerful technology. Bold design. Explore the future in your hands.
                    </p>
                </div>
            </div>

            {/* Phone Models */}
            <div className="wrapper" style={{ padding: "40px" }}>
                <h2 style={{ marginBottom: "30px" }}>Our Mobile Lineup</h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "30px",
                    }}
                >
                    {phones.map((phone, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                                backgroundColor: "#fff",
                            }}
                        >
                            {phone.image && (
                                <img
                                    src={phone.image}
                                    alt={phone.name}
                                    style={{
                                        width: "100%",
                                        height: "180px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "15px",
                                    }}
                                />
                            )}
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>{phone.name}</h3>
                            <p style={{ color: "#555" }}>{phone.description}</p>
                            <p style={{ fontWeight: "bold", marginTop: "10px" }}>{phone.price}</p>
                            <a
                                href={phone.url}
                                style={{ color: "#007bff", marginTop: "10px", display: "inline-block" }}
                            >
                                View Details →
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why D’roid */}
            <div className="wrapper" style={{ padding: "40px" }}>
                <h2 style={{ marginBottom: "30px" }}>Why Choose D’roid?</h2>
                <ul style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
                    <li>⚡ Lightning-fast performance</li>
                    <li>🔋 Industry-leading battery life</li>
                    <li>📱 Clean, intuitive software experience</li>
                    <li>🔒 Privacy-first, secure by design</li>
                    <li>🌍 Seamless global support & warranty</li>
                </ul>
            </div>

            {/* Call to Action */}
            <div
                style={{
                    backgroundColor: "#071d6a",
                    padding: "40px",
                    textAlign: "center",
                    color: "#fff",
                }}
            >
                <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                    Ready to make the switch?
                </h2>
                <p style={{ fontSize: "1.1rem" }}>
                    Explore D’roid today and experience mobile like never before.
                </p>
                <a
                    href="/phones"
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
                    Browse All Phones
                </a>
            </div>
        </div>
    );
};

export default DroidPhonesPage;
