import React, { useState, useEffect, useRef } from "react";
import "./intro.css";
import "../../../components/liteGrid@v1.0/lite-grid.css";
import { Assets } from "../../../../utils/constant/Assets";
import CoreValueCard from "../../../components/CoreValueCard/CoreValueCard";

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
          <div className="group">
            <div className="block-12 block-md-5 text_con">
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
            <div
              className="block-12 block-md-5 image_con"
              style={{ textAlign: "center" }}
            >
              <img src={Assets.images.lightBulb} alt="" />
            </div>
          </div>
        </div>

        <div className="wrapper" style={{ padding: "20px" }}>
          <br />
          <span className="title_span" style={{ marginLeft: "20px" }}>
            CORE VALUES
          </span>
          {/* Take out these br's and use margin bottom instead on he div below */}
          <br />
          <br />
          <div className="group mt-4">
            <CoreValueCard
              imageSrc={Assets.images.trustImg}
              title="Integrity"
              description="At D'roid Technologies, integrity is the cornerstone of our operations. We are committed to conducting our business with the highest ethical standards, ensuring transparency, honesty, and accountability in all our interactions."
            />
            <CoreValueCard
              imageSrc={Assets.images.innovationImg}
              title="Innovation"
              description="At D'roid Technologies, innovation is at the heart of everything
              we do. We are committed to pushing the boundaries of technology
              to deliver groundbreaking solutions that drive progress and
              create new opportunities."
            />
            <CoreValueCard
              imageSrc={Assets.images.customerImg}
              title="Customer focus"
              description="At D'roid Technologies, innovation is at the heart of everything
              we do. We are committed to pushing the boundaries of technology
              to deliver groundbreaking solutions that drive progress and
              create new opportunities."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
