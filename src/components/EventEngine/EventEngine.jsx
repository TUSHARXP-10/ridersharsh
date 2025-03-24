import { useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import './EventEngine.css'

const EventEngine = () => {
  useEffect(() => {
    gsap.from('.event-card', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1
    })
  }, [])

  return (
    <section className="event-engine">
      <h2>Major Events & Rides</h2>
      <div className="events-container">
        <motion.div 
          className="event-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="event-image">
            <img src="/path-to-image.jpg" alt="Mountain Trail" />
          </div>
          <div className="event-content">
            <h3>Mountain Trail Adventure</h3>
            <p className="event-date">August 15, 2024</p>
            <p className="event-description">
              Experience the thrill of mountain riding with fellow enthusiasts.
              All skill levels welcome!
            </p>
            <div className="event-details">
              <span>Duration: 4 hours</span>
              <span>Difficulty: Moderate</span>
              <span>Participants: 20/50</span>
            </div>
            <button className="register-btn">Register Now</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventEngine