const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'organic', 'pulses', 'spices', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  unit: {
    type: String,
    default: 'kg',
    enum: ['kg', 'g', 'liter', 'piece', 'dozen', 'quintal']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide available quantity'],
    min: 0
  },
  images: [{
    url: String,
    publicId: String
  }],
  location: {
    address: String,
    village: String,
    taluk: String,
    district: String,
    state: String,
    pincode: String
  },
  harvestDate: {
    type: Date
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
