import React, { useState } from 'react';
import './TireSelection.css';

const TireSelection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showRides, setShowRides] = useState(false);

  const rides = {
    beginner: [
      { id: 1, title: "City Explorer", distance: "30km", date: "Next Sunday", difficulty: "Easy", participants: 12 },
      { id: 2, title: "Park Loop", distance: "45km", date: "Next Saturday", difficulty: "Easy", participants: 8 },
    ],
    intermediate: [
      { id: 1, title: "Hill Challenge", distance: "120km", date: "Next Weekend", difficulty: "Moderate", participants: 15 },
      { id: 2, title: "Valley Route", distance: "150km", date: "Next Friday", difficulty: "Moderate", participants: 10 },
    ],
    expert: [
      { id: 1, title: "Mountain Marathon", distance: "250km", date: "Next Month", difficulty: "Hard", participants: 6 },
      { id: 2, title: "Endurance Run", distance: "300km", date: "In 2 weeks", difficulty: "Expert", participants: 4 },
    ]
  };

  const handleBadgeClick = (level) => {
    setSelectedLevel(level);
    setShowRides(true);
  };

  return (
    <div className="tire-selection-container">
      <div className="cyber-grid"></div>
      <div className="speed-lines"></div>
      
      <h1 className="selection-title">Select Your Riding Level</h1>
      
      <div className="badges-container">
        <div className={`badge-card ${selectedLevel === 'beginner' ? 'selected' : ''}`} onClick={() => handleBadgeClick('beginner')}>
          <img src="/BEGINEER BADGE.png" alt="Beginner" />
          <div className="badge-info">
            <h3>Beginner</h3>
            <p>0-80km Range</p>
          </div>
          <div className="hover-effect"></div>
        </div>

        <div className={`badge-card ${selectedLevel === 'intermediate' ? 'selected' : ''}`} onClick={() => handleBadgeClick('intermediate')}>
          <img src="/intermediate BADGE.png" alt="Intermediate" />
          <div className="badge-info">
            <h3>Intermediate</h3>
            <p>80-200km Range</p>
          </div>
          <div className="hover-effect"></div>
        </div>

        <div className={`badge-card ${selectedLevel === 'expert' ? 'selected' : ''}`} onClick={() => handleBadgeClick('expert')}>
          <img src="/EXPERT BADGE.png" alt="Expert" />
          <div className="badge-info">
            <h3>Expert</h3>
            <p>200-400km Range</p>
          </div>
          <div className="hover-effect"></div>
        </div>
      </div>

      {showRides && selectedLevel && (
        <div className="rides-container">
          <h2>Upcoming {selectedLevel} Rides</h2>
          <div className="rides-grid">
            {rides[selectedLevel].map(ride => (
              <div key={ride.id} className="ride-card">
                <div className="ride-header">
                  <h3>{ride.title}</h3>
                  <span className="distance">{ride.distance}</span>
                </div>
                <div className="ride-details">
                  <p>Date: {ride.date}</p>
                  <p>Difficulty: {ride.difficulty}</p>
                  <p>Participants: {ride.participants}</p>
                </div>
                <button className="join-ride">Join Ride</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TireSelection;