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
//   File,
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

// interface OpenAIConfig {
//   apiKey: string;
//   model: string;
// }

// const ResumeAnalyzing: React.FC = () => {
//   const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [apiKey, setApiKey] = useState<string>("");
//   const [showApiKeyInput, setShowApiKeyInput] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const fileRef = useRef<File | null>(null);

//   const supportedFormats = [
//     "image/png",
//     "image/jpeg",
//     "image/gif",
//     "application/pdf",
//   ];
//   const maxFileSize = 10 * 1024 * 1024; // 10MB

//   const validateFile = (file: File): boolean => {
//     if (!supportedFormats.includes(file.type)) {
//       setError("Please upload a PNG, JPG, GIF, or PDF file only.");
//       return false;
//     }
//     if (file.size > maxFileSize) {
//       setError("File size must be less than 10MB.");
//       return false;
//     }
//     setError(null);
//     return true;
//   };

//   const createFilePreview = (file: File): Promise<string | null> => {
//     return new Promise((resolve) => {
//       // Don't create preview for PDF files
//       if (file.type === "application/pdf") {
//         resolve(null);
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (e) => resolve(e.target?.result as string);
//       reader.readAsDataURL(file);
//     });
//   };

//   const convertFileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
//         const base64 = result.split(",")[1];
//         resolve(base64);
//       };
//       reader.onerror = reject;
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
//       preview: preview || undefined,
//     };

//     setUploadedFile(fileInfo);
//     fileRef.current = file;
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

//   const analyzeResumeWithGPT4Vision = async (
//     file: File
//   ): Promise<AnalysisResult> => {
//     if (!apiKey) {
//       throw new Error("OpenAI API key is required");
//     }

//     try {
//       let content: any[] = [];

//       if (file.type === "application/pdf") {
//         // For PDF files, we need to convert them to images first
//         // This is a limitation since GPT-4 Vision can't directly read PDFs
//         throw new Error(
//           "PDF analysis requires PDF-to-image conversion. Please upload an image of your resume instead."
//         );
//       } else {
//         // For image files
//         const base64Image = await convertFileToBase64(file);
//         content = [
//           {
//             type: "text",
//             text: `Please analyze this resume image and provide a comprehensive evaluation. Return your analysis in the following JSON format:

// {
//   "score": <number between 0-100>,
//   "strengths": [<array of 3-5 key strengths>],
//   "improvements": [<array of 3-5 areas for improvement>],
//   "keywords": [<array of 8-12 relevant technical/professional keywords found>],
//   "sections": [
//     {
//       "name": "<section name>",
//       "present": <boolean>,
//       "quality": "<excellent|good|needs-improvement>"
//     }
//   ],
//   "suggestions": [<array of 3-5 actionable suggestions>]
// }

// Evaluate these sections: Contact Information, Professional Summary, Work Experience, Skills, Education, Projects, Certifications.

// Please be thorough and professional in your analysis.`,
//           },
//           {
//             type: "image_url",
//             image_url: {
//               url: `data:${file.type};base64,${base64Image}`,
//               detail: "high",
//             },
//           },
//         ];
//       }

//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey}`,
//           },
//           body: JSON.stringify({
//             model: "gpt-4-vision-preview",
//             messages: [
//               {
//                 role: "user",
//                 content: content,
//               },
//             ],
//             max_tokens: 2000,
//             temperature: 0.3,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.error?.message ||
//             `API request failed with status ${response.status}`
//         );
//       }

//       const data = await response.json();
//       const analysisText = data.choices[0]?.message?.content;

//       if (!analysisText) {
//         throw new Error("No analysis returned from API");
//       }

//       // Try to parse the JSON response
//       try {
//         // Extract JSON from the response (in case there's additional text)
//         const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
//         const jsonString = jsonMatch ? jsonMatch[0] : analysisText;
//         const parsedResult = JSON.parse(jsonString);

