import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import './Auth.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { signInWithGoogle } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    experience: 'beginner',
    bikeDetails: '',
    preferredRideType: 'solo'
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ''
  });

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    const messages = [
      'Weak',
      'Fair',
      'Good',
      'Strong'
    ];

    setPasswordStrength({
      score,
      message: messages[score - 1] || 'Too Weak'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      if (provider === 'Google') {
        const result = await signInWithGoogle();
        if (result.success) {
          console.log('Google login successful:', result.user);
          navigate('/ride-tracker');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(`${provider} login failed: ${err.message}`);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      const result = await registerUser(formData.email, formData.password, formData);
      if (result.success) {
        navigate('/ride-tracker');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="cyber-grid"></div>
      <div className="auth-container">
        <div className="auth-header">
          <h2>Join the Riders Community</h2>
          <div className="scanner-line"></div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-text">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="cyber-input-border"></div>
          </div>
          <div className="form-group">
            <label className="label-text">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="cyber-input-border"></div>
          </div>
          <div className="form-group">
            <label className="label-text">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {formData.password && (
              <div className={`password-strength strength-${passwordStrength.score}`}>
                <div className="strength-bar"></div>
                <span>{passwordStrength.message}</span>
              </div>
            )}
            <div className="cyber-input-border"></div>
          </div>
          <div className="form-group">
            <label className="label-text">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {validationErrors.confirmPassword && (
              <span className="error-text">{validationErrors.confirmPassword}</span>
            )}
            <div className="cyber-input-border"></div>
          </div>

          <div className="form-group">
            <label className="label-text">Bike Details (Optional)</label>
            <input
              type="text"
              name="bikeDetails"
              value={formData.bikeDetails}
              onChange={handleChange}
              placeholder="e.g., Royal Enfield Classic 350"
            />
            <div className="cyber-input-border"></div>
          </div>

          <div className="form-group">
            <label className="label-text">Preferred Ride Type</label>
            <select
              name="preferredRideType"
              value={formData.preferredRideType}
              onChange={handleChange}
              className="cyber-select"
            >
              <option value="solo">Solo Rider</option>
              <option value="duo">Duo Rider</option>
              <option value="group">Group Rider</option>
            </select>
            <div className="cyber-input-border"></div>
          </div>

          <div className="social-login">
            <button 
              type="button" 
              className="google-btn"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle /> Continue with Google
            </button>
            <button 
              type="button" 
              className="facebook-btn"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebook /> Continue with Facebook
            </button>
          </div>
          
          <div className="or-divider">
            <span className="or-text">OR</span>
          </div>

          <button className="submit-btn" disabled={loading}>
            <span className="btn-text">{loading ? 'Creating Account...' : 'Join Now'}</span>
            <div className="btn-glitch"></div>
            <div className="btn-border-1"></div>
            <div className="btn-border-2"></div>
          </button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;