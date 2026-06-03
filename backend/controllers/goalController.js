const pool = require("../config/db");
const { validateGoalInput } = require("../utils/validation");

// CREATE GOAL
const createGoal = async (req, res) => {
  try {
    const { title, category } = req.body;
    const user_id = req.userId; // From auth middleware

    // Validate input
    const validation = validateGoalInput(title, category);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const newGoal = await pool.query(
      `INSERT INTO goals
       (user_id, title, category, completed)
       VALUES ($1, $2, $3, FALSE)
       RETURNING id, user_id, title, category, completed, created_at`,
      [user_id, title.trim(), category ? category.trim() : null]
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
      "SELECT id, title, category, completed, created_at FROM goals WHERE user_id = $1 ORDER BY created_at DESC",
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
           completed_at = CURRENT_TIMESTAMP
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
    const { title, category } = req.body;
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
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, title, category, completed, created_at, updated_at`,
      [title.trim(), category ? category.trim() : null, id]
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