import { motion } from 'framer-motion'
import { useState } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      category: 'rides',
      title: 'Mountain Adventure'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd',
      category: 'events',
      title: 'Night Ride'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1589307357647-46c91a8ad1a1',
      category: 'bikes',
      title: 'Custom Beast'
    }
    // Add more images as needed
  ]

  const categories = ['all', 'rides', 'events', 'bikes']

  return (
    <div className="photo-gallery">
      <motion.h1 
        className="gallery-title neon-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Riders Gallery
      </motion.h1>

      <div className="category-filters">
        {categories.map(category => (
          <motion.button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.toUpperCase()}
          </motion.button>
        ))}
      </div>

      <motion.div 
        className="gallery-grid"
        layout
      >
        {galleryImages
          .filter(img => selectedCategory === 'all' || img.category === selectedCategory)
          .map(image => (
            <motion.div
              key={image.id}
              className="gallery-item"
              layoutId={`image-${image.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(0, 255, 136, 0.3)'
              }}
            >
              <div className="image-container">
                <img src={image.url} alt={image.title} />
                <div className="image-overlay">
                  <h3>{image.title}</h3>
                  <div className="cyber-border"></div>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>

      <motion.button 
        className="upload-btn cyber-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="cyber-button__content">Share Your Ride</span>
        <span className="cyber-button__glitch"></span>
        <span className="cyber-button__label">+</span>
      </motion.button>
    </div>
  )
}

export default Gallery