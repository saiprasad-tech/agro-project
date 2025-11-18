const Product = require('../models/Product');
const { getRecommendedPrice } = require('../utils/priceRecommender');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { 
      category, 
      isOrganic, 
      minPrice, 
      maxPrice, 
      search, 
      pincode,
      page = 1,
      limit = 12 
    } = req.query;

    const query = { isActive: true };

    // Apply filters
    if (category) query.category = category;
    if (isOrganic !== undefined) query.isOrganic = isOrganic === 'true';
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (pincode) {
      query['location.pincode'] = pincode;
    }

    const products = await Product.find(query)
      .populate('farmer', 'name phone location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmer', 'name phone location farmDetails');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Farmer only)
exports.createProduct = async (req, res) => {
  try {
    req.body.farmer = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating product'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Farmer only - own products)
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Make sure user is product owner
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Farmer only - own products)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Make sure user is product owner
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    // Soft delete
    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

// @desc    Get farmer's products
// @route   GET /api/products/farmer/my-products
// @access  Private (Farmer only)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      farmer: req.user._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Get my products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// @desc    Upload product image
// @route   POST /api/products/upload-image
// @access  Private (Farmer only)
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl,
      file: req.file
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    });
  }
};

// @desc    Get price recommendation
// @route   POST /api/products/price-recommendation
// @access  Private (Farmer only)
exports.getPriceRecommendation = async (req, res) => {
  try {
    const recommendation = await getRecommendedPrice(req.body);
    res.status(200).json(recommendation);
  } catch (error) {
    console.error('Price recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting price recommendation'
    });
  }
};
