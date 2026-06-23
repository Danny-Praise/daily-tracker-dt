// Navbar.js

import "./Navbar.css";

import {
  FaUserCircle,
  FaMoon,
  FaSun,
  FaLock
} from "react-icons/fa";

import { useState } from "react";

function Navbar({
  darkMode,
  setDarkMode,
  loggedInUser,
  setLoggedInUser
}) {

  const [sphereOpen, setSphereOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div
        className="nav-logo"
        onClick={() =>
          window.location.href = "/"
        }
      >

        DT AI 🚀

      </div>

      {/* NAV LINKS */}

      <ul className="nav-links">

        <li>Home</li>

        <li>Features</li>

        {/* SPHERES DROPDOWN */}

        <li
          className={`dropdown${sphereOpen ? " show" : ""}`}
          onMouseEnter={() => setSphereOpen(true)}
          onMouseLeave={() => setSphereOpen(false)}
        >

          <span
            className="dropdown-title"
            onClick={() => setSphereOpen((prev) => !prev)}
          >

            Spheres ▾

          </span>

          <ul className="dropdown-content">

            <li>Fitness</li>

            <li>Finance</li>

            <li>Health</li>

            <li>Spiritual</li>

            <li>Academic</li>

            <li>Career</li>

            <li>Relationships</li>

            <li>Productivity</li>

          </ul>

        </li>

        <li>Pricing</li>

        <li>Testimonials</li>

      </ul>

      {/* RIGHT SECTION */}

      <div className="nav-right">

        {/* DARK MODE BUTTON */}

        <button
          className="theme-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {darkMode
            ? <FaSun />
            : <FaMoon />}

        </button>

        {/* AUTH / USER SECTION */}

        {!loggedInUser ? (

          <div className="auth-buttons">

            <button
              className="login-btn"
              onClick={() =>
                window.location.href =
                  "/login"
              }
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={() =>
                window.location.href =
                  "/register"
              }
            >
              Sign Up
            </button>

          </div>

        ) : (

          <div
            className={`user-menu${userOpen ? " show" : ""}`}
            onMouseEnter={() => setUserOpen(true)}
            onMouseLeave={() => setUserOpen(false)}
          >

            {/* YOU BUTTON */}

            <FaUserCircle
              className="user-icon"
              onClick={() => setUserOpen((prev) => !prev)}
            />

            {/* DROPDOWN */}

            <div className="user-dropdown">

              <div
                onClick={() =>
                  window.location.href =
                    "/habits"
                }
              >
                Habits
              </div>
              <div
                onClick={() =>
                  window.location.href =
                    "/journal"
                }
              >
                Journal
              </div>
              <div
                onClick={() =>
                  window.location.href =
                    "/profile"
                }
              >
                Profile
              </div>
              <div
                onClick={() =>
                  window.location.href =
                    "/dashboard"
                }
              >
                Dashboard
              </div>
              <div
                onClick={() =>
                  window.location.href =
                    "/archive"
                }
              >
                Archive <FaLock style={{ marginLeft: "8px" }} />
              </div>

              <div
                onClick={() => {

                  setLoggedInUser(null);

                  localStorage.removeItem(
                    "dt-user"
                  );

                  window.location.href =
                    "/";
                }}
              >
                Logout
              </div>

            </div>

          </div>

        )}

      </div>

    </nav>

  );
}

export default Navbar;