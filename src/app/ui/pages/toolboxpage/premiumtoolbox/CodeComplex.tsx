import type React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./code-complexity-analyzer.module.css";
import { ClipboardList, Flame, Lightbulb, BookOpen  , Wrench, Brain, Repeat} from "lucide-react"

interface CodeComplexProps {
  onClose: () => void;
}

interface ComplexityMetrics {
  cyclomaticComplexity: number;
  linesOfCode: number;
  functionCount: number;
  maintainabilityIndex: number;
  cognitiveComplexity: number;
  duplicateLines: number;
  codeSmells: string[];
  suggestions: string[];
  hotspots: Array<{
    line: number;
    type: string;
    severity: "low" | "medium" | "high" | "critical";
    description: string;
  }>;
}

const CodeComplex: React.FC<CodeComplexProps> = ({ onClose }) => {
  const [code, setCode] = useState("");

  const [metrics, setMetrics] = useState<ComplexityMetrics | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const analyzeCode = (codeInput: string): ComplexityMetrics => {
    // Simulate analysis delay
    const lines = codeInput.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

    // Count functions
    const functionMatches =
      codeInput.match(/function\s+\w+|=>\s*{|=\s*function/g) || [];
    const functionCount = functionMatches.length;

    // Calculate cyclomatic complexity (simplified)
    const complexityKeywords = [
      "if",
      "else if",
      "for",
      "while",
      "switch",
      "case",
      "&&",
      "||",
      "?",
    ];
    let cyclomaticComplexity = 1; // Base complexity

    complexityKeywords.forEach((keyword) => {
      // Escape special regex characters and handle the ternary operator separately
      if (keyword === "?") {
        const matches = codeInput.match(/\?/g);
        if (matches) {
          cyclomaticComplexity += matches.length;
        }
      } else if (keyword === "||" || keyword === "&&") {
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const matches = codeInput.match(new RegExp(escapedKeyword, "g"));
        if (matches) {
          cyclomaticComplexity += matches.length;
        }
      } else {
        const matches = codeInput.match(
          new RegExp(`\\b${keyword.replace(/\s+/g, "\\s+")}\\b`, "g")
        );
        if (matches) {
          cyclomaticComplexity += matches.length;
        }
      }
    });

    // Calculate cognitive complexity (nested structures)
    let cognitiveComplexity = 0;
    let nestingLevel = 0;
    const cognitiveKeywords = ["if", "for", "while", "switch"];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.includes("{")) nestingLevel++;
      if (trimmedLine.includes("}"))
        nestingLevel = Math.max(0, nestingLevel - 1);

      cognitiveKeywords.forEach((keyword) => {
        if (trimmedLine.includes(keyword)) {
          cognitiveComplexity += 1 + nestingLevel;
        }
      });
    });

    // Calculate maintainability index (simplified formula)
    const halsteadVolume =
      Math.log2(nonEmptyLines.length) * nonEmptyLines.length;
    const maintainabilityIndex = Math.max(
      0,
      171 -
        5.2 * Math.log(halsteadVolume) -
        0.23 * cyclomaticComplexity -
        16.2 * Math.log(nonEmptyLines.length)
    );

    // Detect code smells and hotspots
    const codeSmells: string[] = [];
    const hotspots: ComplexityMetrics["hotspots"] = [];

    if (cyclomaticComplexity > 10) {
      codeSmells.push("High Cyclomatic Complexity");
      hotspots.push({
        line: 1,
        type: "Complexity",
        severity: "high",
        description: "Function has too many decision points",
      });
    }

    if (nonEmptyLines.length > 50) {
      codeSmells.push("Long Function");
      hotspots.push({
        line: 1,
        type: "Length",
        severity: "medium",
        description: "Function is too long and should be broken down",
      });
    }

    // Check for nested conditions
    lines.forEach((line, index) => {
      const indentLevel = line.length - line.trimStart().length;
      if (indentLevel > 12 && (line.includes("if") || line.includes("for"))) {
        hotspots.push({
          line: index + 1,
          type: "Nesting",
          severity: "medium",
          description:
            "Deep nesting detected - consider extracting to separate functions",
        });
      }
    });

    // Generate suggestions
    const suggestions: string[] = [];

    if (cyclomaticComplexity > 10) {
      suggestions.push(
        "Break down complex functions into smaller, single-purpose functions"
      );
      suggestions.push("Use early returns to reduce nesting levels");
    }

    if (cognitiveComplexity > 15) {
      suggestions.push("Simplify conditional logic using guard clauses");
      suggestions.push("Consider using strategy pattern for complex branching");
    }

    if (nonEmptyLines.length > 50) {
      suggestions.push("Extract related functionality into separate functions");
      suggestions.push("Follow the Single Responsibility Principle");
    }

    suggestions.push("Add meaningful comments to explain complex logic");
    suggestions.push("Consider using more descriptive variable names");

    return {
      cyclomaticComplexity,
      linesOfCode: nonEmptyLines.length,
      functionCount,
      maintainabilityIndex: Math.round(maintainabilityIndex),
      cognitiveComplexity,
      duplicateLines: 0, // Simplified for demo
      codeSmells,
      suggestions,
      hotspots,
    };
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const result = analyzeCode(code);
    setMetrics(result);
    setIsAnalyzing(false);
  };

  const getComplexityColor = (
    value: number,
    type: "cyclomatic" | "cognitive" | "maintainability"
  ) => {
    if (type === "maintainability") {
      if (value >= 80) return "#10b981"; // green
      if (value >= 60) return "#f59e0b"; // yellow
      if (value >= 40) return "#f97316"; // orange
      return "#ef4444"; // red
    } else {
      if (value <= 5) return "#10b981"; // green
      if (value <= 10) return "#f59e0b"; // yellow
      if (value <= 15) return "#f97316"; // orange
      return "#ef4444"; // red
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "#10b981";
      case "medium":
        return "#f59e0b";
      case "high":
        return "#f97316";
      case "critical":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  useEffect(() => {
    if (code.trim().length > 10) {
      // Only analyze if there's substantial code
      const timer = setTimeout(() => {
        handleAnalyze();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setMetrics(null); // Clear metrics when code is empty
    }
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Code Complexity Analyzer</h1>
        <p>
          Analyze your code's complexity, maintainability, and identify areas
          for improvement. Get beginner-friendly insights and actionable
          recommendations.
        </p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.codeInputSection}>
          <div className={styles.sectionHeader}>
            <h3> Code Input</h3>
          </div>
          <textarea
            ref={textareaRef}
            className={styles.codeTextarea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here to analyze its complexity..."
          />
        </div>

        <div className={styles.metricsOverview}>
          <div className={styles.sectionHeader}>
            <h3>Complexity Overview</h3>
          </div>

          {isAnalyzing ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Analyzing your code...</p>
            </div>
          ) : metrics ? (
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div
                  className={styles.metricValue}
                  style={{
                    color: getComplexityColor(
                      metrics.cyclomaticComplexity,
                      "cyclomatic"
                    ),
                  }}
                >
                  {metrics.cyclomaticComplexity}
                </div>
                <div className={styles.metricLabel}>Cyclomatic Complexity</div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${Math.min(
                        100,
                        (metrics.cyclomaticComplexity / 20) * 100
                      )}%`,
                      backgroundColor: getComplexityColor(
                        metrics.cyclomaticComplexity,
                        "cyclomatic"
                      ),
                    }}
                  ></div>
                </div>
                <div className={styles.metricDescription}>
                  Measures the number of decision points in your code
                </div>
              </div>

              <div className={styles.metricCard}>
                <div
                  className={styles.metricValue}
                  style={{
                    color: getComplexityColor(
                      metrics.maintainabilityIndex,
                      "maintainability"
                    ),
                  }}
                >
                  {metrics.maintainabilityIndex}
                </div>
                <div className={styles.metricLabel}>Maintainability Index</div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${metrics.maintainabilityIndex}%`,
                      backgroundColor: getComplexityColor(
                        metrics.maintainabilityIndex,
                        "maintainability"
                      ),
                    }}
                  ></div>
                </div>
                <div className={styles.metricDescription}>
                  How easy it is to maintain and modify your code
                </div>
              </div>

              <div className={styles.metricCard}>
                <div
                  className={styles.metricValue}
                  style={{ color: "#6366f1" }}
                >
                  {metrics.linesOfCode}
                </div>
                <div className={styles.metricLabel}>Lines of Code</div>
                <div className={styles.metricDescription}>
                  Total non-empty lines in your code
                </div>
              </div>

              <div className={styles.metricCard}>
                <div
                  className={styles.metricValue}
                  style={{
                    color: getComplexityColor(
                      metrics.cognitiveComplexity,
                      "cognitive"
                    ),
                  }}
                >
                  {metrics.cognitiveComplexity}
                </div>
                <div className={styles.metricLabel}>Cognitive Complexity</div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${Math.min(
                        100,
                        (metrics.cognitiveComplexity / 25) * 100
                      )}%`,
                      backgroundColor: getComplexityColor(
                        metrics.cognitiveComplexity,
                        "cognitive"
                      ),
                    }}
                  ></div>
                </div>
                <div className={styles.metricDescription}>
                  How hard your code is to understand mentally
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.loadingState}>
              <p style={{ color: "#334155" }}>
                 Paste your code in the input area to start analyzing
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  marginTop: "0.5rem",
                }}
              >
                Supported languages: JavaScript, TypeScript, Python, Java, C++,
                and more
              </p>
            </div>
          )}
        </div>
      </div>

      {metrics && (
        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
  <button
    className={`${styles.tabButton} ${
      activeTab === "overview" ? styles.active : ""
    }`}
    onClick={() => setActiveTab("overview")}
  >
    <ClipboardList className={styles.tabIcon} />
    Overview
  </button>

  <button
    className={`${styles.tabButton} ${
      activeTab === "hotspots" ? styles.active : ""
    }`}
    onClick={() => setActiveTab("hotspots")}
  >
    <Flame className={styles.tabIcon} />
    Hotspots
  </button>

  <button
    className={`${styles.tabButton} ${
      activeTab === "suggestions" ? styles.active : ""
    }`}
    onClick={() => setActiveTab("suggestions")}
  >
    <Lightbulb className={styles.tabIcon} />
    Suggestions
  </button>

  <button
    className={`${styles.tabButton} ${
      activeTab === "learn" ? styles.active : ""
    }`}
    onClick={() => setActiveTab("learn")}
  >
    <BookOpen className={styles.tabIcon} />
    Learn More
  </button>
</div>

          <div className={styles.tabContent}>
            {activeTab === "overview" && (
              <div>
                <h3 style={{ color: "#334155" }}>Code Quality Summary</h3>
                {metrics.codeSmells.length > 0 && (
                  <div>
                    <h4 style={{ color: "#334155" }}>Detected Issues:</h4>
                    <br />
                    <div className={styles.codeSmells}>
                      {metrics.codeSmells.map((smell, index) => (
                        <span key={index} className={styles.codeSmell}>
                          {smell}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.explanationBox}>
                  <div className={styles.explanationTitle}>
                    What do these numbers mean?
                  </div>
                  <div className={styles.explanationText}>
                    Your code has a cyclomatic complexity of{" "}
                    {metrics.cyclomaticComplexity}, which means it has{" "}
                    {metrics.cyclomaticComplexity <= 5
                      ? "low complexity and is easy to test"
                      : metrics.cyclomaticComplexity <= 10
                      ? "moderate complexity"
                      : "high complexity and may be difficult to maintain"}
                    . The maintainability index of{" "}
                    {metrics.maintainabilityIndex} indicates{" "}
                    {metrics.maintainabilityIndex >= 80
                      ? "excellent maintainability"
                      : metrics.maintainabilityIndex >= 60
                      ? "good maintainability"
                      : metrics.maintainabilityIndex >= 40
                      ? "moderate maintainability"
                      : "poor maintainability - consider refactoring"}
                    .
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hotspots" && (
              <div>
                <h3 style={{ color: "#334155" }}>Problem Areas in Your Code</h3>
                <br />
                {metrics.hotspots.length > 0 ? (
                  <ul className={styles.hotspotsList}>
                    {metrics.hotspots.map((hotspot, index) => (
                      <li
                        key={index}
                        className={styles.hotspotItem}
                        style={{
                          borderLeftColor: getSeverityColor(hotspot.severity),
                        }}
                      >
                        <div className={styles.hotspotLine}>
                          Line {hotspot.line}
                        </div>
                        <div className={styles.hotspotDetails}>
                          <div className={styles.hotspotType}>
                            {hotspot.type} Issue
                          </div>
                          <div className={styles.hotspotDescription}>
                            {hotspot.description}
                          </div>
                        </div>
                        <div
                          className={styles.severityBadge}
                          style={{
                            backgroundColor: getSeverityColor(hotspot.severity),
                          }}
                        >
                          {hotspot.severity}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "#334155" }}>
                    Great! No major hotspots detected in your code.
                  </p>
                )}
              </div>
            )}

            {activeTab === "suggestions" && (
              <div>
                <h3 style={{ color: "#334155" }}>How to Improve Your Code</h3>
                <br />
                <ul className={styles.suggestionsList}>
                  {metrics.suggestions.map((suggestion, index) => (
                    <li key={index} className={styles.suggestionItem}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "learn" && (
              <div>
                <h3 style={{ color: "#334155" }}>
                  Understanding Code Complexity
                </h3>

                <div className={styles.explanationBox}>
                  <div className={styles.explanationTitle}>
<h3 className={styles.sectionTitle}>
  <Repeat className={styles.sectionIcon} /> Cyclomatic Complexity
</h3>                  </div>
                  <div className={styles.explanationText}>
                    This measures how many different paths your code can take.
                    Think of it like a maze - the more turns and decisions, the
                    more complex it is. Lower numbers (1-5) are great, while
                    higher numbers (10+) suggest your function is doing too
                    much.
                  </div>
                </div>

                <div className={styles.explanationBox}>
                  <div className={styles.explanationTitle}>
<h3 className={styles.sectionTitle}>
  <Brain className={styles.sectionIcon} /> Cognitive Complexity
</h3>
                  </div>
                  <div className={styles.explanationText}>
                    This measures how hard your code is to understand mentally.
                    Nested if-statements and loops increase this score. It's
                    like reading a book with many sub-plots - the more nested
                    the story, the harder it is to follow.
                  </div>
                </div>

                <div className={styles.explanationBox}>
                  <div className={styles.explanationTitle}>
<h3 className={styles.sectionTitle}>
  <Wrench className={styles.sectionIcon} /> Maintainability Index
</h3>                  </div>
                  <div className={styles.explanationText}>
                    This is like a health score for your code. It considers
                    complexity, size, and structure. Scores above 80 are
                    excellent, 60-80 are good, and below 40 suggest the code
                    needs attention.
                  </div>
                </div>

                <div className={styles.explanationBox}>
                  <div className={styles.explanationTitle}>
<h3 className={styles.sectionTitle}>
  <Lightbulb className={styles.sectionIcon} /> Why This Matters
</h3>                  </div>
                  <div className={styles.explanationText}>
                    Complex code is harder to debug, test, and modify. By
                    keeping complexity low, you make your code more reliable,
                    easier to understand for other developers (and future you!),
                    and less prone to bugs.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeComplex;
