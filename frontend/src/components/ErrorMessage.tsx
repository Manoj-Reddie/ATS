import React from 'react';
import { AlertTriangle } from 'lucide-react';
import '../styles/ErrorMessage.css';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="error-message glass-card">
      <div className="error-icon">
        <AlertTriangle size={24} />
      </div>
      <div className="error-content">
        <h4>Analysis Error</h4>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;