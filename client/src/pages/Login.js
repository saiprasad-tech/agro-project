import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      
      // Redirect based on role
      if (response.user.role === 'farmer') {
        navigate('/dashboard/farmer');
      } else if (response.user.role === 'consumer') {
        navigate('/dashboard/consumer');
      } else if (response.user.role === 'admin') {
        navigate('/dashboard/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <h1 className="auth-title">Login to Agri-Connect</h1>
          <p className="auth-subtitle">Enter your credentials to access your account</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>

          <div className="demo-accounts">
            <h4>Demo Accounts</h4>
            <div className="demo-grid">
              <div className="demo-account">
                <strong>Farmer:</strong><br/>
                ramesh@farmer.com / farmer123
              </div>
              <div className="demo-account">
                <strong>Consumer:</strong><br/>
                priya@consumer.com / consumer123
              </div>
              <div className="demo-account">
                <strong>Admin:</strong><br/>
                admin@agriconnect.com / admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
