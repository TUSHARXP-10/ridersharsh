import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Events.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Events = () => {
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({});
  const [liveUpdates, setLiveUpdates] = useState([
    "Independence Day Ride registration now open!",
    "New route added for Weekend Mountain Trail",
    "Weather update: Clear skies expected for City Night Ride",
    "Limited spots remaining for Endurance Challenge",
    "Monsoon Coastal Ride extended by 20km - new scenic points added!"
  ]);
  
  // Sample events data with updated dates to ensure they're in the future
  const currentYear = new Date().getFullYear();
  const nextMonth = new Date().getMonth() + 1;
  
  const eventsData = [
    {
      id: 1,
      title: "Independence Day Ride",
      description: "Join us for a special ride celebrating India's independence. Route covers historical landmarks.",
      date: `${currentYear}-08-15`,
      day: "15",
      month: "AUG",
      location: "Mumbai CST Fort",
      time: "07:00 AM",
      difficulty: "Intermediate",
      category: "special",
      participants: 42,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Weekend Mountain Trail",
      description: "A challenging 150km ride through scenic mountain trails with breathtaking views.",
      date: `${currentYear}-${nextMonth.toString().padStart(2, '0')}-25`,
      day: "25",
      month: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][nextMonth-1],
      location: "Himalayan Foothills",
      time: "06:30 AM",
      difficulty: "Intermediate",
      category: "adventure",
      participants: 28,
      image: "https://images.unsplash.com/photo-1544191696-102152079a3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "City Night Ride",
      description: "Experience the city lights on this 50km night adventure through urban landscapes.",
      date: `${currentYear}-${nextMonth.toString().padStart(2, '0')}-10`,
      day: "10",
      month: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][nextMonth-1],
      location: "Downtown Circuit",
      time: "08:00 PM",
      difficulty: "Beginner",
      category: "casual",
      participants: 56,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Monsoon Coastal Ride",
      description: "Enjoy the refreshing monsoon breeze on this coastal route with stunning ocean views.",
      date: `${currentYear}-${nextMonth.toString().padStart(2, '0')}-22`,
      day: "22",
      month: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][nextMonth-1],
      location: "Konkan Coast",
      time: "07:30 AM",
      difficulty: "Beginner",
      category: "adventure",
      participants: 35,
      image: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "Endurance Challenge",
      description: "Test your limits with this 300km endurance ride through varied terrains.",
      date: `${currentYear}-${(nextMonth+1 > 12 ? 1 : nextMonth+1).toString().padStart(2, '0')}-05`,
      day: "05",
      month: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][(nextMonth+1 > 12 ? 0 : nextMonth)],
      location: "Western Ghats",
      time: "05:00 AM",
      difficulty: "Expert",
      category: "challenge",
      participants: 19,
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Calculate time remaining for the next event
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const upcomingEvents = eventsData
        .filter(event => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        const eventDate = new Date(nextEvent.date);
        eventDate.setHours(
          parseInt(nextEvent.time.split(':')[0]) + 
          (nextEvent.time.includes('PM') && !nextEvent.time.startsWith('12') ? 12 : 0)
        );
        
        const difference = eventDate - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeRemaining({
            eventId: nextEvent.id,
            days,
            hours,
            minutes,
            seconds
          });
        }
      }
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Simulate live updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const newUpdate = `${Math.floor(Math.random() * 5) + 1} new riders just registered for ${
        eventsData[Math.floor(Math.random() * eventsData.length)].title
      }!`;
      
      setLiveUpdates(prevUpdates => {
        const updatedList = [newUpdate, ...prevUpdates];
        return updatedList.slice(0, 5); // Keep only the 5 most recent updates
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(updateInterval);
  }, []);

  // Filter events based on category and search term
  const filteredEvents = eventsData.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Function to register for an event
  const handleRegister = (eventId) => {
    alert(`You've registered for event #${eventId}! Details will be sent to your email.`);
  };

  return (
    <div className="events-page">
      <div className="cyber-grid"></div>
      
      <header className="events-header">
        <Link to="/" className="logo-link">RidersAdda</Link>
        <nav className="events-nav">
          <Link to="/">Home</Link>
          <Link to="/tire-selection">TIRE SELECTION</Link>
          <span className="active">Track Events</span>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      
      <div className="events-container">
        <div className="events-layout">
          <div className="main-content">
            <h1 className="events-title">Track Events</h1>
            <p className="events-subtitle">Real-time updates on upcoming rides and events</p>
            
            {timeRemaining.eventId && (
              <div className="countdown-container">
                <h3>Next Event Countdown</h3>
                <div className="countdown">
                  <div className="countdown-item">
                    <span className="countdown-value">{timeRemaining.days}</span>
                    <span className="countdown-label">Days</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeRemaining.hours}</span>
                    <span className="countdown-label">Hours</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeRemaining.minutes}</span>
                    <span className="countdown-label">Minutes</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeRemaining.seconds}</span>
                    <span className="countdown-label">Seconds</span>
                  </div>
                </div>
                <p>Until {eventsData.find(e => e.id === timeRemaining.eventId)?.title}</p>
              </div>
            )}
            
            <div className="events-controls">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-container">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${filter === 'adventure' ? 'active' : ''}`}
                  onClick={() => setFilter('adventure')}
                >
                  Adventure
                </button>
                <button 
                  className={`filter-btn ${filter === 'casual' ? 'active' : ''}`}
                  onClick={() => setFilter('casual')}
                >
                  Casual
                </button>
                <button 
                  className={`filter-btn ${filter === 'challenge' ? 'active' : ''}`}
                  onClick={() => setFilter('challenge')}
                >
                  Challenge
                </button>
                <button 
                  className={`filter-btn ${filter === 'special' ? 'active' : ''}`}
                  onClick={() => setFilter('special')}
                >
                  Special
                </button>
              </div>
            </div>
            
            <div className="events-list">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div className="event-item" key={event.id}>
                    <div className="event-image" style={{backgroundImage: `url(${event.image})`}}>
                      <div className="event-date">
                        <span className="day">{event.day}</span>
                        <span className="month">{event.month}</span>
                      </div>
                    </div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <div className="event-meta">
                        <span className="location">📍 {event.location}</span>
                        <span className="time">⏰ {event.time}</span>
                        <span className="difficulty">{event.difficulty}</span>
                        <span className="participants">👥 {event.participants} registered</span>
                      </div>
                      <button 
                        className="register-btn" 
                        onClick={() => handleRegister(event.id)}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <p>No events match your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="sidebar">
            <div className="live-updates-container" id="live-updates">
              <h3 className="sidebar-title">
                <span className="pulse-dot"></span> Live Updates
              </h3>
              <div className="live-updates-list">
                {liveUpdates.map((update, index) => (
                  <div className="update-item" key={index}>
                    <span className="update-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <p className="update-text">{update}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="event-categories">
              <h3 className="sidebar-title">Event Categories</h3>
              <ul className="category-list">
                <li onClick={() => setFilter('adventure')} className={filter === 'adventure' ? 'active' : ''}>
                  <span className="category-icon">🏔️</span>
                  <span className="category-name">Adventure</span>
                  <span className="category-count">{eventsData.filter(e => e.category === 'adventure').length}</span>
                </li>
                <li onClick={() => setFilter('casual')} className={filter === 'casual' ? 'active' : ''}>
                  <span className="category-icon">🚲</span>
                  <span className="category-name">Casual</span>
                  <span className="category-count">{eventsData.filter(e => e.category === 'casual').length}</span>
                </li>
                <li onClick={() => setFilter('challenge')} className={filter === 'challenge' ? 'active' : ''}>
                  <span className="category-icon">🏆</span>
                  <span className="category-name">Challenge</span>
                  <span className="category-count">{eventsData.filter(e => e.category === 'challenge').length}</span>
                </li>
                <li onClick={() => setFilter('special')} className={filter === 'special' ? 'active' : ''}>
                  <span className="category-icon">✨</span>
                  <span className="category-name">Special</span>
                  <span className="category-count">{eventsData.filter(e => e.category === 'special').length}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="events-footer">
          <Link to="/" className="back-button">
            Back to Home
          </Link>
          <button className="suggest-btn" onClick={() => alert("Thanks for suggesting an event! Our team will review your suggestion.")}>
            Suggest an Event
          </button>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to tire-selection with events tab active
    navigate('/tire-selection?tab=events', { replace: true });
  }, [navigate]);
  
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Redirecting to events...</p>
    </div>
  );
};

export default Events;