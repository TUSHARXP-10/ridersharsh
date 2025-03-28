import React, { useState, useEffect } from 'react';
import './TrackEvents.css';

const TrackEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Mountain Trail Challenge",
      date: "2024-02-15",
      location: "Himalayan Trails",
      participants: 45,
      status: "upcoming",
      distance: "120km"
    },
    {
      id: 2,
      title: "Urban Night Ride",
      date: "2024-02-10",
      location: "City Circuit",
      participants: 89,
      status: "live",
      distance: "60km"
    },
    // Add more events as needed
  ]);

  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="track-events-container">
      <div className="cyber-grid"></div>
      <div className="speed-lines"></div>
      
      <div className="content-wrapper">
        <h1 className="neon-title">Event Tracking Hub</h1>
        
        <div className="stats-panel">
          <div className="stat-card">
            <div className="stat-value">156</div>
            <div className="stat-label">Active Riders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">8</div>
            <div className="stat-label">Live Events</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">2.5K</div>
            <div className="stat-label">Total Distance</div>
          </div>
        </div>

        <div className="event-tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button 
            className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            Live Now
          </button>
          <button 
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
        </div>

        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-status" data-status={event.status}>
                {event.status}
              </div>
              <h3>{event.title}</h3>
              <div className="event-details">
                <div className="detail">
                  <i className="fas fa-calendar"></i>
                  {event.date}
                </div>
                <div className="detail">
                  <i className="fas fa-map-marker-alt"></i>
                  {event.location}
                </div>
                <div className="detail">
                  <i className="fas fa-users"></i>
                  {event.participants} riders
                </div>
                <div className="detail">
                  <i className="fas fa-route"></i>
                  {event.distance}
                </div>
              </div>
              <button className="join-event-btn">
                Join Event
                <div className="btn-glow"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackEvents;