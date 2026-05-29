const pool = require("../config/db");

// CREATE GOAL
const createGoal = async (req, res) => {

  try {

  const {
  user_id,
  title,
  category
} = req.body;

   const newGoal = await pool.query(
  `INSERT INTO goals
   (user_id, title, category)
   VALUES ($1, $2, $3)
   RETURNING *`,
  [user_id, title, category]
);

    res.status(201).json({
      message: "Goal added successfully 🚀",
      goal: newGoal.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};

// GET GOALS
const getGoals = async (req, res) => {

  try {

    const { user_id } = req.params;

    const goals = await pool.query(
      "SELECT * FROM goals WHERE user_id = $1 ORDER BY id DESC",
      [user_id]
    );

    res.status(200).json(goals.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};

// COMPLETE GOAL
const completeGoal = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
  `UPDATE goals
   SET completed = TRUE,
       completed_at = CURRENT_TIMESTAMP
   WHERE id = $1`,
  [id]
);

    res.status(200).json({
      message: "Goal completed"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};
// DELETE GOAL
const deleteGoal = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM goals WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Goal deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};
// EDIT GOAL
const editGoal = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      category
    } = req.body;

    const updatedGoal = await pool.query(

      `UPDATE goals
       SET title = $1,
           category = $2
       WHERE id = $3
       RETURNING *`,

      [title, category, id]

    );

    res.status(200).json({

      message: "Goal updated successfully",

      goal: updatedGoal.rows[0]

    });

  } catch (error) {

    console.log(error);

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