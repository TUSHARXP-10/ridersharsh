import React from 'react'
import { motion } from 'framer-motion'
import './Blog.css'

const Blog = () => {
  const indiaRides = [
    { 
      name: 'Leh-Ladakh',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
      description: 'Experience the world\'s highest motorable roads'
    },
    { 
      name: 'Manali to Leh',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd',
      description: 'Journey through the breathtaking Himalayan ranges'
    },
    { 
      name: 'Western Ghats',
      image: 'https://images.unsplash.com/photo-1580474256381-f98bb0532dc0',
      description: 'Explore the magnificent mountain ranges of South India'
    },
    { 
      name: 'Rann of Kutch',
      image: 'https://images.unsplash.com/photo-1589307357647-46c91a8ad1a1',
      description: 'Ride through the mesmerizing white desert'
    },
    { 
      name: 'Spiti Valley',
      image: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227',
      description: 'Discover the cold desert mountain valley'
    }
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="blog-page">
      <div className="cyber-grid"></div>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="neon-text"
      >
        Famous India Rides
      </motion.h1>
      
      <motion.div 
        className="rides-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {indiaRides.map((ride, index) => (
          <motion.div
            key={index}
            className="ride-card"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 25px rgba(0, 255, 136, 0.3)'
            }}
          >
            <div className="card-content">
              <div className="image-container">
                <img 
                  src={ride.image} 
                  alt={ride.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?fit=crop&w=1600&h=900';
                  }}
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-info">
                <h3>{ride.name}</h3>
                <p>{ride.description}</p>
                <motion.button 
                  className="explore-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Route
                  <div className="btn-glow"></div>
                </motion.button>
              </div>
            </div>
            <div className="card-border"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Blog