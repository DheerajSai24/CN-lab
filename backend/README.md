# CN Lab Backend Setup

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## 🚀 Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Update `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/cn-lab
   ```

### 3. Configure Environment Variables

Edit the `.env` file in the root directory:
```env
GEMINI_API_KEY=your-gemini-api-key
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-random-secret-key
PORT=5000
```

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "21A91A05XX",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer your-jwt-token
```

#### Health Check
```http
GET /api/health
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Input validation
- ✅ CORS protection
- ✅ Environment variables for secrets

## 📦 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  rollNumber: String (unique),
  password: String (hashed),
  weekProgress: Array,
  completedWeeks: Array,
  lastLogin: Date,
  createdAt: Date
}
```

## 🔧 Next Steps

1. Update `.env` with your MongoDB Atlas connection string
2. Run `npm install` in the backend folder
3. Start the server with `npm run dev`
4. Test API endpoints using Postman or curl
5. Integrate frontend with backend APIs

## 📝 Notes

- Keep `.env` file secure and never commit it to Git
- Change JWT_SECRET to a strong random string in production
- MongoDB free tier supports up to 500 concurrent connections
- Server includes automatic error handling and logging
