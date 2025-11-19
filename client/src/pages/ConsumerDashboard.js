import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const ConsumerDashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Consumer Dashboard</h1>
        </div>

        <div className="section">
          <h2>Welcome to Agri-Connect</h2>
          <p>Browse fresh produce directly from farmers and place orders with ease.</p>
        </div>

        <div className="section">
          <h2>Quick Actions</h2>
          <div className="quick-links">
            <Link to="/products" className="quick-link-card">
              <span className="icon">🛒</span>
              <h3>Browse Products</h3>
              <p>Explore fresh produce from local farmers</p>
            </Link>
            
            <Link to="/cart" className="quick-link-card">
              <span className="icon">🛍️</span>
              <h3>My Cart</h3>
              <p>View and manage your cart items</p>
            </Link>
            
            <Link to="/orders" className="quick-link-card">
              <span className="icon">📦</span>
              <h3>My Orders</h3>
              <p>Track your orders and view history</p>
            </Link>
          </div>
        </div>

        <div className="section">
          <h2>Why Choose Direct from Farmers?</h2>
          <ul style={{lineHeight: '2'}}>
            <li>🌱 <strong>Fresh Produce:</strong> Get farm-fresh products delivered to your door</li>
            <li>💰 <strong>Better Prices:</strong> Save money by buying directly from farmers</li>
            <li>🤝 <strong>Support Local:</strong> Help farmers get fair prices for their produce</li>
            <li>🌾 <strong>Quality Assured:</strong> Know exactly where your food comes from</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
