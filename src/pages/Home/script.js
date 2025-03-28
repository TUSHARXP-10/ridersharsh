// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
});