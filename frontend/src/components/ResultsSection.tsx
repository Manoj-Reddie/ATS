import React from 'react';
import { CheckCircle, PieChart } from 'lucide-react';
import '../styles/ResultsSection.css';

interface ResultsSectionProps {
  analysis: string;
  analysisType: string;
  showResults: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  analysis,
  analysisType,
  showResults
}) => {
  const formatAnalysis = (text: string) => {
    return text.split("\n").map((line, index) => {
      if (line.trim() === "") return <br key={index} />;

      // Headers with ** formatting
      if (line.includes("**") && line.trim().endsWith("**")) {
        const cleanLine = line.replace(/\*\*/g, "");
        return (
          <h3 key={index} className="analysis-header-main">
            {cleanLine}
          </h3>
        );
      }

      // Percentage match formatting
      if (line.includes("%") && /\d+%/.test(line)) {
        return (
          <div key={index} className="percentage-highlight">
            {line}
          </div>
        );
      }

      // Bold headers (lines that end with :)
      if (line.trim().endsWith(":")) {
        return (
          <h4 key={index} className="analysis-header">
            {line}
          </h4>
        );
      }

      // Numbered lists
      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={index} className="analysis-numbered">
            {line}
          </div>
        );
      }

      // Bullet points
      if (
        line.trim().startsWith("•") ||
        line.trim().startsWith("-") ||
        line.trim().startsWith("*")
      ) {
        return (
          <li key={index} className="analysis-bullet">
            {line.replace(/^[•\-*]\s*/, "")}
          </li>
        );
      }

      return (
        <p key={index} className="analysis-text">
          {line}
        </p>
      );
    });
  };

  return (
    <div className={`results-section glass-card ${showResults ? "show" : ""}`}>
      <div className="results-header">
        <div className="results-icon">
          {analysisType === "match" ? <PieChart size={28} /> : <CheckCircle size={28} />}
        </div>
        <div>
          <h2>
            {analysisType === "match"
              ? "ATS Match Analysis"
              : "Professional Resume Review"}
          </h2>
          <p>AI-powered insights for your resume</p>
        </div>
      </div>
      <div className="analysis-content">{formatAnalysis(analysis)}</div>
      <div className="results-footer">
        <small>Analysis completed • Powered by Google Gemini AI</small>
      </div>
    </div>
  );
};

export default ResultsSection;