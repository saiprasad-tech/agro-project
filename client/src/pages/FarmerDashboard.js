import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import './Dashboard.css';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const response = await productAPI.getMyProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      alert('Error deleting product');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Farmer Dashboard</h1>
          <Link to="/farmer/add-product" className="btn btn-primary">+ Add New Product</Link>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-number">{products.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active Listings</h3>
            <p className="stat-number">{products.filter(p => p.isActive).length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Views</h3>
            <p className="stat-number">{products.reduce((sum, p) => sum + p.views, 0)}</p>
          </div>
        </div>

        <div className="section">
          <h2>My Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>You haven't added any products yet.</p>
              <Link to="/farmer/add-product" className="btn btn-primary">Add Your First Product</Link>
            </div>
          ) : (
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Views</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td><strong>{product.name}</strong></td>
                      <td>{product.category}</td>
                      <td>₹{product.price}/{product.unit}</td>
                      <td>{product.quantity} {product.unit}</td>
                      <td>{product.views}</td>
                      <td>
                        <button className="btn-small btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="section">
          <h2>Quick Links</h2>
          <div className="quick-links">
            <Link to="/farmer/orders" className="quick-link-card">
              <span className="icon">📦</span>
              <h3>View Orders</h3>
              <p>Manage incoming orders</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
