// App.js

import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import Navbar from "./Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./Home";

import Login from "./Login";

import Register from "./Register";

import Dashboard from "./Dashboard";

import Profile from "./Profile";
import Archive from "./Archive";

import AdminLogin from "./AdminLogin";
import Goals from "./Goals";
import Analytics from "./Analytics";
import Journal from "./Journal";
import Calendar from "./Calendar";
import AdminDashboard from "./AdminDashboard";
import About from "./pages/About";
import Features from "./pages/Features";
import Documentation from "./pages/Documentation";

function App() {

  // DARK MODE

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem(
        "dt-theme"
      ) === "dark"

    );

  // USER SESSION

  const [loggedInUser,
    setLoggedInUser] =
    useState(

      JSON.parse(
        localStorage.getItem(
          "dt-user"
        )
      ) || null

    );

  // SAVE THEME

  useEffect(() => {

    localStorage.setItem(

      "dt-theme",

      darkMode
        ? "dark"
        : "light"

    );

  }, [darkMode]);

  return (

    <BrowserRouter>

      <div
        className={
          darkMode
            ? "app dark"
            : "app"
        }
      >

        {/* NAVBAR */}

        <Navbar

          darkMode={darkMode}

          setDarkMode={setDarkMode}

          loggedInUser={loggedInUser}

          setLoggedInUser={
            setLoggedInUser
          }

        />

        {/* ROUTES */}

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
              />
            }
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={

              <Login
                setLoggedInUser={
                  setLoggedInUser
                }
              />

            }
          />

          {/* REGISTER */}

          <Route
            path="/register"
            element={
              <Register />
            }
          />

          {/* USER DASHBOARD */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  user={loggedInUser}
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  user={loggedInUser}
                  setLoggedInUser={
                    setLoggedInUser
                  }
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />

          {/* GOALS */}

          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <Goals
                  user={loggedInUser}
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />

          {/* JOURNAL */}

          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journal
                  user={loggedInUser}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/archive"
            element={
              <ProtectedRoute>
                <Archive
                  user={loggedInUser}
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />

          {/* ANALYTICS */}

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics
                  user={loggedInUser}
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />

          {/* CALENDAR */}

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar
                  user={loggedInUser}
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />

          {/* ADMIN LOGIN */}

          <Route
            path="/admin-login"
            element={
              <AdminLogin
                setLoggedInUser={
                  setLoggedInUser
                }
              />
            }
          />

          {/* ADMIN DASHBOARD */}

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />
          <Route
  path="/about"
  element={<About />}
/>
   <Route
  path="/features"
  element={<Features />}
/>
<Route
  path="/documentation"
  element={<Documentation />}
/>
        </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;