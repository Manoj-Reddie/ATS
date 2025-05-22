import React from 'react';
import { Award, BarChart } from 'lucide-react';
import '../styles/ActionButtons.css';

interface ActionButtonsProps {
  loading: boolean;
  analysisType: string;
  handleAnalyze: (type: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  loading,
  analysisType,
  handleAnalyze
}) => {
  return (
    <div className="button-section">
      <button
        onClick={() => handleAnalyze("review")}
        disabled={loading}
        className="analyze-button primary"
      >
        <div className="button-content">
          {loading && analysisType === "review" ? (
            <>
              <div className="loading-spinner"></div>
              <span>Analyzing Resume...</span>
            </>
          ) : (
            <>
              <div className="button-icon">
                <Award size={20} />
              </div>
              <span>Professional Review</span>
            </>
          )}
        </div>
      </button>

      <button
        onClick={() => handleAnalyze("match")}
        disabled={loading}
        className="analyze-button secondary"
      >
        <div className="button-content">
          {loading && analysisType === "match" ? (
            <>
              <div className="loading-spinner"></div>
              <span>Calculating Match...</span>
            </>
          ) : (
            <>
              <div className="button-icon">
                <BarChart size={20} />
              </div>
              <span>ATS Match Score</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default ActionButtons;