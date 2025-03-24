import { useState } from 'react'
import { motion } from 'framer-motion'
import './RideTracker.css'

const RideTracker = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showRideDetails, setShowRideDetails] = useState(false)

  const categories = {
    beginner: {
      title: "Beginner Rides",
      description: "Perfect for new riders getting started",
      distance: "70-100 km",
      rides: [
        {
          name: "City Explorer",
          distance: "75km",
          duration: "3-4 hours",
          terrain: "Mostly flat, city roads",
          startPoint: "City Center",
          requirements: "Basic riding skills, Valid license",
          availableSlots: {
            riders: "10/15",
            pillions: "5/5"
          }
        },
        {
          name: "Sunrise Coastal Ride",
          distance: "90km",
          duration: "4-5 hours",
          terrain: "Coastal roads, light traffic",
          startPoint: "Beach Point",
          requirements: "Basic riding skills, Valid license",
          availableSlots: {
            riders: "8/12",
            pillions: "3/4"
          }
        }
      ]
    },
    intermediate: {
      title: "Intermediate Adventures",
      description: "For experienced riders seeking challenges",
      distance: "80-200 km",
      rides: [
        {
          name: "Mountain Pass Challenge",
          distance: "150km",
          duration: "6-7 hours",
          terrain: "Mountain roads, moderate curves",
          startPoint: "Mountain Base",
          requirements: "2+ years riding experience, Own bike preferred",
          availableSlots: {
            riders: "8/10",
            pillions: "2/3"
          }
        }
      ]
    },
    expert: {
      title: "Expert Expeditions",
      description: "Long-distance rides for seasoned riders",
      distance: "250+ km",
      rides: [
        {
          name: "Cross-State Rally",
          distance: "300km",
          duration: "12-14 hours",
          terrain: "Mixed terrain, challenging routes",
          startPoint: "City Hub",
          requirements: "5+ years riding experience, Own bike required",
          availableSlots: {
            riders: "5/8",
            pillions: "0/2"
          }
        }
      ]
    },
    nonBiker: {
      title: "Join as Pillion",
      description: "Experience the thrill without owning a bike",
      features: [
        "Get paired with experienced riders",
        "Safety gear provided",
        "Choose your preferred ride category",
        "Flexible scheduling",
        "Community events access"
      ]
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowRideDetails(true)
  }

  return (
    <div className="ride-tracker-page">
      <motion.div 
        className="category-selection"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Choose Your Riding Experience</h1>
        <p className="intro-text">Join our community of riders and experience the thrill of group riding</p>
        
        <div className="category-grid">
          {Object.entries(categories).map(([key, category]) => (
            <motion.div
              key={key}
              className={`category-card ${key}`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategorySelect(key)}
            >
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              {category.distance && (
                <div className="distance-badge">
                  🛣️ {category.distance}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {showRideDetails && selectedCategory && (
          <motion.div 
            className="ride-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>{categories[selectedCategory].title}</h2>
            
            {selectedCategory !== 'nonBiker' ? (
              <div className="available-rides">
                {categories[selectedCategory].rides.map((ride, index) => (
                  <div key={index} className="ride-card">
                    <h3>{ride.name}</h3>
                    <div className="ride-info-grid">
                      <span>🛣️ Distance: {ride.distance}</span>
                      <span>⏱️ Duration: {ride.duration}</span>
                      <span>🗺️ Terrain: {ride.terrain}</span>
                      <span>📍 Start: {ride.startPoint}</span>
                    </div>
                    <div className="slots-info">
                      <p>Riders: {ride.availableSlots.riders}</p>
                      <p>Pillions: {ride.availableSlots.pillions}</p>
                    </div>
                    <button className="join-ride-btn">Join This Ride</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pillion-features">
                {categories.nonBiker.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span>✓</span> {feature}
                  </div>
                ))}
                <button className="register-pillion-btn">Register as Pillion</button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default RideTracker