# Daily Tracker System - Complete Setup & Architecture Guide

## 📌 System Overview

Daily Tracker is a full-stack productivity management platform designed to help users:
- ✅ Create and manage personal goals
- 📔 Write and store journal entries
- 📊 Track habits and productivity
- 📈 View analytics and insights
- 🤖 Get AI-powered recommendations
- ⚙️ Manage subscriptions (admin dashboard)

**Current Status:** Beta v1.0 - Backend authentication security fully implemented, frontend integration in progress

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   DAILY TRACKER SYSTEM                  │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼────┐         ┌──▼───┐         ┌───▼────┐
    │Frontend │         │Backend│        │Database│
    │ React   │◄───────►│Node.js│◄──────►│ PostgreSQL
    │ SPA     │         │Express│        │
    └────────┘         └────────┘        └────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                ┌───▼───┐    ┌───▼────┐
                │Auth    │    │Goal    │
                │Service │    │Service │
                └────────┘    └────────┘
```

### Component Details

**Frontend (React)**
- Modern SPA with React Router v7
- Authentication with JWT tokens
- Local state management
- Responsive design with CSS3
- Dark/light theme support

**Backend (Node.js/Express)**
- RESTful API
- JWT authentication
- Input validation & sanitization
- Database abstraction layer
- Error handling & logging

**Database (PostgreSQL)**
- User management
- Goals tracking
- Future: Habits, Journals, Analytics

**AI Engine (Future)**
- OpenAI API integration
- Recommendation system
- Analytics processing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- PostgreSQL 12+ running
- npm or yarn package manager

### 1. Clone and Setup

```bash
# Clone repository (if using git)
cd DailyTracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

**Backend (.env)**
```bash
# Create backend/.env file
cp backend/.env.example backend/.env

# Edit backend/.env with:
DATABASE_URL=postgresql://user:password@localhost:5432/daily_tracker
JWT_SECRET=your-super-secret-key-change-this
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```bash
# Create frontend/.env file
cp frontend/.env.example frontend/.env

# Edit frontend/.env with:
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Initialize Database

```bash
cd backend
npm run init-db
```

This will create:
- `users` table
- `goals` table
- Required indexes

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

---

## 🔐 Authentication Flow

### Registration & Login

```
User Input
    │
    ▼
┌─────────────────┐
│ Input Validation│ ◄─ Email format, password strength
└────────┬────────┘
         │
    ┌────▼────────────────────┐
    │                         │
    ▼ (New User)         ▼ (Existing User)
┌──────────────┐       ┌──────────────┐
│ Hash Password│       │Verify Password│
└────────┬─────┘       └────────┬──────┘
         │                      │
    ┌────▼───────────────────────▼───┐
    │    Generate JWT Token          │
    │    (24h expiration)            │
    └────────┬──────────────────────┘
             │
    ┌────────▼─────────────┐
    │ Store in localStorage│
    │ + localStorage.token │
    └────────┬─────────────┘
             │
    ┌────────▼──────────────┐
    │ Redirect to Dashboard │
    └───────────────────────┘
```

### API Request with Token

```
Frontend Request
    │
    │ GET /api/goals/1
    │ Authorization: Bearer eyJh...
    │
    ▼
┌──────────────────────┐
│ Auth Middleware      │
│ 1. Extract token     │
│ 2. Verify signature  │
│ 3. Check expiration  │
└─────────┬────────────┘
          │
    ┌─────▼─────┐
    │           │
    ▼ Valid ▼ Invalid
┌────────┐ ┌─────────┐
│Proceed │ │ 401     │
│Request │ │ Error   │
└────────┘ └─────────┘
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  theme VARCHAR(10) DEFAULT 'light',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Goals Table
```sql
CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Features:**
- Foreign key relationship (cascade delete)
- Timestamps for tracking
- Indexes for query performance
- Constraints for data integrity

---

## 🛠️ Development Guide

### Project Structure

```
DailyTracker/
├── backend/
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── controllers/
│   │   ├── userController.js        # Auth logic
│   │   └── goalController.js        # Goal CRUD
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT validation
│   ├── routes/
│   │   ├── userRoutes.js            # Auth endpoints
│   │   └── goalRoutes.js            # Goal endpoints
│   ├── utils/
│   │   └── validation.js            # Input validation
│   ├── scripts/
│   │   └── initDatabase.js          # DB setup
│   ├── .env.example                 # Environment template
│   ├── API_DOCUMENTATION.md         # API reference
│   ├── package.json
│   └── server.js                    # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js         # API helper
│   │   ├── components/
│   │   │   ├── ProtectedRoute.js   # Route protection
│   │   │   └── Navbar.js           # Navigation
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Goals.js
│   │   │   └── ...
│   │   ├── App.js                  # Router setup
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
└── docs/
    ├── SRS.md                        # Requirements spec
    ├── IMPLEMENTATION_GUIDE.md       # Frontend updates
    └── README.md                     # This file
```

### Common Development Tasks

**Add New Endpoint:**
1. Create controller function in appropriate file
2. Add route in routes file
3. Add auth middleware if protected
4. Update API_DOCUMENTATION.md
5. Test with curl or Postman

**Update Database Schema:**
1. Create migration file in `scripts/migrations/`
2. Update `initDatabase.js` accordingly
3. Document changes

**Add Frontend Component:**
1. Create component file
2. Import and use apiClient for requests
3. Wrap with ProtectedRoute if needed
4. Handle loading/error states

---

## 🧪 Testing

### Manual Testing with curl

```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name":"John Doe",
    "email":"john@example.com",
    "password":"password123"
  }'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"password123"
  }'

# Get Goals (replace TOKEN and USER_ID)
curl -X GET http://localhost:5000/api/goals/1 \
  -H "Authorization: Bearer TOKEN"

# Create Goal
curl -X POST http://localhost:5000/api/goals/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title":"Learn TypeScript",
    "category":"Learning"
  }'
```

---

## 🚨 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database name exists
- Run `npm run init-db`

### Issue: "JWT token invalid"
**Solution:**
- Check token expiration
- Verify JWT_SECRET matches frontend
- Token must be in format: `Bearer <token>`

### Issue: CORS errors
**Solution:**
- Ensure CORS is enabled in server.js
- Check API_URL in frontend .env
- Verify backend is running

### Issue: Cannot find module errors
**Solution:**
- Run `npm install` in respective folder
- Check for typos in require/import statements
- Clear node_modules and reinstall

---

## 📈 Performance Considerations

- Database indexes on frequently queried columns ✅
- Parameterized queries (prevent SQL injection) ✅
- JWT token caching on frontend ✅
- Response pagination (TODO)
- API rate limiting (TODO)
- Caching headers (TODO)

---

## 🔒 Security Features Implemented

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Secure error messages
- ✅ Authorization checks
- ⏳ Rate limiting (TODO)
- ⏳ HTTPS/SSL (production)
- ⏳ Email verification (TODO)

---

## 📋 SRS Compliance Status

| Feature | Status | Notes |
|---------|--------|-------|
| User Registration | ✅ Complete | JWT auth implemented |
| User Login | ✅ Complete | Secure token generation |
| Profile Management | ⏳ In Progress | DB ready, frontend update needed |
| Goal Management | ✅ Complete | Full CRUD with auth |
| Habit Tracking | ⏰ Planned | Schema needed |
| Journal | ⏰ Planned | API endpoints TODO |
| Analytics | ⏰ Planned | Dashboard TODO |
| AI Assistant | ⏰ Planned | OpenAI integration TODO |
| Admin Dashboard | ⏰ Planned | User management TODO |
| Subscriptions | ⏰ Planned | Payment integration TODO |
| Mobile App | ⏰ Planned | React Native TODO |

---

## 📞 Support & Documentation

- **API Docs:** See `backend/API_DOCUMENTATION.md`
- **Implementation:** See `IMPLEMENTATION_GUIDE.md`
- **Requirements:** See `docs/SRS.md`

---

## 🎯 Next Steps

1. **Frontend Integration:**
   - Update Login/Register components with new auth flow
   - Update Goals component to use apiClient
   - Add ProtectedRoute to App.js routes
   - Test authentication end-to-end

2. **Feature Development:**
   - Implement Journal API
   - Create Habit Tracking module
   - Build Admin Dashboard
   - Setup Analytics

3. **Security & DevOps:**
   - Add rate limiting middleware
   - Setup CI/CD pipeline
   - Add error logging
   - Configure production environment

---

## 📦 Version Info

- **Daily Tracker:** v1.0 Beta
- **Frontend:** React 19, React Router 7
- **Backend:** Node.js, Express 5
- **Database:** PostgreSQL 12+
- **Last Updated:** May 30, 2026

---

**Ready to deploy your Daily Tracker system! Follow the Quick Start above to get running.** 🚀
