import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    isOrganic: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getProducts(filters);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list-page">
      <div className="container">
        <h1>Browse Products</h1>
        
        <div className="filters">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="dairy">Dairy</option>
            <option value="organic">Organic</option>
          </select>
          <select name="isOrganic" value={filters.isOrganic} onChange={handleFilterChange}>
            <option value="">All Products</option>
            <option value="true">Organic Only</option>
          </select>
        </div>

        <div className="products-grid">
          {products.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                <div className="product-image">
                  {product.images[0]?.url ? (
                    <img src={product.images[0].url} alt={product.name} />
                  ) : (
                    <div className="placeholder-image">📦</div>
                  )}
                  {product.isOrganic && <span className="organic-badge">Organic</span>}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-price">
                    ₹{product.price}/{product.unit}
                  </div>
                  <p className="product-location">📍 {product.location?.village || 'Unknown'}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
