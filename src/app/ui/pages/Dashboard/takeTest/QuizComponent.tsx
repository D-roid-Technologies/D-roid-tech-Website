// QuizComponent.tsx
import React, { useState, useEffect } from "react";
import "./QuizComponent.css";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  testData: {
    title: string;
    duration: string;
    quiz: QuizQuestion[];
  };
  onQuizComplete: (results: QuizResults) => void;
  onBack: () => void;
}

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

const QuizComponent: React.FC<QuizComponentProps> = ({
  testData,
  onQuizComplete,
  onBack,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [quizStartTime] = useState<number>(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);

  // Parse duration and convert to seconds
  useEffect(() => {
    const durationMatch = testData.duration.match(/(\d+)/);
    const minutes = durationMatch ? parseInt(durationMatch[1]) : 60;
    setTimeRemaining(minutes * 60);
  }, [testData.duration]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !showResults) {
      handleQuizSubmit();
    }
  }, [timeRemaining, showResults]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleQuizSubmit = () => {
    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
    const quizResults: QuizResults = {
      score: 0,
      totalQuestions: testData.quiz.length,
      percentage: 0,
      answers: [],
      timeSpent,
    };

    // Calculate results
    testData.quiz.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        quizResults.score++;
      }

      quizResults.answers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswer ?? -1,
        isCorrect,
        explanation: question.explanation,
      });
    });

    quizResults.percentage = Math.round(
      (quizResults.score / quizResults.totalQuestions) * 100
    );

    setResults(quizResults);
    setShowResults(true);
    onQuizComplete(quizResults);
  };

  // Add safety check for quiz data
  if (!testData || !testData.quiz || testData.quiz.length === 0) {
    return (
      <div className="qzc-quiz-container">
        <div className="qzc-error-message">
          <h2>No Quiz Questions Available</h2>
          <p>This test doesn't have any quiz questions configured.</p>
          <button onClick={onBack} className="qzc-back-button">
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = testData.quiz[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / testData.quiz.length) * 100;

  // Add safety check for current question
  if (!currentQuestion) {
    return (
      <div className="qzc-quiz-container">
        <div className="qzc-error-message">
          <h2>Question Not Found</h2>
          <p>Unable to load question {currentQuestionIndex + 1}.</p>
          <button onClick={onBack} className="qzc-back-button">
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="qzc-quiz-container">
        <div className="qzc-results-card">
          <h2 className="qzc-results-title">Quiz Complete!</h2>
          <div className="qzc-results-summary">
            <div className="qzc-score-circle">
              <span className="qzc-score-percentage">
                {results.percentage}%
              </span>
            </div>
            <div className="qzc-results-details">
              <p>
                Score: {results.score} / {results.totalQuestions}
              </p>
              <p>Time Spent: {formatTime(results.timeSpent)}</p>
            </div>
          </div>

          <div className="qzc-results-breakdown">
            <h3>Question Breakdown:</h3>
            {testData.quiz.map((question, index) => {
              const answerData = results.answers[index];
              const isCorrect = answerData?.isCorrect || false;

              return (
                <div
                  key={question.id}
                  className={`qzc-result-item ${
                    isCorrect ? "qzc-correct" : "qzc-incorrect"
                  }`}
                >
                  <div className="qzc-result-header">
                    <span className="qzc-question-number">Q{index + 1}</span>
                    <span
                      className={`qzc-result-status ${
                        isCorrect
                          ? "qzc-status-correct"
                          : "qzc-status-incorrect"
                      }`}
                    >
                      {isCorrect ? "✓" : "✗"}
                    </span>
                  </div>
                  <p className="qzc-result-question">{question.question}</p>
                  {answerData?.selectedAnswer >= 0 && (
                    <p className="qzc-selected-answer">
                      Your answer: {question.options[answerData.selectedAnswer]}
                    </p>
                  )}
                  <p
                    className="qzc-correct-answer"
                    style={{ color: "#28a745" }}
                  >
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                  <p className="qzc-result-explanation">
                    {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <button onClick={onBack} className="qzc-back-to-tests-btn">
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qzc-quiz-container">
      <div className="qzc-quiz-header">
        <div className="qzc-quiz-info">
          <h2 className="qzc-quiz-title">{testData.title} Quiz</h2>
          <div className="qzc-quiz-meta">
            <span className="qzc-question-counter">
              Question {currentQuestionIndex + 1} of {testData.quiz.length}
            </span>
            <span className="qzc-timer">⏱️ {formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="qzc-progress-container">
          <div className="qzc-progress-bar">
            <div
              className="qzc-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="qzc-progress-text">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </div>

      <div className="qzc-question-card">
        <h3 className="qzc-question-text">{currentQuestion.question}</h3>

        <div className="qzc-options-container">
          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`qzc-option-button ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? "qzc-selected"
                    : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="qzc-option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="qzc-option-text">{option}</span>
              </button>
            ))
          ) : (
            <p className="qzc-no-options">
              No options available for this question.
            </p>
          )}
        </div>

        {showExplanation &&
          selectedAnswers[currentQuestionIndex] !== undefined && (
            <div className="qzc-explanation-container">
              <h4 className="qzc-explanation-title">Explanation:</h4>
              <p className="qzc-explanation-text">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
      </div>

      <div className="qzc-quiz-controls">
        <div className="qzc-navigation-buttons">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="qzc-nav-button qzc-prev-button"
          >
            Previous
          </button>

          {selectedAnswers[currentQuestionIndex] !== undefined &&
            !showExplanation && (
              <button
                onClick={() => setShowExplanation(true)}
                className="qzc-explain-button"
              >
                Show Explanation
              </button>
            )}

          {currentQuestionIndex < testData.quiz.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="qzc-nav-button qzc-next-button"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleQuizSubmit}
              className="qzc-submit-button"
              disabled={
                Object.keys(selectedAnswers).length < testData.quiz.length
              }
            >
              Submit Quiz
            </button>
          )}
        </div>

        <button onClick={onBack} className="qzc-back-button">
          Back to Test Details
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;

// // QuizComponent.tsx
// import React, { useState, useEffect } from "react";
// import "./QuizComponent.css";

// interface QuizQuestion {
//   id: number;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   explanation: string;
// }

// interface QuizComponentProps {
//   testData: {
//     title: string;
//     duration: string;
//     quiz: QuizQuestion[];
//   };
//   onQuizComplete: (results: QuizResults) => void;
//   onBack: () => void;
// }

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

// const QuizComponent: React.FC<QuizComponentProps> = ({
//   testData,
//   onQuizComplete,
//   onBack,
// }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<{
//     [key: number]: number;
//   }>({});
//   const [showResults, setShowResults] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useState<number>(0);
//   const [quizStartTime] = useState<number>(Date.now());
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [results, setResults] = useState<QuizResults | null>(null);

//   // Parse duration and convert to seconds
//   useEffect(() => {
//     const durationMatch = testData.duration.match(/(\d+)/);
//     const minutes = durationMatch ? parseInt(durationMatch[1]) : 60;
//     setTimeRemaining(minutes * 60);
//   }, [testData.duration]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeRemaining > 0 && !showResults) {
//       const timer = setTimeout(() => {
//         setTimeRemaining(timeRemaining - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else if (timeRemaining === 0 && !showResults) {
//       handleQuizSubmit();
//     }
//   }, [timeRemaining, showResults]);

//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [currentQuestionIndex]: answerIndex,
//     });
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < testData.quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setShowExplanation(false);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setShowExplanation(false);
//     }
//   };

//   const handleQuizSubmit = () => {
//     const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
//     const quizResults: QuizResults = {
//       score: 0,
//       totalQuestions: testData.quiz.length,
//       percentage: 0,
//       answers: [],
//       timeSpent,
//     };

//     // Calculate results
//     testData.quiz.forEach((question, index) => {
//       const selectedAnswer = selectedAnswers[index];
//       const isCorrect = selectedAnswer === question.correctAnswer;

//       if (isCorrect) {
//         quizResults.score++;
//       }

//       quizResults.answers.push({
//         questionId: question.id,
//         selectedAnswer: selectedAnswer ?? -1,
//         isCorrect,
//         explanation: question.explanation,
//       });
//     });

//     quizResults.percentage = Math.round(
//       (quizResults.score / quizResults.totalQuestions) * 100
//     );

//     setResults(quizResults);
//     setShowResults(true);
//     onQuizComplete(quizResults);
//   };

//   const currentQuestion = testData.quiz[currentQuestionIndex];
//   const progress = ((currentQuestionIndex + 1) / testData.quiz.length) * 100;

//   if (showResults && results) {
//     return (
//       <div className="qzc-quiz-container">
//         <div className="qzc-results-card">
//           <h2 className="qzc-results-title">Quiz Complete!</h2>
//           <div className="qzc-results-summary">
//             <div className="qzc-score-circle">
//               <span className="qzc-score-percentage">
//                 {results.percentage}%
//               </span>
//             </div>
//             <div className="qzc-results-details">
//               <p>
//                 Score: {results.score} / {results.totalQuestions}
//               </p>
//               <p>Time Spent: {formatTime(results.timeSpent)}</p>
//             </div>
//           </div>

//           <div className="qzc-results-breakdown">
//             <h3>Question Breakdown:</h3>
//             {testData.quiz.map((question, index) => {
//               const answerData = results.answers[index];
//               const isCorrect = answerData?.isCorrect || false;

//               return (
//                 <div
//                   key={question.id}
//                   className={`qzc-result-item ${
//                     isCorrect ? "qzc-correct" : "qzc-incorrect"
//                   }`}
//                 >
//                   <div className="qzc-result-header">
//                     <span className="qzc-question-number">Q{index + 1}</span>
//                     <span
//                       className={`qzc-result-status ${
//                         isCorrect
//                           ? "qzc-status-correct"
//                           : "qzc-status-incorrect"
//                       }`}
//                     >
//                       {isCorrect ? "✓" : "✗"}
//                     </span>
//                   </div>
//                   <p className="qzc-result-question">{question.question}</p>
//                   {answerData?.selectedAnswer >= 0 && (
//                     <p className="qzc-selected-answer">
//                       Your answer: {question.options[answerData.selectedAnswer]}
//                     </p>
//                   )}
//                   <p className="qzc-correct-answer">
//                     Correct answer: {question.options[question.correctAnswer]}
//                   </p>
//                   <p className="qzc-result-explanation">
//                     {question.explanation}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           <button onClick={onBack} className="qzc-back-to-tests-btn">
//             Back to Tests
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="qzc-quiz-container">
//       <div className="qzc-quiz-header">
//         <div className="qzc-quiz-info">
//           <h2 className="qzc-quiz-title">{testData.title} Quiz</h2>
//           <div className="qzc-quiz-meta">
//             <span className="qzc-question-counter">
//               Question {currentQuestionIndex + 1} of {testData.quiz.length}
//             </span>
//             <span className="qzc-timer">⏱️ {formatTime(timeRemaining)}</span>
//           </div>
//         </div>

//         <div className="qzc-progress-container">
//           <div className="qzc-progress-bar">
//             <div
//               className="qzc-progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <span className="qzc-progress-text">
//             {Math.round(progress)}% Complete
//           </span>
//         </div>
//       </div>

//       <div className="qzc-question-card">
//         <h3 className="qzc-question-text">{currentQuestion.question}</h3>

//         <div className="qzc-options-container">
//           {currentQuestion.options.map((option, index) => (
//             <button
//               key={index}
//               className={`qzc-option-button ${
//                 selectedAnswers[currentQuestionIndex] === index
//                   ? "qzc-selected"
//                   : ""
//               }`}
//               onClick={() => handleAnswerSelect(index)}
//             >
//               <span className="qzc-option-letter">
//                 {String.fromCharCode(65 + index)}
//               </span>
//               <span className="qzc-option-text">{option}</span>
//             </button>
//           ))}
//         </div>

//         {showExplanation &&
//           selectedAnswers[currentQuestionIndex] !== undefined && (
//             <div className="qzc-explanation-container">
//               <h4 className="qzc-explanation-title">Explanation:</h4>
//               <p className="qzc-explanation-text">
//                 {currentQuestion.explanation}
//               </p>
//             </div>
//           )}
//       </div>

//       <div className="qzc-quiz-controls">
//         <div className="qzc-navigation-buttons">
//           <button
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestionIndex === 0}
//             className="qzc-nav-button qzc-prev-button"
//           >
//             Previous
//           </button>

//           {selectedAnswers[currentQuestionIndex] !== undefined &&
//             !showExplanation && (
//               <button
//                 onClick={() => setShowExplanation(true)}
//                 className="qzc-explain-button"
//               >
//                 Show Explanation
//               </button>
//             )}

//           {currentQuestionIndex < testData.quiz.length - 1 ? (
//             <button
//               onClick={handleNextQuestion}
//               className="qzc-nav-button qzc-next-button"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleQuizSubmit}
//               className="qzc-submit-button"
//               disabled={
//                 Object.keys(selectedAnswers).length < testData.quiz.length
//               }
//             >
//               Submit Quiz
//             </button>
//           )}
//         </div>

//         <button onClick={onBack} className="qzc-back-button">
//           Back to Test Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizComponent;

// // QuizComponent.tsx
// import React, { useState, useEffect } from "react";
// import "./QuizComponent.css";

// interface QuizQuestion {
//   id: number;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   explanation: string;
// }

// interface QuizComponentProps {
//   testData: {
//     title: string;
//     duration: string;
//     quiz: QuizQuestion[];
//   };
//   onQuizComplete: (results: QuizResults) => void;
//   onBack: () => void;
// }

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

// const QuizComponent: React.FC<QuizComponentProps> = ({
//   testData,
//   onQuizComplete,
//   onBack,
// }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<{
//     [key: number]: number;
//   }>({});
//   const [showResults, setShowResults] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useState<number>(0);
//   const [quizStartTime] = useState<number>(Date.now());
//   const [showExplanation, setShowExplanation] = useState(false);

//   // Parse duration and convert to seconds
//   useEffect(() => {
//     const durationMatch = testData.duration.match(/(\d+)/);
//     const minutes = durationMatch ? parseInt(durationMatch[1]) : 60;
//     setTimeRemaining(minutes * 60);
//   }, [testData.duration]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeRemaining > 0 && !showResults) {
//       const timer = setTimeout(() => {
//         setTimeRemaining(timeRemaining - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else if (timeRemaining === 0 && !showResults) {
//       handleQuizSubmit();
//     }
//   }, [timeRemaining, showResults]);

//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [currentQuestionIndex]: answerIndex,
//     });
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < testData.quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setShowExplanation(false);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setShowExplanation(false);
//     }
//   };

//   const handleQuizSubmit = () => {
//     const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
//     const results: QuizResults = {
//       score: 0,
//       totalQuestions: testData.quiz.length,
//       percentage: 0,
//       answers: [],
//       timeSpent,
//     };

//     testData.quiz.forEach((question, index) => {
//       const selectedAnswer = selectedAnswers[index];
//       const isCorrect = selectedAnswer === question.correctAnswer;

//       if (isCorrect) {
//         results.score++;
//       }

//       results.answers.push({
//         questionId: question.id,
//         selectedAnswer: selectedAnswer ?? -1,
//         isCorrect,
//         explanation: question.explanation,
//       });
//     });

//     results.percentage = Math.round(
//       (results.score / results.totalQuestions) * 100
//     );
//     setShowResults(true);
//     onQuizComplete(results);
//   };

//   const currentQuestion = testData.quiz[currentQuestionIndex];
//   const progress = ((currentQuestionIndex + 1) / testData.quiz.length) * 100;

//   if (showResults) {
//     return (
//       <div className="qzc-quiz-container">
//         <div className="qzc-results-card">
//           <h2 className="qzc-results-title">Quiz Complete!</h2>
//           <div className="qzc-results-summary">
//             <div className="qzc-score-circle">
//               <span className="qzc-score-percentage">
//                 {Math.round(
//                   (Object.keys(selectedAnswers).filter(
//                     (key) =>
//                       selectedAnswers[parseInt(key)] ===
//                       testData.quiz[parseInt(key)]?.correctAnswer
//                   ).length /
//                     testData.quiz.length) *
//                     100
//                 )}
//                 %
//               </span>
//             </div>
//             <div className="qzc-results-details">
//               <p>
//                 Score:{" "}
//                 {
//                   Object.keys(selectedAnswers).filter(
//                     (key) =>
//                       selectedAnswers[parseInt(key)] ===
//                       testData.quiz[parseInt(key)]?.correctAnswer
//                   ).length
//                 }{" "}
//                 / {testData.quiz.length}
//               </p>
//               <p>
//                 Time Spent:{" "}
//                 {formatTime(Math.floor((Date.now() - quizStartTime) / 1000))}
//               </p>
//             </div>
//           </div>

//           <div className="qzc-results-breakdown">
//             <h3>Question Breakdown:</h3>
//             {testData.quiz.map((question, index) => {
//               const selectedAnswer = selectedAnswers[index];
//               const isCorrect = selectedAnswer === question.correctAnswer;

//               return (
//                 <div
//                   key={question.id}
//                   className={`qzc-result-item ${
//                     isCorrect ? "qzc-correct" : "qzc-incorrect"
//                   }`}
//                 >
//                   <div className="qzc-result-header">
//                     <span className="qzc-question-number">Q{index + 1}</span>
//                     <span
//                       className={`qzc-result-status ${
//                         isCorrect
//                           ? "qzc-status-correct"
//                           : "qzc-status-incorrect"
//                       }`}
//                     >
//                       {isCorrect ? "✓" : "✗"}
//                     </span>
//                   </div>
//                   <p className="qzc-result-question">{question.question}</p>
//                   <p className="qzc-result-explanation">
//                     {question.explanation}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           <button onClick={onBack} className="qzc-back-to-tests-btn">
//             Back to Tests
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="qzc-quiz-container">
//       <div className="qzc-quiz-header">
//         <div className="qzc-quiz-info">
//           <h2 className="qzc-quiz-title">{testData.title} Quiz</h2>
//           <div className="qzc-quiz-meta">
//             <span className="qzc-question-counter">
//               Question {currentQuestionIndex + 1} of {testData.quiz.length}
//             </span>
//             <span className="qzc-timer">⏱️ {formatTime(timeRemaining)}</span>
//           </div>
//         </div>

//         <div className="qzc-progress-container">
//           <div className="qzc-progress-bar">
//             <div
//               className="qzc-progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <span className="qzc-progress-text">
//             {Math.round(progress)}% Complete
//           </span>
//         </div>
//       </div>

//       <div className="qzc-question-card">
//         <h3 className="qzc-question-text">{currentQuestion.question}</h3>

//         <div className="qzc-options-container">
//           {currentQuestion.options.map((option, index) => (
//             <button
//               key={index}
//               className={`qzc-option-button ${
//                 selectedAnswers[currentQuestionIndex] === index
//                   ? "qzc-selected"
//                   : ""
//               }`}
//               onClick={() => handleAnswerSelect(index)}
//             >
//               <span className="qzc-option-letter">
//                 {String.fromCharCode(65 + index)}
//               </span>
//               <span className="qzc-option-text">{option}</span>
//             </button>
//           ))}
//         </div>

//         {showExplanation &&
//           selectedAnswers[currentQuestionIndex] !== undefined && (
//             <div className="qzc-explanation-container">
//               <h4 className="qzc-explanation-title">Explanation:</h4>
//               <p className="qzc-explanation-text">
//                 {currentQuestion.explanation}
//               </p>
//             </div>
//           )}
//       </div>

//       <div className="qzc-quiz-controls">
//         <div className="qzc-navigation-buttons">
//           <button
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestionIndex === 0}
//             className="qzc-nav-button qzc-prev-button"
//           >
//             Previous
//           </button>

//           {selectedAnswers[currentQuestionIndex] !== undefined &&
//             !showExplanation && (
//               <button
//                 onClick={() => setShowExplanation(true)}
//                 className="qzc-explain-button"
//               >
//                 Show Explanation
//               </button>
//             )}

//           {currentQuestionIndex < testData.quiz.length - 1 ? (
//             <button
//               onClick={handleNextQuestion}
//               className="qzc-nav-button qzc-next-button"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleQuizSubmit}
//               className="qzc-submit-button"
//               disabled={
//                 Object.keys(selectedAnswers).length < testData.quiz.length
//               }
//             >
//               Submit Quiz
//             </button>
//           )}
//         </div>

//         <button onClick={onBack} className="qzc-back-button">
//           Back to Test Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizComponent;