//         // Validate the structure and provide defaults if needed
//         return {
//           score: parsedResult.score || 75,
//           strengths: Array.isArray(parsedResult.strengths)
//             ? parsedResult.strengths
//             : ["Professional presentation"],
//           improvements: Array.isArray(parsedResult.improvements)
//             ? parsedResult.improvements
//             : ["Consider adding more details"],
//           keywords: Array.isArray(parsedResult.keywords)
//             ? parsedResult.keywords
//             : ["Professional", "Experienced"],
//           sections: Array.isArray(parsedResult.sections)
//             ? parsedResult.sections
//             : [
//                 { name: "Contact Information", present: true, quality: "good" },
//                 { name: "Work Experience", present: true, quality: "good" },
//                 { name: "Skills", present: true, quality: "good" },
//                 { name: "Education", present: true, quality: "good" },
//               ],
//           suggestions: Array.isArray(parsedResult.suggestions)
//             ? parsedResult.suggestions
//             : ["Continue professional development"],
//         };
//       } catch (parseError) {
//         console.error("Failed to parse GPT-4 response as JSON:", parseError);
//         console.log("Raw response:", analysisText);

//         // Fallback: create a basic analysis result
//         return {
//           score: 75,
//           strengths: ["Professional presentation", "Clear structure"],
//           improvements: [
//             "Consider adding more specific metrics",
//             "Enhance keyword optimization",
//           ],
//           keywords: ["Professional", "Experienced", "Skilled"],
//           sections: [
//             { name: "Contact Information", present: true, quality: "good" },
//             { name: "Work Experience", present: true, quality: "good" },
//             { name: "Skills", present: true, quality: "good" },
//             { name: "Education", present: true, quality: "good" },
//           ],
//           suggestions: [
//             "Add quantifiable achievements",
//             "Tailor to specific job descriptions",
//           ],
//         };
//       }
//     } catch (error) {
//       console.error("GPT-4 Vision API Error:", error);
//       throw error;
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!uploadedFile || !fileRef.current) return;

//     if (!apiKey) {
//       setShowApiKeyInput(true);
//       setError("Please enter your OpenAI API key to analyze the resume.");
//       return;
//     }

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       const result = await analyzeResumeWithGPT4Vision(fileRef.current);
//       setAnalysisResult(result);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error
//           ? err.message
//           : "Failed to analyze resume. Please try again.";
//       setError(errorMessage);

//       if (errorMessage.includes("API key")) {
//         setShowApiKeyInput(true);
//       }
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

//   const getFileIcon = (fileType: string) => {
//     if (fileType === "application/pdf") {
//       return <FileText size={48} className="rca-file-icon" />;
//     }
//     return <File size={48} className="rca-file-icon" />;
//   };

//   const getFileTypeDisplay = (type: string): string => {
//     if (type === "application/pdf") return "PDF";
//     return type.split("/")[1].toUpperCase();
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
//               AI-powered resume analysis using GPT-4 Vision
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

//         {showApiKeyInput && (
//           <div
//             className="rca-api-key-section"
//             style={{
//               marginBottom: "2rem",
//               padding: "1.5rem",
//               backgroundColor: "#f8fafc",
//               border: "1px solid #e2e8f0",
//               borderRadius: "0.75rem",
//             }}
//           >
//             <h3
//               style={{
//                 marginBottom: "0.75rem",
//                 fontSize: "1.125rem",
//                 fontWeight: "600",
//               }}
//             >
//               OpenAI API Configuration
//             </h3>
//             <p
//               style={{
//                 marginBottom: "1rem",
//                 color: "#64748b",
//                 fontSize: "0.875rem",
//               }}
//             >
//               Enter your OpenAI API key to enable GPT-4 Vision analysis. You can
//               get your API key from{" "}
//               <a
//                 href="https://platform.openai.com/api-keys"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ color: "#3b82f6" }}
//               >
//                 OpenAI Platform
//               </a>
//             </p>
//             <div
//               style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
//             >
//               <input
//                 type="password"
//                 placeholder="sk-..."
//                 value={apiKey}
//                 onChange={(e) => setApiKey(e.target.value)}
//                 style={{
//                   flex: 1,
//                   padding: "0.75rem",
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.5rem",
//                   fontSize: "0.875rem",
//                 }}
//               />
//               <button
//                 onClick={() => {
//                   setShowApiKeyInput(false);
//                   setError(null);
//                 }}
//                 disabled={!apiKey.trim()}
//                 style={{
//                   padding: "0.75rem 1.5rem",
//                   backgroundColor: apiKey.trim() ? "#3b82f6" : "#9ca3af",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "0.5rem",
//                   fontSize: "0.875rem",
//                   cursor: apiKey.trim() ? "pointer" : "not-allowed",
//                 }}
//               >
//                 Save
//               </button>
//             </div>
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
//               accept=".png,.jpg,.jpeg,.gif,.pdf"
//               onChange={handleFileInputChange}
//               className="rca-file-input"
//             />

