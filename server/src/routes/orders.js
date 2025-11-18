const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getFarmerOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('consumer', 'admin'), createOrder);
router.get('/my-orders', protect, authorize('consumer'), getMyOrders);
router.get('/farmer-orders', protect, authorize('farmer'), getFarmerOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, authorize('farmer', 'admin'), updateOrderStatus);
router.put('/:id/cancel', protect, authorize('consumer'), cancelOrder);

module.exports = router;
