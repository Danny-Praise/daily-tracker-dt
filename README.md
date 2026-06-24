# Daily Tracker System - Complete Setup & Architecture Guide

## 📌 System Overview

Daily Tracker is a full-stack productivity management platform designed to help users:
- ✅ Create and manage personal goals
- 📔 Write and store journal entries
- 📊 Track habits and productivity
- 📈 View analytics and insights
- 🤖 Get AI-powered recommendations
- 🌓 Dark/light theme support
- 📱 Cross-platform (web + mobile)

**Current Status:** v2.0 - Production-ready!

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
- Modern SPA with React Router
- Authentication with JWT tokens
- Local state management
- Responsive design with CSS3
- Dark/light theme support
- API client with interceptors

**Backend (Node.js/Express)**
- RESTful API
- JWT authentication
- Input validation & sanitization
- Database abstraction layer
- Error handling & logging
- Rate limiting
- AI API endpoints

**Database (PostgreSQL)**
- User management
- Goals tracking (with extra fields)
- Journal entries
- Indexes for performance

**AI Engine**
- Mock AI for goal suggestions
- Journal insights (future: OpenAI integration)
- Goal planning assistance

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 12+ running
- npm or yarn package manager

### 1. Clone and Setup

```bash
# If not cloned already, navigate to the project folder
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
Create backend/.env file (copy backend/.env.example):
```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/daily_tracker
# OR individual DB settings
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=daily_tracker

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
Create frontend/.env file (copy frontend/.env.example):
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Initialize Database

```bash
cd backend
npm run init-db
```

This will create:
- `users` table
- `goals` table (with extra fields like start_date, plan_level)
- `journal_entries` table
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

## 🎨 Key Features Implemented

### 1. **Goal Management (Full CRUD)**
- Create, edit, delete, complete goals
- Extra fields: start date, end date, daily time, reminder, book title, plan level
- AI-powered goal suggestions
- Statistics (total, completed, pending)

### 2. **Journal System**
- Write journal entries
- Archive entries
- API-backed (not localStorage)
- Archive password protection

### 3. **User Management**
- Register/Login
- Profile management
- Dark/light theme
- Archive password

### 4. **Security**
- Password hashing with bcrypt
- JWT token auth
- Route protection (ProtectedRoute component)
- Rate limiting
- Input validation

### 5. **AI Features**
- AI goal suggestions
- AI goal planning (easy/medium/hard)
- Journal insights (future)

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  archive_password_hash VARCHAR(255),
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
  start_date DATE,
  end_date DATE,
  daily_time TIME,
  reminder VARCHAR(20),
  book_title VARCHAR(255),
  plan_level VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Journal Entries Table
```sql
CREATE TABLE journal_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📞 Support & Documentation

- **API Docs:** See `backend/API_DOCUMENTATION.md`
- **Project Structure:** Well-organized folders
- **Testing:** Manual testing via UI or Postman

---

## 🎉 Ready to Use!

The Daily Tracker system is now polished, fully functional, and ready for your supervisor!
