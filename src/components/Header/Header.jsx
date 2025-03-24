import { motion } from 'framer-motion'
import './Header.css'

const Header = () => {
  return (
    <header className="cyber-header">
      <div className="header-content">
        <h1>Riders<span>Adda</span></h1>
        <motion.div 
          className="header-logo"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/rider.png" alt="RidersAdda Logo" />
        </motion.div>
      </div>
      <nav>
        <a href="#" className="active">Home</a>
        <a href="#">Social Hub</a>
        <a href="#">TIRE SELECTION</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  )
}

export default Header