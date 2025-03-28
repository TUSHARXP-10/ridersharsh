// Import statements and other existing code...

// Component definition
function Home() {
  // Other component code...

  // Use useEffect to add the particle effect after the component mounts
  useEffect(() => {
    document.querySelectorAll('.skill-badge').forEach(badge => {
      const particles = badge.querySelector('.badge-particles');
      
      badge.addEventListener('mouseenter', () => {
        // Create particles
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.width = '5px';
          particle.style.height = '5px';
          particle.style.backgroundColor = '#00ff88';
          particle.style.borderRadius = '50%';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.animation = `particleFloat ${1 + Math.random()}s linear infinite`;
          particle.style.animationDelay = `${Math.random() * 2}s`;
          
          particles.appendChild(particle);
        }
      });
      
      badge.addEventListener('mouseleave', () => {
        // Clean up particles
        particles.innerHTML = '';
      });
    });

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.removeEventListener('mouseenter', () => {});
        badge.removeEventListener('mouseleave', () => {});
      });
    };
  }, []); // Empty dependency array means this runs once after initial render

  // Return JSX with your badge elements
  return (
    <div className="home">
      {/* Other elements */}
      <div className="badge-container">
        <div className="skill-badge" data-level="beginner">
          <img src="/images/beginner-badge.png" alt="Beginner" className="badge-img" />
          <div className="badge-glow"></div>
          <div className="badge-particles"></div>
          <div className="badge-label">Beginner</div>
        </div>
        
        {/* Other badges */}
      </div>
      {/* Other elements */}
    </div>
  );
}

export default Home;