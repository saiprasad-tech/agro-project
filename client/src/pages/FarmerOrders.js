import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import './Orders.css';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getFarmerOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, { status: newStatus });
      fetchOrders(); // Refresh orders
      alert('Order status updated successfully');
    } catch (error) {
      alert('Error updating order status');
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Orders Received</h1>
        
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders received yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.orderNumber}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-status-badge" style={{backgroundColor: '#17a2b8'}}>
                    {order.orderStatus.toUpperCase()}
                  </div>
                </div>
                
                <div className="order-body">
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <span>{item.name} x {item.quantity} {item.unit}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-info">
                    <p><strong>Customer:</strong> {order.consumer?.name}</p>
                    <p><strong>Phone:</strong> {order.consumer?.phone}</p>
                    <p><strong>Address:</strong> {order.deliveryAddress?.address}, {order.deliveryAddress?.village}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="order-footer">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerOrders;
