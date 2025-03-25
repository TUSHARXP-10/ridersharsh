import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signInWithGoogle } from '../../services/authService';
import { auth } from '../../firebase/config';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const testConnection = async () => {
    try {
      const currentUser = auth.currentUser;
      console.log('Firebase Auth Status:', !!currentUser);
      console.log('Firebase Auth Instance:', !!auth);
      setError('Firebase connection successful!');
    } catch (err) {
      setError('Firebase connection failed: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        console.log('Login successful:', result.user);
        navigate('/ride-tracker');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="cyber-grid"></div>
      <div className="auth-container">
        <div className="auth-header">
          <h2>Login</h2>
          <div className="scanner-line"></div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="cyber-input-border"></div>
          </div>
          <div className="form-group">
            <label className="label-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="cyber-input-border"></div>
          </div>
          <button className="submit-btn" disabled={loading}>
            <span className="btn-text">{loading ? 'Logging in...' : 'Login'}</span>
            <div className="btn-glitch"></div>
            <div className="btn-border-1"></div>
            <div className="btn-border-2"></div>
          </button>
          <button 
            type="button" 
            onClick={testConnection}
            className="test-connection-btn"
            style={{ marginTop: '1rem' }}
          >
            Test Connection
          </button>
          <button 
            type="button" 
            onClick={async () => {
              setLoading(true);
              setError('');
              try {
                const result = await signInWithGoogle();
                if (result.success) {
                  console.log('Google login successful:', result.user);
                  navigate('/ride-tracker');
                } else {
                  setError(result.error);
                }
              } catch (err) {
                setError('Google login failed: ' + err.message);
              }
              setLoading(false);
            }}
            className="google-signin-btn"
            style={{ marginTop: '1rem' }}
            disabled={loading}
          >
            <span className="btn-text">Sign in with Google</span>
            <div className="btn-glitch"></div>
            <div className="btn-border-1"></div>
            <div className="btn-border-2"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;