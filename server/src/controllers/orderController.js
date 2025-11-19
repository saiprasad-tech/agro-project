const Order = require('../models/Order');
const Product = require('../models/Product');
const { assignCluster } = require('../utils/clusterService');
const { initiatePayment } = require('../utils/paymentService');
const { logTransaction } = require('../utils/blockchainService');

// @desc    Create order
// @route   POST /api/orders
// @access  Private (Consumer only)
exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    // Group items by farmer
    const farmerOrders = {};
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.product} not found or inactive`
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient quantity for ${product.name}`
        });
      }

      const farmerId = product.farmer.toString();
      if (!farmerOrders[farmerId]) {
        farmerOrders[farmerId] = [];
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      farmerOrders[farmerId].push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit
      });
    }

    // Create separate orders for each farmer
    const createdOrders = [];

    for (const [farmerId, farmerItems] of Object.entries(farmerOrders)) {
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const farmerTotal = farmerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const order = await Order.create({
        orderNumber,
        consumer: req.user._id,
        farmer: farmerId,
        items: farmerItems,
        totalAmount: farmerTotal,
        deliveryAddress,
        paymentMethod,
        notes
      });

      // Assign to cluster
      const clusterId = await assignCluster(order);
      if (clusterId) {
        order.clusterId = clusterId;
        await order.save();
      }

      // Update product quantities
      for (const item of farmerItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { quantity: -item.quantity }
        });
      }

      // Log to blockchain (placeholder)
      await logTransaction({
        type: 'order_created',
        id: order._id,
        consumer: req.user._id,
        farmer: farmerId,
        amount: farmerTotal
      });

      const populatedOrder = await Order.findById(order._id)
        .populate('farmer', 'name phone location')
        .populate('consumer', 'name phone')
        .populate('items.product', 'name images');

      createdOrders.push(populatedOrder);
    }

    // Handle payment if online
    if (paymentMethod === 'online' || paymentMethod === 'UPI') {
      const paymentResult = await initiatePayment({
        orderId: createdOrders[0].orderNumber,
        amount: totalAmount
      });
      
      if (paymentResult.success) {
        for (const order of createdOrders) {
          order.paymentStatus = 'paid';
          await order.save();
        }
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orders: createdOrders,
      totalAmount
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating order'
    });
  }
};

// @desc    Get user orders (consumer)
// @route   GET /api/orders/my-orders
// @access  Private (Consumer)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ consumer: req.user._id })
      .populate('farmer', 'name phone location')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
};

// @desc    Get farmer orders
// @route   GET /api/orders/farmer-orders
// @access  Private (Farmer)
exports.getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate('consumer', 'name phone location')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get farmer orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('farmer', 'name phone location farmDetails')
      .populate('consumer', 'name phone location')
      .populate('items.product', 'name images category')
      .populate('clusterId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (
      order.consumer.toString() !== req.user._id.toString() &&
      order.farmer.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Farmer)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (order.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    order.orderStatus = status;
    if (note) {
      order.statusHistory.push({
        status,
        note,
        timestamp: new Date()
      });
    }
    
    await order.save();

    // Log to blockchain
    await logTransaction({
      type: 'order_status_update',
      id: order._id,
      status,
      timestamp: new Date()
    });

    const updatedOrder = await Order.findById(order._id)
      .populate('farmer', 'name phone')
      .populate('consumer', 'name phone');

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private (Consumer)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (order.consumer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Can only cancel if not shipped
    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order that has been shipped or delivered'
      });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    // Restore product quantities
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: item.quantity }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order'
    });
  }
};
