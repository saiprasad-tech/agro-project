import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderAPI } from '../services/api';
import './OrderTracking.css';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getOrder(id);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: '📝' },
    { key: 'accepted', label: 'Accepted', icon: '✅' },
    { key: 'packed', label: 'Packed', icon: '📦' },
    { key: 'shipped', label: 'Shipped', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', icon: '🎉' }
  ];

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex(step => step.key === order.orderStatus);
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  if (!order) return <div className="container"><p>Order not found</p></div>;

  const currentStepIndex = getCurrentStepIndex();
  const isCancelled = order.orderStatus === 'cancelled';

  return (
    <div className="order-tracking-page">
      <div className="container">
        <h1>Order Tracking</h1>
        
        <div className="tracking-card">
          <div className="tracking-header">
            <h2>Order #{order.orderNumber}</h2>
            <p className="tracking-date">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          {isCancelled ? (
            <div className="tracking-cancelled">
              <h3>❌ Order Cancelled</h3>
              <p>This order has been cancelled</p>
            </div>
          ) : (
            <div className="tracking-progress">
              {statusSteps.map((step, index) => (
                <div 
                  key={step.key} 
                  className={`tracking-step ${index <= currentStepIndex ? 'completed' : ''} ${index === currentStepIndex ? 'active' : ''}`}
                >
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-label">{step.label}</div>
                  {index < statusSteps.length - 1 && (
                    <div className={`step-line ${index < currentStepIndex ? 'completed' : ''}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="tracking-details">
            <div className="detail-section">
              <h3>Order Items</h3>
              {order.items.map((item, idx) => (
                <div key={idx} className="detail-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="detail-total">
                <span>Total</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Farmer Information</h3>
              <p><strong>Name:</strong> {order.farmer?.name}</p>
              <p><strong>Phone:</strong> {order.farmer?.phone}</p>
              <p><strong>Location:</strong> {order.farmer?.location?.village}, {order.farmer?.location?.district}</p>
            </div>

            <div className="detail-section">
              <h3>Delivery Address</h3>
              <p>{order.deliveryAddress?.name}</p>
              <p>{order.deliveryAddress?.phone}</p>
              <p>{order.deliveryAddress?.address}</p>
              <p>{order.deliveryAddress?.village}, {order.deliveryAddress?.district}</p>
              <p>{order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}</p>
            </div>

            <div className="detail-section">
              <h3>Payment Information</h3>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.paymentStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
