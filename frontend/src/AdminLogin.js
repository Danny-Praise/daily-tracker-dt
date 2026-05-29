// AdminLogin.js

import "./AdminLogin.css";

import { useState } from "react";

import axios from "axios";

function AdminLogin({

  setLoggedInUser

}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleAdminLogin =
    async () => {

    try {

      const response =
        await axios.post(

        "http://localhost:5000/api/users/login",

        {
          email,
          password
        }

      );

      // CHECK ROLE

      if (
        response.data.user.role !==
        "admin"
      ) {

        alert(
          "Access denied. Admins only."
        );

        return;
      }

      // SAVE ADMIN

      setLoggedInUser(
        response.data.user
      );

      localStorage.setItem(

        "dt-user",

        JSON.stringify(
          response.data.user
        )

      );

      alert(
        "Admin login successful"
      );

      window.location.href =
        "/admin-dashboard";

    } catch (error) {

      console.log(error);

      alert(
        "Invalid admin credentials"
      );
    }
  };

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <h1>
          Admin Control Center ⚡
        </h1>

        <p>
          Secure administrative access
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="admin@dtai.com"
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
          onClick={
            handleAdminLogin
          }
        >
          Enter Admin Dashboard
        </button>

      </div>

    </div>

  );
}

export default AdminLogin;