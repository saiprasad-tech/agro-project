import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'farmer') return '/dashboard/farmer';
    if (user?.role === 'consumer') return '/dashboard/consumer';
    if (user?.role === 'admin') return '/dashboard/admin';
    return '/';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌾</span>
          <span className="brand-text">Agri-Connect</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/products" className="nav-link">Products</Link>
          
          {isAuthenticated ? (
            <>
              <Link to={getDashboardLink()} className="nav-link">Dashboard</Link>
              
              {user?.role === 'consumer' && (
                <>
                  <Link to="/cart" className="nav-link cart-link">
                    🛒 Cart
                    {getCartCount() > 0 && (
                      <span className="cart-badge">{getCartCount()}</span>
                    )}
                  </Link>
                  <Link to="/orders" className="nav-link">My Orders</Link>
                </>
              )}
              
              {user?.role === 'farmer' && (
                <Link to="/farmer/orders" className="nav-link">My Orders</Link>
              )}
              
              <div className="nav-user">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">({user?.role})</span>
              </div>
              
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
