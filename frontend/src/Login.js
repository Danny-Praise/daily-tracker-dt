// Login.js

import "./Login.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login({ setLoggedInUser }) {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      alert(
        response.data.message
      );

      setLoggedInUser(
        response.data.user
      );

      localStorage.setItem(
        "dt-user",
        JSON.stringify(
          response.data.user
        )
      );
      localStorage.setItem(
        "dt-token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        "Invalid credentials"
      );
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        {/* TITLE */}

        <h1>
          Welcome Back 🚀
        </h1>

        <p>
          Continue your transformation journey
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="your-email@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
        >
          Sign In
        </button>

        {/* LOGIN LINKS */}

        <div className="login-links">

          <p>

            No account?

            <span
              onClick={() =>
                navigate("/register")
              }
            >
              Create an account
            </span>

          </p>

          <p>

            Forgot Password?

            <span>
              Reset here
            </span>

          </p>

        </div>

        {/* SOCIAL LOGIN */}

        <div className="social-login">

          {/* GOOGLE */}

          <button className="google-btn">

            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="google"
            />

            Continue with Google

          </button>

          {/* APPLE */}

          <button className="apple-btn">

            <img
              src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              alt="apple"
            />

            Continue with Apple

          </button>

        </div>

        {/* TERMS */}

        <div className="login-terms">

          By continuing, you agree to our

          <span>
            Terms of Service
          </span>

          and

          <span>
            Privacy Policy
          </span>

        </div>

      </div>

    </div>

  );
}

export default Login;