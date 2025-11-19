import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🌾 Agri-Connect</h3>
            <p>Connecting farmers directly with consumers for fair prices and fresh produce.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>For Farmers</h4>
            <ul>
              <li><a href="/register">Register as Farmer</a></li>
              <li><a href="/farmer/dashboard">Farmer Dashboard</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>For Consumers</h4>
            <ul>
              <li><a href="/register">Register as Consumer</a></li>
              <li><a href="/products">Browse Products</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Agri-Connect. All rights reserved.</p>
          <p>Made with ❤️ for farmers and consumers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
