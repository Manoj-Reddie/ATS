import React from 'react';
import { FileText } from 'lucide-react';
import '../styles/JobDescriptionInput.css';

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  setJobDescription
}) => {
  return (
    <div className="input-section glass-card">
      <div className="section-header">
        <div className="section-icon">
          <FileText size={24} />
        </div>
        <div>
          <h3>Job Description</h3>
          <p>Paste the job posting you're targeting</p>
        </div>
      </div>
      <div className="textarea-container">
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description here... Include requirements, skills, qualifications, and responsibilities."
          className="job-description-input"
        />
        <div className="input-footer">
          <span className="char-count">
            {jobDescription.length} characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;