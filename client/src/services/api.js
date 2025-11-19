import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData)
};

// Product APIs
export const productAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getMyProducts: () => api.get('/products/farmer/my-products'),
  uploadImage: (formData) => api.post('/products/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getPriceRecommendation: (data) => api.post('/products/price-recommendation', data)
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/my-orders'),
  getFarmerOrders: () => api.get('/orders/farmer-orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`)
};

// Admin APIs
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  toggleUserStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
  getAllProducts: (params) => api.get('/admin/products', { params }),
  toggleProductStatus: (id) => api.put(`/admin/products/${id}/toggle-status`),
  getAllOrders: (params) => api.get('/admin/orders', { params })
};

export default api;
