import React, { useState } from 'react';
import './TireSelection.css';

const TireSelection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    // Add your existing tire selection logic here
  };

  return (
    <div className="tire-selection-container">
      <div className="cyber-grid"></div>
      <div className="speed-lines"></div>
      
      <div className="content-wrapper">
        <h1 className="neon-title">Select Your Riding Level</h1>
        
        <div className="badges-grid">
          <div 
            className={`level-badge ${selectedLevel === 'beginner' ? 'selected' : ''}`}
            onClick={() => handleLevelSelect('beginner')}
          >
            <div className="badge-inner">
              <div className="badge-front">
                <img src="/images/beginner-badge.png" alt="Beginner" />
                <div className="badge-content">
                  <h3>Beginner</h3>
                  <p>0-80km Range</p>
                  <div className="specs">
                    <span>Comfort Focused</span>
                    <span>Urban Riding</span>
                  </div>
                </div>
              </div>
              <div className="badge-glow"></div>
              <div className="badge-particles"></div>
            </div>
          </div>

          <div 
            className={`level-badge ${selectedLevel === 'intermediate' ? 'selected' : ''}`}
            onClick={() => handleLevelSelect('intermediate')}
          >
            <div className="badge-inner">
              <div className="badge-front">
                <img src="/images/intermediate-badge.png" alt="Intermediate" />
                <div className="badge-content">
                  <h3>Intermediate</h3>
                  <p>80-200km Range</p>
                  <div className="specs">
                    <span>Performance Balance</span>
                    <span>Mixed Terrain</span>
                  </div>
                </div>
              </div>
              <div className="badge-glow"></div>
              <div className="badge-particles"></div>
            </div>
          </div>

          <div 
            className={`level-badge ${selectedLevel === 'expert' ? 'selected' : ''}`}
            onClick={() => handleLevelSelect('expert')}
          >
            <div className="badge-inner">
              <div className="badge-front">
                <img src="/images/expert-badge.png" alt="Expert" />
                <div className="badge-content">
                  <h3>Expert</h3>
                  <p>200-400km Range</p>
                  <div className="specs">
                    <span>Maximum Performance</span>
                    <span>Endurance Focus</span>
                  </div>
                </div>
              </div>
              <div className="badge-glow"></div>
              <div className="badge-particles"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TireSelection;