//             {!uploadedFile ? (
//               <div className="rca-upload-content">
//                 <Upload size={48} className="rca-upload-icon" />
//                 <h3>Drop your resume here or click to browse</h3>
//                 <p>Supports PNG, JPG, GIF images up to 10MB</p>
//                 <p
//                   style={{
//                     fontSize: "0.875rem",
//                     color: "#64748b",
//                     marginTop: "0.5rem",
//                   }}
//                 >
//                   Note: For best results with GPT-4 Vision, upload an image of
//                   your resume
//                 </p>
//               </div>
//             ) : (
//               <div className="rca-file-preview">
//                 {uploadedFile.preview ? (
//                   <img
//                     src={uploadedFile.preview}
//                     alt="Resume preview"
//                     className="rca-preview-image"
//                   />
//                 ) : (
//                   <div className="rca-file-icon-container">
//                     {getFileIcon(uploadedFile.type)}
//                   </div>
//                 )}
//                 <div className="rca-file-info">
//                   <h4>{uploadedFile.name}</h4>
//                   <p>
//                     {formatFileSize(uploadedFile.size)} •{" "}
//                     {getFileTypeDisplay(uploadedFile.type)}
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
//                   Analyzing with AI...
//                 </>
//               ) : (
//                 <>
//                   <TrendingUp size={20} />
//                   Analyze with AI
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
//                     <span className="rca-score-label">AI Score</span>
//                   </div>
//                 </div>
//                 <div className="rca-score-info">
//                   <h3>GPT-4 Vision Analysis Score</h3>
//                   <p>
//                     Your resume shows{" "}
//                     {analysisResult.score >= 85
//                       ? "excellent"
//                       : analysisResult.score >= 70
//                       ? "good"
//                       : "needs improvement"}{" "}
//                     potential according to AI analysis
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="rca-analysis-grid">
//               <div className="rca-analysis-card">
//                 <div className="rca-card-header">
//                   <CheckCircle size={24} />
//                   <h3>AI-Detected Strengths</h3>
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
//                   <h3>AI Improvement Recommendations</h3>
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
//                   <h3>Keywords Identified by AI</h3>
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
//                   <h3>AI Section Analysis</h3>
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
//                   <h3>AI-Generated Suggestions</h3>
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

//             <div
//               style={{
//                 marginTop: "2rem",
//                 padding: "1rem",
//                 backgroundColor: "#f0f9ff",
//                 border: "1px solid #0ea5e9",
//                 borderRadius: "0.5rem",
//                 fontSize: "0.875rem",
//                 color: "#0369a1",
//               }}
//             >
//               <strong>Powered by GPT-4 Vision:</strong> This analysis was
//               generated using OpenAI's advanced AI model capable of
//               understanding and analyzing visual content in your resume.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeAnalyzing;

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
//   File,
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

// interface OpenAIConfig {
//   apiKey: string;
//   model: string;
// }

// const ResumeAnalyzing: React.FC = () => {
//   const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [apiKey, setApiKey] = useState<string>("");
//   const [showApiKeyInput, setShowApiKeyInput] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const fileRef = useRef<File | null>(null);

