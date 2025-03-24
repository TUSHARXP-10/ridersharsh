import React from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  const contactInfo = [
    {
      title: 'Visit Us',
      description: 'Mumbai, Maharashtra, India',
      image: 'https://images.unsplash.com/photo-1538582709238-0a503bd5ae04'
    },
    {
      title: 'Call Us',
      description: '+91 9082301827',
      image: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51'
    },
    {
      title: 'Email Us',
      description: 'ridersadda62@gmail.com',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2'
    }
  ]

  return (
    <div className="contact-page">
      <div className="cyber-grid"></div>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="neon-text"
      >
        Get in Touch
      </motion.h1>

      <div className="contact-container">
        <motion.div 
          className="contact-form-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form className="contact-form">
            <div className="form-group">
              <input type="text" required placeholder="Your Name" />
              <div className="cyber-input-border"></div>
            </div>
            <div className="form-group">
              <input type="email" required placeholder="Your Email" />
              <div className="cyber-input-border"></div>
            </div>
            <div className="form-group">
              <textarea required placeholder="Your Message" rows="5"></textarea>
              <div className="cyber-input-border"></div>
            </div>
            <motion.button 
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
              <div className="btn-glow"></div>
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          className="contact-info-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {contactInfo.map((info, index) => (
            <motion.div 
              key={index}
              className="info-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
            >
              <div className="info-image">
                <img src={info.image} alt={info.title} />
                <div className="image-overlay"></div>
              </div>
              <div className="info-content">
                <h3>{info.title}</h3>
                <p>{info.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Contact