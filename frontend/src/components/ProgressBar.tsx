import React from 'react';
import '../styles/ProgressBar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;