import React, { useState, useEffect, useCallback } from "react";
import "./QuizComponents.css";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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

interface QuizComponentProps {
  testData: {
    title: string;
    quiz: QuizQuestion[];
    duration: string;
  };
  onQuizComplete: (results: QuizResults) => void;
  onBack: () => void;
}

const QuizComponents: React.FC<QuizComponentProps> = ({
  testData,
  onQuizComplete,
  onBack,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(testData.quiz.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime] = useState(Date.now());
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestionIndex, showResults]);

  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const canSubmit = answeredCount === testData.quiz.length;

  // Parse duration and set initial time

  //   useEffect(() => {
  //     const durationMatch = testData.duration.match(/(\d+)/);
  //     const minutes = durationMatch ? parseInt(durationMatch[1]) : 60;
  //     setTimeRemaining(minutes * 60);
  //   }, [testData.duration]);

  useEffect(() => {
    const durationMatch = testData.duration.match(/(\d+)/);
    const minutes = durationMatch ? parseInt(durationMatch[1]) : 30;
    setTimeRemaining(minutes * 60);
    // setTimeRemaining(30 * 60);
  }, [testData.duration]);

  // Timer countdown
  //   useEffect(() => {
  //     if (timeRemaining <= 0 && !showResults) {
  //       // Time's up - only submit if quiz is ready
  //       if (canSubmit) {
  //         handleSubmitQuiz();
  //       }
  //       return;
  //     }

  //     const timer = setInterval(() => {
  //       setTimeRemaining((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, [timeRemaining, showResults, canSubmit]);
  useEffect(() => {
    if (showResults) return; // Stop timer when results show

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup when component unmounts or quiz ends
    return () => clearInterval(timer);
  }, [showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = testData.quiz[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / testData.quiz.length) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < testData.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
      setIsAnswered(userAnswers[currentQuestionIndex + 1] !== null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
      setIsAnswered(userAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(userAnswers[index]);
    setIsAnswered(userAnswers[index] !== null);
  };

  const handleSubmitQuiz = () => {
    // Only allow submission if all questions are answered
    if (!canSubmit) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const answers = userAnswers.map((answer, index) => ({
      questionId: testData.quiz[index].id,
      selectedAnswer: answer !== null ? answer : -1,
      isCorrect: answer === testData.quiz[index].correctAnswer,
      explanation: testData.quiz[index].explanation,
    }));

    const score = answers.filter((a) => a.isCorrect).length;
    const percentage = (score / testData.quiz.length) * 100;

    const results: QuizResults = {
      score,
      totalQuestions: testData.quiz.length,
      percentage,
      answers,
      timeSpent,
    };

    setShowResults(true);
  };

  const handleExitQuiz = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    onBack();
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  if (showResults) {
    const score = userAnswers.filter(
      (answer, index) => answer === testData.quiz[index].correctAnswer
    ).length;
    const percentage = (score / testData.quiz.length) * 100;

    return (
      <div className="qzcomp-results-container">
        <div className="qzcomp-results-card">
          <div className="qzcomp-results-header">
            <h1 className="qzcomp-results-title">Quiz Complete!</h1>
            <div className="qzcomp-score-circle">
              <div className="qzcomp-score-content">
                <span className="qzcomp-score-number">
                  {percentage.toFixed(0)}%
                </span>
                <span className="qzcomp-score-label">Score</span>
              </div>
            </div>
          </div>

          <div className="qzcomp-results-stats">
            <div className="qzcomp-stat-item">
              <span className="qzcomp-stat-value">{score}</span>
              <span className="qzcomp-stat-label">Correct</span>
            </div>
            <div className="qzcomp-stat-item">
              <span className="qzcomp-stat-value">
                {testData.quiz.length - score}
              </span>
              <span className="qzcomp-stat-label">Incorrect</span>
            </div>
            <div className="qzcomp-stat-item">
              <span className="qzcomp-stat-value">
                {formatTime(Math.floor((Date.now() - startTime) / 1000))}
              </span>
              <span className="qzcomp-stat-label">Time Taken</span>
            </div>
          </div>

          <div className="qzcomp-performance-badge">
            {percentage >= 90 && (
              <span className="qzcomp-badge qzcomp-badge-excellent">
                Excellent Performance!
              </span>
            )}
            {percentage >= 70 && percentage < 90 && (
              <span className="qzcomp-badge qzcomp-badge-good">Good Job!</span>
            )}
            {percentage >= 50 && percentage < 70 && (
              <span className="qzcomp-badge qzcomp-badge-pass"> Passed!</span>
            )}
            {percentage < 50 && (
              <span className="qzcomp-badge qzcomp-badge-retry">
                Keep Practicing!
              </span>
            )}
          </div>

          <div className="qzcomp-answers-review">
            <h2 className="qzcomp-review-title">Answer Review</h2>
            {testData.quiz.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={`qzcomp-review-item ${
                    isCorrect ? "qzcomp-correct" : "qzcomp-incorrect"
                  }`}
                >
                  <div className="qzcomp-review-question">
                    <span className="qzcomp-question-number">Q{index + 1}</span>
                    <span className="qzcomp-question-text">
                      {question.question}
                    </span>
                    <span className="qzcomp-result-icon">
                      {isCorrect ? <GrStatusGood /> : <MdOutlineCancel />}
                    </span>
                  </div>

                  <div className="qzcomp-review-answers">
                    {userAnswer !== null && (
                      <div className="qzcomp-user-answer">
                        <strong>Your answer:</strong>{" "}
                        {question.options[userAnswer]}
                      </div>
                    )}
                    {!isCorrect && (
                      <div className="qzcomp-correct-answer">
                        <strong>Correct answer:</strong>{" "}
                        {question.options[question.correctAnswer]}
                      </div>
                    )}
                    <div className="qzcomp-explanation">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="qzcomp-results-actions">
            <button
              onClick={onBack}
              className="qzcomp-btn qzcomp-btn-secondary"
            >
              Back to Tests
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setUserAnswers(new Array(testData.quiz.length).fill(null));
                setIsAnswered(false);
                const durationMatch = testData.duration.match(/(\d+)/);
                const minutes = durationMatch ? parseInt(durationMatch[1]) : 60;
                setTimeRemaining(minutes * 60);
              }}
              className="qzcomp-btn qzcomp-btn-primary"
            >
              Retake Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qzcomp-quiz-container">
      {showExitConfirm && (
        <div className="qzcomp-modal-overlay">
          <div className="qzcomp-modal">
            <h3 className="qzcomp-modal-title">Exit Quiz?</h3>
            <p className="qzcomp-modal-text">
              Your progress will be lost. Are you sure you want to exit?
            </p>
            <div className="qzcomp-modal-actions">
              <button
                onClick={cancelExit}
                className="qzcomp-btn qzcomp-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmExit}
                className="qzcomp-btn qzcomp-btn-danger"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="qzcomp-quiz-header">
        <div className="qzcomp-header-top">
          <button onClick={handleExitQuiz} className="qzcomp-exit-btn">
            ← Exit
          </button>
          <h1 className="qzcomp-quiz-title">{testData.title} Test</h1>
          <div
            className={`qzcomp-timer ${
              timeRemaining < 300 ? "qzcomp-timer-warning" : ""
            }`}
          >
            ⏱️ {formatTime(timeRemaining)}
          </div>
        </div>

        <div className="qzcomp-progress-section">
          <div className="qzcomp-progress-info">
            <span className="qzcomp-progress-text">
              Question {currentQuestionIndex + 1} of {testData.quiz.length}
            </span>
            <span className="qzcomp-progress-percent">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="qzcomp-progress-bar">
            <div
              className="qzcomp-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="qzcomp-quiz-content">
        <div className="qzcomp-question-panel">
          <div className="qzcomp-question-card">
            <h2 className="qzcomp-question-title">
              {currentQuestion.question}
            </h2>

            <div className="qzcomp-options-grid">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrectness = isAnswered;

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`qzcomp-option ${
                      isSelected ? "qzcomp-option-selected" : ""
                    } ${
                      showCorrectness && isSelected && isCorrect
                        ? "qzcomp-option-correct"
                        : ""
                    } ${
                      showCorrectness && isSelected && !isCorrect
                        ? "qzcomp-option-incorrect"
                        : ""
                    } ${
                      showCorrectness && !isSelected && isCorrect
                        ? "qzcomp-option-correct-answer"
                        : ""
                    } ${isAnswered ? "qzcomp-option-disabled" : ""}`}
                  >
                    <span className="qzcomp-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="qzcomp-option-text">{option}</span>
                    {showCorrectness && isSelected && (
                      <span className="qzcomp-option-icon">
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {isAnswered && (
              <div className="qzcomp-explanation-box">
                <strong>💡 Explanation:</strong> {currentQuestion.explanation}
              </div>
            )}

            <div className="qzcomp-question-actions">
              {!isAnswered ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedAnswer === null}
                  className="qzcomp-btn qzcomp-btn-primary qzcomp-btn-confirm"
                >
                  Confirm Answer
                </button>
              ) : (
                <div className="qzcomp-navigation-btns">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="qzcomp-btn qzcomp-btn-secondary"
                  >
                    ← Previous
                  </button>
                  {currentQuestionIndex < testData.quiz.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="qzcomp-btn qzcomp-btn-primary"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={!canSubmit}
                      className="qzcomp-btn qzcomp-btn-success"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="qzcomp-sidebar">
          <div className="qzcomp-sidebar-card">
            <h3 className="qzcomp-sidebar-title">Question Navigator</h3>
            <div className="qzcomp-stats-grid">
              <div className="qzcomp-stat-box">
                <span className="qzcomp-stat-number">{answeredCount}</span>
                <span className="qzcomp-stat-text">Answered</span>
              </div>
              <div className="qzcomp-stat-box">
                <span className="qzcomp-stat-number">
                  {testData.quiz.length - answeredCount}
                </span>
                <span className="qzcomp-stat-text">Remaining</span>
              </div>
            </div>

            <div className="qzcomp-question-grid">
              {testData.quiz.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionJump(index)}
                  className={`qzcomp-question-bubble ${
                    index === currentQuestionIndex ? "qzcomp-bubble-active" : ""
                  } ${
                    userAnswers[index] !== null ? "qzcomp-bubble-answered" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* {canSubmit && (
              <button
                onClick={handleSubmitQuiz}
                className="qzcomp-btn qzcomp-btn-success qzcomp-btn-block"
              >
                Submit All Answers
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponents;
