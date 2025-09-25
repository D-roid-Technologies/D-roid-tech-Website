import React, { useState } from "react";
import { Questions } from "../../../../utils/questions";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
import "./TakeTestFolder.css";
import { useNavigate } from "react-router-dom";

const TakeTestFolder = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<any | null>(null);

  const handleTestClick = (testData: any) => {
    console.log("Test clicked:", testData);
    setSelectedTest(testData);
  };

  const handleBack = () => {
    setSelectedTest(null);
  };

  const handleStartTest = (testData: any) => {
    // If you want to navigate to the quiz directly
    // navigate("/training/quize", { state: testData });
    console.log("Starting test:", testData);
  };

  return (
    <div className="ttf-wrapper soft-wrapper">
      {/* <div className="ttf-wrapper "> */}
      <span className="ttf-header soft-dev-header title_span">
        Test Your Knowledge
      </span>

      <div className="ttf-content soft-dev-content">
        {!selectedTest ? (
          // Show test list
          <div className="ttf-test-list">
            {Questions && Questions.length > 0 ? (
              Questions.map((prog, index) => (
                <div
                  key={index}
                  onClick={() => handleTestClick(prog)}
                  className="ttf-test-item"
                >
                  <CoreValueCardTwo
                    title={`Take ${prog.title} Test`}
                    description={prog.summary}
                    url={prog.url}
                    className="process-card"
                  />
                </div>
              ))
            ) : (
              <p className="ttf-no-tests">No tests available</p>
            )}
          </div>
        ) : (
          // Show test details
          <div className="ttf-test-details-view">
            <button onClick={handleBack} className="ttf-back-button">
              Back to Tests
            </button>

            <div className="ttf-details-card">
              <h1 className="ttf-test-title">{selectedTest.title} Test</h1>

              <p className="ttf-test-subtitle">{selectedTest.subTitle}</p>

              <div className="ttf-test-meta">
                <span className="ttf-meta-duration">
                  ⏱️ {selectedTest.duration}
                </span>
                <span className="ttf-meta-level">📊 {selectedTest.level}</span>
              </div>

              <div className="ttf-section">
                <h3 className="ttf-section-title">Description:</h3>
                <p className="ttf-section-content">
                  {selectedTest.description}
                </p>
              </div>

              <div className="ttf-section">
                <h3 className="ttf-section-title">Summary:</h3>
                <p className="ttf-section-content">{selectedTest.summary}</p>
              </div>

              {selectedTest.learn && selectedTest.learn.length > 0 && (
                <div className="ttf-section">
                  <h3 className="ttf-section-title">
                    What You'll Be Tested On:
                  </h3>
                  <ul className="ttf-learn-list">
                    {selectedTest.learn.map((item: string, index: number) => (
                      <li key={index} className="ttf-learn-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTest.questions && selectedTest.questions.length > 0 && (
                <div className="ttf-section">
                  <h3 className="ttf-section-title">Sample Questions:</h3>
                  <div className="ttf-questions-container">
                    {selectedTest.questions.map(
                      (question: string, index: number) => (
                        <div key={index} className="ttf-question-item">
                          <strong>Q{index + 1}:</strong> {question}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedTest.tools && selectedTest.tools.length > 0 && (
                <div className="ttf-section">
                  <h3 className="ttf-section-title">Tools & Technologies:</h3>
                  <div className="ttf-tools-container">
                    {selectedTest.tools.map((tool: string, index: number) => (
                      <span key={index} className="ttf-tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleStartTest(selectedTest)}
                className="ttf-start-button"
              >
                Start {selectedTest.title} Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTestFolder;
