// CompanyHistory.jsx
import React from "react";
import "../ourjourney/OurJourney.css";

const OurJourney = () => {
  return (
    <section className="company-journey">
      <div className="company-journey-container">
        <div className="company-journey-content">
          <h2 className="company-section-title">Our Journey</h2>

          <div className="company-timeline">
            <div className="company-timeline-item">
              <div className="company-timeline-marker">2018</div>
              <div className="company-timeline-content">
                <p>
                  We embarked on the development of our first contract and
                  inspired by a passion for innovation plus desire to make a
                  difference our company was born with the first set of D'roid
                  employees.
                </p>
              </div>
            </div>

            <div className="company-timeline-item">
              <div className="company-timeline-marker">Early Days</div>
              <div className="company-timeline-content">
                <p>
                  In the early days, we faced numerous challenges and obstacles,
                  but our unwavering determination and commitment to excellence
                  propelled us forward. With each hurdle we overcame, we gained
                  valuable insights and experience that shaped our journey.
                </p>
              </div>
            </div>

            <div className="company-timeline-item">
              <div className="company-timeline-marker">Growth</div>
              <div className="company-timeline-content">
                <p>
                  As the years passed, D'roid Technologies continued to grow and
                  evolve, expanding our team and refining our capabilities. We
                  established ourselves as pioneers in the software industry,
                  known for our innovative solutions and cutting-edge
                  technologies.
                </p>
              </div>
            </div>

            <div className="company-timeline-item">
              <div className="company-timeline-marker">Today</div>
              <div className="company-timeline-content">
                <p>
                  Throughout our journey, we've remained true to our core values
                  of integrity, innovation, and customer focus. We've forged
                  strong partnerships with clients and collaborators, earning
                  their trust and loyalty through our unwavering commitment to
                  quality and excellence.
                </p>
              </div>
            </div>

            <div className="company-timeline-item">
              <div className="company-timeline-marker">Future</div>
              <div className="company-timeline-content">
                <p>
                  Today, as we reflect on our history, we're proud of the
                  milestones we've achieved and the obstacles we've overcome.
                  But our journey is far from over. As we look to the future,
                  we're excited to continue pushing the boundaries of
                  possibility and shaping the digital landscape for years to
                  come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
