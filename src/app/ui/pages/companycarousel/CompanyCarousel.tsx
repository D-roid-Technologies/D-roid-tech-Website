import React, { useState, useEffect } from "react";
import { Assets } from "../../../utils/constant/Assets";
import "./CompanyCarousel.css";

const CompanyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Innovative Tech Solutions",
      description:
        "We deliver cutting-edge technology solutions tailored to your business needs.",
      bgImage: Assets.images.homeBannerSlideOne,
    },
    {
      title: "Trusted By Industry Leaders",
      description: "Partnering with Fortune 500 companies to startups.",
      bgImage: Assets.images.homeBannerSlideTwo,
    },
    {
      title: "Future-Ready Development",
      description:
        "Our forward-thinking approach ensures your systems evolve with technology.",
      bgImage: Assets.images.homeBannerSlideThree,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
            <div className="slide-overlay"></div>
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
