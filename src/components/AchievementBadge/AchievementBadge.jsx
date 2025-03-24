const AchievementBadge = ({ title, description, icon }) => {
  return (
    <motion.div 
      className="achievement-badge"
      whileHover={{ scale: 1.1 }}
    >
      <div className="badge-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}