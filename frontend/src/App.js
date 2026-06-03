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

              <Dashboard
                user={loggedInUser}
                darkMode={darkMode}
              />

            }
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={

              <Profile
                user={loggedInUser}
                setLoggedInUser={
                  setLoggedInUser
                }
                darkMode={darkMode}
              />

            }
          />

          {/* GOALS */}

          <Route
            path="/goals"
            element={
              <Goals
                user={loggedInUser}
                darkMode={darkMode}
              />
            }
          />

          {/* JOURNAL */}

          <Route
            path="/journal"
            element={
              <Journal
                user={loggedInUser}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/archive"
            element={
              <Archive
                user={loggedInUser}
                darkMode={darkMode}
              />
            }
          />

          {/* ANALYTICS */}

          <Route
            path="/analytics"
            element={
              <Analytics
                user={loggedInUser}
                darkMode={darkMode}
              />
            }
          />

          {/* CALENDAR */}

          <Route
            path="/calendar"
            element={
              <Calendar
                user={loggedInUser}
                darkMode={darkMode}
              />
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
    <AdminDashboard
      darkMode={darkMode}
    />
  }
/>

        </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;