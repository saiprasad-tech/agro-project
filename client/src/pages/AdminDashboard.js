import React from 'react';
import './Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">-</p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-number">-</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-number">-</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p className="stat-number">₹0</p>
          </div>
        </div>

        <div className="section">
          <h2>Admin Features</h2>
          <p>Admin dashboard features include:</p>
          <ul style={{lineHeight: '2', marginTop: '16px'}}>
            <li>✅ User management (view, activate/deactivate users)</li>
            <li>✅ Product moderation (view all products, toggle status)</li>
            <li>✅ Order monitoring (view all orders across platform)</li>
            <li>✅ Analytics and statistics</li>
          </ul>
          <p style={{marginTop: '20px', color: 'var(--text-muted)'}}>
            Full implementation available via API endpoints in the backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
