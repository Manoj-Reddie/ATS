import React from "react";
import { BadgeCheck } from "lucide-react";
import "../styles/Header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <div className="logo-icon">
          <BadgeCheck size={32} />
        </div>
        <div>
          <h1>ATS Resume Expert</h1>
          <p>AI-Powered Resume Analysis & Optimization</p>
        </div>
      </div>
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100+</span>
          <span className="stat-label">Resumes Analyzed</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
