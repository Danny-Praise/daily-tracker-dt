const pool = require("../config/db");
const { validateGoalInput } = require("../utils/validation");

// CREATE GOAL
const createGoal = async (req, res) => {
  try {
    const { title, category, start_date, end_date, daily_time, reminder, book_title, plan_level } = req.body;
    const user_id = req.userId; // From auth middleware

    // Validate input
    const validation = validateGoalInput(title, category);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const newGoal = await pool.query(
      `INSERT INTO goals
       (user_id, title, category, completed, start_date, end_date, daily_time, reminder, book_title, plan_level)
       VALUES ($1, $2, $3, FALSE, $4, $5, $6, $7, $8, $9)
       RETURNING id, user_id, title, category, completed, start_date, end_date, daily_time, reminder, book_title, plan_level, created_at, updated_at`,
      [user_id, title.trim(), category ? category.trim() : null, start_date || null, end_date || null, daily_time || null, reminder || null, book_title ? book_title.trim() : null, plan_level || null]
    );

    res.status(201).json({
      message: "Goal added successfully 🚀",
      goal: newGoal.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};

// GET GOALS
const getGoals = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authUserId = req.userId; // From auth middleware

    // Ensure users can only access their own goals
    if (parseInt(user_id) !== authUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const goals = await pool.query(
      "SELECT id, title, category, completed, completed_at, start_date, end_date, daily_time, reminder, book_title, plan_level, created_at, updated_at FROM goals WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.status(200).json(goals.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};

// COMPLETE GOAL
const completeGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From auth middleware

    // Verify goal belongs to user
    const goalCheck = await pool.query(
      "SELECT user_id FROM goals WHERE id = $1",
      [id]
    );

    if (goalCheck.rows.length === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goalCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(
      `UPDATE goals
       SET completed = TRUE,
           completed_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [id]
    );

    res.status(200).json({
      message: "Goal completed successfully ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};

// DELETE GOAL
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From auth middleware

    // Verify goal belongs to user
    const goalCheck = await pool.query(
      "SELECT user_id FROM goals WHERE id = $1",
      [id]
    );

    if (goalCheck.rows.length === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goalCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(
      "DELETE FROM goals WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Goal deleted successfully 🗑️"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};

// EDIT GOAL
const editGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, start_date, end_date, daily_time, reminder, book_title, plan_level } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate input
    const validation = validateGoalInput(title, category);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Verify goal belongs to user
    const goalCheck = await pool.query(
      "SELECT user_id FROM goals WHERE id = $1",
      [id]
    );

    if (goalCheck.rows.length === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goalCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedGoal = await pool.query(
      `UPDATE goals
       SET title = $1,
           category = $2,
           start_date = $3,
           end_date = $4,
           daily_time = $5,
           reminder = $6,
           book_title = $7,
           plan_level = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING id, title, category, completed, completed_at, start_date, end_date, daily_time, reminder, book_title, plan_level, created_at, updated_at`,
      [title.trim(), category ? category.trim() : null, start_date || null, end_date || null, daily_time || null, reminder || null, book_title ? book_title.trim() : null, plan_level || null, id]
    );

    res.status(200).json({
      message: "Goal updated successfully ✏️",
      goal: updatedGoal.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  completeGoal,
  deleteGoal,
  editGoal
};