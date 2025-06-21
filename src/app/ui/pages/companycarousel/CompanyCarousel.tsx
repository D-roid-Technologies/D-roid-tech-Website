import React, { useState, useEffect } from "react";
import { Assets } from "../../../utils/constant/Assets";
import "./CompanyCarousel.css";

interface Slide {
  title: string;
  description: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    title: "Company Management Portal",
    description:
      "A centralized platform designed to streamline and manage all aspects of your organization's operations.",
    bgImage: Assets.images.homeBannerSlideOne,
  },
  {
    title: "Innovative Tech Solutions",
    description:
      "We deliver cutting-edge technology solutions tailored to your business needs.",
    bgImage: Assets.images.homeBannerSlideOne,
  },
  {
    title: "Trusted By Industry Leaders",
    description: "Partnering with Fortune 500 companies down to startups.",
    bgImage: Assets.images.homeBannerSlideTwo,
  },
  {
    title: "Digital Workbench",
    description:
      "A smart workspace for tools you use every day.",
    bgImage: Assets.images.homeBannerSlideThree,
  },
];

const CompanyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="company-carousel">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="slide-overlay" />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyCarousel;
