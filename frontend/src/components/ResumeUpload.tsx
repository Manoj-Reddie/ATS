import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import '../styles/ResumeUpload.css';

interface ResumeUploadProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  setError: (error: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
  selectedFile,
  setSelectedFile,
  setError
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please select a valid PDF file");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="input-section glass-card">
      <div className="section-header">
        <div className="section-icon">
          <Upload size={24} />
        </div>
        <div>
          <h3>Resume Upload</h3>
          <p>Upload your resume in PDF format</p>
        </div>
      </div>
      <div
        className={`file-upload-zone ${dragActive ? "drag-active" : ""} ${
          selectedFile ? "file-selected" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="resume"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input-hidden"
        />
        <label htmlFor="resume" className="file-upload-label">
          {selectedFile ? (
            <div className="file-success-state">
              <div className="file-icon-success">✓</div>
              <div className="file-info">
                <h4>{selectedFile.name}</h4>
                <p>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
                  Document
                </p>
              </div>
            </div>
          ) : (
            <div className="file-upload-state">
              <div className="upload-icon">
                <Upload size={36} />
              </div>
              <h4>Drop your resume here</h4>
              <p>
                or <span className="upload-link">browse files</span>
              </p>
              <small>Supports PDF files up to 10MB</small>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ResumeUpload;