//   const supportedFormats = [
//     "image/png",
//     "image/jpeg",
//     "image/gif",
//     "application/pdf",
//   ];
//   const maxFileSize = 10 * 1024 * 1024; // 10MB

//   const validateFile = (file: File): boolean => {
//     if (!supportedFormats.includes(file.type)) {
//       setError("Please upload a PNG, JPG, GIF, or PDF file only.");
//       return false;
//     }
//     if (file.size > maxFileSize) {
//       setError("File size must be less than 10MB.");
//       return false;
//     }
//     setError(null);
//     return true;
//   };

//   const createFilePreview = (file: File): Promise<string | null> => {
//     return new Promise((resolve) => {
//       // Don't create preview for PDF files
//       if (file.type === "application/pdf") {
//         resolve(null);
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (e) => resolve(e.target?.result as string);
//       reader.readAsDataURL(file);
//     });
//   };

//   const convertFileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
//         const base64 = result.split(",")[1];
//         resolve(base64);
//       };
//       reader.onerror = reject;
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
//       preview: preview || undefined,
//     };

//     setUploadedFile(fileInfo);
//     fileRef.current = file;
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

//   const analyzeResumeWithGPT4Vision = async (
//     file: File
//   ): Promise<AnalysisResult> => {
//     if (!apiKey) {
//       throw new Error("OpenAI API key is required");
//     }

//     try {
//       let content: any[] = [];

//       if (file.type === "application/pdf") {
//         // For PDF files, we need to convert them to images first
//         // This is a limitation since GPT-4 Vision can't directly read PDFs
//         throw new Error(
//           "PDF analysis requires PDF-to-image conversion. Please upload an image of your resume instead."
//         );
//       } else {
//         // For image files
//         const base64Image = await convertFileToBase64(file);
//         content = [
//           {
//             type: "text",
//             text: `Please analyze this resume image and provide a comprehensive evaluation. Return your analysis in the following JSON format:

// {
//   "score": <number between 0-100>,
//   "strengths": [<array of 3-5 key strengths>],
//   "improvements": [<array of 3-5 areas for improvement>],
//   "keywords": [<array of 8-12 relevant technical/professional keywords found>],
//   "sections": [
//     {
//       "name": "<section name>",
//       "present": <boolean>,
//       "quality": "<excellent|good|needs-improvement>"
//     }
//   ],
//   "suggestions": [<array of 3-5 actionable suggestions>]
// }

// Evaluate these sections: Contact Information, Professional Summary, Work Experience, Skills, Education, Projects, Certifications.

// Please be thorough and professional in your analysis.`,
//           },
//           {
//             type: "image_url",
//             image_url: {
//               url: `data:${file.type};base64,${base64Image}`,
//               detail: "high",
//             },
//           },
//         ];
//       }

//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey}`,
//           },
//           body: JSON.stringify({
//             model: "gpt-4-vision-preview",
//             messages: [
//               {
//                 role: "user",
//                 content: content,
//               },
//             ],
//             max_tokens: 2000,
//             temperature: 0.3,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.error?.message ||
//             `API request failed with status ${response.status}`
//         );
//       }

//       const data = await response.json();
//       const analysisText = data.choices[0]?.message?.content;

//       if (!analysisText) {
//         throw new Error("No analysis returned from API");
//       }

//       // Try to parse the JSON response
//       try {
//         // Extract JSON from the response (in case there's additional text)
//         const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
//         const jsonString = jsonMatch ? jsonMatch[0] : analysisText;
//         const parsedResult = JSON.parse(jsonString);

