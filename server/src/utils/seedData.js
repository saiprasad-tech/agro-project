require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const connectDB = require('../config/database');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create users
    console.log('Creating users...');
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@agriconnect.com',
      password: 'admin123',
      role: 'admin',
      phone: '9999999999'
    });

    const farmer1 = await User.create({
      name: 'Ramesh Kumar',
      email: 'ramesh@farmer.com',
      password: 'farmer123',
      role: 'farmer',
      phone: '9876543210',
      location: {
        address: 'Farm House, Village Road',
        village: 'Kothapalli',
        taluk: 'Mandal',
        district: 'Krishna',
        state: 'Andhra Pradesh',
        pincode: '521001'
      },
      farmDetails: {
        farmSize: '5 acres',
        farmingType: 'Organic',
        mainCrops: ['Rice', 'Vegetables', 'Fruits'],
        certifications: ['Organic Certified']
      }
    });

    const farmer2 = await User.create({
      name: 'Lakshmi Devi',
      email: 'lakshmi@farmer.com',
      password: 'farmer123',
      role: 'farmer',
      phone: '9876543211',
      location: {
        address: 'Green Farm, Main Road',
        village: 'Pedakakani',
        taluk: 'Mandal',
        district: 'Guntur',
        state: 'Andhra Pradesh',
        pincode: '522509'
      },
      farmDetails: {
        farmSize: '3 acres',
        farmingType: 'Traditional',
        mainCrops: ['Vegetables', 'Pulses'],
        certifications: []
      }
    });

    const consumer1 = await User.create({
      name: 'Priya Sharma',
      email: 'priya@consumer.com',
      password: 'consumer123',
      role: 'consumer',
      phone: '9876543212',
      location: {
        address: 'Flat 101, Green Avenue',
        village: 'Vijayawada',
        district: 'Krishna',
        state: 'Andhra Pradesh',
        pincode: '520001'
      }
    });

    const consumer2 = await User.create({
      name: 'Arun Reddy',
      email: 'arun@consumer.com',
      password: 'consumer123',
      role: 'consumer',
      phone: '9876543213',
      location: {
        address: 'House 45, MG Road',
        village: 'Guntur',
        district: 'Guntur',
        state: 'Andhra Pradesh',
        pincode: '522001'
      }
    });

    console.log('Users created successfully!');

    // Create products
    console.log('Creating products...');

    const products = [
      {
        farmer: farmer1._id,
        name: 'Organic Tomatoes',
        description: 'Fresh organic tomatoes grown without pesticides. Perfect for salads and cooking.',
        category: 'vegetables',
        price: 40,
        unit: 'kg',
        quantity: 100,
        images: [{ url: '/uploads/sample-tomato.jpg' }],
        location: farmer1.location,
        harvestDate: new Date(),
        isOrganic: true,
        isActive: true
      },
      {
        farmer: farmer1._id,
        name: 'Fresh Mangoes',
        description: 'Sweet and juicy Alphonso mangoes directly from farm.',
        category: 'fruits',
        price: 120,
        unit: 'kg',
        quantity: 50,
        images: [{ url: '/uploads/sample-mango.jpg' }],
        location: farmer1.location,
        harvestDate: new Date(),
        isOrganic: true,
        isActive: true
      },
      {
        farmer: farmer1._id,
        name: 'Basmati Rice',
        description: 'Premium quality basmati rice, aged for perfect aroma.',
        category: 'grains',
        price: 80,
        unit: 'kg',
        quantity: 500,
        images: [{ url: '/uploads/sample-rice.jpg' }],
        location: farmer1.location,
        harvestDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        isOrganic: false,
        isActive: true
      },
      {
        farmer: farmer2._id,
        name: 'Green Beans',
        description: 'Fresh green beans, handpicked from the farm.',
        category: 'vegetables',
        price: 45,
        unit: 'kg',
        quantity: 80,
        images: [{ url: '/uploads/sample-beans.jpg' }],
        location: farmer2.location,
        harvestDate: new Date(),
        isOrganic: false,
        isActive: true
      },
      {
        farmer: farmer2._id,
        name: 'Carrots',
        description: 'Fresh carrots, rich in vitamins and minerals.',
        category: 'vegetables',
        price: 35,
        unit: 'kg',
        quantity: 120,
        images: [{ url: '/uploads/sample-carrot.jpg' }],
        location: farmer2.location,
        harvestDate: new Date(),
        isOrganic: false,
        isActive: true
      },
      {
        farmer: farmer2._id,
        name: 'Toor Dal',
        description: 'High quality toor dal (pigeon pea) from our farm.',
        category: 'pulses',
        price: 90,
        unit: 'kg',
        quantity: 200,
        images: [{ url: '/uploads/sample-dal.jpg' }],
        location: farmer2.location,
        harvestDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        isOrganic: false,
        isActive: true
      },
      {
        farmer: farmer1._id,
        name: 'Organic Spinach',
        description: 'Fresh organic spinach leaves, great for healthy meals.',
        category: 'vegetables',
        price: 30,
        unit: 'kg',
        quantity: 60,
        images: [{ url: '/uploads/sample-spinach.jpg' }],
        location: farmer1.location,
        harvestDate: new Date(),
        isOrganic: true,
        isActive: true
      },
      {
        farmer: farmer2._id,
        name: 'Fresh Milk',
        description: 'Farm fresh cow milk, delivered daily.',
        category: 'dairy',
        price: 55,
        unit: 'liter',
        quantity: 100,
        images: [{ url: '/uploads/sample-milk.jpg' }],
        location: farmer2.location,
        harvestDate: new Date(),
        isOrganic: false,
        isActive: true
      }
    ];

    await Product.insertMany(products);
    console.log('Products created successfully!');

    console.log('\n✅ Seed data created successfully!');
    console.log('\nDemo Accounts:');
    console.log('─────────────────────────────────────');
    console.log('Admin:');
    console.log('  Email: admin@agriconnect.com');
    console.log('  Password: admin123');
    console.log('\nFarmer 1:');
    console.log('  Email: ramesh@farmer.com');
    console.log('  Password: farmer123');
    console.log('\nFarmer 2:');
    console.log('  Email: lakshmi@farmer.com');
    console.log('  Password: farmer123');
    console.log('\nConsumer 1:');
    console.log('  Email: priya@consumer.com');
    console.log('  Password: consumer123');
    console.log('\nConsumer 2:');
    console.log('  Email: arun@consumer.com');
    console.log('  Password: consumer123');
    console.log('─────────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
