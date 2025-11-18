# Agri-Connect Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

### Step 2: Configure Environment

```bash
# Server configuration
cd server
cp .env.example .env

# Edit .env and add your MongoDB URI
# Minimum required:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
```

### Step 3: Seed Database (Optional but Recommended)

```bash
cd server
npm run seed
```

This creates demo accounts:
- **Admin**: admin@agriconnect.com / admin123
- **Farmer**: ramesh@farmer.com / farmer123  
- **Consumer**: priya@consumer.com / consumer123

### Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## ✅ Verify Installation

### 1. Check Backend
Open http://localhost:5000 - Should see:
```json
{
  "success": true,
  "message": "Welcome to Agri-Connect API",
  "version": "1.0.0"
}
```

### 2. Check Frontend
Open http://localhost:3000 - Should see Agri-Connect homepage

## 🧪 Testing the Application

### Test Flow 1: Farmer Journey
1. Login as farmer (ramesh@farmer.com / farmer123)
2. Go to Dashboard → Add Product
3. Follow 3-step flow: Upload image → Enter details → Publish
4. View your products in dashboard
5. Check orders received

### Test Flow 2: Consumer Journey
1. Login as consumer (priya@consumer.com / consumer123)
2. Browse products
3. View product details
4. Add to cart
5. Go to checkout
6. Place order
7. Track order status

### Test Flow 3: Order Status Updates
1. Login as farmer
2. Go to Orders
3. Update order status
4. Login as consumer
5. Track order - see updated status

## 📱 Features to Explore

### Farmer Features
- ✅ Product management (CRUD)
- ✅ 3-step product listing
- ✅ Order management
- ✅ Status updates
- ✅ Dashboard analytics

### Consumer Features  
- ✅ Product browsing & filtering
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order tracking
- ✅ Order history

### System Features
- ✅ JWT authentication
- ✅ Role-based access
- ✅ Order clustering by location
- ✅ Real-time polling (order updates)
- ✅ Payment abstraction (COD simulated)

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check connection string format
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Whitelist IP in MongoDB Atlas
# Add 0.0.0.0/0 for development
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### CORS Errors
Check that CLIENT_URL in server/.env matches your React app URL:
```bash
CLIENT_URL=http://localhost:3000
```

## 📊 Project Statistics

- **Backend Files**: 25+ files
- **Frontend Files**: 35+ files  
- **API Endpoints**: 25+ endpoints
- **Models**: 4 (User, Product, Order, ClusterOrder)
- **Pages**: 14 React pages
- **Components**: Reusable components with routing

## 🎯 Next Steps

1. **Customize**: Update branding, colors, and content
2. **Deploy**: Deploy to cloud platforms (Heroku, Vercel, Netlify)
3. **Enhance**: Add more features from placeholder modules
4. **Integrate**: Add real payment gateway (Razorpay/Stripe)

## 📞 Need Help?

- Check server logs for backend errors
- Check browser console for frontend errors
- Verify all environment variables are set
- Ensure MongoDB is accessible

---

Happy Coding! 🌾
