import React, { useState } from "react";
import { Questions } from "../../../../utils/questions";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
import "./TakeTestFolder.css";

const TakeTestFolder = () => {
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
                        ✓ {item}
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

// import React, { useState } from "react";
// import { Questions } from "../../../../utils/questions";
// import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";

// const TakeTestFolder = () => {
//   const [selectedTest, setSelectedTest] = useState<any | null>(null);

//   const handleTestClick = (testData: any) => {
//     console.log("Test clicked:", testData); // Debug log
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
//     <div className="wrapper soft-wrapper">
//       <span
//         className="soft-dev-header title_span"
//         style={{ background: "#fff" }}
//       >
//         Test Your Knowledge
//       </span>

//       <div className="soft-dev-content">
//         {!selectedTest ? (
//           // Show test list
//           <div>
//             {Questions && Questions.length > 0 ? (
//               Questions.map((prog, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleTestClick(prog)}
//                   style={{ cursor: "pointer", marginBottom: "16px" }}
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
//               <p>No tests available</p>
//             )}
//           </div>
//         ) : (
//           // Show test details
//           <div className="test-details-view">
//             <button
//               onClick={handleBack}
//               style={{
//                 marginBottom: "20px",
//                 padding: "10px 20px",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               ← Back to Tests
//             </button>

//             <div
//               className="details-card"
//               style={{
//                 backgroundColor: "#fff",
//                 padding: "20px",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h1 style={{ marginBottom: "10px", color: "#333" }}>
//                 {selectedTest.title} Test
//               </h1>

//               <p style={{ color: "#666", marginBottom: "20px" }}>
//                 {selectedTest.subTitle}
//               </p>

//               <div
//                 style={{
//                   display: "flex",
//                   gap: "20px",
//                   marginBottom: "20px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <span
//                   style={{
//                     backgroundColor: "#e3f2fd",
//                     padding: "5px 10px",
//                     borderRadius: "15px",
//                     fontSize: "14px",
//                   }}
//                 >
//                   ⏱️ {selectedTest.duration}
//                 </span>
//                 <span
//                   style={{
//                     backgroundColor: "#f3e5f5",
//                     padding: "5px 10px",
//                     borderRadius: "15px",
//                     fontSize: "14px",
//                   }}
//                 >
//                   📊 {selectedTest.level}
//                 </span>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <h3>Description:</h3>
//                 <p>{selectedTest.description}</p>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <h3>Summary:</h3>
//                 <p>{selectedTest.summary}</p>
//               </div>

//               {selectedTest.learn && selectedTest.learn.length > 0 && (
//                 <div style={{ marginBottom: "20px" }}>
//                   <h3>What You'll Be Tested On:</h3>
//                   <ul>
//                     {selectedTest.learn.map((item: string, index: number) => (
//                       <li key={index} style={{ marginBottom: "5px" }}>
//                         ✓ {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {selectedTest.questions && selectedTest.questions.length > 0 && (
//                 <div style={{ marginBottom: "20px" }}>
//                   <h3>Sample Questions:</h3>
//                   <div>
//                     {selectedTest.questions.map(
//                       (question: string, index: number) => (
//                         <div
//                           key={index}
//                           style={{
//                             marginBottom: "10px",
//                             padding: "10px",
//                             backgroundColor: "#f8f9fa",
//                             borderRadius: "5px",
//                           }}
//                         >
//                           <strong>Q{index + 1}:</strong> {question}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}

//               {selectedTest.tools && selectedTest.tools.length > 0 && (
//                 <div style={{ marginBottom: "20px" }}>
//                   <h3>Tools & Technologies:</h3>
//                   <div
//                     style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
//                   >
//                     {selectedTest.tools.map((tool: string, index: number) => (
//                       <span
//                         key={index}
//                         style={{
//                           backgroundColor: "#e8f5e8",
//                           padding: "5px 10px",
//                           borderRadius: "15px",
//                           fontSize: "14px",
//                         }}
//                       >
//                         {tool}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={() => handleStartTest(selectedTest)}
//                 style={{
//                   padding: "12px 24px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                 }}
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

// const TakeTestFolder = () => {
//   const [selectedTest, setSelectedTest] = useState<any | null>(null);

//   const handleTestClick = (testData: any) => {
//     setSelectedTest(testData); // show details inside the same page
//   };

//   const handleBack = () => {
//     setSelectedTest(null); // go back to list
//   };

//   return (
//     <div className="wrapper soft-wrapper">
//       <span
//         className="soft-dev-header title_span"
//         style={{ background: "#fff" }}
//       >
//         Test Your Knowledge
//       </span>

//       <div className="soft-dev-content">
//         {!selectedTest ? (
//           // Show list
//           Questions.map((prog, index) => (
//             <div
//               key={index}
//               onClick={() => handleTestClick(prog)}
//               style={{ cursor: "pointer" }}
//             >
//               <CoreValueCardTwo
//                 title={`Take ${prog.title} Test`}
//                 description={prog.summary}
//                 url={prog.url}
//                 className="process-card"
//               />
//             </div>
//           ))
//         ) : (
//           // Show details
//           <div className="details-card">
//             <h2>{selectedTest.title}</h2>
//             <p>{selectedTest.summary}</p>
//             <button onClick={handleBack}>Back</button>
//             {/* you can even embed the quiz component directly here */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeTestFolder;

// // TakeTestFolder.tsx - Updated with navigation to detail page
// import React from "react";
// import { Questions } from "../../../../utils/questions";
// import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
// import { useNavigate } from "react-router-dom";

// const TakeTestFolder = () => {
//   const navigate = useNavigate();

//   const handleTestClick = (testData: any) => {
//     // Navigate to the test detail page instead of directly to quiz
//     navigate("/training/test-detail", { state: testData });
//   };

//   return (
//     <div>
//       <div className="wrapper soft-wrapper">
//         <span
//           className="soft-dev-header title_span"
//           style={{ background: "#fff" }}
//         >
//           Test Your Knowledge
//         </span>
//         <div className="soft-dev-content">
//           {Array.isArray(Questions) &&
//             Questions.map((prog, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleTestClick(prog)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <CoreValueCardTwo
//                   title={`Take ${prog.title} Test`}
//                   description={prog.summary}
//                   url={prog.url}
//                   className="process-card"
//                 />
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakeTestFolder;

// import React from "react";
// import { Questions } from "../../../../utils/questions";
// import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";
// import { useNavigate } from "react-router-dom";

// const TakeTestFolder = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       {" "}
//       <div className="wrapper soft-wrapper">
//         <span
//           className="soft-dev-header title_span"
//           style={{ background: "#fff" }}
//         >
//           Test Your Knowledge
//         </span>
//         <div className="soft-dev-content">
//           {Array.isArray(Questions) &&
//             Questions.map((prog, index) => (
//               <div
//                 key={index}
//                 onClick={() => navigate("/training/quize", { state: prog })}
//                 style={{ cursor: "pointer" }}
//               >
//                 <CoreValueCardTwo
//                   title={`Take ${prog.title} Test`}
//                   description={prog.summary}
//                   url={prog.url}
//                   className="process-card"
//                 />
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakeTestFolder;
