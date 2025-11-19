# 🌾 Agri-Connect - Direct Farmer to Consumer Marketplace

## Project Abstract

Agri-Connect is a cloud-ready, modular MERN (MongoDB, Express.js, React.js, Node.js) stack application that revolutionizes agricultural trade by enabling direct connections between farmers and consumers. By eliminating intermediaries, the platform ensures fair pricing for farmers while providing consumers access to fresh, quality produce at competitive prices.

The application addresses critical challenges in the agricultural supply chain:
- **Fair Pricing**: Farmers receive better compensation for their produce
- **Transparency**: Complete visibility of product origin and journey
- **Efficiency**: Reduced wastage through direct trade and optimized logistics
- **Accessibility**: Simple, intuitive interface for users of all technical backgrounds

## 🚀 Features

### For Farmers
- **Product Management**: Easy 3-step product listing (Upload Image → Enter Details → Publish)
- **Order Management**: View and update order status in real-time
- **Profile Management**: Maintain farm details, certifications, and location
- **Analytics**: Track product views and sales performance

### For Consumers
- **Product Catalog**: Browse and search products with advanced filters
- **Shopping Cart**: Add multiple products from different farmers
- **Order Placement**: Simple checkout process with multiple payment options
- **Order Tracking**: Real-time status updates from order placement to delivery

### For Administrators
- **User Management**: View, activate, or deactivate user accounts
- **Product Moderation**: Monitor and manage product listings
- **Analytics Dashboard**: View platform statistics and insights

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/saiprasad-tech/agro-project.git
cd agro-project
```

### 2. Server Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run seed  # Create demo data
npm run dev   # Start server on http://localhost:5000
```

### 3. Client Setup

```bash
cd client
npm install
npm start  # Start client on http://localhost:3000
```

## 👥 Demo Accounts

- **Admin**: admin@agriconnect.com / admin123
- **Farmer**: ramesh@farmer.com / farmer123
- **Consumer**: priya@consumer.com / consumer123

## 📋 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT, Socket.IO
- **Frontend**: React.js, React Router, Context API, Axios
- **Features**: Real-time updates, Order clustering, Payment abstraction

## 🔮 Future Features (Placeholder Modules)

- AI Price Recommendations (`/server/src/utils/priceRecommender.js`)
- Blockchain Integration (`/server/src/utils/blockchainService.js`)
- IoT Integration (`/server/src/utils/iotService.js`)

---

**Made with ❤️ for farmers and consumers**
