import "./Auth.css";

import { useState } from "react";

import axios from "axios";

function Signup() {

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // PASSWORD VALIDATION

  const validatePassword = () => {

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    return regex.test(password);
  };

  // SIGNUP FUNCTION

  const handleSignup = async () => {

    if (!validatePassword()) {

      alert(
        "Password must contain uppercase, lowercase, number, symbol and minimum 8 characters."
      );

      return;
    }

    try {

      const response = await axios.post(

        "http://localhost:5000/api/users/register",

        {
          full_name: fullName,
          email,
          password
        }

      );

      alert(response.data.message);

      // CLEAR INPUTS

      setFullName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Get Started 🚀
        </h1>

        <p className="auth-subtitle">
          Build the best version of yourself
        </p>

        {/* FULL NAME */}

        <input
          className="auth-input"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        {/* EMAIL */}

        <input
          className="auth-input"
          type="email"
          placeholder="DT@gmail.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        {/* PASSWORD */}

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* PASSWORD RULES */}

        <div className="password-rules">

          Password must contain:
          uppercase, lowercase,
          number, symbol and
          minimum 8 characters.

        </div>

        {/* SIGNUP BUTTON */}

        <button
          className="auth-button"
          onClick={handleSignup}
        >
          Create Account
        </button>

        {/* SOCIAL LOGIN */}

        <div className="social-login">

          {/* GOOGLE */}

          <button
            className="social-btn google-btn"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="Google"
              width="18"
              style={{
                marginRight: "8px"
              }}
            />

            Google

          </button>

          {/* APPLE */}

          <button
            className="social-btn apple-btn"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              alt="Apple"
              width="18"
              style={{
                marginRight: "8px",
                filter: "invert(1)"
              }}
            />

            Apple

          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;