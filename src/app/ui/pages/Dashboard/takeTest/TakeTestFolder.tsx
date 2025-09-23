import React, { useState } from "react";
import { Questions } from "../../../../utils/questions";
import CoreValueCardTwo from "../../../components/CoreValueCard/CoreValueCardTwo";

const TakeTestFolder = () => {
  const [selectedTest, setSelectedTest] = useState<any | null>(null);

  const handleTestClick = (testData: any) => {
    setSelectedTest(testData); // show details inside the same page
  };

  const handleBack = () => {
    setSelectedTest(null); // go back to list
  };

  return (
    <div className="wrapper soft-wrapper">
      <span
        className="soft-dev-header title_span"
        style={{ background: "#fff" }}
      >
        Test Your Knowledge
      </span>

      <div className="soft-dev-content">
        {!selectedTest ? (
          // Show list
          Questions.map((prog, index) => (
            <div
              key={index}
              onClick={() => handleTestClick(prog)}
              style={{ cursor: "pointer" }}
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
          // Show details
          <div className="details-card">
            <h2>{selectedTest.title}</h2>
            <p>{selectedTest.summary}</p>
            <button onClick={handleBack}>Back</button>
            {/* you can even embed the quiz component directly here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTestFolder;

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
