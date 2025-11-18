import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, isConsumer } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProduct(id);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isConsumer) {
      alert('Only consumers can add products to cart');
      return;
    }
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="container"><p>Product not found</p></div>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-detail-image">
            {product.images[0]?.url ? (
              <img src={product.images[0].url} alt={product.name} />
            ) : (
              <div className="placeholder">📦</div>
            )}
          </div>
          
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            {product.isOrganic && <span className="organic-badge">Organic</span>}
            <p className="category">{product.category}</p>
            <div className="price">₹{product.price}/{product.unit}</div>
            
            <div className="product-meta">
              <p><strong>Available:</strong> {product.quantity} {product.unit}</p>
              <p><strong>Location:</strong> {product.location?.village}, {product.location?.district}</p>
              {product.harvestDate && (
                <p><strong>Harvest Date:</strong> {new Date(product.harvestDate).toLocaleDateString()}</p>
              )}
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="farmer-info">
              <h3>Farmer Information</h3>
              <p><strong>Name:</strong> {product.farmer?.name}</p>
              <p><strong>Phone:</strong> {product.farmer?.phone}</p>
            </div>

            {isConsumer && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                  <button onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}>+</button>
                </div>
                <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
