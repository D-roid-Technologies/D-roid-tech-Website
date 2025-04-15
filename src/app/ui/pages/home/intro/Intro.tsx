import React, { useState, useEffect, useRef } from "react";
import "./intro.css";
import "../../../components/liteGrid@v1.0/lite-grid.css";
import { Assets } from "../../../../utils/constant/Assets";

const Intro: React.FC = () => {
  const [counters, setCounters] = useState({
    satisfaction: 0,
    projects: 0,
    years: 0,
    countries: 0,
  });
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start counting when component is visible
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of component is visible
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    // Animation duration in milliseconds
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        satisfaction: Math.floor(progress * 99.9),
        projects: Math.floor(progress * 32),
        years: Math.floor(progress * 5),
        countries: Math.floor(progress * 2),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final numbers are exact
        setCounters({
          satisfaction: 99.9,
          projects: 32,
          years: 5,
          countries: 2,
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section className="intro" ref={introRef}>
      <div className="wrapper">
        {/* <center> */}
        <div className="group">
          <div className="block-6 block-lg-3 intro-block block-alt">
            <h1>
              {counters.satisfaction.toFixed(
                counters.satisfaction === 99.9 ? 1 : 0
              )}
              <small>%</small>
            </h1>
            <p>Customers satisfaction</p>
          </div>
          <div className="block-6 block-lg-3 intro-block">
            <h1>
              {counters.projects}
              <small>+</small>
            </h1>
            <p>Projects completed</p>
          </div>
          <div className="block-6 block-lg-3 intro-block mt-3 mt-lg-0">
            <h1>
              {counters.years}
              <small>+</small>
            </h1>
            <p>Years in the market</p>
          </div>
          <div className="block-6 block-lg-3 intro-block mt-3 mt-lg-0">
            <h1>{counters.countries}</h1>
            <p>Countries of Operation</p>
          </div>
        </div>
        {/* </center> */}
      </div>
      {/* what we do section  */}
      <div className="wrapper mt-5">
        <div className="color_bg">
          <span>WHAT WE DO</span>
          <br />
          <br />
          <br />
          <br />
          <div className="group">
            <div className="block-12 block-md-5">
              <h1>we turn your ideas into reality</h1>
              <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
                <a
                  href="/start-a-project"
                  style={{ backgroundColor: "#fff", color: "#071d6a" }}
                  className="navbar-cta"
                >
                  Join Our Community
                </a>
              </div>
              {/* buttons
              
              */}
            </div>
            <div className="block-12 block-md-2"></div>
            <div className="block-12 block-md-5">
              <img src={Assets.images.lightBulb} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
