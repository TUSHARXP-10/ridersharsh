import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const bikeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bikeRef.current) {
        const { left, top, width, height } = bikeRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        bikeRef.current.style.transform = `
          perspective(1000px)
          rotateY(${x * 20}deg)
          rotateX(${-y * 20}deg)
        `;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    </div>
  );
};

export default Home;