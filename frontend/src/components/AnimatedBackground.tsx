import React from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-bg">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="gradient-orb orb-4"></div>
      <div className="gradient-orb orb-5"></div>
    </div>
  );
};

export default AnimatedBackground;