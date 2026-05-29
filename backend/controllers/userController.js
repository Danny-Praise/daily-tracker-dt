const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password
    } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const result = await pool.query(
      `INSERT INTO users 
      (full_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [full_name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully 🚀",
      user: result.rows[0]
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const user = result.rows[0];

    // Compare passwords
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login successful 🚀",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};
module.exports = {
  registerUser,
  loginUser
};