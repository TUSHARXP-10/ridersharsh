import React, { useState } from 'react';
import './TireSelection.css';

const TireSelection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleBadgeClick = (level) => {
    setSelectedLevel(level);
  };

  const renderTireRecommendations = () => {
    switch (selectedLevel) {
      case 'beginner':
        return (
          <div className="tire-recommendations">
            <h3>Beginner Tire Recommendations</h3>
            <ul>
              <li>All-purpose touring tires</li>
              <li>Balanced grip and durability</li>
              <li>Comfortable ride quality</li>
            </ul>
          </div>
        );
      case 'intermediate':
        return (
          <div className="tire-recommendations">
            <h3>Intermediate Tire Recommendations</h3>
            <ul>
              <li>Sport touring tires</li>
              <li>Enhanced grip and handling</li>
              <li>Good wet and dry performance</li>
            </ul>
          </div>
        );
      case 'expert':
        return (
          <div className="tire-recommendations">
            <h3>Expert Tire Recommendations</h3>
            <ul>
              <li>High-performance sport tires</li>
              <li>Maximum grip and cornering ability</li>
              <li>Track-day capable</li>
            </ul>
          </div>
        );
      default:
        return <p>Select your riding level to see tire recommendations</p>;
    }
  };

  return (
    <div className="tire-selection">
      <h1>Tire Selection Guide</h1>
      <div className="badge-container">
        <button
          className={`badge-button ${selectedLevel === 'beginner' ? 'active' : ''}`}
          onClick={() => handleBadgeClick('beginner')}
        >
          <img src="/BEGINEER BADGE.png" alt="Beginner Badge" />
          <span>Beginner</span>
        </button>
        <button
          className={`badge-button ${selectedLevel === 'intermediate' ? 'active' : ''}`}
          onClick={() => handleBadgeClick('intermediate')}
        >
          <img src="/intermediate BADGE FINAL.png" alt="Intermediate Badge" />
          <span>Intermediate</span>
        </button>
        <button
          className={`badge-button ${selectedLevel === 'expert' ? 'active' : ''}`}
          onClick={() => handleBadgeClick('expert')}
        >
          <img src="/EXPERT BADGE.png" alt="Expert Badge" />
          <span>Expert</span>
        </button>
      </div>
      <div className="tire-container">
        {renderTireRecommendations()}
      </div>
    </div>
  );
};

export default TireSelection;