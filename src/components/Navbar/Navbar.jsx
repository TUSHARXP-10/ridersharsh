import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">RidersAdda</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tire-selection">TIRE SELECTION</Link>
        {user ? (
          <>
            <Link to="/ride-tracker">Ride Tracker</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;