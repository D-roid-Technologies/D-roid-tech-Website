import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  BarChart3,
  Check,
  Target,
  FileText,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import "../takeTest/TestDetails.css";
import { Questions } from "../../../../utils/questions";

interface BaseQuestion {
  title: string;
  subTitle: string;
  summary: string;
  duration: string;
  description: string;
  level: string;
  tools: string[];
  mode: string[];
  url: string;
  gallery: string[];
  learn: string[];
  questions: string[];
}

type Question =
  | (BaseQuestion & { benefits: string[]; howToApply?: never })
  | (BaseQuestion & { howToApply: string[]; benefits?: never });

const TestDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { testTitle } = useParams();

  let testData = location.state as Question;

  // If no state data, try to find by URL parameter or use first test as fallback
  if (!testData) {
    if (testTitle) {
      testData =
        Questions.find(
          (q) => q.title.toLowerCase() === testTitle.toLowerCase()
        ) || Questions[0];
    } else {
      testData = Questions[0];
      console.warn("No test data provided, using first test as fallback");
    }
  }

  const handleStartTest = () => {
    // Navigate to your existing quiz page with test data
    navigate("/training/quize", { state: testData });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Type-safe way to get the list data and determine the type
  const getListData = (
    data: Question
  ): { items: string[]; type: "benefits" | "howToApply" } => {
    if ("benefits" in data && data.benefits) {
      return { items: data.benefits, type: "benefits" };
    }
    if ("howToApply" in data && data.howToApply) {
      return { items: data.howToApply, type: "howToApply" };
    }
    return { items: [], type: "benefits" };
  };

  const { items: listItems, type: listType } = getListData(testData);

  return (
    <div className="test-detail-container">
      <div className="test-detail-wrapper">
        {/* Header Section */}
        <div className="test-detail-header">
          <button onClick={handleGoBack} className="test-detail-back-btn">
            <ArrowLeft size={16} className="inline mr-2" />
            Back to Tests
          </button>
          <div className="test-detail-hero">
            <h1 className="test-detail-title">{testData.title} Test</h1>
            <p className="test-detail-subtitle">{testData.subTitle}</p>
            <div className="test-detail-meta">
              <span className="test-detail-duration">
                <Clock size={16} className="inline mr-1" />
                {testData.duration}
              </span>
              <span className="test-detail-level">
                <BarChart3 size={16} className="inline mr-1" />
                {testData.level}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="test-detail-grid">
          {/* Left Column */}
          <div className="test-detail-main">
            {/* Overview Section */}
            <section className="test-detail-section">
              <h2 className="test-detail-section-title">Test Overview</h2>
              <p className="test-detail-description">{testData.description}</p>
              <p className="test-detail-summary">{testData.summary}</p>
            </section>

            {/* What You'll Learn Section */}
            <section className="test-detail-section">
              <h2 className="test-detail-section-title">
                What You'll Be Tested On
              </h2>
              <ul className="test-detail-learn-list">
                {testData.learn.map((item, index) => (
                  <li key={index} className="test-detail-learn-item">
                    <Check size={16} className="test-detail-learn-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Sample Questions */}
            <section className="test-detail-section">
              <h2 className="test-detail-section-title">Sample Questions</h2>
              <div className="test-detail-questions">
                {testData.questions.map((question, index) => (
                  <div key={index} className="test-detail-question-item">
                    <span className="test-detail-question-number">
                      Q{index + 1}
                    </span>
                    <span className="test-detail-question-text">
                      {question}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery Section */}
            {testData.gallery && testData.gallery.length > 0 && (
              <section className="test-detail-section">
                <h2 className="test-detail-section-title">Preview</h2>
                <div className="test-detail-gallery">
                  {testData.gallery.map((image, index) => (
                    <div key={index} className="test-detail-gallery-item">
                      <img
                        src={image}
                        alt={`${testData.title} preview ${index + 1}`}
                        className="test-detail-gallery-image"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="test-detail-sidebar">
            {/* Start Test Card */}
            <div className="test-detail-card test-detail-start-card">
              <h3 className="test-detail-card-title">Ready to Start?</h3>
              <button
                onClick={handleStartTest}
                className="test-detail-start-btn"
              >
                Start {testData.title} Test
              </button>
              <div className="test-detail-start-info">
                <p>Duration: {testData.duration}</p>
                <p>Level: {testData.level}</p>
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="test-detail-card">
              <h3 className="test-detail-card-title">Tools & Technologies</h3>
              <div className="test-detail-tools">
                {testData.tools.map((tool, index) => (
                  <span key={index} className="test-detail-tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Test Mode */}
            <div className="test-detail-card">
              <h3 className="test-detail-card-title">Test Format</h3>
              <ul className="test-detail-mode-list">
                {testData.mode.map((mode, index) => (
                  <li key={index} className="test-detail-mode-item">
                    <ClipboardList
                      size={16}
                      className="test-detail-mode-icon"
                    />
                    {mode}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits or How To Apply */}
            {listItems.length > 0 && (
              <div className="test-detail-card">
                <h3 className="test-detail-card-title">
                  {listType === "benefits" ? "Benefits" : "How to Apply"}
                </h3>
                <ul className="test-detail-benefits-list">
                  {listItems.map((item, index) => (
                    <li key={index} className="test-detail-benefit-item">
                      {listType === "benefits" ? (
                        <Target
                          size={16}
                          className="test-detail-benefit-icon"
                        />
                      ) : (
                        <FileText
                          size={16}
                          className="test-detail-benefit-icon"
                        />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailPage;

// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import "../takeTest/TestDetails.css";
// import { Questions } from "../../../../utils/questions";

// interface BaseQuestion {
//   title: string;
//   subTitle: string;
//   summary: string;
//   duration: string;
//   description: string;
//   level: string;
//   tools: string[];
//   mode: string[];
//   url: string;
//   gallery: string[];
//   learn: string[];
//   questions: string[];
// }

// type Question =
//   | (BaseQuestion & { benefits: string[]; howToApply?: never })
//   | (BaseQuestion & { howToApply: string[]; benefits?: never });

// const TestDetailPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { testTitle } = useParams();

//   let testData = location.state as Question;

//   // If no state data, try to find by URL parameter or use first test as fallback
//   if (!testData) {
//     if (testTitle) {
//       testData =
//         Questions.find(
//           (q) => q.title.toLowerCase() === testTitle.toLowerCase()
//         ) || Questions[0];
//     } else {
//       testData = Questions[0];
//       console.warn("No test data provided, using first test as fallback");
//     }
//   }

//   const handleStartTest = () => {
//     // Navigate to your existing quiz page with test data
//     navigate("/training/quize", { state: testData });
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   // Type-safe way to get the list data and determine the type
//   const getListData = (
//     data: Question
//   ): { items: string[]; type: "benefits" | "howToApply" } => {
//     if ("benefits" in data && data.benefits) {
//       return { items: data.benefits, type: "benefits" };
//     }
//     if ("howToApply" in data && data.howToApply) {
//       return { items: data.howToApply, type: "howToApply" };
//     }
//     return { items: [], type: "benefits" };
//   };

//   const { items: listItems, type: listType } = getListData(testData);

//   return (
//     <div className="test-detail-container">
//       <div className="test-detail-wrapper">
//         {/* Header Section */}
//         <div className="test-detail-header">
//           <button onClick={handleGoBack} className="test-detail-back-btn">
//             ← Back to Tests
//           </button>
//           <div className="test-detail-hero">
//             <h1 className="test-detail-title">{testData.title} Test</h1>
//             <p className="test-detail-subtitle">{testData.subTitle}</p>
//             <div className="test-detail-meta">
//               <span className="test-detail-duration">
//                 ⏱️ {testData.duration}
//               </span>
//               <span className="test-detail-level">📊 {testData.level}</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="test-detail-grid">
//           {/* Left Column */}
//           <div className="test-detail-main">
//             {/* Overview Section */}
//             <section className="test-detail-section">
//               <h2 className="test-detail-section-title">Test Overview</h2>
//               <p className="test-detail-description">{testData.description}</p>
//               <p className="test-detail-summary">{testData.summary}</p>
//             </section>

//             {/* What You'll Learn Section */}
//             <section className="test-detail-section">
//               <h2 className="test-detail-section-title">
//                 What You'll Be Tested On
//               </h2>
//               <ul className="test-detail-learn-list">
//                 {testData.learn.map((item, index) => (
//                   <li key={index} className="test-detail-learn-item">
//                     <span className="test-detail-learn-icon">✓</span>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </section>

//             {/* Sample Questions */}
//             <section className="test-detail-section">
//               <h2 className="test-detail-section-title">Sample Questions</h2>
//               <div className="test-detail-questions">
//                 {testData.questions.map((question, index) => (
//                   <div key={index} className="test-detail-question-item">
//                     <span className="test-detail-question-number">
//                       Q{index + 1}
//                     </span>
//                     <span className="test-detail-question-text">
//                       {question}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Gallery Section */}
//             {testData.gallery && testData.gallery.length > 0 && (
//               <section className="test-detail-section">
//                 <h2 className="test-detail-section-title">Preview</h2>
//                 <div className="test-detail-gallery">
//                   {testData.gallery.map((image, index) => (
//                     <div key={index} className="test-detail-gallery-item">
//                       <img
//                         src={image}
//                         alt={`${testData.title} preview ${index + 1}`}
//                         className="test-detail-gallery-image"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* Right Sidebar */}
//           <div className="test-detail-sidebar">
//             {/* Start Test Card */}
//             <div className="test-detail-card test-detail-start-card">
//               <h3 className="test-detail-card-title">Ready to Start?</h3>
//               <button
//                 onClick={handleStartTest}
//                 className="test-detail-start-btn"
//               >
//                 Start {testData.title} Test
//               </button>
//               <div className="test-detail-start-info">
//                 <p>Duration: {testData.duration}</p>
//                 <p>Level: {testData.level}</p>
//               </div>
//             </div>

//             {/* Tools & Technologies */}
//             <div className="test-detail-card">
//               <h3 className="test-detail-card-title">Tools & Technologies</h3>
//               <div className="test-detail-tools">
//                 {testData.tools.map((tool, index) => (
//                   <span key={index} className="test-detail-tool-tag">
//                     {tool}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Test Mode */}
//             <div className="test-detail-card">
//               <h3 className="test-detail-card-title">Test Format</h3>
//               <ul className="test-detail-mode-list">
//                 {testData.mode.map((mode, index) => (
//                   <li key={index} className="test-detail-mode-item">
//                     <span className="test-detail-mode-icon">📋</span>
//                     {mode}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Benefits or How To Apply */}
//             {listItems.length > 0 && (
//               <div className="test-detail-card">
//                 <h3 className="test-detail-card-title">
//                   {listType === "benefits" ? "Benefits" : "How to Apply"}
//                 </h3>
//                 <ul className="test-detail-benefits-list">
//                   {listItems.map((item, index) => (
//                     <li key={index} className="test-detail-benefit-item">
//                       <span className="test-detail-benefit-icon">
//                         {listType === "benefits" ? "🎯" : "📝"}
//                       </span>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestDetailPage;
