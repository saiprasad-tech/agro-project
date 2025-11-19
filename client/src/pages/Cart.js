import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container" style={{padding: '40px 0', textAlign: 'center'}}>
        <h2>Please login to view your cart</h2>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <div className="item-image">
                  {item.product.images[0]?.url ? (
                    <img src={item.product.images[0].url} alt={item.product.name} />
                  ) : (
                    <div className="placeholder">📦</div>
                  )}
                </div>
                
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p className="item-category">{item.product.category}</p>
                  <p className="item-price">₹{item.product.price}/{item.product.unit}</p>
                  <p className="item-farmer">Farmer: {item.product.farmer?.name}</p>
                </div>
                
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                </div>
                
                <div className="item-total">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </div>
                
                <button className="item-remove" onClick={() => removeFromCart(item.product._id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            
            <button className="btn btn-outline btn-block" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
