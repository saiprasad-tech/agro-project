const Order = require('../models/Order');
const ClusterOrder = require('../models/ClusterOrder');

/**
 * Clustering logic: Groups orders by pincode within 24 hours
 * This enables efficient delivery in the same geographical area
 */
async function assignCluster(order) {
  try {
    const pincode = order.deliveryAddress.pincode;
    const taluk = order.deliveryAddress.taluk;
    const village = order.deliveryAddress.village;
    
    if (!pincode) {
      console.log('No pincode provided, skipping cluster assignment');
      return null;
    }

    // Find active clusters with same pincode created within last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    let cluster = await ClusterOrder.findOne({
      'location.pincode': pincode,
      status: 'active',
      createdAt: { $gte: oneDayAgo }
    });

    if (!cluster) {
      // Create new cluster
      const clusterNumber = `CLU-${Date.now()}-${pincode}`;
      cluster = await ClusterOrder.create({
        clusterNumber,
        location: {
          village,
          taluk,
          pincode
        },
        orders: [order._id],
        totalOrders: 1
      });
      
      console.log(`Created new cluster: ${clusterNumber}`);
    } else {
      // Add to existing cluster
      cluster.orders.push(order._id);
      cluster.totalOrders = cluster.orders.length;
      await cluster.save();
      
      console.log(`Added order to existing cluster: ${cluster.clusterNumber}`);
    }

    return cluster._id;
  } catch (error) {
    console.error('Error in cluster assignment:', error);
    return null;
  }
}

/**
 * Get cluster details for an order
 */
async function getClusterInfo(clusterId) {
  try {
    const cluster = await ClusterOrder.findById(clusterId)
      .populate('orders');
    return cluster;
  } catch (error) {
    console.error('Error fetching cluster info:', error);
    return null;
  }
}

module.exports = {
  assignCluster,
  getClusterInfo
};
