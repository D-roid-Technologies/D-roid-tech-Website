import React, { useState, useEffect, useRef } from "react";
import "./intro.css";
import "../../../components/liteGrid@v1.0/lite-grid.css";
import { Assets } from "../../../../utils/constant/Assets";
import CoreValueCard from "../../../components/CoreValueCard/CoreValueCard";
import { RoutePaths } from "../../../../routes/Index";

interface Counters {
  satisfaction: number;
  projects: number;
  years: number;
  countries: number;
}

const Intro: React.FC = () => {
  const [counters, setCounters] = useState<Counters>({
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
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
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
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        satisfaction: parseFloat((progress * 99.9).toFixed(1)),
        projects: Math.floor(progress * 32),
        years: Math.floor(progress * 5),
        countries: Math.floor(progress * 2),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
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
    <>
      <section className="intro" ref={introRef}>
        <div className="wrapper">
          <div className="group">
            <CounterBlock
              value={counters.satisfaction}
              isPercentage
              label="Customers satisfaction"
            />
            <CounterBlock
              value={counters.projects}
              label="Projects completed"
            />
            <CounterBlock value={counters.years} label="Years in the market" />
            <CounterBlock
              value={counters.countries}
              label="Countries of Operation"
            />
          </div>
        </div>

        {/* What we do section */}
        <div className="wrapper mt-5">
          <div className="color_bg">
            <span>WHAT WE DO</span>
            <div className="group">
              <div className="block-12 block-md-5 text_con">
                <h1>we turn your ideas into reality</h1>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "30px" }}
                >
                  <a
                    href={RoutePaths.JoinOurCommunity}
                    style={{ backgroundColor: "#fff", color: "#071d6a" }}
                    className="navbar-cta"
                  >
                    Join Our Community
                  </a>
                </div>
              </div>
              <div className="block-12 block-md-2" />
              <div
                className="block-12 block-md-5 image_con"
               
              >
                <img className="" src={Assets.images.lightBulb} alt="Light Bulb" />
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div
            className="wrapper"
            style={{  marginTop: "24px", marginBottom: "20px" }}
          >
            <span className="title_span value_t">
              CORE VALUES
            </span>

            <div className="group mt-4">
              <CoreValueCard
                imageSrc={Assets.images.trustImg}
                title="Integrity"
                description="At D'roid Technologies, integrity is the cornerstone of our operations. We are committed to conducting our business with the highest ethical standards, ensuring transparency, honesty, and accountability in all our interactions."
              />
              <CoreValueCard
                imageSrc={Assets.images.innovationImg}
                title="Innovation"
                description="At D'roid Technologies, innovation is at the heart of everything we do. We are committed to pushing the boundaries of technology to deliver groundbreaking solutions that drive progress and create new opportunities."
              />
              <CoreValueCard
                imageSrc={Assets.images.customerImg}
                title="Customer focus"
                description="We are dedicated to delivering exceptional value to our customers by prioritizing their needs and building lasting relationships through innovation and service excellence."
              />
            </div>
          </div>
        </div>
      </section>
      {/* Our Team Section */}
      <div className="wrapper team_sec">
        <center className="mt-5">
          <span className="title_span" style={{ background: "#fff" }}>
            OUR TEAM
          </span>
        </center>
        <div className="group justify-content-center">
          <div className="block-12 block-md-8 team_decs">
            <h1 style={{ color: "#111724" }}>
              Join <span style={{ color: "#071d6a" }}>the team</span>
            </h1>
            <p className="mb-5" style={{ color: "#111724" }}>
              Are you passionate about Technology and Innovation? Join us for a
              6-month Software Development Training and become a full-time staff
              member at D'roid Technologies. Work on exciting projects, grow
              your career, and be part of a team that values creativity,
              excellence, and customer focus.
              <br />
              <br />
              The Fastest way to become a Techie — Only at D'roid Technologies.
            </p>
            <a
              href={RoutePaths.Careers}
              style={{ backgroundColor: "#071d6a", color: "#fff" }}
              className="navbar-cta"
            >
              See Careers
            </a>
          </div>
        </div>

        <div className="team_image_home">
         
        </div>
      </div>
    </>
  );
};

interface CounterBlockProps {
  value: number;
  label: string;
  isPercentage?: boolean;
}

const CounterBlock: React.FC<CounterBlockProps> = ({
  value,
  label,
  isPercentage = false,
}) => {
  return (
    <div className="block-6 block-lg-3 intro-block">
      <h1>
        {isPercentage ? value.toFixed(value === 99.9 ? 1 : 0) : value}
        <small>{isPercentage ? "%" : "+"}</small>
      </h1>
      <p>{label}</p>
    </div>
  );
};

export default Intro;
