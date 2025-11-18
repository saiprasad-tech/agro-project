import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import MyOrders from './pages/MyOrders';
import FarmerOrders from './pages/FarmerOrders';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                
                {/* Consumer Routes */}
                <Route path="/dashboard/consumer" element={
                  <PrivateRoute roles={['consumer']}>
                    <ConsumerDashboard />
                  </PrivateRoute>
                } />
                <Route path="/checkout" element={
                  <PrivateRoute roles={['consumer']}>
                    <Checkout />
                  </PrivateRoute>
                } />
                <Route path="/orders" element={
                  <PrivateRoute roles={['consumer']}>
                    <MyOrders />
                  </PrivateRoute>
                } />
                <Route path="/orders/:id" element={
                  <PrivateRoute roles={['consumer', 'farmer', 'admin']}>
                    <OrderTracking />
                  </PrivateRoute>
                } />
                
                {/* Farmer Routes */}
                <Route path="/dashboard/farmer" element={
                  <PrivateRoute roles={['farmer']}>
                    <FarmerDashboard />
                  </PrivateRoute>
                } />
                <Route path="/farmer/add-product" element={
                  <PrivateRoute roles={['farmer']}>
                    <AddProduct />
                  </PrivateRoute>
                } />
                <Route path="/farmer/orders" element={
                  <PrivateRoute roles={['farmer']}>
                    <FarmerOrders />
                  </PrivateRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/dashboard/admin" element={
                  <PrivateRoute roles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
