import React from "react";
import {
  FiFileText,
  FiSearch,
  FiTarget,
  FiBarChart,
  FiCheckCircle,
  FiTrendingUp,
  FiEye,
  FiDownload,
  FiClock,
  FiShield,
} from "react-icons/fi";
import "../resumeAnalyser/ResumeAnalyzerFeatures.css";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ResumeAnalyzerFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <FiSearch className="raf-feature-icon" />,
      title: "Smart Keyword Analysis",
      description:
        "Analyze your resume for industry-specific keywords and optimize for ATS systems to increase your chances of getting noticed.",
    },
    {
      icon: <FiTarget className="raf-feature-icon" />,
      title: "ATS Compatibility Check",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with our comprehensive compatibility analysis.",
    },
    {
      icon: <FiBarChart className="raf-feature-icon" />,
      title: "Content Scoring",
      description:
        "Get detailed scores on different sections of your resume including experience, skills, education, and overall impact.",
    },
    {
      icon: <FiEye className="raf-feature-icon" />,
      title: "Readability Assessment",
      description:
        "Improve your resume's readability with insights on sentence structure, formatting, and visual hierarchy.",
    },
    {
      icon: <FiCheckCircle className="raf-feature-icon" />,
      title: "Format Optimization",
      description:
        "Get recommendations for better formatting, layout improvements, and professional presentation standards.",
    },
    {
      icon: <FiTrendingUp className="raf-feature-icon" />,
      title: "Impact Analysis",
      description:
        "Identify weak action verbs and quantify achievements to make your resume more compelling to employers.",
    },
    {
      icon: <FiFileText className="raf-feature-icon" />,
      title: "Multi-Format Support",
      description:
        "Upload resumes in PDF, DOC, or DOCX formats with accurate text extraction and analysis capabilities.",
    },
    {
      icon: <FiDownload className="raf-feature-icon" />,
      title: "Detailed Reports",
      description:
        "Download comprehensive analysis reports with actionable recommendations and improvement suggestions.",
    },
    {
      icon: <FiClock className="raf-feature-icon" />,
      title: "Quick Analysis",
      description:
        "Get instant feedback on your resume within seconds, saving you time in your job search process.",
    },
    {
      icon: <FiShield className="raf-feature-icon" />,
      title: "Privacy Protected",
      description:
        "Your resume data is processed securely and never stored permanently, ensuring complete privacy protection.",
    },
  ];

  return (
    <div className="raf-container">
      <div className="raf-header">
        <h2 className="raf-title">Powerful Resume Analysis Features</h2>
        <p className="raf-subtitle">
          Transform your resume with AI-powered insights and professional
          recommendations
        </p>
      </div>

      <div className="raf-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="raf-feature-card">
            <div className="raf-feature-icon-wrapper">{feature.icon}</div>
            <h3 className="raf-feature-title">{feature.title}</h3>
            <p className="raf-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeAnalyzerFeatures;