//         // Validate the structure and provide defaults if needed
//         return {
//           score: parsedResult.score || 75,
//           strengths: Array.isArray(parsedResult.strengths)
//             ? parsedResult.strengths
//             : ["Professional presentation"],
//           improvements: Array.isArray(parsedResult.improvements)
//             ? parsedResult.improvements
//             : ["Consider adding more details"],
//           keywords: Array.isArray(parsedResult.keywords)
//             ? parsedResult.keywords
//             : ["Professional", "Experienced"],
//           sections: Array.isArray(parsedResult.sections)
//             ? parsedResult.sections
//             : [
//                 { name: "Contact Information", present: true, quality: "good" },
//                 { name: "Work Experience", present: true, quality: "good" },
//                 { name: "Skills", present: true, quality: "good" },
//                 { name: "Education", present: true, quality: "good" },
//               ],
//           suggestions: Array.isArray(parsedResult.suggestions)
//             ? parsedResult.suggestions
//             : ["Continue professional development"],
//         };
//       } catch (parseError) {
//         console.error("Failed to parse GPT-4 response as JSON:", parseError);
//         console.log("Raw response:", analysisText);

//         // Fallback: create a basic analysis result
//         return {
//           score: 75,
//           strengths: ["Professional presentation", "Clear structure"],
//           improvements: [
//             "Consider adding more specific metrics",
//             "Enhance keyword optimization",
//           ],
//           keywords: ["Professional", "Experienced", "Skilled"],
//           sections: [
//             { name: "Contact Information", present: true, quality: "good" },
//             { name: "Work Experience", present: true, quality: "good" },
//             { name: "Skills", present: true, quality: "good" },
//             { name: "Education", present: true, quality: "good" },
//           ],
//           suggestions: [
//             "Add quantifiable achievements",
//             "Tailor to specific job descriptions",
//           ],
//         };
//       }
//     } catch (error) {
//       console.error("GPT-4 Vision API Error:", error);
//       throw error;
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!uploadedFile || !fileRef.current) return;

//     if (!apiKey) {
//       setShowApiKeyInput(true);
//       setError("Please enter your OpenAI API key to analyze the resume.");
//       return;
//     }

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       const result = await analyzeResumeWithGPT4Vision(fileRef.current);
//       setAnalysisResult(result);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error
//           ? err.message
//           : "Failed to analyze resume. Please try again.";
//       setError(errorMessage);

//       if (errorMessage.includes("API key")) {
//         setShowApiKeyInput(true);
//       }
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

//   const getFileIcon = (fileType: string) => {
//     if (fileType === "application/pdf") {
//       return <FileText size={48} className="rca-file-icon" />;
//     }
//     return <File size={48} className="rca-file-icon" />;
//   };

//   const getFileTypeDisplay = (type: string): string => {
//     if (type === "application/pdf") return "PDF";
//     return type.split("/")[1].toUpperCase();
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
//               AI-powered resume analysis using GPT-4 Vision
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

//         {showApiKeyInput && (
//           <div
//             className="rca-api-key-section"
//             style={{
//               marginBottom: "2rem",
//               padding: "1.5rem",
//               backgroundColor: "#f8fafc",
//               border: "1px solid #e2e8f0",
//               borderRadius: "0.75rem",
//             }}
//           >
//             <h3
//               style={{
//                 marginBottom: "0.75rem",
//                 fontSize: "1.125rem",
//                 fontWeight: "600",
//               }}
//             >
//               OpenAI API Configuration
//             </h3>
//             <p
//               style={{
//                 marginBottom: "1rem",
//                 color: "#64748b",
//                 fontSize: "0.875rem",
//               }}
//             >
//               Enter your OpenAI API key to enable GPT-4 Vision analysis. You can
//               get your API key from{" "}
//               <a
//                 href="https://platform.openai.com/api-keys"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ color: "#3b82f6" }}
//               >
//                 OpenAI Platform
//               </a>
//             </p>
//             <div
//               style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
//             >
//               <input
//                 type="password"
//                 placeholder="sk-..."
//                 value={apiKey}
//                 onChange={(e) => setApiKey(e.target.value)}
//                 style={{
//                   flex: 1,
//                   padding: "0.75rem",
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.5rem",
//                   fontSize: "0.875rem",
//                 }}
//               />
//               <button
//                 onClick={() => {
//                   setShowApiKeyInput(false);
//                   setError(null);
//                 }}
//                 disabled={!apiKey.trim()}
//                 style={{
//                   padding: "0.75rem 1.5rem",
//                   backgroundColor: apiKey.trim() ? "#3b82f6" : "#9ca3af",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "0.5rem",
//                   fontSize: "0.875rem",
//                   cursor: apiKey.trim() ? "pointer" : "not-allowed",
//                 }}
//               >
//                 Save
//               </button>
//             </div>
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
//               accept=".png,.jpg,.jpeg,.gif,.pdf"
//               onChange={handleFileInputChange}
//               className="rca-file-input"
//             />

