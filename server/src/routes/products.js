const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  uploadImage,
  getPriceRecommendation
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../utils/upload');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/', protect, authorize('farmer', 'admin'), createProduct);
router.put('/:id', protect, authorize('farmer', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('farmer', 'admin'), deleteProduct);
router.get('/farmer/my-products', protect, authorize('farmer'), getMyProducts);
router.post('/upload-image', protect, authorize('farmer', 'admin'), upload.single('image'), uploadImage);
router.post('/price-recommendation', protect, authorize('farmer'), getPriceRecommendation);

module.exports = router;
