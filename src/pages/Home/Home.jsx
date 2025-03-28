import React from 'react';
import './Home.css';

const Home = () => {
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
          <Link to="/events" className="feature-card events">
            <div className="card-icon">⚡</div>
            <h3>Track Events</h3>
            <p>Real-time updates</p>
            <div className="card-overlay"></div>
          </Link>
        </div>
      </div>
      <div className="badge-container">
        <div className="skill-badge" data-level="beginner">
          <img src="/images/beginner-badge.png" alt="Beginner" className="badge-img" />
          <div className="badge-glow"></div>
          <div className="badge-particles"></div>
          <div className="badge-label">Beginner</div>
        </div>
        {/* ... other badges ... */}
      </div>
    </div>
  );
};

export default Home;