//             {!uploadedFile ? (
//               <div className="rca-upload-content">
//                 <Upload size={48} className="rca-upload-icon" />
//                 <h3>Drop your resume here or click to browse</h3>
//                 <p>Supports PNG, JPG, GIF images up to 10MB</p>
//                 <p
//                   style={{
//                     fontSize: "0.875rem",
//                     color: "#64748b",
//                     marginTop: "0.5rem",
//                   }}
//                 >
//                   Note: For best results with GPT-4 Vision, upload an image of
//                   your resume
//                 </p>
//               </div>
//             ) : (
//               <div className="rca-file-preview">
//                 {uploadedFile.preview ? (
//                   <img
//                     src={uploadedFile.preview}
//                     alt="Resume preview"
//                     className="rca-preview-image"
//                   />
//                 ) : (
//                   <div className="rca-file-icon-container">
//                     {getFileIcon(uploadedFile.type)}
//                   </div>
//                 )}
//                 <div className="rca-file-info">
//                   <h4>{uploadedFile.name}</h4>
//                   <p>
//                     {formatFileSize(uploadedFile.size)} •{" "}
//                     {getFileTypeDisplay(uploadedFile.type)}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {uploadedFile && (
//             <div
//               style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
//             >
//               <button
//                 className="rca-analyze-btn"
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing}
//                 style={{ flex: 1 }}
//               >
//                 {isAnalyzing ? (
//                   <>
//                     <div className="rca-spinner"></div>
//                     Analyzing with GPT-4 Vision...
//                   </>
//                 ) : (
//                   <>
//                     <TrendingUp size={20} />
//                     Analyze with GPT-4 Vision
//                   </>
//                 )}
//               </button>
//               {!apiKey && (
//                 <button
//                   onClick={() => setShowApiKeyInput(true)}
//                   style={{
//                     padding: "0.75rem 1rem",
//                     backgroundColor: "#f3f4f6",
//                     border: "1px solid #d1d5db",
//                     borderRadius: "0.5rem",
//                     fontSize: "0.875rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Set API Key
//                 </button>
//               )}
//             </div>
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
//                     <span className="rca-score-label">AI Score</span>
//                   </div>
//                 </div>
//                 <div className="rca-score-info">
//                   <h3>GPT-4 Vision Analysis Score</h3>
//                   <p>
//                     Your resume shows{" "}
//                     {analysisResult.score >= 85
//                       ? "excellent"
//                       : analysisResult.score >= 70
//                       ? "good"
//                       : "needs improvement"}{" "}
//                     potential according to AI analysis
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="rca-analysis-grid">
//               <div className="rca-analysis-card">
//                 <div className="rca-card-header">
//                   <CheckCircle size={24} />
//                   <h3>AI-Detected Strengths</h3>
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
//                   <h3>AI Improvement Recommendations</h3>
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
//                   <h3>Keywords Identified by AI</h3>
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
//                   <h3>AI Section Analysis</h3>
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
//                   <h3>AI-Generated Suggestions</h3>
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

//             <div
//               style={{
//                 marginTop: "2rem",
//                 padding: "1rem",
//                 backgroundColor: "#f0f9ff",
//                 border: "1px solid #0ea5e9",
//                 borderRadius: "0.5rem",
//                 fontSize: "0.875rem",
//                 color: "#0369a1",
//               }}
//             >
//               <strong>Powered by GPT-4 Vision:</strong> This analysis was
//               generated using OpenAI's advanced AI model capable of
//               understanding and analyzing visual content in your resume.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeAnalyzing;

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
