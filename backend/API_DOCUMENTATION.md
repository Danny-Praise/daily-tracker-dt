# Daily Tracker - Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/users/register` and `/users/login`) require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### User Management

#### 1. Register User
**POST** `/users/register`

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully 🚀",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation Rules:**
- `full_name`: Required, max 100 characters
- `email`: Valid email format, must be unique
- `password`: Minimum 6 characters

---

#### 2. Login User
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful 🚀",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Goal Management (All require Authentication)

#### 3. Create Goal
**POST** `/goals/create`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Learn TypeScript",
  "category": "Learning"
}
```

**Response (201):**
```json
{
  "message": "Goal added successfully 🚀",
  "goal": {
    "id": 1,
    "user_id": 1,
    "title": "Learn TypeScript",
    "category": "Learning",
    "completed": false,
    "created_at": "2026-05-30T10:30:00.000Z"
  }
}
```

**Validation Rules:**
- `title`: Required, max 255 characters
- `category`: Optional, max 50 characters

---

#### 4. Get All Goals
**GET** `/goals/:user_id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Learn TypeScript",
    "category": "Learning",
    "completed": false,
    "created_at": "2026-05-30T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Finish Project",
    "category": "Work",
    "completed": true,
    "created_at": "2026-05-28T08:15:00.000Z"
  }
]
```

**Note:** Users can only access their own goals. The `user_id` in the URL must match the authenticated user's ID.

---

#### 5. Complete Goal
**PUT** `/goals/complete/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Goal completed successfully ✅"
}
```

---

#### 6. Update Goal
**PUT** `/goals/edit/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Master TypeScript",
  "category": "Learning"
}
```

**Response (200):**
```json
{
  "message": "Goal updated successfully ✏️",
  "goal": {
    "id": 1,
    "title": "Master TypeScript",
    "category": "Learning",
    "completed": false,
    "created_at": "2026-05-30T10:30:00.000Z",
    "updated_at": "2026-05-30T14:45:00.000Z"
  }
}
```

---

#### 7. Delete Goal
**DELETE** `/goals/delete/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Goal deleted successfully 🗑️"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid email format"
}
```

### 401 Unauthorized
```json
{
  "error": "Authorization token required"
}
```

### 403 Forbidden
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Goal not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error"
}
```

---

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables** (create `.env` file):
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/daily_tracker
   JWT_SECRET=your-secret-key-here-change-in-production
   PORT=5000
   NODE_ENV=development
   ```

3. **Start Server:**
   ```bash
   npm start
   ```
   Or with auto-restart:
   ```bash
   npm run dev
   ```

---

## Authentication Flow

1. User registers with email/password
2. Backend returns JWT token (expires in 24h)
3. Frontend stores token in localStorage
4. For subsequent requests, include token in Authorization header
5. Backend validates token and extracts user ID

---

## Security Features

✅ Password hashing with bcrypt (10 salt rounds)
✅ JWT token-based authentication
✅ Input validation on all endpoints
✅ Authorization checks (users access only their own data)
✅ CORS enabled for frontend communication
✅ Parameterized queries to prevent SQL injection
✅ Error messages don't leak sensitive information

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

---

## Future Enhancements

- [ ] Habits tracking endpoints
- [ ] Journal entry endpoints
- [ ] Analytics/insights endpoints
- [ ] Admin management endpoints
- [ ] Subscription management
- [ ] Email verification
- [ ] Password reset
- [ ] Rate limiting
- [ ] Data export functionality
