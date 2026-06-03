// Register.js

import "./Register.css";

import { useState } from "react";

import axios from "axios";

function Register() {

  const [full_name, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          full_name,
          email,
          password
        }
      );

      localStorage.setItem(
        "dt-token",
        response.data.token
      );
      localStorage.setItem(
        "dt-user",
        JSON.stringify(response.data.user)
      );

      alert(
        "Registration successful 🚀"
      );

      window.location.href =
        "/login";

    } catch (error) {

      console.log(error);

      alert(
        "Registration failed"
      );
    }
  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>
          Create Account 🚀
        </h1>

        <p>
          Start your transformation journey
        </p>

        {/* FULL NAME */}

        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="DT@gmail.com"
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

        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
        >
          Get Started
        </button>

        {/* SOCIAL LOGIN */}

        <div className="social-login">

          <button className="google-btn">

            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="google"
            />

            Continue with Google

          </button>

          <button className="apple-btn">

            <img
              src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              alt="apple"
            />

            Continue with Apple

          </button>

        </div>

        {/* SWITCH AUTH */}

        <p className="switch-auth">

          Already have an account?

          <span
            onClick={() =>
              window.location.href =
                "/login"
            }
          >
            Login
          </span>

        </p>

      </div>

    </div>

  );
}

export default Register;