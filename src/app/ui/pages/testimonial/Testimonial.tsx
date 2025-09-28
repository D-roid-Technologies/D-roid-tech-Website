import React, { useState, useRef, useEffect } from "react";
import "./Testimonial.css";
import { TestimonialData } from "./types/testimonial";
import { testimonialDataMap } from "./data/testimonialDataMap";

interface TestimonialProps {
  map?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ map = "default" }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: TestimonialData[] =
    testimonialDataMap[map] || testimonialDataMap.default;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <span className="title_span" style={{ textTransform: "uppercase" }}>
          Testimonials
        </span>
        <br />
        <br />
        <br />
        <h2 className="section-title">What Our customers Say</h2>
      </div>

      <div
        className="testimonial-slider"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{testimonial.content}</p>
              <div className="testimonial-footer">
                <div className="author-info">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div>
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
                {testimonial.companyLogo && (
                  <img
                    src={testimonial.companyLogo}
                    alt="Company logo"
                    className="company-logo"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-nav">
        <button
          className="nav-arrow prev"
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          <p>&lt;</p>
        </button>
        <div className="slide-counter">
          {/* <span className="current-slide">{currentSlide + 1}</span>
          <span className="divider">/</span>
          <span className="total-slides">{testimonials.length}</span> */}
        </div>
        <button
          className="nav-arrow next"
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          <p>&gt;</p>
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
