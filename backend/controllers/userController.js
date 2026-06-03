const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateRegistration } = require("../utils/validation");

const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password
    } = req.body;

    // Validate input
    const validation = validateRegistration(full_name, email, password);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const result = await pool.query(
      `INSERT INTO users 
      (full_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email`,
      [full_name, email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully 🚀",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const { validateLogin } = require("../utils/validation");
    const validation = validateLogin(email, password);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Check if user exists
    const result = await pool.query(
      "SELECT id, full_name, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    // Compare passwords
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful 🚀",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      "SELECT id, full_name, email, archive_password_hash IS NOT NULL AS archivePasswordSet FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { full_name, archive_password } = req.body;

    if (full_name && full_name.trim().length === 0) {
      return res.status(400).json({ error: "Name cannot be empty" });
    }

    const updates = [];
    const values = [];

    if (full_name) {
      values.push(full_name.trim());
      updates.push(`full_name = $${values.length}`);
    }

    if (archive_password) {
      const hashedArchivePassword = await bcrypt.hash(archive_password, 10);
      values.push(hashedArchivePassword);
      updates.push(`archive_password_hash = $${values.length}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    values.push(userId);
    const result = await pool.query(
      `UPDATE users SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING id, full_name, email, archive_password_hash IS NOT NULL AS archivePasswordSet`,
      values
    );

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};