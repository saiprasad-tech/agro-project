const mongoose = require('mongoose');

const clusterOrderSchema = new mongoose.Schema({
  clusterNumber: {
    type: String,
    unique: true,
    required: true
  },
  location: {
    village: String,
    taluk: String,
    district: String,
    pincode: String
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  totalOrders: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'dispatched', 'completed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dispatchDate: Date,
  deliveryDate: Date
});

module.exports = mongoose.model('ClusterOrder', clusterOrderSchema);
