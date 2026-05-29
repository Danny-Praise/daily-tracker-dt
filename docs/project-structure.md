# DailyTracker Project Structure

## Overview
DailyTracker is a modern SaaS-style productivity platform with frontend, backend, and future mobile/AI layers.

This document maps the current project structure and describes what each file or folder is responsible for.

---

## Frontend (`frontend/src`)

### App-level files

- `App.js`
  - Main React router and layout controller.
  - Manages dark/light theme persistence.
  - Stores user session state.
  - Loads shared navigation and routes for user and admin pages.

- `App.css`
  - Global styling for the frontend app.
  - Theme-related base styles and layout defaults.

- `index.js`
  - React app bootstrap.
  - Mounts `App` into the DOM.

### Shared components

- `Navbar.js`
  - Top navigation bar.
  - Theme toggle, login/signup actions, user menu, and admin access.
  - Dynamically switches between guest and logged-in views.

- `Navbar.css`
  - Navbar styles, responsive behavior, and hover effects.

### Landing page

- `Home.js`
  - Marketing homepage.
  - Hero section, partner logos, testimonials, and feature highlights.

- `Home.css`
  - Landing page styling, animations, and glassmorphism effects.

### Authentication pages

- `Login.js`
  - User login screen.
  - Handles email/password input and API login flow.

- `Login.css`
  - Login page styling and responsive layout.

- `Register.js`
  - User registration form.
  - Handles username, email, password, confirmation, and validation UI.

- `Register.css`
  - Registration page styling.

- `AdminLogin.js`
  - Admin portal login page.
  - Route separation from regular user login.

- `AdminLogin.css`
  - Admin login styling.

### Primary product pages

- `Dashboard.js`
  - Main user dashboard.
  - Displays statistics, quick actions, recent activity, and motivational content.

- `Dashboard.css`
  - Dashboard layout and card styling.

- `Goals.js`
  - Goal management system.
  - Add, edit, delete, complete, and categorize goals.

- `Goals.css`
  - Goals page styling and progress UI.

- `Analytics.js`
  - Data visualization and productivity reports.
  - Charts for goal completion, streaks, and category breakdown.

- `Analytics.css`
  - Analytics page styling.

- `Journal.js`
  - Writing space for journal entries.
  - Supports saving, editing, and deleting entries.

- `Journal.css`
  - Journal page styling and editor UI.

- `Profile.js`
  - Account page for profile details, stats, and subscription info.

- `Profile.css`
  - Profile page styling.

- `Calendar.js`
  - Task scheduling and event planning page.
  - Supports calendar view, reminders, and upcoming goal planning.

- `Calendar.css`
  - Calendar page styling.

### Admin pages

- `AdminDashboard.js`
  - Admin system dashboard.
  - User management, analytics, and platform controls.

- `AdminDashboard.css`
  - Admin dashboard styling.

- `AdminSidebar.js`
  - Sidebar for admin navigation.

- `AdminSidebar.css`
  - Admin sidebar styles.

- `AdminUsers.js`
  - Admin user management page.

- `AdminUsers.css`
  - Admin user management styles.

### Support files

- `index.css`
  - Base global CSS rules.

- `reportWebVitals.js`
  - Performance metric utilities.

- `setupTests.js`
  - React testing configuration.

- `Auth.css`
  - Shared auth page CSS utilities.

- `Fitness.js`
  - Additional feature page currently in the frontend.

---

## Backend (`backend`)

### Server

- `server.js`
  - Express app entry point.
  - Registers middleware and route modules.
  - Enables CORS and JSON parsing.

### Configuration

- `config/db.js`
  - Database connection configuration (MySQL).

### Routes

- `routes/userRoutes.js`
  - Authentication and user-related endpoints.

- `routes/goalRoutes.js`
  - Goal CRUD endpoints.

### Controllers

- `controllers/userController.js`
  - User business logic and auth handling.

- `controllers/goalController.js`
  - Goal creation, update, read, delete logic.

### Middleware

- `middleware/`
  - Authentication guards, request validation, and error handling.

### Models

- `models/`
  - Schema objects and database abstractions.

### Services

- `services/`
  - Helper services and integration logic.

### Utils

- `utils/`
  - Shared utility functions used by backend code.

---

## Recommended Final Structure

### Frontend routes to support

- `/`
- `/login`
- `/register`
- `/dashboard`
- `/goals`
- `/journal`
- `/calendar`
- `/analytics`
- `/profile`
- `/admin-login`
- `/admin-dashboard`

### Database tables

- `users`
- `goals`
- `journals`
- `subscriptions`
- `notifications`

---

## Next steps

1. Continue building missing frontend page components with SaaS-style dashboard content.
2. Add route protection and auth guards in `App.js`.
3. Expand backend with admin and journal routes.
4. Strengthen UI with dark/light theme, motion, and responsive design.
5. Add a README summarizing the full platform architecture.
