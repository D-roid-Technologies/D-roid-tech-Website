import React, { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  Eye,
  Download,
  Star,
  AlertCircle,
  CheckCircle,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp,
  File,
} from "lucide-react";
import "../premiumtoolbox/ResumeAnalyzing.css";

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  sections: {
    name: string;
    present: boolean;
    quality: "excellent" | "good" | "needs-improvement";
  }[];
  suggestions: string[];
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  preview?: string;
}

const ResumeAnalyzing: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "application/pdf",
  ];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): boolean => {
    if (!supportedFormats.includes(file.type)) {
      setError("Please upload a PNG, JPG, GIF, or PDF file only.");
      return false;
    }
    if (file.size > maxFileSize) {
      setError("File size must be less than 10MB.");
      return false;
    }
    setError(null);
    return true;
  };

  const createFilePreview = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      // Don't create preview for PDF files
      if (file.type === "application/pdf") {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!validateFile(file)) return;

    const preview = await createFilePreview(file);
    const fileInfo: FileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      preview: preview || undefined,
    };

    setUploadedFile(fileInfo);
    setAnalysisResult(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const simulateAnalysis = async (): Promise<AnalysisResult> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    return {
      score: Math.floor(Math.random() * 30) + 70, // 70-100 range
      strengths: [
        "Strong technical skills clearly highlighted",
        "Professional formatting and layout",
        "Quantifiable achievements included",
        "Relevant keywords for ATS systems",
        "Clear career progression shown",
      ],
      improvements: [
        "Add more specific metrics and numbers",
        "Include a professional summary section",
        "Expand on soft skills and leadership experience",
        "Consider adding relevant certifications",
        "Optimize keyword density for your target role",
      ],
      keywords: [
        "React",
        "TypeScript",
        "Frontend",
        "JavaScript",
        "CSS",
        "HTML",
        "Responsive Design",
        "UI/UX",
        "Git",
        "Agile",
        "Testing",
        "Performance",
      ],
      sections: [
        { name: "Contact Information", present: true, quality: "excellent" },
        {
          name: "Professional Summary",
          present: false,
          quality: "needs-improvement",
        },
        { name: "Work Experience", present: true, quality: "good" },
        { name: "Skills", present: true, quality: "excellent" },
        { name: "Education", present: true, quality: "good" },
        { name: "Projects", present: true, quality: "excellent" },
        {
          name: "Certifications",
          present: false,
          quality: "needs-improvement",
        },
      ],
      suggestions: [
        "Consider using a more modern template design",
        "Add links to your portfolio and GitHub profile",
        "Include relevant side projects or contributions",
        "Tailor keywords to match job descriptions",
        "Keep the resume to 1-2 pages maximum",
      ],
    };
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await simulateAnalysis();
      setAnalysisResult(result);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getQualityColor = (quality: string): string => {
    switch (quality) {
      case "excellent":
        return "#10b981";
      case "good":
        return "#f59e0b";
      case "needs-improvement":
        return "#ef4444";
      default:
        return "#727982";
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 85) return "#10b981";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === "application/pdf") {
      return <FileText size={48} className="rca-file-icon" />;
    }
    return <File size={48} className="rca-file-icon" />;
  };

  const getFileTypeDisplay = (type: string): string => {
    if (type === "application/pdf") return "PDF";
    return type.split("/")[1].toUpperCase();
  };

  return (
    <div className="rca-container">
      <div className="rca-header">
        <div className="rca-header-content">
          <div className="rca-logo">
            <FileText size={32} />
          </div>
          <div>
            <h1 className="rca-title">Resume & CV Analyzer</h1>
            <p className="rca-subtitle">
              Professional-grade resume analysis powered by AI
            </p>
          </div>
        </div>
      </div>

      <div className="rca-main">
        {error && (
          <div className="rca-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="rca-upload-section">
          <div
            className={`rca-upload-area ${
              isDragging ? "rca-upload-dragging" : ""
            } ${uploadedFile ? "rca-upload-has-file" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.gif,.pdf"
              onChange={handleFileInputChange}
              className="rca-file-input"
            />

            {!uploadedFile ? (
              <div className="rca-upload-content">
                <Upload size={48} className="rca-upload-icon" />
                <h3>Drop your resume here or click to browse</h3>
                <p>Supports PNG, JPG, GIF, PDF up to 10MB</p>
              </div>
            ) : (
              <div className="rca-file-preview">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt="Resume preview"
                    className="rca-preview-image"
                  />
                ) : (
                  <div className="rca-file-icon-container">
                    {getFileIcon(uploadedFile.type)}
                  </div>
                )}
                <div className="rca-file-info">
                  <h4>{uploadedFile.name}</h4>
                  <p>
                    {formatFileSize(uploadedFile.size)} •{" "}
                    {getFileTypeDisplay(uploadedFile.type)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {uploadedFile && (
            <button
              className="rca-analyze-btn"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="rca-spinner"></div>
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <TrendingUp size={20} />
                  Analyze Resume
                </>
              )}
            </button>
          )}
        </div>

        {analysisResult && (
          <div className="rca-results">
            <div className="rca-score-section">
              <div className="rca-score-card">
                <div
                  className="rca-score-circle"
                  style={{
                    background: `conic-gradient(${getScoreColor(
                      analysisResult.score
                    )} ${analysisResult.score * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                >
                  <div className="rca-score-inner">
                    <span className="rca-score-number">
                      {analysisResult.score}
                    </span>
                    <span className="rca-score-label">Score</span>
                  </div>
                </div>
                <div className="rca-score-info">
                  <h3>Overall Analysis Score</h3>
                  <p>
                    Your resume shows{" "}
                    {analysisResult.score >= 85
                      ? "excellent"
                      : analysisResult.score >= 70
                      ? "good"
                      : "needs improvement"}{" "}
                    potential for success
                  </p>
                </div>
              </div>
            </div>

            <div className="rca-analysis-grid">
              <div className="rca-analysis-card">
                <div className="rca-card-header">
                  <CheckCircle size={24} />
                  <h3>Strengths</h3>
                </div>
                <ul className="rca-list">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="rca-analysis-card">
                <div className="rca-card-header">
                  <TrendingUp size={24} />
                  <h3>Areas for Improvement</h3>
                </div>
                <ul className="rca-list">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>

              <div className="rca-analysis-card">
                <div className="rca-card-header">
                  <Award size={24} />
                  <h3>Key Skills Detected</h3>
                </div>
                <div className="rca-keywords">
                  {analysisResult.keywords.map((keyword, index) => (
                    <span key={index} className="rca-keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rca-analysis-card rca-full-width">
                <div className="rca-card-header">
                  <Users size={24} />
                  <h3>Section Analysis</h3>
                </div>
                <div className="rca-sections">
                  {analysisResult.sections.map((section, index) => (
                    <div key={index} className="rca-section-item">
                      <div className="rca-section-info">
                        <span className="rca-section-name">{section.name}</span>
                        <span
                          className={`rca-section-status ${
                            section.present ? "present" : "missing"
                          }`}
                        >
                          {section.present ? "Present" : "Missing"}
                        </span>
                      </div>
                      {section.present && (
                        <div className="rca-quality-bar">
                          <div
                            className="rca-quality-fill"
                            style={{
                              width:
                                section.quality === "excellent"
                                  ? "100%"
                                  : section.quality === "good"
                                  ? "70%"
                                  : "40%",
                              backgroundColor: getQualityColor(section.quality),
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rca-analysis-card rca-full-width">
                <div className="rca-card-header">
                  <Briefcase size={24} />
                  <h3>Professional Suggestions</h3>
                </div>
                <ul className="rca-suggestions">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="rca-suggestion-item">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzing;

// import React, { useState, useRef, useCallback } from "react";
// import {
//   Upload,
//   FileText,
//   Eye,
//   Download,
//   Star,
//   AlertCircle,
//   CheckCircle,
//   Users,
//   Briefcase,
//   GraduationCap,
//   Award,
//   TrendingUp,
// } from "lucide-react";
// import "../premiumtoolbox/ResumeAnalyzing.css";

// interface AnalysisResult {
//   score: number;
//   strengths: string[];
//   improvements: string[];
//   keywords: string[];
//   sections: {
//     name: string;
//     present: boolean;
//     quality: "excellent" | "good" | "needs-improvement";
//   }[];
//   suggestions: string[];
// }

// interface FileInfo {
//   name: string;
//   size: number;
//   type: string;
//   lastModified: number;
//   preview?: string;
// }

// const ResumeAnalyzing: React.FC = () => {
//   const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const supportedFormats = ["image/png", "image/jpeg", "image/gif"];
//   const maxFileSize = 10 * 1024 * 1024; // 10MB

//   const validateFile = (file: File): boolean => {
//     if (!supportedFormats.includes(file.type)) {
//       setError("Please upload a PNG, JPG, or GIF file only.");
//       return false;
//     }
//     if (file.size > maxFileSize) {
//       setError("File size must be less than 10MB.");
//       return false;
//     }
//     setError(null);
//     return true;
//   };

//   const createFilePreview = (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (e) => resolve(e.target?.result as string);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileSelect = async (file: File) => {
//     if (!validateFile(file)) return;

//     const preview = await createFilePreview(file);
//     const fileInfo: FileInfo = {
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       lastModified: file.lastModified,
//       preview,
//     };

//     setUploadedFile(fileInfo);
//     setAnalysisResult(null);
//   };

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   }, []);

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   const simulateAnalysis = async (): Promise<AnalysisResult> => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 2500));

//     return {
//       score: Math.floor(Math.random() * 30) + 70, // 70-100 range
//       strengths: [
//         "Strong technical skills clearly highlighted",
//         "Professional formatting and layout",
//         "Quantifiable achievements included",
//         "Relevant keywords for ATS systems",
//         "Clear career progression shown",
//       ],
//       improvements: [
//         "Add more specific metrics and numbers",
//         "Include a professional summary section",
//         "Expand on soft skills and leadership experience",
//         "Consider adding relevant certifications",
//         "Optimize keyword density for your target role",
//       ],
//       keywords: [
//         "React",
//         "TypeScript",
//         "Frontend",
//         "JavaScript",
//         "CSS",
//         "HTML",
//         "Responsive Design",
//         "UI/UX",
//         "Git",
//         "Agile",
//         "Testing",
//         "Performance",
//       ],
//       sections: [
//         { name: "Contact Information", present: true, quality: "excellent" },
//         {
//           name: "Professional Summary",
//           present: false,
//           quality: "needs-improvement",
//         },
//         { name: "Work Experience", present: true, quality: "good" },
//         { name: "Skills", present: true, quality: "excellent" },
//         { name: "Education", present: true, quality: "good" },
//         { name: "Projects", present: true, quality: "excellent" },
//         {
//           name: "Certifications",
//           present: false,
//           quality: "needs-improvement",
//         },
//       ],
//       suggestions: [
//         "Consider using a more modern template design",
//         "Add links to your portfolio and GitHub profile",
//         "Include relevant side projects or contributions",
//         "Tailor keywords to match job descriptions",
//         "Keep the resume to 1-2 pages maximum",
//       ],
//     };
//   };

//   const handleAnalyze = async () => {
//     if (!uploadedFile) return;

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       const result = await simulateAnalysis();
//       setAnalysisResult(result);
//     } catch (err) {
//       setError("Failed to analyze resume. Please try again.");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const getQualityColor = (quality: string): string => {
//     switch (quality) {
//       case "excellent":
//         return "#10b981";
//       case "good":
//         return "#f59e0b";
//       case "needs-improvement":
//         return "#ef4444";
//       default:
//         return "#727982";
//     }
//   };

//   const getScoreColor = (score: number): string => {
//     if (score >= 85) return "#10b981";
//     if (score >= 70) return "#f59e0b";
//     return "#ef4444";
//   };

//   return (
//     <div className="rca-container">
//       <div className="rca-header">
//         <div className="rca-header-content">
//           <div className="rca-logo">
//             <FileText size={32} />
//           </div>
//           <div>
//             <h1 className="rca-title">Resume & CV Analyzer</h1>
//             <p className="rca-subtitle">
//               Professional-grade resume analysis powered by AI
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="rca-main">
//         {error && (
//           <div className="rca-error">
//             <AlertCircle size={20} />
//             <span>{error}</span>
//           </div>
//         )}

//         <div className="rca-upload-section">
//           <div
//             className={`rca-upload-area ${
//               isDragging ? "rca-upload-dragging" : ""
//             } ${uploadedFile ? "rca-upload-has-file" : ""}`}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".png,.jpg,.jpeg,.gif"
//               onChange={handleFileInputChange}
//               className="rca-file-input"
//             />

//             {!uploadedFile ? (
//               <div className="rca-upload-content">
//                 <Upload size={48} className="rca-upload-icon" />
//                 <h3>Drop your resume here or click to browse</h3>
//                 <p>Supports PNG, JPG, GIF up to 10MB</p>
//               </div>
//             ) : (
//               <div className="rca-file-preview">
//                 <img
//                   src={uploadedFile.preview}
//                   alt="Resume preview"
//                   className="rca-preview-image"
//                 />
//                 <div className="rca-file-info">
//                   <h4>{uploadedFile.name}</h4>
//                   <p>
//                     {formatFileSize(uploadedFile.size)} •{" "}
//                     {uploadedFile.type.split("/")[1].toUpperCase()}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {uploadedFile && (
//             <button
//               className="rca-analyze-btn"
//               onClick={handleAnalyze}
//               disabled={isAnalyzing}
//             >
//               {isAnalyzing ? (
//                 <>
//                   <div className="rca-spinner"></div>
//                   Analyzing Resume...
//                 </>
//               ) : (
//                 <>
//                   <TrendingUp size={20} />
//                   Analyze Resume
//                 </>
//               )}
//             </button>
//           )}
//         </div>

//         {analysisResult && (
//           <div className="rca-results">
//             <div className="rca-score-section">
//               <div className="rca-score-card">
//                 <div
//                   className="rca-score-circle"
//                   style={{
//                     background: `conic-gradient(${getScoreColor(
//                       analysisResult.score
//                     )} ${analysisResult.score * 3.6}deg, #e5e7eb 0deg)`,
//                   }}
//                 >
//                   <div className="rca-score-inner">
//                     <span className="rca-score-number">
//                       {analysisResult.score}
//                     </span>
//                     <span className="rca-score-label">Score</span>
//                   </div>
//                 </div>
//                 <div className="rca-score-info">
//                   <h3>Overall Analysis Score</h3>
//                   <p>
//                     Your resume shows{" "}
//                     {analysisResult.score >= 85
//                       ? "excellent"
//                       : analysisResult.score >= 70
//                       ? "good"
//                       : "needs improvement"}{" "}
//                     potential for success
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="rca-analysis-grid">
//               <div className="rca-analysis-card">
//                 <div className="rca-card-header">
//                   <CheckCircle size={24} />
//                   <h3>Strengths</h3>
//                 </div>
//                 <ul className="rca-list">
//                   {analysisResult.strengths.map((strength, index) => (
//                     <li key={index}>{strength}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="rca-analysis-card">
//                 <div className="rca-card-header">
//                   <TrendingUp size={24} />
//                   <h3>Areas for Improvement</h3>
//                 </div>
//                 <ul className="rca-list">
//                   {analysisResult.improvements.map((improvement, index) => (
//                     <li key={index}>{improvement}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="rca-analysis-card">
//                 <div className="rca-card-header">
//                   <Award size={24} />
//                   <h3>Key Skills Detected</h3>
//                 </div>
//                 <div className="rca-keywords">
//                   {analysisResult.keywords.map((keyword, index) => (
//                     <span key={index} className="rca-keyword-tag">
//                       {keyword}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="rca-analysis-card rca-full-width">
//                 <div className="rca-card-header">
//                   <Users size={24} />
//                   <h3>Section Analysis</h3>
//                 </div>
//                 <div className="rca-sections">
//                   {analysisResult.sections.map((section, index) => (
//                     <div key={index} className="rca-section-item">
//                       <div className="rca-section-info">
//                         <span className="rca-section-name">{section.name}</span>
//                         <span
//                           className={`rca-section-status ${
//                             section.present ? "present" : "missing"
//                           }`}
//                         >
//                           {section.present ? "Present" : "Missing"}
//                         </span>
//                       </div>
//                       {section.present && (
//                         <div className="rca-quality-bar">
//                           <div
//                             className="rca-quality-fill"
//                             style={{
//                               width:
//                                 section.quality === "excellent"
//                                   ? "100%"
//                                   : section.quality === "good"
//                                   ? "70%"
//                                   : "40%",
//                               backgroundColor: getQualityColor(section.quality),
//                             }}
//                           ></div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="rca-analysis-card rca-full-width">
//                 <div className="rca-card-header">
//                   <Briefcase size={24} />
//                   <h3>Professional Suggestions</h3>
//                 </div>
//                 <ul className="rca-suggestions">
//                   {analysisResult.suggestions.map((suggestion, index) => (
//                     <li key={index} className="rca-suggestion-item">
//                       {suggestion}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeAnalyzing;

// // import React from "react";

// // interface ComponentProps {
// //   onClose: () => void;
// // }

// // const ResumeAnalyzing: React.FC<{ onClose: () => void }> = ({ onClose }) => {
// //   return (
// //     <div
// //       style={{
// //         padding: "1rem",
// //         border: "1px solid #ccc",
// //         borderRadius: "8px",
// //         marginTop: "2rem",
// //       }}
// //     >
// //       <h2>Upload Your Resume</h2>
// //       <input type="file" accept=".pdf,.doc,.docx" />
// //       <p style={{ marginTop: "1rem", color: "#555" }}>
// //         Supported formats: PDF, DOC, DOCX. The analysis will provide tips on
// //         formatting, keyword usage, and readability.
// //       </p>
// //       {/* TODO: Implement actual analysis logic here */}
// //     </div>
// //   );
// // };

// // export default ResumeAnalyzing;
