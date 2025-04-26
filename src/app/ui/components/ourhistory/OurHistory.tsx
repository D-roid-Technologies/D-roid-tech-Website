// HistorySection.jsx
import React from "react";
import "../ourhistory/OurHistory.css";

const OurHistory = () => {
  return (
    <section className="history-container">
      <div className="history-content">
        <h1 className="history-title">Our History</h1>

        <div className="history-timeline">
          <div className="timeline-marker">
            <span className="year">2015</span>
          </div>

          <div className="history-cards">
            <div className="history-card">
              <p>
                D'roid Technologies was birthed in 2015 with an idea to
                digitalize the most simplest of things.
                <span className="founder-name">
                  <a
                    href="https://ekenedilichukwu.com"
                    className="founder-name"
                  >
                    Ekenedilichukwu Okoli
                  </a>
                </span>
                &nbsp; wanted to be able to make things easier for every
                individual, allowing them to be able to fulfil each and every
                aspect of their lives to a percentage of 90 no matter their
                circumstance.
              </p>
            </div>

            <div className="history-card">
              <p>
                The word "D'roid" was derived from the word "Android" in a long
                term attempt to create a personal Health Robot Companion for
                every human being across the globe. Allowing better physical
                movements, better communication and better life plans that are
                more fitted to each individual.
              </p>
            </div>

            <div className="history-card">
              <p>
                D'roid Technologies aims to one day sync all consenting humans
                directly to a D'roid Health Bot allowing better care, instant
                medication, physical training and out door activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHistory;
