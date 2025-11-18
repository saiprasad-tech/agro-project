import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (user?.role === 'farmer') return '/dashboard/farmer';
    if (user?.role === 'consumer') return '/dashboard/consumer';
    if (user?.role === 'admin') return '/dashboard/admin';
    return '/products';
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Agri-Connect</span>
            </h1>
            <p className="hero-subtitle">
              Connecting Farmers Directly with Consumers
            </p>
            <p className="hero-description">
              Eliminating middlemen to ensure fair prices for farmers and fresh, quality produce for consumers.
              Join us in revolutionizing the agricultural supply chain.
            </p>
            <div className="hero-actions">
              {isAuthenticated ? (
                <Link to={getDashboardLink()} className="btn btn-primary btn-large">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-large">
                    Get Started
                  </Link>
                  <Link to="/products" className="btn btn-secondary btn-large">
                    Browse Products
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-icon">🌾</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Agri-Connect?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Direct Trade</h3>
              <p>Connect directly with farmers, eliminating middlemen and ensuring fair prices for everyone.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Fair Pricing</h3>
              <p>Farmers get better prices, consumers pay less. Everyone wins with transparent pricing.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚜</div>
              <h3>Fresh Produce</h3>
              <p>Get farm-fresh produce delivered directly from the source to your doorstep.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Simple platform for farmers to list products and consumers to order with just a few clicks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Safe and secure payment options including COD and online payments.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Order Tracking</h3>
              <p>Track your orders in real-time from farm to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          
          <div className="process-section">
            <h3 className="process-title">For Farmers</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h4>Register</h4>
                <p>Create your farmer account with farm details</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h4>List Products</h4>
                <p>Upload images and add product details</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h4>Receive Orders</h4>
                <p>Get orders directly from consumers</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h4>Deliver & Earn</h4>
                <p>Fulfill orders and earn fair prices</p>
              </div>
            </div>
          </div>

          <div className="process-section">
            <h3 className="process-title">For Consumers</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h4>Register</h4>
                <p>Create your consumer account</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h4>Browse</h4>
                <p>Explore fresh products from local farmers</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h4>Order</h4>
                <p>Add to cart and place your order</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h4>Receive</h4>
                <p>Get fresh produce delivered to your door</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of farmers and consumers already benefiting from direct trade</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-large">
              Register Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
