import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './RideTracker.css';

const RideTracker = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get('level') || 'beginner';
  
  // Ride tracker data organized by rider level
  const rideTrackerData = {
    beginner: [
      {
        id: 1,
        route: "Mumbai to Panvel",
        distance: "35km",
        elevation: "120m",
        difficulty: "Easy",
        terrain: "Mostly flat, urban roads",
        estimatedTime: "2-3 hours",
        bestTime: "Weekends, early morning",
        highlights: "Scenic coastal views, minimal traffic on weekends"
      },
      {
        id: 2,
        route: "Thane to Yeoor Hills",
        distance: "25km",
        elevation: "250m",
        difficulty: "Easy-Moderate",
        terrain: "Urban roads with gentle climbs",
        estimatedTime: "1.5-2 hours",
        bestTime: "Weekday mornings",
        highlights: "Beautiful hill views, wildlife sanctuary"
      }
    ],
    intermediate: [
      {
        id: 3,
        route: "Mumbai to Lonavala",
        distance: "85km",
        elevation: "550m",
        difficulty: "Moderate",
        terrain: "Mix of highways and ghat sections",
        estimatedTime: "4-5 hours",
        bestTime: "Weekend mornings",
        highlights: "Scenic Western Ghats, beautiful valleys"
      },
      {
        id: 4,
        route: "Pune to Lavasa",
        distance: "65km",
        elevation: "750m",
        difficulty: "Moderate",
        terrain: "Hilly roads with switchbacks",
        estimatedTime: "3-4 hours",
        bestTime: "Weekends, early morning",
        highlights: "Lake views, planned hill city architecture"
      }
    ],
    expert: [
      {
        id: 5,
        route: "Mumbai to Nashik",
        distance: "165km",
        elevation: "980m",
        difficulty: "Hard",
        terrain: "Highway with long climbs",
        estimatedTime: "8-10 hours",
        bestTime: "Winter season, early start",
        highlights: "Wine country, temple visits, varied landscape"
      },
      {
        id: 6,
        route: "Pune to Mahabaleshwar",
        distance: "120km",
        elevation: "1200m",
        difficulty: "Hard",
        terrain: "Challenging mountain roads",
        estimatedTime: "6-8 hours",
        bestTime: "Cooler months, early morning start",
        highlights: "Strawberry farms, viewpoints, waterfalls in monsoon"
      }
    ]
  };
  
  const handleTrackRoute = (routeId) => {
    alert(`Route #${routeId} has been added to your tracked routes. You can view it in your profile.`);
  };
  
  return (
    <div className="ride-tracker">
      <div className="cyber-grid"></div>
      <div className="speed-lines"></div>
      
      <div className="tracker-container">
        <h1 className="tracker-title">Ride Tracker</h1>
        
        <div className="level-tabs">
          <a href="/ride-tracker?level=beginner" className={`level-tab ${level === 'beginner' ? 'active' : ''}`}>
            Beginner
          </a>
          <a href="/ride-tracker?level=intermediate" className={`level-tab ${level === 'intermediate' ? 'active' : ''}`}>
            Intermediate
          </a>
          <a href="/ride-tracker?level=expert" className={`level-tab ${level === 'expert' ? 'active' : ''}`}>
            Expert
          </a>
        </div>
        
        <div className="level-description">
          {level === 'beginner' && (
            <p>Beginner-friendly routes with minimal elevation, perfect for building endurance and confidence.</p>
          )}
          {level === 'intermediate' && (
            <p>Moderate routes with some challenging sections, ideal for riders looking to push their limits.</p>
          )}
          {level === 'expert' && (
            <p>Challenging routes with significant elevation gain, designed for experienced riders seeking a test.</p>
          )}
        </div>
        
        <div className="routes-grid">
          {rideTrackerData[level].map(route => (
            <div className="route-card" key={route.id}>
              <h3>{route.route}</h3>
              <div className="route-stats">
                <div className="route-stat">
                  <span className="stat-icon">🛣️</span>
                  <span className="stat-label">Distance</span>
                  <span className="stat-value">{route.distance}</span>
                </div>
                <div className="route-stat">
                  <span className="stat-icon">⛰️</span>
                  <span className="stat-label">Elevation</span>
                  <span className="stat-value">{route.elevation}</span>
                </div>
                <div className="route-stat">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-label">Est. Time</span>
                  <span className="stat-value">{route.estimatedTime}</span>
                </div>
              </div>
              
              <div className="route-details">
                <div className="detail-item">
                  <span className="detail-label">Difficulty:</span>
                  <span className="detail-value difficulty-tag" data-difficulty={route.difficulty.toLowerCase()}>
                    {route.difficulty}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Terrain:</span>
                  <span className="detail-value">{route.terrain}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Best Time:</span>
                  <span className="detail-value">{route.bestTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Highlights:</span>
                  <span className="detail-value">{route.highlights}</span>
                </div>
              </div>
              
              <div className="route-actions">
                <button 
                  className="track-btn" 
                  onClick={() => handleTrackRoute(route.id)}
                >
                  Track This Route
                </button>
                <button className="map-btn">
                  View on Map
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="back-section">
          <Link to="/tire-selection" className="back-btn">
            Back to Tire Selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RideTracker;