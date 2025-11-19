const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  toggleUserStatus,
  getAllProducts,
  toggleProductStatus,
  getAllOrders,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.get('/products', getAllProducts);
router.put('/products/:id/toggle-status', toggleProductStatus);
router.get('/orders', getAllOrders);

module.exports = router;
