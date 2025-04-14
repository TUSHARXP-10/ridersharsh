import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const bikeRef = useRef(null);  // Add this line
  
  const handleLevelSelect = (level) => {
    navigate(`/tire-selection?level=${level}`);
  };

  return (
    <div className="home">
      <div className="speed-lines"></div>
      <div className="cyber-grid"></div>
      <div className="hero-content" ref={bikeRef}>
        <div className="logo-container">
          <h1 className="neon-text">RidersAdda</h1>
          <div className="bike-silhouette"></div>
        </div>
        <p className="tagline">Unleash Your Free Spirit</p>
        <div className="action-container">
          <Link to="/register" className="action-btn join">
            Join the Ride
            <span className="btn-code">R25</span>
            <div className="btn-glow"></div>
          </Link>
          <Link to="/tire-selection" className="action-btn explore">
            Explore
            <span className="btn-code">X15</span>
            <div className="btn-glow"></div>
          </Link>
        </div>
        <div className="feature-grid">
          <Link to="https://chat.whatsapp.com/EcupFGHSwao7T5mAoYjJv8" className="feature-card community" target="_blank" rel="noopener noreferrer">
            <div className="card-icon">🏁</div>
            <h3>Community Rides</h3>
            <p>Join weekly adventures</p>
            <div className="card-overlay"></div>
          </Link>
          
          <Link 
            to="/tire-selection?tab=events" 
            state={{ fromFeatureCard: true }} 
            className="feature-card events" 
            data-discover="true"
          >
            <div className="card-icon">⚡</div>
            <h3>Track Events</h3>
            <p>Real-time updates on upcoming rides</p>
            <div className="event-preview">
              <div className="mini-countdown">Next: 3d 12h</div>
            </div>
            <div className="card-overlay"></div>
          </Link>
        </div>
        <div className="badges-grid">
          <button onClick={() => handleLevelSelect('beginner')} className="level-badge beginner">
            <img src="/BEGINEER BADGE.png" alt="Beginner" className="badge-icon" />
            <h2 className="badge-title">Beginner</h2>
            <div className="badge-range">0-80km Range</div>
            <div className="badge-specs">
              <span>Comfort Focused</span>
              <span>Urban Riding</span>
            </div>
            <div className="badge-border"></div>
            <div className="badge-glow"></div>
          </button>

          <button onClick={() => handleLevelSelect('intermediate')} className="level-badge intermediate">
            <img src="/intermediate BADGE.png" alt="Intermediate" className="badge-icon" />
            <h2 className="badge-title">Intermediate</h2>
            <div className="badge-range">80-200km Range</div>
            <div className="badge-specs">
              <span>Performance Balance</span>
              <span>Mixed Terrain</span>
            </div>
            <div className="badge-border"></div>
            <div className="badge-glow"></div>
          </button>

          <button onClick={() => handleLevelSelect('expert')} className="level-badge expert">
            <img src="/EXPERT BADGE.png" alt="Expert" className="badge-icon" />
            <h2 className="badge-title">Expert</h2>
            <div className="badge-range">200-400km Range</div>
            <div className="badge-specs">
              <span>Maximum Performance</span>
              <span>Endurance Focus</span>
            </div>
            <div className="badge-border"></div>
            <div className="badge-glow"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;