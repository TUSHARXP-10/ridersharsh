import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TireSelection.css';
import tireData from '../../data/tires.json';

const TireSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialLevel = queryParams.get('level') || 'beginner';
  const initialTab = queryParams.get('tab') || 'tires';
  
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedTire, setSelectedTire] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Filter tires based on selected level
  const filteredTires = tireData.filter(tire => tire.level === selectedLevel);
  
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
  
  // Track events data organized by rider level
  const eventsData = {
    beginner: [
      {
        id: 1,
        title: "City Night Ride",
        status: "upcoming",
        date: "15 Aug",
        time: "8:00 PM",
        location: "Downtown Circuit",
        distance: "50km",
        participants: 56
      },
      {
        id: 2,
        title: "Weekend Coastal Ride",
        status: "live",
        date: "10 Jul",
        time: "7:30 AM",
        location: "Marine Drive",
        distance: "40km",
        participants: 35
      },
      {
        id: 7,
        title: "Maharashtra Divas Ride",
        status: "upcoming",
        date: "1 May",
        time: "6:00 AM",
        location: "Ambyvally, Lonavala",
        distance: "60km",
        participants: 42,
        description: "Celebrate Maharashtra Day with a scenic ride through the beautiful valleys of Lonavala."
      }
    ],
    intermediate: [
      {
        id: 3,
        title: "Weekend Mountain Trail",
        status: "upcoming",
        date: "25 Jul",
        time: "6:30 AM",
        location: "Himalayan Foothills",
        distance: "150km",
        participants: 28
      },
      {
        id: 4,
        title: "Independence Day Ride",
        status: "upcoming",
        date: "15 Aug",
        time: "7:00 AM",
        location: "Mumbai CST Fort",
        distance: "120km",
        participants: 42
      },
      {
        id: 8,
        title: "Monsoon Adventure Ride",
        status: "upcoming",
        date: "7 Jul",
        time: "5:30 AM",
        location: "Western Ghats",
        distance: "110km",
        participants: 23,
        description: "Experience the magic of monsoon in the Western Ghats. Not recommended for beginners due to slippery terrain."
      }
    ],
    expert: [
      {
        id: 5,
        title: "Endurance Challenge",
        status: "upcoming",
        date: "5 Sep",
        time: "5:00 AM",
        location: "Western Ghats",
        distance: "300km",
        participants: 19
      },
      {
        id: 6,
        title: "Ultra Distance Trial",
        status: "live",
        date: "1 Jul",
        time: "4:30 AM",
        location: "Cross-State Route",
        distance: "400km",
        participants: 12
      },
      {
        id: 9,
        title: "Extreme Terrain Challenge",
        status: "coming soon",
        date: "23 Aug",
        time: "4:00 AM",
        location: "Sahyadri Mountains",
        distance: "280km",
        participants: 8,
        description: "An extreme challenge through the toughest terrains of Sahyadri. Limited spots available for experienced riders only."
      }
    ]
  };
  
  // Stats for each level
  const levelStats = {
    beginner: {
      totalEvents: 12,
      activeRiders: 245,
      avgDistance: 60
    },
    intermediate: {
      totalEvents: 18,
      activeRiders: 187,
      avgDistance: 140
    },
    expert: {
      totalEvents: 8,
      activeRiders: 76,
      avgDistance: 320
    }
  };
  
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setSelectedTire(null);
    // Update URL without refreshing
    navigate(`/tire-selection?level=${level}&tab=${activeTab}`, { replace: true });
  };
  
  const handleTireSelect = (tire) => {
    setSelectedTire(tire);
  };
  
  const handleJoinEvent = (eventId) => {
    alert(`You've registered for event #${eventId}! Details will be sent to your email.`);
  };
  
  const handleTrackRoute = (routeId) => {
    alert(`Route #${routeId} has been added to your tracked routes. You can view it in your profile.`);
  };
  
  // Add this function after the other handler functions
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without refreshing
    navigate(`/tire-selection?level=${selectedLevel}&tab=${tab}`, { replace: true });
  };
  
  return (
    <div className="tire-selection">
      <div className="cyber-grid"></div>
      <div className="speed-lines"></div>
      
      <div className="selection-container">
        <h1 className="selection-title">SELECT YOUR RIDING LEVEL</h1>
        
        <div className="level-cards">
          <div 
            className={`level-card beginner ${selectedLevel === 'beginner' ? 'active' : ''}`}
            onClick={() => handleLevelChange('beginner')}
          >
            <img src="/images/beginner.png" alt="Beginner" className="level-icon" />
            <h3>Beginner</h3>
            <p className="range">0-80km Range</p>
            <div className="level-details">
              <p>Comfort Focused</p>
              <p>Urban Riding</p>
            </div>
            <button 
              className="view-routes-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ride-tracker?level=beginner');
              }}
            >
              View Beginner Routes
            </button>
          </div>
          
          <div 
            className={`level-card intermediate ${selectedLevel === 'intermediate' ? 'active' : ''}`}
            onClick={() => handleLevelChange('intermediate')}
          >
            <img src="/images/intermediate.png" alt="Intermediate" className="level-icon" />
            <h3>Intermediate</h3>
            <p className="range">80-200km Range</p>
            <div className="level-details">
              <p>Performance Balance</p>
              <p>Mixed Terrain</p>
            </div>
            <button 
              className="view-routes-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ride-tracker?level=intermediate');
              }}
            >
              View Intermediate Routes
            </button>
          </div>
          
          <div 
            className={`level-card expert ${selectedLevel === 'expert' ? 'active' : ''}`}
            onClick={() => handleLevelChange('expert')}
          >
            <img src="/images/expert.png" alt="Expert" className="level-icon" />
            <h3>Expert</h3>
            <p className="range">200-400km Range</p>
            <div className="level-details">
              <p>Maximum Performance</p>
              <p>Endurance Focus</p>
            </div>
            <button 
              className="view-routes-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ride-tracker?level=expert');
              }}
            >
              View Expert Routes
            </button>
          </div>
        </div>
        
        <div className="content-tabs">
          <button 
            className={`tab-btn ${activeTab === 'tires' ? 'active' : ''}`}
            onClick={() => handleTabChange('tires')}
          >
            Recommended Tires
          </button>
          <button 
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => handleTabChange('events')}
          >
            Track Events
          </button>
          <button 
            className={`tab-btn ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => handleTabChange('routes')}
          >
            Ride Tracker
          </button>
        </div>
        
        {activeTab === 'tires' ? (
          <>
            <div className="level-description">
              {selectedLevel === 'beginner' && (
                <p>Perfect for riders covering 0-80km with a focus on comfort and urban riding.</p>
              )}
              {selectedLevel === 'intermediate' && (
                <p>Ideal for riders covering 80-200km with a balance of performance and versatility.</p>
              )}
              {selectedLevel === 'expert' && (
                <p>Designed for riders covering 200-400km with maximum performance and endurance focus.</p>
              )}
            </div>
            
            <div className="tires-grid">
              {filteredTires.map(tire => (
                <div 
                  key={tire.id}
                  className={`tire-card ${selectedTire?.id === tire.id ? 'selected' : ''}`}
                  onClick={() => handleTireSelect(tire)}
                >
                  <div className="tire-image">
                    <img src={tire.image} alt={tire.name} />
                  </div>
                  <div className="tire-info">
                    <h3>{tire.name}</h3>
                    <div className="tire-specs">
                      <span>Width: {tire.width}mm</span>
                      <span>TPI: {tire.tpi}</span>
                      <span>Weight: {tire.weight}g</span>
                    </div>
                    <div className="tire-price">₹{tire.price}</div>
                    <div className="tire-rating">
                      <div className="stars" style={{ '--rating': tire.rating }}></div>
                      <span>({tire.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedTire && (
              <div className="tire-details">
                <h2>{selectedTire.name}</h2>
                <p className="tire-description">{selectedTire.description}</p>
                <div className="tire-features">
                  <div className="feature">
                    <div className="feature-icon">🛡️</div>
                    <div className="feature-name">Puncture Protection</div>
                    <div className="feature-bar">
                      <div className="feature-fill" style={{ width: `${selectedTire.punctureProtection * 20}%` }}></div>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">⚡</div>
                    <div className="feature-name">Rolling Resistance</div>
                    <div className="feature-bar">
                      <div className="feature-fill" style={{ width: `${selectedTire.rollingResistance * 20}%` }}></div>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">💧</div>
                    <div className="feature-name">Wet Grip</div>
                    <div className="feature-bar">
                      <div className="feature-fill" style={{ width: `${selectedTire.wetGrip * 20}%` }}></div>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">⏱️</div>
                    <div className="feature-name">Durability</div>
                    <div className="feature-bar">
                      <div className="feature-fill" style={{ width: `${selectedTire.durability * 20}%` }}></div>
                    </div>
                  </div>
                </div>
                <button className="buy-btn">
                  Add to Cart
                  <div className="btn-glow"></div>
                </button>
              </div>
            )}
          </>
        ) : activeTab === 'events' ? (
          <div className="events-section">
            <div className="stats-panel">
              <div className="stat-card">
                <div className="stat-value">{levelStats[selectedLevel].totalEvents}</div>
                <div className="stat-label">Total Events</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{levelStats[selectedLevel].activeRiders}</div>
                <div className="stat-label">Active Riders</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{levelStats[selectedLevel].avgDistance}km</div>
                <div className="stat-label">Avg Distance</div>
              </div>
            </div>
            
            <div className="events-grid">
              {eventsData[selectedLevel].map(event => (
                <div className="event-card" key={event.id}>
                  <div className="event-status" data-status={event.status}>
                    {event.status}
                  </div>
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <div className="detail">
                      <span>📅</span> {event.date}
                    </div>
                    <div className="detail">
                      <span>⏰</span> {event.time}
                    </div>
                    <div className="detail">
                      <span>📍</span> {event.location}
                    </div>
                    <div className="detail">
                      <span>🛣️</span> {event.distance}
                    </div>
                  </div>
                  <div className="detail participants">
                    <span>👥</span> {event.participants} registered
                  </div>
                  {event.description && (
                    <div className="event-description">
                      {event.description}
                    </div>
                  )}
                  <button 
                    className="join-event-btn" 
                    onClick={() => handleJoinEvent(event.id)}
                    disabled={event.status === 'live' || event.status === 'coming soon'}
                  >
                    {event.status === 'live' ? 'In Progress' : 
                     event.status === 'coming soon' ? 'Coming Soon' : 'Join Event'}
                    <div className="btn-glow"></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="routes-section">
            <div className="level-description">
              {selectedLevel === 'beginner' && (
                <p>Beginner-friendly routes with minimal elevation, perfect for building endurance and confidence.</p>
              )}
              {selectedLevel === 'intermediate' && (
                <p>Moderate routes with some challenging sections, ideal for riders looking to push their limits.</p>
              )}
              {selectedLevel === 'expert' && (
                <p>Challenging routes with significant elevation gain, designed for experienced riders seeking a test.</p>
              )}
            </div>
            
            <div className="routes-grid">
              {rideTrackerData[selectedLevel].map(route => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TireSelection;