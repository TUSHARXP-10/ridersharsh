import { useState } from 'react';
import { motion } from 'framer-motion';
import beginnerBadge from '../assets/beginner.png';
import intermediateBadge from '../assets/intermediate.png';
import expertBadge from '../assets/expert.png';

const TireSelection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const badges = [
    { id: 'beginner', image: beginnerBadge, title: 'Beginner' },
    { id: 'intermediate', image: intermediateBadge, title: 'Intermediate' },
    { id: 'expert', image: expertBadge, title: 'Expert' }
  ];

  const handleBadgeClick = (level) => {
    setSelectedLevel(level);
    // Here you can add logic to fetch and display upcoming rides
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Select Your Riding Level
      </h1>
      
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => handleBadgeClick(badge.id)}
              className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <motion.img
                src={badge.image}
                alt={badge.title}
                className="w-64 h-64 object-contain"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p className="absolute bottom-4 left-4 text-white text-xl font-bold">
                  {badge.title}
                </p>
              </motion.div>
            </motion.button>
            
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"
              style={{ zIndex: -1 }}
            />
          </motion.div>
        ))}
      </div>

      {selectedLevel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-6 bg-gray-800 rounded-lg max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Upcoming Rides for {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Riders
          </h2>
          {/* Add your upcoming rides content here */}
        </motion.div>
      )}
    </div>
  );
};

export default TireSelection;