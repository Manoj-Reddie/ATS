import React, { useState, useEffect } from 'react';
import Header from './Header';
import JobDescriptionInput from './JobDescriptionInput';
import ResumeUpload from './ResumeUpload';
import ActionButtons from './ActionButtons';
import ResultsSection from './ResultsSection';
import ErrorMessage from './ErrorMessage';
import AnimatedBackground from './AnimatedBackground';
import ProgressBar from './ProgressBar';
import '../styles/ResumeAnalyzer.css';

const ResumeAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [analysisType, setAnalysisType] = useState<string>("review");
  const [progress, setProgress] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Progress animation for loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 500);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (type: string) => {
    if (!selectedFile) {
      setError("Please upload a PDF resume");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");
    setAnalysisType(type);
    setShowResults(false);

    try {
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let demoAnalysis = "";
      if (type === "match") {
        demoAnalysis = "**ATS Match Analysis**\n\n" +
          "Overall Match: 78%\n\n" +
          "Skills Match: 82%\n" + 
          "Experience Match: 75%\n" +
          "Education Match: 90%\n\n" +
          "Key Findings:\n\n" +
          "1. Your resume contains 18 of 22 key skills mentioned in the job description\n" +
          "2. Experience section aligns well with job requirements but could highlight specific achievements more\n" +
          "3. Education credentials exceed the minimum requirements\n\n" +
          "Recommendations:\n\n" +
          "• Add these missing keywords: 'data visualization', 'agile methodology', 'cross-functional teams', 'stakeholder management'\n" +
          "• Quantify your achievements with specific metrics\n" +
          "• Consider reorganizing your skills section to prioritize the most relevant ones first";
      } else {
        demoAnalysis = "**Professional Resume Review**\n\n" +
          "Strengths:\n\n" +
          "• Clear, professional formatting with good use of white space\n" +
          "• Strong professional summary that highlights your value proposition\n" +
          "• Excellent demonstration of technical skills with examples\n" +
          "• Good balance of technical and soft skills\n\n" +
          "Areas for Improvement:\n\n" +
          "1. Consider adding a more targeted headline beneath your name\n" +
          "2. Work experience descriptions could be more achievement-oriented\n" +
          "3. Some bullet points are too lengthy and could be condensed\n" +
          "4. Skills section could be better categorized for quick scanning\n\n" +
          "Format and Design:\n\n" +
          "• Good overall design that is ATS-friendly\n" +
          "• Consistent formatting throughout\n" +
          "• Consider using subtle visual elements to make key information stand out\n" +
          "• Ensure all hyperlinks are properly formatted and clickable";
      }

      setAnalysis(demoAnalysis);
      setTimeout(() => setShowResults(true), 300);
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-container">
      <AnimatedBackground />
      {loading && <ProgressBar progress={progress} />}
      
      <div className="content-container">
        <Header />
        
        <div className="main-content">
          <JobDescriptionInput 
            jobDescription={jobDescription} 
            setJobDescription={setJobDescription} 
          />
          
          <ResumeUpload 
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setError={setError}
          />
          
          {error && <ErrorMessage error={error} />}
          
          <ActionButtons 
            loading={loading} 
            analysisType={analysisType} 
            handleAnalyze={handleAnalyze} 
          />
          
          {analysis && (
            <ResultsSection 
              analysis={analysis} 
              analysisType={analysisType} 
              showResults={showResults} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;