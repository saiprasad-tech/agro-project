# Agri-Connect API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "farmer", // or "consumer"
  "phone": "9876543210",
  "location": {
    "address": "Farm House",
    "village": "Kothapalli",
    "district": "Krishna",
    "state": "Andhra Pradesh",
    "pincode": "521001"
  }
}
```

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "ramesh@farmer.com",
  "password": "farmer123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Ramesh Kumar",
    "email": "ramesh@farmer.com",
    "role": "farmer"
  }
}
```

---

## Product Endpoints

### Get All Products
**GET** `/products?category=vegetables&isOrganic=true&minPrice=10&maxPrice=100`

### Get Product by ID
**GET** `/products/:id`

### Create Product (Farmer only)
**POST** `/products`

**Body:**
```json
{
  "name": "Organic Tomatoes",
  "description": "Fresh organic tomatoes",
  "category": "vegetables",
  "price": 40,
  "unit": "kg",
  "quantity": 100,
  "images": [{"url": "/uploads/image.jpg"}],
  "location": {
    "village": "Kothapalli",
    "district": "Krishna",
    "pincode": "521001"
  },
  "isOrganic": true
}
```

### Upload Product Image
**POST** `/products/upload-image`

**Form Data:**
```
image: <file>
```

---

## Order Endpoints

### Create Order (Consumer only)
**POST** `/orders`

**Body:**
```json
{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "name": "Priya Sharma",
    "phone": "9876543212",
    "address": "Flat 101",
    "village": "Vijayawada",
    "district": "Krishna",
    "state": "Andhra Pradesh",
    "pincode": "520001"
  },
  "paymentMethod": "COD"
}
```

### Get My Orders (Consumer)
**GET** `/orders/my-orders`

### Get Farmer Orders
**GET** `/orders/farmer-orders`

### Update Order Status (Farmer)
**PUT** `/orders/:id/status`

**Body:**
```json
{
  "status": "accepted", // pending, accepted, packed, shipped, delivered, cancelled
  "note": "Order accepted and will be packed soon"
}
```

---

## Admin Endpoints

### Get Dashboard Stats
**GET** `/admin/stats`

### Get All Users
**GET** `/admin/users?role=farmer&isActive=true`

### Toggle User Status
**PUT** `/admin/users/:id/toggle-status`

### Get All Products
**GET** `/admin/products?isActive=true`

### Toggle Product Status
**PUT** `/admin/products/:id/toggle-status`

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Order Status Flow

```
pending → accepted → packed → shipped → delivered
                              ↓
                          cancelled
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","role":"consumer"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ramesh@farmer.com","password":"farmer123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

---

For more details, see the full README.md
