import React, { useState, useMemo } from "react";
import { Questions } from "../../../../utils/questions";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
import TestCardTwo from "../../../components/CoreValueCard/Test-card-two";
import "./TakeTestFolder.css";
import { useNavigate } from "react-router-dom";
import QuizComponent from "./QuizComponent";

interface QuizResults {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: {
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
  timeSpent: number;
}

const TakeTestFolder = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  // Extract unique levels and durations from Questions
  const levels = useMemo(() => {
    const uniqueLevels = new Set(Questions.map((q) => q.level).filter(Boolean));
    return ["all", ...Array.from(uniqueLevels)];
  }, []);

  const durations = useMemo(() => {
    const uniqueDurations = new Set(
      Questions.map((q) => q.duration).filter(Boolean)
    );
    return ["all", ...Array.from(uniqueDurations)];
  }, []);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return Questions.filter((test) => {
      const matchesSearch =
        !searchQuery ||
        test.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel =
        selectedLevel === "all" || test.level === selectedLevel;
      const matchesDuration =
        selectedDuration === "all" || test.duration === selectedDuration;

      return matchesSearch && matchesLevel && matchesDuration;
    });
  }, [searchQuery, selectedLevel, selectedDuration]);

  const handleTestClick = (testData: any) => {
    console.log("Test clicked:", testData);
    setSelectedTest(testData);
    setShowQuiz(false);
    setQuizResults(null);
  };

  const handleBack = () => {
    setSelectedTest(null);
    setShowQuiz(false);
    setQuizResults(null);
  };

  const handleStartTest = (testData: any) => {
    console.log("Starting test:", testData);
    if (!testData.quiz || testData.quiz.length === 0) {
      console.error("Test data missing quiz questions:", testData);
      alert("This test doesn't have quiz questions configured yet.");
      return;
    }

    setQuizResults(null);
    setShowQuiz(true);
  };

  const handleQuizComplete = (results: QuizResults) => {
    console.log("Quiz completed:", results);
    setQuizResults(results);
    setShowQuiz(false);
  };

  const handleBackFromQuiz = () => {
    setShowQuiz(false);
    setQuizResults(null);
  };

  const handleRetakeTest = () => {
    setShowQuiz(false);
    setQuizResults(null);
    setTimeout(() => {
      if (selectedTest && selectedTest.quiz && selectedTest.quiz.length > 0) {
        setShowQuiz(true);
      }
    }, 100);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("all");
    setSelectedDuration("all");
  };

  return (
    <div className="ttf-wrapper soft-wrapper">
      <span className="ttf-header soft-dev-header title_span">
        Test Your Knowledge
      </span>

      <div className="ttf-content soft-dev-content">
        {showQuiz && selectedTest && !quizResults ? (
          // Show Quiz Component only when not showing results
          <p> test page. take your text now!</p>
        ) : quizResults ? (
          <QuizComponent
            key={`quiz-${selectedTest.title}-${Date.now()}`}
            testData={selectedTest}
            onQuizComplete={handleQuizComplete}
            onBack={handleBackFromQuiz}
          />
        ) : !selectedTest ? (
          // Show test list with filters
          <div className="ttf-test-list-container">
            {/* Filter Section */}
            <div className="ttf-filters">
              <div className="ttf-search-box">
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ttf-search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ttf-clear-search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="ttf-filter-group">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="ttf-filter-select"
                >
                  <option value="all">All Levels</option>
                  {levels.slice(1).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="ttf-filter-select"
                >
                  <option value="all">All Durations</option>
                  {durations.slice(1).map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>

                {(searchQuery ||
                  selectedLevel !== "all" ||
                  selectedDuration !== "all") && (
                  <button onClick={clearFilters} className="ttf-clear-filters">
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="ttf-results-count">
              Showing {filteredQuestions.length} of {Questions.length} tests
            </div>

            {/* Test List */}
            <div className="ttf-test-list">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((prog, index) => (
                  <div
                    key={index}
                    onClick={() => handleTestClick(prog)}
                    className="ttf-test-item"
                  >
                    <TestCardTwo
                      title={`Take ${prog.title} Test`}
                      description={prog.summary}
                      url={prog.url}
                      className="process-card"
                    />
                  </div>
                ))
              ) : (
                <div className="ttf-no-results">
                  <p>No tests match your filters</p>
                  <button
                    onClick={clearFilters}
                    className="ttf-clear-filters-btn"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
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
                {selectedTest.quiz && (
                  <span
                    className="ttf-meta-questions"
                    style={{ color: "#333" }}
                  >
                    📝 {selectedTest.quiz.length} Questions
                  </span>
                )}
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

              {!selectedTest.quiz || selectedTest.quiz.length === 0 ? (
                <div className="ttf-quiz-unavailable">
                  <p>⚠️ Quiz questions are not yet available for this test.</p>
                </div>
              ) : (
                <button
                  onClick={() => handleStartTest(selectedTest)}
                  className="ttf-start-button"
                >
                  Start {selectedTest.title} Test ({selectedTest.quiz.length}{" "}
                  Questions)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTestFolder;

// import React, { useState } from "react";
// import { Questions } from "../../../../utils/questions";
// import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
// import TestCardTwo from "../../../components/CoreValueCard/Test-card-two";
// import "./TakeTestFolder.css";
// import { useNavigate } from "react-router-dom";
// import QuizComponent from "./QuizComponent";

// interface QuizResults {
//   score: number;
//   totalQuestions: number;
//   percentage: number;
//   answers: {
//     questionId: number;
//     selectedAnswer: number;
//     isCorrect: boolean;
//     explanation: string;
//   }[];
//   timeSpent: number;
// }

// const TakeTestFolder = () => {
//   const navigate = useNavigate();
//   const [selectedTest, setSelectedTest] = useState<any | null>(null);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

//   const handleTestClick = (testData: any) => {
//     console.log("Test clicked:", testData);
//     setSelectedTest(testData);
//     setShowQuiz(false);
//     setQuizResults(null);
//   };

//   const handleBack = () => {
//     setSelectedTest(null);
//     setShowQuiz(false);
//     setQuizResults(null);
//   };

//   const handleStartTest = (testData: any) => {
//     console.log("Starting test:", testData);
//     // Check if test has quiz data before starting
//     if (!testData.quiz || testData.quiz.length === 0) {
//       console.error("Test data missing quiz questions:", testData);
//       alert("This test doesn't have quiz questions configured yet.");
//       return;
//     }

//     // Reset all quiz-related states before starting
//     setQuizResults(null);
//     setShowQuiz(true);
//   };

//   const handleQuizComplete = (results: QuizResults) => {
//     console.log("Quiz completed:", results);
//     setQuizResults(results);
//     setShowQuiz(false); // Hide quiz when showing results
//   };

//   const handleBackFromQuiz = () => {
//     setShowQuiz(false);
//     setQuizResults(null); // Clear results when going back
//   };

//   const handleRetakeTest = () => {
//     setShowQuiz(false);
//     setQuizResults(null);
//     // Small delay to ensure state is cleared before restarting
//     setTimeout(() => {
//       if (selectedTest && selectedTest.quiz && selectedTest.quiz.length > 0) {
//         setShowQuiz(true);
//       }
//     }, 100);
//   };

//   return (
//     <div className="ttf-wrapper soft-wrapper">
//       <span className="ttf-header soft-dev-header title_span">
//         Test Your Knowledge
//       </span>

//       <div className="ttf-content soft-dev-content">
//         {showQuiz && selectedTest && !quizResults ? (
//           // Show Quiz Component only when not showing results
//           <QuizComponent
//             key={`quiz-${selectedTest.title}-${Date.now()}`} // Force re-render with unique key
//             testData={selectedTest}
//             onQuizComplete={handleQuizComplete}
//             onBack={handleBackFromQuiz}
//           />
//         ) : quizResults ? (
//           // Show Results View
//           <QuizComponent
//             key={`quiz-${selectedTest.title}-${Date.now()}`} // Force re-render with unique key
//             testData={selectedTest}
//             onQuizComplete={handleQuizComplete}
//             onBack={handleBackFromQuiz}
//           />
//         ) : // <p style={{ color: "red" }}> hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
//         // <div className="ttf-results-view">
//         //   <div className="ttf-results-header">
//         //     <h2>Quiz Results</h2>
//         //     <p>Test: {selectedTest?.title}</p>
//         //   </div>

//         //   <div className="ttf-results-summary">
//         //     <div className="ttf-score-display">
//         //       <div className="ttf-score-circle">
//         //         <span className="ttf-percentage">
//         //           {quizResults.percentage}%
//         //         </span>
//         //       </div>
//         //       <div className="ttf-score-details">
//         //         <p>
//         //           Score: {quizResults.score} / {quizResults.totalQuestions}
//         //         </p>
//         //         <p>
//         //           Time Spent: {Math.floor(quizResults.timeSpent / 60)}:
//         //           {(quizResults.timeSpent % 60).toString().padStart(2, "0")}
//         //         </p>
//         //       </div>
//         //     </div>
//         //   </div>

//         //   <div className="ttf-results-breakdown">
//         //     <h3>Detailed Results:</h3>
//         //     {quizResults.answers.map((answer, index) => {
//         //       const question = selectedTest.quiz[index];
//         //       return (
//         //         <div
//         //           key={index}
//         //           className={`ttf-result-item ${
//         //             answer.isCorrect ? "ttf-correct" : "ttf-incorrect"
//         //           }`}
//         //         >
//         //           <div className="ttf-result-header">
//         //             <span className="ttf-question-number">Q{index + 1}</span>
//         //             <span
//         //               className={`ttf-result-status ${
//         //                 answer.isCorrect ? "ttf-correct" : "ttf-incorrect"
//         //               }`}
//         //             >
//         //               {answer.isCorrect ? "✓" : "✗"}
//         //             </span>
//         //           </div>
//         //           <p className="ttf-question-text">{question?.question}</p>
//         //           {answer.selectedAnswer >= 0 && question?.options && (
//         //             <p className="ttf-selected-answer">
//         //               Your answer: {question.options[answer.selectedAnswer]}
//         //             </p>
//         //           )}
//         //           {question?.options && (
//         //             <p className="ttf-correct-answer">
//         //               Correct answer:{" "}
//         //               {question.options[question.correctAnswer]}
//         //             </p>
//         //           )}
//         //           <p className="ttf-explanation">{answer.explanation}</p>
//         //         </div>
//         //       );
//         //     })}
//         //   </div>

//         //   <div className="ttf-results-actions">
//         //     <button onClick={handleRetakeTest} className="ttf-retake-button">
//         //       Retake Test
//         //     </button>
//         //     <button onClick={handleBack} className="ttf-back-results-button">
//         //       Back to Tests
//         //     </button>
//         //   </div>
//         // </div>
//         !selectedTest ? (
//           // Show test list
//           <div className="ttf-test-list">
//             {Questions && Questions.length > 0 ? (
//               Questions.map((prog, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleTestClick(prog)}
//                   className="ttf-test-item"
//                 >
//                   <TestCardTwo
//                     title={`Take ${prog.title} Test`}
//                     description={prog.summary}
//                     url={prog.url}
//                     className="process-card"
//                   />
//                 </div>
//               ))
//             ) : (
//               <p className="ttf-no-tests">No tests available</p>
//             )}
//           </div>
//         ) : (
//           // Show test details
//           <div className="ttf-test-details-view">
//             <button onClick={handleBack} className="ttf-back-button">
//               Back to Tests
//             </button>

//             <div className="ttf-details-card">
//               <h1 className="ttf-test-title">{selectedTest.title} Test</h1>

//               <p className="ttf-test-subtitle">{selectedTest.subTitle}</p>

//               <div className="ttf-test-meta">
//                 <span className="ttf-meta-duration">
//                   ⏱️ {selectedTest.duration}
//                 </span>
//                 <span className="ttf-meta-level">📊 {selectedTest.level}</span>
//                 {selectedTest.quiz && (
//                   <span
//                     className="ttf-meta-questions"
//                     style={{ color: "#333" }}
//                   >
//                     📝 {selectedTest.quiz.length} Questions
//                   </span>
//                 )}
//               </div>

//               <div className="ttf-section">
//                 <h3 className="ttf-section-title">Description:</h3>
//                 <p className="ttf-section-content">
//                   {selectedTest.description}
//                 </p>
//               </div>

//               <div className="ttf-section">
//                 <h3 className="ttf-section-title">Summary:</h3>
//                 <p className="ttf-section-content">{selectedTest.summary}</p>
//               </div>

//               {selectedTest.learn && selectedTest.learn.length > 0 && (
//                 <div className="ttf-section">
//                   <h3 className="ttf-section-title">
//                     What You'll Be Tested On:
//                   </h3>
//                   <ul className="ttf-learn-list">
//                     {selectedTest.learn.map((item: string, index: number) => (
//                       <li key={index} className="ttf-learn-item">
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {selectedTest.questions && selectedTest.questions.length > 0 && (
//                 <div className="ttf-section">
//                   <h3 className="ttf-section-title">Sample Questions:</h3>
//                   <div className="ttf-questions-container">
//                     {selectedTest.questions.map(
//                       (question: string, index: number) => (
//                         <div key={index} className="ttf-question-item">
//                           <strong>Q{index + 1}:</strong> {question}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}

//               {selectedTest.tools && selectedTest.tools.length > 0 && (
//                 <div className="ttf-section">
//                   <h3 className="ttf-section-title">Tools & Technologies:</h3>
//                   <div className="ttf-tools-container">
//                     {selectedTest.tools.map((tool: string, index: number) => (
//                       <span key={index} className="ttf-tool-tag">
//                         {tool}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Show quiz availability status */}
//               {!selectedTest.quiz || selectedTest.quiz.length === 0 ? (
//                 <div className="ttf-quiz-unavailable">
//                   <p>⚠️ Quiz questions are not yet available for this test.</p>
//                 </div>
//               ) : (
//                 // <button
//                 //   onClick={() => handleStartTest(selectedTest)}
//                 //   className="ttf-start-button"
//                 // >
//                 //   Start {selectedTest.title} Test ({selectedTest.quiz.length}{" "}
//                 //   Questions)
//                 // </button>
//                 <button
//                   // onClick={() => handleStartTest(selectedTest)}
//                   className="ttf-start-button"
//                 >
//                   Start {selectedTest.title} Test ({selectedTest.quiz.length}{" "}
//                   Questions)
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeTestFolder;
