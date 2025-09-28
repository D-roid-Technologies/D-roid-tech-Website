import React, { useState } from "react";
import { Questions } from "../../../../utils/questions";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
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
    // Check if test has quiz data before starting
    if (!testData.quiz || testData.quiz.length === 0) {
      console.error("Test data missing quiz questions:", testData);
      alert("This test doesn't have quiz questions configured yet.");
      return;
    }

    // Reset all quiz-related states before starting
    setQuizResults(null);
    setShowQuiz(true);
  };

  const handleQuizComplete = (results: QuizResults) => {
    console.log("Quiz completed:", results);
    setQuizResults(results);
    setShowQuiz(false); // Hide quiz when showing results
  };

  const handleBackFromQuiz = () => {
    setShowQuiz(false);
    setQuizResults(null); // Clear results when going back
  };

  const handleRetakeTest = () => {
    setShowQuiz(false);
    setQuizResults(null);
    // Small delay to ensure state is cleared before restarting
    setTimeout(() => {
      if (selectedTest && selectedTest.quiz && selectedTest.quiz.length > 0) {
        setShowQuiz(true);
      }
    }, 100);
  };

  return (
    <div className="ttf-wrapper soft-wrapper">
      <span className="ttf-header soft-dev-header title_span">
        Test Your Knowledge
      </span>

      <div className="ttf-content soft-dev-content">
        {showQuiz && selectedTest && !quizResults ? (
          // Show Quiz Component only when not showing results
          <QuizComponent
            key={`quiz-${selectedTest.title}-${Date.now()}`} // Force re-render with unique key
            testData={selectedTest}
            onQuizComplete={handleQuizComplete}
            onBack={handleBackFromQuiz}
          />
        ) : quizResults ? (
          // Show Results View
          <QuizComponent
            key={`quiz-${selectedTest.title}-${Date.now()}`} // Force re-render with unique key
            testData={selectedTest}
            onQuizComplete={handleQuizComplete}
            onBack={handleBackFromQuiz}
          />
        ) : // <p style={{ color: "red" }}> hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
        // <div className="ttf-results-view">
        //   <div className="ttf-results-header">
        //     <h2>Quiz Results</h2>
        //     <p>Test: {selectedTest?.title}</p>
        //   </div>

        //   <div className="ttf-results-summary">
        //     <div className="ttf-score-display">
        //       <div className="ttf-score-circle">
        //         <span className="ttf-percentage">
        //           {quizResults.percentage}%
        //         </span>
        //       </div>
        //       <div className="ttf-score-details">
        //         <p>
        //           Score: {quizResults.score} / {quizResults.totalQuestions}
        //         </p>
        //         <p>
        //           Time Spent: {Math.floor(quizResults.timeSpent / 60)}:
        //           {(quizResults.timeSpent % 60).toString().padStart(2, "0")}
        //         </p>
        //       </div>
        //     </div>
        //   </div>

        //   <div className="ttf-results-breakdown">
        //     <h3>Detailed Results:</h3>
        //     {quizResults.answers.map((answer, index) => {
        //       const question = selectedTest.quiz[index];
        //       return (
        //         <div
        //           key={index}
        //           className={`ttf-result-item ${
        //             answer.isCorrect ? "ttf-correct" : "ttf-incorrect"
        //           }`}
        //         >
        //           <div className="ttf-result-header">
        //             <span className="ttf-question-number">Q{index + 1}</span>
        //             <span
        //               className={`ttf-result-status ${
        //                 answer.isCorrect ? "ttf-correct" : "ttf-incorrect"
        //               }`}
        //             >
        //               {answer.isCorrect ? "✓" : "✗"}
        //             </span>
        //           </div>
        //           <p className="ttf-question-text">{question?.question}</p>
        //           {answer.selectedAnswer >= 0 && question?.options && (
        //             <p className="ttf-selected-answer">
        //               Your answer: {question.options[answer.selectedAnswer]}
        //             </p>
        //           )}
        //           {question?.options && (
        //             <p className="ttf-correct-answer">
        //               Correct answer:{" "}
        //               {question.options[question.correctAnswer]}
        //             </p>
        //           )}
        //           <p className="ttf-explanation">{answer.explanation}</p>
        //         </div>
        //       );
        //     })}
        //   </div>

        //   <div className="ttf-results-actions">
        //     <button onClick={handleRetakeTest} className="ttf-retake-button">
        //       Retake Test
        //     </button>
        //     <button onClick={handleBack} className="ttf-back-results-button">
        //       Back to Tests
        //     </button>
        //   </div>
        // </div>
        !selectedTest ? (
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

              {/* Show quiz availability status */}
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
//     // Reset all quiz-related states before starting
//     setQuizResults(null);
//     setShowQuiz(true);
//   };

//   const handleQuizComplete = (results: QuizResults) => {
//     console.log("Quiz completed:", results);
//     setQuizResults(results);
//     // You can also save results to localStorage, send to API, etc.
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
//       setShowQuiz(true);
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
//           <div className="ttf-results-view">
//             <div className="ttf-results-header">
//               <h2>Quiz Results</h2>
//               <p>Test: {selectedTest?.title}</p>
//             </div>

//             <div className="ttf-results-summary">
//               <div className="ttf-score-display">
//                 <div className="ttf-score-circle">
//                   <span className="ttf-percentage">
//                     {quizResults.percentage}%
//                   </span>
//                 </div>
//                 <div className="ttf-score-details">
//                   <p>
//                     Score: {quizResults.score} / {quizResults.totalQuestions}
//                   </p>
//                   <p>
//                     Time Spent: {Math.floor(quizResults.timeSpent / 60)}:
//                     {(quizResults.timeSpent % 60).toString().padStart(2, "0")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="ttf-results-actions">
//               <button onClick={handleRetakeTest} className="ttf-retake-button">
//                 Retake Test
//               </button>
//               <button onClick={handleBack} className="ttf-back-results-button">
//                 Back to Tests
//               </button>
//             </div>
//           </div>
//         ) : !selectedTest ? (
//           // Show test list
//           <div className="ttf-test-list">
//             {Questions && Questions.length > 0 ? (
//               Questions.map((prog, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleTestClick(prog)}
//                   className="ttf-test-item"
//                 >
//                   <CoreValueCardTwo
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

//               <button
//                 onClick={() => handleStartTest(selectedTest)}
//                 className="ttf-start-button"
//               >
//                 Start {selectedTest.title} Test
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeTestFolder;

// import React, { useState } from "react";
// import { Questions } from "../../../../utils/questions";
// import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
// import "./TakeTestFolder.css";
// import { useNavigate } from "react-router-dom";

// const TakeTestFolder = () => {
//   const navigate = useNavigate();
//   const [selectedTest, setSelectedTest] = useState<any | null>(null);

//   const handleTestClick = (testData: any) => {
//     console.log("Test clicked:", testData);
//     setSelectedTest(testData);
//   };

//   const handleBack = () => {
//     setSelectedTest(null);
//   };

//   const handleStartTest = (testData: any) => {
//     // If you want to navigate to the quiz directly
//     // navigate("/training/quize", { state: testData });
//     console.log("Starting test:", testData);
//   };

//   return (
//     <div className="ttf-wrapper soft-wrapper">
//       {/* <div className="ttf-wrapper "> */}
//       <span className="ttf-header soft-dev-header title_span">
//         Test Your Knowledge
//       </span>

//       <div className="ttf-content soft-dev-content">
//         {!selectedTest ? (
//           // Show test list
//           <div className="ttf-test-list">
//             {Questions && Questions.length > 0 ? (
//               Questions.map((prog, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleTestClick(prog)}
//                   className="ttf-test-item"
//                 >
//                   <CoreValueCardTwo
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

//               <button
//                 onClick={() => handleStartTest(selectedTest)}
//                 className="ttf-start-button"
//               >
//                 Start {selectedTest.title} Test
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeTestFolder;
