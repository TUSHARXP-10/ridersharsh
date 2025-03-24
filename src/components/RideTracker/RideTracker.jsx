import React, { useState } from 'react';
import './RideTracker.css';

const RideTracker = () => {
  const [rideType, setRideType] = useState('solo');
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');

  const rideCategories = {
    solo: {
      title: 'Solo Rider',
      description: 'Choose your experience level and ride independently',
      levels: {
        beginner: [
          { title: 'Mumbai to Lonavala', distance: '65km', duration: '1 day', difficulty: 'Easy' },
          { title: 'Pune to Mahabaleshwar', distance: '75km', duration: '1 day', difficulty: 'Easy' }
        ],
        intermediate: [
          { title: 'Mumbai to Goa', distance: '150km', duration: '2 days', difficulty: 'Moderate' },
          { title: 'Delhi to Agra', distance: '180km', duration: '2 days', difficulty: 'Moderate' }
        ],
        expert: [
          { title: 'Mumbai to Ladakh', distance: '380km', duration: '7 days', difficulty: 'Hard' },
          { title: 'Manali to Leh', distance: '360km', duration: '6 days', difficulty: 'Hard' }
        ]
      }
    },
    duo: {
      title: 'Duo Riding',
      description: 'Find a riding partner based on experience level',
      levels: {
        beginner: [
          { title: 'City Tour Partner', distance: '50km', type: 'Back-rider needed', spots: '3 spots' },
          { title: 'Weekend Ride', distance: '70km', type: 'Rider needed', spots: '2 spots' }
        ],
        intermediate: [
          { title: 'Coastal Ride', distance: '160km', type: 'Back-rider needed', spots: '4 spots' },
          { title: 'Hill Station Trip', distance: '180km', type: 'Rider needed', spots: '2 spots' }
        ],
        expert: [
          { title: 'Mountain Expedition', distance: '350km', type: 'Back-rider needed', spots: '2 spots' },
          { title: 'Cross-State Journey', distance: '400km', type: 'Rider needed', spots: '3 spots' }
        ]
      }
    }
  };

  return (
    <div className="ride-tracker">
      <h2>Choose Your Adventure</h2>
      
      <div className="ride-type-selector">
        <button className={`type-btn ${rideType === 'solo' ? 'active' : ''}`} onClick={() => setRideType('solo')}>
          Solo Rider
        </button>
        <button className={`type-btn ${rideType === 'duo' ? 'active' : ''}`} onClick={() => setRideType('duo')}>
          Find Partner
        </button>
      </div>

      <div className="difficulty-selector">
        <button className={`level-btn ${difficultyLevel === 'beginner' ? 'active' : ''}`} onClick={() => setDifficultyLevel('beginner')}>
          Beginner (0-80km)
        </button>
        <button className={`level-btn ${difficultyLevel === 'intermediate' ? 'active' : ''}`} onClick={() => setDifficultyLevel('intermediate')}>
          Intermediate (80-200km)
        </button>
        <button className={`level-btn ${difficultyLevel === 'expert' ? 'active' : ''}`} onClick={() => setDifficultyLevel('expert')}>
          Expert (200-400km)
        </button>
      </div>

      <div className="events-grid">
        {rideCategories[rideType].levels[difficultyLevel].map((event, index) => (
          <div key={index} className="event-card">
            <h4>{event.title}</h4>
            <p className="event-distance">Distance: {event.distance}</p>
            <p className="event-duration">Duration: {event.duration}</p>
            {event.type && <p className="event-type">{event.type}</p>}
            {event.spots && <p className="spots-left">{event.spots}</p>}
            <p className="difficulty-tag">{event.difficulty}</p>
            <button className="join-button">Join Ride</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideTracker;